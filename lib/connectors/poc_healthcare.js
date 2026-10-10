const { processIngestion } = require('../framework/ingestor');

async function extractPocHealthcare(isDryRun = false) {
    const config = {
        metric_id: 'healthcare_govt_expenditure_share',
        url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2058791',
        retrieverOptions: { mode: 'puppeteer' },
        extractionRule: {
            type: 'regex',
            pattern: /Share of Government Health Expenditure in Total Health Expenditure increases from [\d.]+%\s*\([\d-]+\)\s*to ([\d.]+)%\s*\(2021-22\)/,
            group: 1
        },
        unitConversion: null, 
        data_type: 'official',
        period_label: '2021-22', 
        period_end: '2025-12-31',
        formatDisplay: (val) => `${val}%`
    };
    
    return await processIngestion(config, isDryRun);
}

module.exports = { extractPocHealthcare };
