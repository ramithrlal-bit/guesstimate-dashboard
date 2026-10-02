const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function run() {
    const r = await fetch('https://datareportal.com/reports/digital-2026-india');
    const text = await r.text();
    const $ = cheerio.load(text);
    const body = $('body').text().replace(/\s+/g, ' ');
    
    // total social media user identities
    const ts = body.match(/([\d\.]+)\s*million\s+social\s+media\s+user\s+identities/i);
    console.log('Total Social:', ts ? ts[1] : 'NOT FOUND');
    
    // YouTube
    const yt = body.match(/YouTube\s+had\s+([\d\.]+)\s*million/i);
    console.log('YouTube:', yt ? yt[1] : 'NOT FOUND');

    // Instagram
    const ig = body.match(/Instagram\s+had\s+([\d\.]+)\s*million/i);
    console.log('Instagram:', ig ? ig[1] : 'NOT FOUND');

    // Facebook
    const fb = body.match(/Facebook\s+had\s+([\d\.]+)\s*million/i);
    console.log('Facebook:', fb ? fb[1] : 'NOT FOUND');

    // LinkedIn
    const li = body.match(/LinkedIn\s+had\s+([\d\.]+)\s*million/i);
    console.log('LinkedIn:', li ? li[1] : 'NOT FOUND');

    // Snapchat
    const sc = body.match(/Snapchat\s+had\s+([\d\.]+)\s*million/i);
    console.log('Snapchat:', sc ? sc[1] : 'NOT FOUND');

    // X
    const x = body.match(/X\s+had\s+([\d\.]+)\s*million/i);
    console.log('X:', x ? x[1] : 'NOT FOUND');
}
run();
