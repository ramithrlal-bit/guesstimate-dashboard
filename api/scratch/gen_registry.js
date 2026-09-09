const fs = require('fs');
const path = require('path');
const newMetrics = JSON.parse(fs.readFileSync('api/scratch/new_metrics.json', 'utf-8'));

const categories = {
  general: 'LIVE_PRIMARY',
  population: 'LIVE_PRIMARY',
  digital: 'LIVE_RESEARCH',
  fintech: 'LIVE_PRIMARY',
  ecommerce: 'LIVE_RESEARCH',
  quickcommerce: 'LIVE_COMPANY', // lots of company specific metrics
  ev: 'LIVE_PRIMARY',
  edtech: 'LIVE_RESEARCH',
  healthcare: 'LIVE_PRIMARY',
  economy: 'LIVE_PRIMARY',
  global: 'LIVE_PRIMARY'
};

let output = '';
for (const key of Object.keys(newMetrics)) {
  const metric = newMetrics[key];
  let cat = categories[metric.section] || 'LIVE_RESEARCH';
  if (key.includes('cagr') || key.includes('projected') || key.includes('est')) {
    cat = 'LIVE_RESEARCH';
  }
  if (key.includes('market_size')) {
    cat = 'LIVE_RESEARCH';
  }

  // Assign a placeholder domain based on category
  let domain = 'example.com';
  if (cat === 'LIVE_PRIMARY') domain = 'data.gov.in';
  if (cat === 'LIVE_RESEARCH') domain = 'statista.com';
  if (cat === 'LIVE_COMPANY') domain = 'company-ir.com';

  output += `    '${key}': {
      approved_domain: '${domain}',
      extraction_method: '${cat}',
      expected_unit: 'variable',
      min_value: 0,
      max_value: 1000000000000
    },
`;
}
fs.writeFileSync('api/scratch/registry_append.txt', output);
console.log('Generated registry append to api/scratch/registry_append.txt');
