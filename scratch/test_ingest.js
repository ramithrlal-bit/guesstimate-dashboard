require('dotenv').config();
const ingest = require('../api/cron/ingest');

async function testIngest() {
  process.env.CRON_SECRET = process.env.CRON_SECRET || 'test_secret';
  
  const req = {
    headers: {
      authorization: `Bearer ${process.env.CRON_SECRET}`
    }
  };
  
  const res = {
    statusCode: null,
    jsonData: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonData = data;
      return this;
    }
  };

  console.log('Testing /api/cron/ingest endpoint locally...');
  await ingest(req, res);

  console.log('--- TEST RESULTS ---');
  console.log('Status Code:', res.statusCode);
  console.log('Response Body:', JSON.stringify(res.jsonData, null, 2));
}

testIngest().catch(console.error);
