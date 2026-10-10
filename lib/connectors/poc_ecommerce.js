const { processIngestion } = require('../framework/ingestor');

async function extractPocEcommerce(isDryRun = false) {
    const config = {
        metric_id: 'ecommerce_e_commerce_market_size_2025',
        url: 'https://www.bain.com/insights/how-india-shops-online/',
        retrieverOptions: { mode: 'puppeteer' },
        extractionRule: {
            type: 'regex',
            pattern: /The \$([\d]+) billion Indian retail market/,
            group: 1
        },
        unitConversion: null, 
        data_type: 'estimate',
        period_label: 'Bain Report', 
        period_end: '2025-12-31',
        formatDisplay: (val) => `~$${val}B`
    };
    
    return await processIngestion(config, isDryRun);
}

module.exports = { extractPocEcommerce };
