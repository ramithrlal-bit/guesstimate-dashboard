const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function extract() {
    const url = 'https://www.counterpointresearch.com/insights/india-smartphone-share/';
    const results = [];
    
    try {
        let response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        let text = '';
        if (response.ok) {
            const rawHtml = await response.text();
            text = cheerio.load(rawHtml)('body').text().replace(/\s+/g, ' ');
        }
        
        let smartphoneMatch = text.match(/([\d\.]+)\s*million.*?smartphone.*?(?:installed base|users)/i);
        
        if (!smartphoneMatch) {
            const fallbackUrl = 'https://www.counterpointresearch.com/insight/india-smartphone-shipments-decline-5-qoq-5g-smartphone-installed-base-crosses-50-million';
            response = await fetch(fallbackUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            if (response.ok) {
                const rawHtml = await response.text();
                text = cheerio.load(rawHtml)('body').text().replace(/\s+/g, ' ');
                smartphoneMatch = text.match(/(?:smartphone installed base crossed|installed base of smartphone).*?([\d\.]+)\s*million/i) || text.match(/([\d\.]+)\s*million.*?smartphone.*?installed base/i);
            }
        }

        if (smartphoneMatch) {
            results.push({
                metric_id: 'digital_smartphone_users',
                period_label: '2022',
                period_end: '2022-06-30',
                value: parseFloat(smartphoneMatch[1]) * 1000000,
                display_value: `~${smartphoneMatch[1]}M`,
                unit: 'users',
                data_type: 'estimate',
                source: 'Counterpoint',
                source_url: 'https://www.counterpointresearch.com/'
            });
        }

        const featureMatch = text.match(/([\d\.]+)\s*million.*?feature\s*phone/i);
        if (featureMatch) {
            results.push({
                metric_id: 'digital_feature_phone_users',
                period_label: '2022',
                period_end: '2022-06-30',
                value: parseFloat(featureMatch[1]) * 1000000,
                display_value: `~${featureMatch[1]}M`,
                unit: 'users',
                data_type: 'estimate',
                source: 'Counterpoint',
                source_url: 'https://www.counterpointresearch.com/'
            });
        }

    } catch (e) {
        console.error("Counterpoint extraction error:", e.message);
    }
    
    return results;
}

module.exports = { extract };
