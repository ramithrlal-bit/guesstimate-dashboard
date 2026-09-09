require('dotenv').config({ path: ['.env.local', '.env'] });
process.env.CRON_SECRET = 'test';

const handler = require('../api/cron/ingest');

const req = {
  headers: {
    authorization: `Bearer ${process.env.CRON_SECRET}`
  }
};

const res = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log("Status:", this.statusCode);
    console.log("Response:", JSON.stringify(data, null, 2));
  }
};

console.log("Testing Vercel Cron Endpoint locally...");
handler(req, res).catch(console.error);
