require('dotenv').config();
const { extract } = require('../lib/connectors/vahan');
const { persistObservation } = require('../lib/core/persister');

async function testVahanIngest() {
    console.log("Starting VAHAN ingest test...");
    try {
        const vahanData = await extract();
        console.log("Extracted Data:", vahanData);
        
        const persistRes = await persistObservation(vahanData);
        console.log("Persist Result:", persistRes);
    } catch (e) {
        console.error("Test failed:", e);
    }
}

testVahanIngest();
