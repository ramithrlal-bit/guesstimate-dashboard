const fetch = require('node-fetch');

async function extract() {
    const url = 'https://datareportal.com/reports/digital-2026-india';
    
    let text = '';
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        if (response.ok) {
            const rawHtml = await response.text();
            const cheerio = require('cheerio');
            const $ = cheerio.load(rawHtml);
            text = $('body').text().replace(/\s+/g, ' ');
        } else {
            throw new Error(`DataReportal API failed with status ${response.status}`);
        }
    } catch (e) {
        console.error("DataReportal extraction error via fetch:", e.message);
        return [];
    }

    const results = [];
    
    const patterns = [
        { id: 'digital_social_media_user_identities', regex: /([\d\.]+)\s*million\s+social\s+media\s+user\s+identities/i, unit: 'identities', source: 'DataReportal', label: '2026' },
        { id: 'digital_youtube_ad_reach', regex: /YouTube\s+had\s+([\d\.]+)\s*million/i, unit: 'reach', source: 'DataReportal', label: '2026' },
        { id: 'digital_instagram_ad_reach', regex: /Instagram\s+had\s+([\d\.]+)\s*million/i, unit: 'reach', source: 'DataReportal', label: '2026' },
        { id: 'digital_facebook_ad_reach', regex: /Facebook\s+had\s+([\d\.]+)\s*million/i, unit: 'reach', source: 'DataReportal', label: '2026' },
        { id: 'digital_linkedin_members', regex: /LinkedIn\s+had\s+([\d\.]+)\s*million/i, unit: 'members', source: 'DataReportal', label: '2026' },
        { id: 'digital_snapchat_ad_reach', regex: /Snapchat\s+had\s+([\d\.]+)\s*million/i, unit: 'reach', source: 'DataReportal', label: '2026' },
        { id: 'digital_x_ad_reach', regex: /X\s+had\s+([\d\.]+)\s*million/i, unit: 'reach', source: 'DataReportal', label: '2026' }
    ];

    patterns.forEach(p => {
        const match = text.match(p.regex);
        if (match) {
            results.push({
                metric_id: p.id,
                period_label: p.label,
                period_end: '2026-01-31',
                value: parseFloat(match[1]) * 1000000,
                display_value: `~${match[1]}M`,
                unit: p.unit,
                data_type: 'official',
                source: p.source,
                source_url: url
            });
        }
    });

    return results;
}

module.exports = { extract };
