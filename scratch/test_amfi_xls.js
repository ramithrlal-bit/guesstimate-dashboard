const https = require('https');
const xlsx = require('xlsx');

function fetchExcel(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject);
    });
}

async function run() {
    try {
        const url = 'https://portal.amfiindia.com/spages/amjul2026repo.xls';
        console.log(`Downloading ${url}...`);
        const buffer = await fetchExcel(url);
        console.log('Parsing Excel...');
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        
        console.log("Sheet names:", workbook.SheetNames);
        
        for (const sheetName of workbook.SheetNames) {
            console.log(`\n--- Sheet: ${sheetName} ---`);
            const sheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });
            // Print first 20 rows
            console.log(json.slice(0, 20));
        }
    } catch(e) {
        console.error(e);
    }
}
run();
