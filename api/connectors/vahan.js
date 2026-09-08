const fetch = require('node-fetch');

async function extract() {
    const url = 'https://analytics.parivahan.gov.in/analytics/publicdashboard/vahandashboard/vahanyearwiseregistrationtrend?timePeriod=1&vehicleFuels=ELECTRIC(BOV)';

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`VAHAN API failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.labels || !data.data || data.labels.length === 0) {
            throw new Error('VAHAN API returned invalid JSON structure');
        }

        const currentYear = new Date().getFullYear();
        const completedYears = data.labels.filter(year => year < currentYear);
        if (completedYears.length === 0) {
            throw new Error('No completed years found in VAHAN data');
        }

        const maxCompletedYear = Math.max(...completedYears);
        const index = data.labels.indexOf(maxCompletedYear);
        const latestValue = data.data[index];

        return {
            metric_id: 'ev_sales_total',
            period_label: maxCompletedYear.toString(),
            period_end: `${maxCompletedYear}-12-31`, 
            value: latestValue, 
            unit: 'units',
            data_type: 'official',
            source: 'official VAHAN / Ministry of Road Transport & Highways',
            source_url: url
        };

    } catch (e) {
        console.error("VAHAN extraction error:", e.message);
        throw e;
    }
}

module.exports = { extract };
