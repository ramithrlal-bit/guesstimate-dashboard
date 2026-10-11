const { processIngestion } = require('../framework/ingestor');

const BATCH1_CONFIGS = [
    {
        metric_id: 'global_population',
        url: 'https://api.worldbank.org/v2/country/USA/indicator/SP.POP.TOTL?format=json&mrnev=1',
        retrieverOptions: { mode: 'fetch', headers: { 'Accept': 'application/json' } },
        extractionRule: { type: 'json', arrayPath: '1', valuePath: 'value', periodPath: 'date' },
        unitConversion: null,
        formatDisplay: (val) => `~${Math.round(val / 1e6)}M`,
        data_type: 'official'
    },
    {
        metric_id: 'global_gdp',
        url: 'https://api.worldbank.org/v2/country/USA/indicator/NY.GDP.MKTP.CD?format=json&mrnev=1',
        retrieverOptions: { mode: 'fetch', headers: { 'Accept': 'application/json' } },
        extractionRule: { type: 'json', arrayPath: '1', valuePath: 'value', periodPath: 'date' },
        unitConversion: null,
        formatDisplay: (val) => `~$${(val / 1e12).toFixed(1)}T`,
        data_type: 'official'
    },
    {
        metric_id: 'global_internet_penetration',
        url: 'https://api.worldbank.org/v2/country/USA/indicator/IT.NET.USER.ZS?format=json&mrnev=1',
        retrieverOptions: { mode: 'fetch', headers: { 'Accept': 'application/json' } },
        extractionRule: { type: 'json', arrayPath: '1', valuePath: 'value', periodPath: 'date' },
        unitConversion: null,
        formatDisplay: (val) => `~${Math.round(val)}%`,
        data_type: 'official'
    },
    {
        metric_id: 'global_world_gdp',
        url: 'https://api.worldbank.org/v2/country/WLD/indicator/NY.GDP.MKTP.CD?format=json&mrnev=1',
        retrieverOptions: { mode: 'fetch', headers: { 'Accept': 'application/json' } },
        extractionRule: { type: 'json', arrayPath: '1', valuePath: 'value', periodPath: 'date' },
        unitConversion: null,
        formatDisplay: (val) => `~$${(val / 1e12).toFixed(1)}T`,
        data_type: 'official'
    },
    {
        metric_id: 'bonus_life_expectancy_at_birth',
        url: 'https://api.worldbank.org/v2/country/IND/indicator/SP.DYN.LE00.IN?format=json&mrnev=1',
        retrieverOptions: { mode: 'fetch', headers: { 'Accept': 'application/json' } },
        extractionRule: { type: 'json', arrayPath: '1', valuePath: 'value', periodPath: 'date' },
        unitConversion: null,
        formatDisplay: (val) => `~${val.toFixed(1)} yrs`,
        data_type: 'official'
    },
    {
        metric_id: 'global_annual_flight_passengers_worldwide',
        url: 'https://api.worldbank.org/v2/country/WLD/indicator/IS.AIR.PSGR?format=json&mrnev=1',
        retrieverOptions: { mode: 'fetch', headers: { 'Accept': 'application/json' } },
        extractionRule: { type: 'json', arrayPath: '1', valuePath: 'value', periodPath: 'date' },
        unitConversion: null,
        formatDisplay: (val) => `~${(val / 1e9).toFixed(2)}B`,
        data_type: 'official'
    }
];

async function extractBatch1Global(isDryRun = false) {
    const results = [];
    for (const config of BATCH1_CONFIGS) {
        const res = await processIngestion(config, isDryRun);
        results.push({ metric_id: config.metric_id, ...res });
    }
    return results;
}

module.exports = { extractBatch1Global, BATCH1_CONFIGS };
