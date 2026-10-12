const fetch = require('node-fetch');
const cheerio = require('cheerio');
const pdf = require('pdf-parse');

async function extract() {
    const results = [];
    
    // 1. Extract OTT Subscribers
    const url1 = 'https://www.ey.com/en_in/newsroom/2026/03/india-s-media-and-entertainment-sector-grew-9-percent-to-inr-2-point-78-trillion-in-2025-driven-by-digital-and-live-experiences-ficci-ey-report';
    try {
        const res1 = await fetch(url1, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (res1.ok) {
            const rawHtml = await res1.text();
            const text1 = cheerio.load(rawHtml)('body').text().replace(/\s+/g, ' ');
            const ottMatch = text1.match(/([\d\.]+)\s*million\s+paid\s+video\s+subscriptions/i) || text1.match(/paid\s+video\s+subscriptions.*?([\d\.]+)\s*million/i);
            
            if (ottMatch) {
                results.push({
                    metric_id: 'digital_ott_subscribers',
                    period_label: '2025',
                    period_end: '2025-12-31',
                    value: parseFloat(ottMatch[1]) * 1000000,
                    display_value: `~${ottMatch[1]}M`,
                    unit: 'subscriptions',
                    data_type: 'official',
                    source: 'FICCI-EY',
                    source_url: url1
                });
            }
        }
    } catch (e) {
        console.error("EY newsroom extraction error:", e.message);
    }

    // 2. Extract Gaming Users from PDF
    const url2 = 'https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/pdf/2025/ey-a-studio-called-india-content-and-media-services-for-the-world.pdf';
    try {
        const res2 = await fetch(url2, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (res2.ok) {
            const buffer = Buffer.from(await res2.arrayBuffer());
            const data = await pdf(buffer);
            const text2 = (data && data.text) ? data.text.replace(/\s+/g, ' ') : '';
            const gamerMatch = text2.match(/([\d\.]+)\s*million.*?online gamers/i) || text2.match(/online gamers.*?([\d\.]+)\s*(?:million|mn)/i);
            const match2025e = text2.match(/(?:2025E|online\s+gamers).*?([\d\.]+)\s*(?:million|mn)/i);
            
            let finalValue = null;
            if (gamerMatch && gamerMatch[1]) {
                const parsed = parseFloat(gamerMatch[1]);
                if (!isNaN(parsed) && parsed > 0) {
                    finalValue = parsed;
                }
            } else if (match2025e && match2025e[1]) {
                const parsed = parseFloat(match2025e[1]);
                if (!isNaN(parsed) && parsed > 0) {
                    finalValue = parsed;
                }
            }
            
            if (finalValue !== null) {
                results.push({
                    metric_id: 'digital_mobile_gaming_users',
                    period_label: '2025E',
                    period_end: '2025-12-31',
                    value: finalValue * 1000000,
                    display_value: `~${finalValue}M`,
                    unit: 'users',
                    data_type: 'estimate',
                    source: 'FICCI-EY',
                    source_url: url2
                });
            }
        } else {
            console.error(`EY PDF fetch failed with status ${res2.status}`);
        }
    } catch (e) {
        console.error("EY PDF extraction error:", e.message);
    }

    return results;
}

module.exports = { extract };
