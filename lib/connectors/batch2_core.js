const fetch = require('node-fetch');
const { validateValue } = require('../framework/validator');
const { persistObservation } = require('../core/persister');

/**
 * Batch 2 Core Connectors:
 * 1. global_world_internet_users (World Bank WLD IT.NET.USER.ZS * SP.POP.TOTL)
 * 2. global_india_s_share_of_world_population (World Bank IND / WLD Population Ratio)
 * 3. agri_rice_production (PIB Press Release 2132263 3rd Advance Estimates)
 * 4. global_india_s_share_of_world_gdp (World Bank IND / WLD GDP Ratio)
 */

async function fetchJson(url) {
    const res = await fetch(url, {
        headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText} from ${url}`);
    return await res.json();
}

async function fetchText(url) {
    const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText} from ${url}`);
    return await res.text();
}

async function extractWorldInternetUsers() {
    const netJson = await fetchJson('https://api.worldbank.org/v2/country/WLD/indicator/IT.NET.USER.ZS?format=json&mrnev=1');
    const popJson = await fetchJson('https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?format=json&mrnev=1');

    const netRate = netJson[1]?.[0]?.value;
    const netPeriod = netJson[1]?.[0]?.date;
    const worldPop = popJson[1]?.[0]?.value;

    if (netRate === undefined || netRate === null || !worldPop) {
        throw new Error('Failed to extract world internet rate or world population from World Bank.');
    }

    const users = Math.round((netRate / 100) * worldPop);
    const metric_id = 'global_world_internet_users';
    const source_url = 'https://api.worldbank.org/v2/country/WLD/indicator/IT.NET.USER.ZS';

    validateValue(metric_id, users, source_url);

    return {
        metric_id,
        value: users,
        display_value: `~${(users / 1e9).toFixed(1)}B`,
        period_label: String(netPeriod),
        period_start: `${netPeriod}-01-01`,
        period_end: `${netPeriod}-12-31`,
        source_url,
        data_type: 'official'
    };
}

async function extractIndiaShareOfWorldPopulation() {
    const indPopJson = await fetchJson('https://api.worldbank.org/v2/country/IND/indicator/SP.POP.TOTL?format=json&mrnev=1');
    const wldPopJson = await fetchJson('https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?format=json&mrnev=1');

    const indPop = indPopJson[1]?.[0]?.value;
    const wldPop = wldPopJson[1]?.[0]?.value;
    const period = indPopJson[1]?.[0]?.date;

    if (!indPop || !wldPop) {
        throw new Error('Failed to extract India or World population from World Bank.');
    }

    const sharePct = Math.round(((indPop / wldPop) * 100) * 100) / 100;
    const metric_id = 'global_india_s_share_of_world_population';
    const source_url = 'https://api.worldbank.org/v2/country/IND/indicator/SP.POP.TOTL';

    validateValue(metric_id, sharePct, source_url);

    return {
        metric_id,
        value: sharePct,
        display_value: `~${sharePct.toFixed(1)}%`,
        period_label: String(period),
        period_start: `${period}-01-01`,
        period_end: `${period}-12-31`,
        source_url,
        data_type: 'official'
    };
}

async function extractAgriRiceProduction() {
    const url = 'https://pib.gov.in/PressReleasePage.aspx?PRID=2132263';
    const html = await fetchText(url);

    const match = html.match(/Rice\s*[–-]\s*([\d.]+)\s*LMT/i);
    if (!match || !match[1]) {
        throw new Error('Regex failed to match Rice production in PIB press release.');
    }

    const lmt = parseFloat(match[1]);
    const mt = Math.round((lmt / 10) * 100) / 100; // 1 LMT = 0.1 MT
    const metric_id = 'agri_rice_production';

    validateValue(metric_id, mt, url);

    return {
        metric_id,
        value: mt,
        display_value: `~${mt.toFixed(1)} MT`,
        period_label: '2024-25 (3rd Adv)',
        period_start: '2024-04-01',
        period_end: '2025-03-31',
        source_url: url,
        data_type: 'official'
    };
}

async function extractIndiaShareOfWorldGdp() {
    const indGdpJson = await fetchJson('https://api.worldbank.org/v2/country/IND/indicator/NY.GDP.MKTP.CD?format=json&mrnev=1');
    const wldGdpJson = await fetchJson('https://api.worldbank.org/v2/country/WLD/indicator/NY.GDP.MKTP.CD?format=json&mrnev=1');

    const indGdp = indGdpJson[1]?.[0]?.value;
    const wldGdp = wldGdpJson[1]?.[0]?.value;
    const period = indGdpJson[1]?.[0]?.date;

    if (!indGdp || !wldGdp) {
        throw new Error('Failed to extract India or World GDP from World Bank.');
    }

    const sharePct = Math.round(((indGdp / wldGdp) * 100) * 100) / 100;
    const metric_id = 'global_india_s_share_of_world_gdp';
    const source_url = 'https://api.worldbank.org/v2/country/IND/indicator/NY.GDP.MKTP.CD';

    validateValue(metric_id, sharePct, source_url);

    return {
        metric_id,
        value: sharePct,
        display_value: `~${sharePct.toFixed(1)}%`,
        period_label: String(period),
        period_start: `${period}-01-01`,
        period_end: `${period}-12-31`,
        source_url,
        data_type: 'official'
    };
}

const EXTRACTORS = [
    { name: 'global_world_internet_users', fn: extractWorldInternetUsers },
    { name: 'global_india_s_share_of_world_population', fn: extractIndiaShareOfWorldPopulation },
    { name: 'agri_rice_production', fn: extractAgriRiceProduction },
    { name: 'global_india_s_share_of_world_gdp', fn: extractIndiaShareOfWorldGdp }
];

async function extractBatch2Core(isDryRun = false) {
    const results = [];
    const saveObservation = isDryRun
        ? async (obs) => ({ status: 'dry_run', observation: obs })
        : persistObservation;

    for (const item of EXTRACTORS) {
        try {
            console.log(`[Batch 2] Extracting ${item.name}...`);
            const obs = await item.fn();
            const persistRes = await saveObservation(obs);
            results.push({ metric_id: item.name, success: true, status: persistRes.status, data: obs });
        } catch (e) {
            console.error(`[Batch 2] Error extracting ${item.name}:`, e.message);
            results.push({ metric_id: item.name, success: false, error: e.message });
        }
    }
    return results;
}

module.exports = {
    extractBatch2Core,
    extractWorldInternetUsers,
    extractIndiaShareOfWorldPopulation,
    extractAgriRiceProduction,
    extractIndiaShareOfWorldGdp,
    EXTRACTORS
};
