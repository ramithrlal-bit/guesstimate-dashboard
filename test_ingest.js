const ingest = require('./api/cron/ingest');

const req = {
  headers: {
    authorization: 'Bearer secret'
  }
};
process.env.CRON_SECRET = 'secret';

const res = {
  status: function(code) {
    return {
      json: function(data) {
        console.log(`Status: ${code}`);
        console.log(JSON.stringify(data, null, 2));
      }
    };
  }
};

ingest(req, res).catch(console.error);
