const fs = require('fs');
const pdfParse = require('pdf-parse');

async function testFetch() {
  const url = 'https://www.indiadigitalsummit.in/wp-content/uploads/2026/01/Internet-in-India-2025-Press-Release-Final.pdf';
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log('Status:', res.status);
    if (!res.ok) {
        // try alternative url
        const altUrl = 'https://www.indiadigitalsummit.in/wp-content/uploads/2025/01/Internet-in-India-2024-Press-Release-Final.pdf';
        console.log(`Trying alt url: ${altUrl}`);
        const res2 = await fetch(altUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });
        console.log('Alt Status:', res2.status);
        if (res2.ok) {
            const buffer = Buffer.from(await res2.arrayBuffer());
            const data = await pdfParse(buffer);
            console.log(data.text.substring(0, 1000));
        }
        return;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const data = await pdfParse(buffer);
    console.log(data.text.substring(0, 2000));
  } catch (e) {
    console.error('Error:', e);
  }
}

testFetch();
