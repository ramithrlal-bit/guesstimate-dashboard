const fs = require('fs');
const path = require('path');
const registryPath = path.join(__dirname, '../lib/core/registry.js');
const registry = require(registryPath);
const qcKeys = Object.keys(registry.metrics || {}).filter(k => k.startsWith('quickcommerce_'));

for (const k of qcKeys) {
    const entry = registry.metrics[k];
    
    // Fix domain
    entry.approved_domain = null;
    
    // Fix bounds based on unit
    if (entry.expected_unit === '%') {
        entry.max_value = 500; // allow up to 500% YoY growth
    } else if (entry.expected_unit === '$') {
        entry.max_value = 100; // $100B
    } else if (entry.expected_unit === 'M') {
        entry.max_value = 1000; // 1000M users
    } else if (entry.expected_unit === 'min') {
        entry.max_value = 120; // 120 mins
    } else if (entry.expected_unit === 'Rs') {
        entry.max_value = 5000; // Rs 5000 AOV / Delivery cost
    } else if (entry.expected_unit === 'orders') {
        entry.max_value = 100; // 100 orders/month
    } else if (entry.expected_unit === 'sq ft') {
        entry.max_value = 10000; // 10k sq ft
    } else if (entry.expected_unit === 'SKUs') {
        entry.max_value = 10000; // 10k SKUs
    } else if (entry.expected_unit === 'stores') {
        entry.max_value = 5000; // 5000 stores
    } else if (entry.expected_unit === 'partners') {
        entry.max_value = 500000; // 500k partners
    } else if (entry.expected_unit === 'cities') {
        entry.max_value = 500; // 500 cities
    } else if (entry.expected_unit === 'text') {
        entry.min_value = null;
        entry.max_value = null;
    }
    
    // Keep backwards compatibility inside registry root
    registry[k] = entry;
}

const fileContent = '// lib/core/registry.js\n// Source Governance Registry\n// Only metrics explicitly defined here, matching the exact domain, can be ingested.\n\nmodule.exports = ' + JSON.stringify(registry, null, 4) + ';\n';
fs.writeFileSync(registryPath, fileContent);
console.log('Fixed registry bounds and domains.');
