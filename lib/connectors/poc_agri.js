const { processIngestion } = require('../framework/ingestor');

async function extractPocAgri(isDryRun = false) {
    const config = {
        metric_id: 'agri_total_foodgrain_production',
        url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2132263',
        retrieverOptions: { mode: 'puppeteer' }, // Use puppeteer because PIB blocks bot fetches
        extractionRule: {
            type: 'regex',
            pattern: /Total Foodgrains–\s*([\d.]+)\s*LMT/,
            group: 1
        },
        unitConversion: 'LMT_to_MT', 
        data_type: 'official',
        period_label: '2024-25 (3rd Adv)', 
        period_end: '2025-12-31',
        formatDisplay: (val) => `~${Math.round(val)} MT`
    };
    
    return await processIngestion(config, isDryRun);
}

module.exports = { extractPocAgri };
