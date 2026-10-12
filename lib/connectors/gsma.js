const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function extract() {
    const url = 'https://www.gsma.com/en/newsroom/press-release/india-to-become-the-second-largest-smartphone-market/';
    const results = [];
    
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        if (!response.ok) {
            console.error(`GSMA API failed with status ${response.status}`);
            return [];
        }
        
        const rawHtml = await response.text();
        if (!rawHtml || typeof rawHtml !== 'string') {
            return [];
        }

        const $ = cheerio.load(rawHtml);
        const text = $('body').text().replace(/\s+/g, ' ');
        
        // GSMA press releases usually mention unique mobile subscribers in the form "X million unique mobile subscribers" or "almost Y billion"
        const match = text.match(/([\d\.]+)\s*(million|billion).*?unique\s*mobile\s*subscriber/i);
        
        if (match && match[1] && match[2]) {
            let num = parseFloat(match[1]);
            if (isNaN(num) || num <= 0) {
                return [];
            }
            let value = num;
            if (match[2].toLowerCase() === 'billion') {
                value = value * 1000000000;
            } else {
                value = value * 1000000;
            }
            
            results.push({
                metric_id: 'digital_unique_mobile_subscribers',
                period_label: '2026',
                period_end: '2026-12-31',
                value: value,
                display_value: match[2].toLowerCase() === 'billion' ? `~${match[1]}B` : `~${match[1]}M`,
                unit: 'users',
                data_type: 'official',
                source: 'GSMA',
                source_url: url
            });
        }
    } catch (e) {
        console.error("GSMA extraction error:", e.message);
        return [];
    }
    
    return results;
}

module.exports = { extract };
