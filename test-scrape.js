const pdf = require('pdf-parse');
const cheerio = require('cheerio');

async function testPdf(url, name) {
    try {
        console.log(`\n--- Fetching PDF: ${name} ---`);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();
        const data = await pdf(Buffer.from(buffer));
        console.log(`Length: ${data.text.length} chars`);
        
        // Custom extractions based on what we're looking for
        if (name === 'IAMAI') {
            const matches = data.text.match(/(\d+)\s+million\s+Active\s+Internet\s+Users/i);
            console.log('Match IAMAI Internet Users:', matches ? matches[1] : 'NOT FOUND');
            // Try broader search
            const usersContext = data.text.match(/.{0,50}958.{0,50}/g);
            console.log('Context for 958:', usersContext);
        } else if (name === 'FICCI-EY M&E') {
            const matches = data.text.match(/(\d+)\s*M.*Paid video subscriptions/i);
            console.log('Match Paid video:', matches ? matches[1] : 'NOT FOUND');
            const usersContext = data.text.match(/.{0,50}216.{0,50}/g);
            console.log('Context for 216:', usersContext);
        } else if (name === 'EY Gaming') {
            const usersContext = data.text.match(/.{0,50}488.{0,50}/g);
            console.log('Context for 488:', usersContext);
            const usersContext2 = data.text.match(/.{0,50}517.{0,50}/g);
            console.log('Context for 517:', usersContext2);
        }

    } catch(err) {
        console.error(`Error for ${name}:`, err.message);
    }
}

async function testHtml(url, name) {
    try {
        console.log(`\n--- Fetching HTML: ${name} ---`);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        const $ = cheerio.load(html);
        const text = $('body').text().replace(/\s+/g, ' ');
        
        if (name === 'DataReportal') {
            const context = text.match(/.{0,100}500M.{0,100}/g) || text.match(/.{0,100}500 million.{0,100}/g) || text.match(/.{0,100}403.{0,100}/g);
            console.log('Context for DataReportal:', context);
        } else if (name === 'Counterpoint') {
            const context = text.match(/.{0,100}installed base.{0,100}/gi) || [];
            console.log('Counterpoint Snippet:', context.slice(0, 3));
        } else if (name === 'Ericsson Mobility') {
            const context = text.match(/.{0,100}430 million.{0,100}/g) || text.match(/.{0,100}1\.1 billion.{0,100}/g) || text.match(/.{0,100}37 GB.{0,100}/g);
            console.log('Ericsson context:', context);
        }
    } catch(err) {
        console.error(`Error for ${name}:`, err.message);
    }
}

async function run() {
    await testPdf('https://www.indiadigitalsummit.in/wp-content/uploads/2026/01/Internet-in-India-2025-Press-Release-Final.pdf', 'IAMAI');
    await testHtml('https://datareportal.com/reports/digital-2026-india', 'DataReportal');
    await testHtml('https://counterpointresearch.com/en/reports/india-smartphone-installed-base-and-replacement-cycle-by-brand-by-price-band', 'Counterpoint');
    await testHtml('https://www.ericsson.com/en/press-releases/2/2026/ericsson-mobility-report-indias-5g-subscriptions-to-reach-1-1-billion-by-2031', 'Ericsson Mobility');
    await testHtml('https://www.ericsson.com/en/reports-and-papers/mobility-report/key-figures', 'Ericsson Key Figures');
    await testPdf('https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/newsroom/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf', 'FICCI-EY M&E');
    await testPdf('https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/pdf/2025/ey-a-studio-called-india-content-and-media-services-for-the-world.pdf', 'EY Gaming');
}

run();
