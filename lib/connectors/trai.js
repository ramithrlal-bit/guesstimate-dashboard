const cheerio = require('cheerio');
const pdfParse = require('pdf-parse');
const fetch = require('node-fetch');

async function extractTRAI() {
    const sourceUrl = "https://www.trai.gov.in/release-publication/reports/telecom-subscriptions-reports";
    console.log(`[TRAI Connector] Fetching ${sourceUrl}...`);
    try {
        const res = await fetch(sourceUrl);
        if (!res.ok) {
            return { success: false, error: `HTTP ${res.status}` };
        }
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
            return { success: false, error: "Could not find PDF URL on page." };
        }
        
        if (!pdfUrl.startsWith('http')) {
            pdfUrl = "https://www.trai.gov.in" + pdfUrl;
        }
        
        console.log("[TRAI Connector] Found PDF URL:", pdfUrl);
        
        console.log("[TRAI Connector] Downloading PDF...");
        const pdfRes = await fetch(pdfUrl);
        if (!pdfRes.ok) {
            return { success: false, error: `Failed to download PDF, HTTP ${pdfRes.status}` };
        }
        const pdfBuffer = await pdfRes.arrayBuffer();
        
        console.log("[TRAI Connector] Parsing PDF...");
        const data = await pdfParse(Buffer.from(pdfBuffer));
        const text = data.text;
        
        const match = text.match(/Total Telephone Subscribers\s*\(Million\)\s*([\d\.]+)\s*([\d\.]+)\s*([\d\.]+)/i);
        
        if (!match) {
            return { success: false, error: "Could not parse Total Telephone Subscribers from PDF." };
        }
        
        const totalMillions = parseFloat(match[3]);
        const totalBillions = totalMillions / 1000;
        
        const finalValue = parseFloat(totalBillions.toFixed(2));
        console.log("[TRAI Connector] Parsed total telecom subscribers (Billions):", finalValue);

        const period_start = new Date().toISOString().split('T')[0];
        const period_end = new Date().toISOString().split('T')[0];
        const period_label = new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' });

        return {
            success: true,
            data: {
                metric_id: 'trai_telephone_subscribers_total',
                value: finalValue,
                display_value: `~${finalValue}B`,
                period_label: period_label,
                period_start: period_start,
                period_end: period_end,
                source_url: pdfUrl,
                data_type: 'official'
            }
        };
    } catch (error) {
        console.error('[TRAI Connector] Network/Parsing error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = { extractTRAI };
