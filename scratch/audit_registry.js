const registry = require('../lib/core/registry.js');
const qcKeys = Object.keys(registry.metrics || {}).filter(k => k.startsWith('quickcommerce_'));

for (const k of qcKeys.slice(0, 3)) {
    console.log(k, JSON.stringify(registry.metrics[k], null, 2));
}
