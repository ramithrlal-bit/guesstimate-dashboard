const fetch = require('node-fetch');
const cheerio = require('cheerio');
const https = require('https');

async function inspect() {
    try {
        const agent = new https.Agent({
          rejectUnauthorized: false
        });
        const response = await fetch('https://analytics.parivahan.gov.in/analytics/resources/js/analytics/public/vahan/fueltypedonutchart.js', { agent });
        const text = await response.text();
        console.log("Status:", response.status);
        console.log("JS Content:");
        console.log(text.substring(0, 2000));
    } catch (e) {
        console.error(e);
    }
}

inspect();
