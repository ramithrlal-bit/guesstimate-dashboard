const npci = require('../lib/connectors/npci');
const fetch = require('node-fetch');

// Override fetch in the module cache isn't super easy without proxyquire, 
// let's just override global fetch or module fetch
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function() {
    if (arguments[0] === 'node-fetch') {
        return async (url) => ({
            ok: true,
            status: 200,
            json: async () => ([
                {
                    "id": 5224,
                    "month": "June-2026",
                    "volume_in_mn": "22,000.00",
                    "value_in_cr": "28,00,000.00"
                },
                {
                    "id": 5225,
                    "month": "July-2026",
                    "no_of_banks_live_on_upi": "741",
                    "volume_in_mn": "23,658.35",
                    "value_in_cr": "29,87,880.49",
                    "product_name": "upi",
                    "tab_name": "product-statistics-upi",
                    "locale": "en"
                }
            ])
        });
    }
    return originalRequire.apply(this, arguments);
};

// Now re-require to apply the mock
delete require.cache[require.resolve('../lib/connectors/npci')];
const npciMocked = require('../lib/connectors/npci');

async function run() {
    const res = await npciMocked.extractNPCI();
    console.log(JSON.stringify(res, null, 2));
}

run();
