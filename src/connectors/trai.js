require('dotenv').config();
const cheerio = require('cheerio');
const pdfParse = require('pdf-parse');
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

async function run() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Fetching TRAI reports page...");
    const res = await fetch("https://www.trai.gov.in/release-publication/reports/telecom-subscriptions-reports");
    const html = await res.text();
    const $ = cheerio.load(html);

    let pdfUrl = null;
    let reportTitle = null;

    $('a').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();
        if (href && href.includes('.pdf') && text.toLowerCase().includes('telecom subscription')) {
            pdfUrl = href;
            reportTitle = text;
            return false;
        }
    });

    if (!pdfUrl) {
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.includes('.pdf') && href.toLowerCase().includes('subscription')) {
                pdfUrl = href;
                reportTitle = $(el).text().trim();
                return false;
            }
        });
    }

    if (!pdfUrl) {
        const pdfLink = $('.views-field-php a').first();
        if(pdfLink.length > 0) {
            pdfUrl = pdfLink.attr('href');
        }
    }

    if (!pdfUrl) {
        throw new Error("Could not find PDF URL on page.");
    }
    
    if (!pdfUrl.startsWith('http')) {
        pdfUrl = "https://www.trai.gov.in" + pdfUrl;
    }
    
    console.log("Found PDF URL:", pdfUrl);
    
    console.log("Downloading PDF...");
    const pdfRes = await fetch(pdfUrl);
    const pdfBuffer = await pdfRes.arrayBuffer();
    
    console.log("Parsing PDF...");
    const data = await pdfParse(Buffer.from(pdfBuffer));
    const text = data.text;
    
    const match = text.match(/Total Telephone Subscribers\s*\(Million\)\s*([\d\.]+)\s*([\d\.]+)\s*([\d\.]+)/i);
    
    if (!match) {
        throw new Error("Could not parse Total Telephone Subscribers from PDF.");
    }
    
    const totalMillions = parseFloat(match[3]);
    const totalBillions = totalMillions / 1000;
    
    const finalValue = parseFloat(totalBillions.toFixed(2));
    console.log("Parsed total telecom subscribers (Billions):", finalValue);

    console.log("Upserting metric into Supabase...");
    
    const { data: upsertData, error } = await supabase
        .from('metrics')
        .upsert({
            metric_id: 'trai_telephone_subscribers_total',
            name: 'Total Telephone Subscribers',
            category: 'Digital India',
            unit: 'B',
            format_template: '~{{val}}B',
            is_calculated: false,
            status: 'active',
            updated_at: new Date().toISOString()
        }, { onConflict: 'metric_id' })
        .select();
        
    if (error) {
        throw new Error("Error upserting metric metadata: " + error.message);
    }
    
    const metricRecord = upsertData[0];
    
    let sourceId;
    const { data: sources } = await supabase.from('sources').select('id').eq('name', 'TRAI');
    if (sources && sources.length > 0) {
        sourceId = sources[0].id;
    } else {
        const { data: newSource, error: sourceErr } = await supabase.from('sources').insert({ name: 'TRAI', source_type: 'government', status: 'active' }).select();
        if (sourceErr) throw new Error("Error creating source: " + sourceErr.message);
        sourceId = newSource[0].id;
    }
    
    const { error: obsError } = await supabase
        .from('observations')
        .insert({
            metric_id: metricRecord.id,
            source_id: sourceId,
            value: finalValue,
            display_value: `~${finalValue}B`,
            period_start: new Date().toISOString().split('T')[0],
            period_end: new Date().toISOString().split('T')[0],
            period_label: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
            data_type: 'official',
            source_url: pdfUrl,
            updated_at: new Date().toISOString()
        });
        
    if (obsError) {
        throw new Error("Error inserting observation: " + obsError.message);
    }
    
    console.log("Successfully imported TRAI total telecom subscribers.");
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
