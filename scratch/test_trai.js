const cheerio = require('cheerio');
const pdfParse = require('pdf-parse');

async function testTrai() {
    console.log("Fetching TRAI reports page...");
    const res = await fetch("https://www.trai.gov.in/release-publication/reports/telecom-subscriptions-reports");
    const html = await res.text();
    const $ = cheerio.load(html);

    let pdfUrl = null;
    let reportTitle = null;

    // Looking for the first PDF link in the table/list of reports
    $('a').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();
        if (href && href.includes('.pdf') && text.toLowerCase().includes('telecom subscription')) {
            pdfUrl = href;
            reportTitle = text;
            return false; // break
        }
    });

    if (!pdfUrl) {
        // Try fallback logic if text didn't include "telecom subscription"
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.includes('.pdf') && href.toLowerCase().includes('subscription')) {
                pdfUrl = href;
                reportTitle = $(el).text().trim();
                return false; // break
            }
        });
    }

    if (!pdfUrl) {
        // Generic fallback to the first PDF in the content area
        const link = $('.views-field-title a').first();
        if(link.length > 0) {
           reportTitle = link.text().trim();
           // Follow the link or see if it has a PDF
           console.log("Found title link:", link.attr('href'));
        }

        const pdfLink = $('.views-field-php a').first();
        if(pdfLink.length > 0) {
            pdfUrl = pdfLink.attr('href');
        }
    }

    if (!pdfUrl) {
        console.error("FAIL: Could not find PDF URL on page.");
        return;
    }

    if (!pdfUrl.startsWith('http')) {
        pdfUrl = "https://www.trai.gov.in" + pdfUrl;
    }

    console.log("Found PDF URL:", pdfUrl);
    console.log("Report Title:", reportTitle);

    console.log("Downloading PDF...");
    const pdfRes = await fetch(pdfUrl);
    const pdfBuffer = await pdfRes.arrayBuffer();

    const pdfParse = require('pdf-parse');
    const data = await pdfParse(Buffer.from(pdfBuffer));
    
    // Dump first 3000 characters of the text for inspection
    console.log("Extracted text (start):");
    console.log(data.text.substring(0, 3000));
}

testTrai().catch(console.error);
