const fs = require('fs');

const metricsData = JSON.parse(fs.readFileSync('api/scratch/new_metrics.json', 'utf8'));
const registryPath = 'api/core/registry.js';
let registryContent = fs.readFileSync(registryPath, 'utf8');

// Use a simple regex to find the end of the metrics object
const insertIdx = registryContent.lastIndexOf('}');
// Actually it's better to just require it, modify the object, and write it back, but let's just parse it.
const registry = require('../core/registry.js');

for (const [key, val] of Object.entries(metricsData)) {
    if (registry.metrics[key]) continue; // skip existing

    let classification = 'LIVE_RESEARCH'; // fallback
    const sec = val.section;
    if (sec === 'population' || sec === 'general' || key.includes('govt')) classification = 'LIVE_PRIMARY';
    if (sec === 'ecommerce' || sec === 'quickcommerce') classification = 'LIVE_COMPANY';
    if (sec === 'fintech' || sec === 'economy') classification = 'LIVE_PRIMARY';
    if (sec === 'ev') classification = 'LIVE_PRIMARY';
    if (sec === 'edtech' || sec === 'healthcare') classification = 'LIVE_RESEARCH';
    if (key.includes('growth') || key.includes('cagr') || key.includes('projected')) classification = 'CALCULATED';

    registry.metrics[key] = {
        approved_domain: 'unknown',
        extraction_method: classification,
        expected_unit: 'unknown',
        min_value: 0,
        max_value: 1000000000000
    };
}

const fileContent = `// api/core/registry.js
// Source Governance Registry
// Only metrics explicitly defined here, matching the exact domain, can be ingested.

module.exports = {
  metrics: ${JSON.stringify(registry.metrics, null, 4)}
};
`;

fs.writeFileSync(registryPath, fileContent);
console.log('Registry updated.');
