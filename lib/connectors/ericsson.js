const fetch = require('node-fetch');

async function extract() {
    const url = 'https://www.ericsson.com/en/reports-and-papers/mobility-report/dataforecasts';
    
    let text = '';
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        if (response.ok) {
            text = await response.text();
        } else {
            console.error(`Ericsson API failed with status ${response.status}`);
            return [];
        }
    } catch (e) {
        console.error("Ericsson extraction error via fetch:", e.message);
        return [];
    }

    const results = [];
    if (!text || typeof text !== 'string') {
        return results;
    }
    
    // Look for 5G subscriptions
    const match = text.match(/5G\s+subscriptions.*?([\d\.]+)\s*million/i);
    if (match && match[1]) {
        const val = parseFloat(match[1]);
        if (!isNaN(val) && val > 0) {
            results.push({
                metric_id: 'digital_5g_users',
                period_label: 'End 2025',
                period_end: '2025-12-31',
                value: val * 1000000,
                display_value: `~${match[1]}M`,
                unit: 'subscriptions',
                data_type: 'official',
                source: 'Ericsson Mobility Report',
                source_url: url
            });
        }
    }

    return results;
}

module.exports = { extract };
