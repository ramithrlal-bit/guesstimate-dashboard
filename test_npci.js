const { extractNPCI } = require('./api/connectors/npci');

async function testNPCI() {
  console.log("Running NPCI Connector Test...");
  const result = await extractNPCI();
  console.log(JSON.stringify(result, null, 2));
}

testNPCI();
