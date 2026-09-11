require('dotenv').config({ path: '../.env' });
const { extract } = require('../lib/connectors/aai');
const { persistObservation } = require('../lib/core/persister');

async function run() {
    try {
        console.log("Starting AAI Connector Test...");
        const data = await extract();
        console.log("Extraction successful:");
        console.log(data);

        console.log("\nPersisting to Supabase...");
        const persistRes = await persistObservation(data);
        console.log("Persist result:");
        console.log(persistRes);

        console.log("\nVerifying Duplicate Prevention (Running Persist Again)...");
        const persistRes2 = await persistObservation(data);
        console.log("Persist 2 result (Should be unchanged):");
        console.log(persistRes2);

    } catch (e) {
        console.error("Test failed:", e);
    }
}

run();
