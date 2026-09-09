require('dotenv').config();
const { extract } = require('../api/connectors/vahan');
const { persistObservation } = require('../api/core/persister');

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
