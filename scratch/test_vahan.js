const { extract } = require('../lib/connectors/vahan');

async function run() {
    try {
        console.log("Running VAHAN extractor...");
        const result = await extract();
        console.log("Result:", result);
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
