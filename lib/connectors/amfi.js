const https = require('https');
const xlsx = require('xlsx');

function fetchXls(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchXls(new URL(res.headers.location, url).toString()).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to fetch ${url}, status: ${res.statusCode}`));
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject);
    });
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonths = { Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April', May: 'May', Jun: 'June', Jul: 'July', Aug: 'August', Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December' };

async function findLatestReport() {
    const now = new Date();
    let year = now.getFullYear();
    let monthIdx = now.getMonth();

    for (let i = 0; i < 6; i++) {
        const monthStr = months[monthIdx];
        const url = `https://portal.amfiindia.com/spages/am${monthStr}${year}repo.xls`;
        
        try {
            const buffer = await fetchXls(url);
            return { buffer, url, monthStr, year, monthIdx };
        } catch (e) {
            // Probably 404, try previous month
            monthIdx--;
            if (monthIdx < 0) {
                monthIdx = 11;
                year--;
            }
        }
    }
    throw new Error("Could not find any recent AMFI report within the last 6 months.");
}

async function extract() {
    try {
        const { buffer, url, monthStr, year, monthIdx } = await findLatestReport();
        
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames.find(name => name.toUpperCase().includes('MCR') || name.includes('MCR'));
        
        if (!sheetName) {
            throw new Error("Could not find MCR sheet in the AMFI Excel file.");
        }
        
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        
        let aumValue = null;
        for (let row of data) {
            if (row && row[1] && row[1].toString().trim() === 'Grand Total') {
                aumValue = parseFloat(row[7]);
                break;
            }
        }

        if (aumValue === null || isNaN(aumValue)) {
            throw new Error("Could not extract AUM value from the AMFI Excel file.");
        }

        const lastDay = new Date(year, monthIdx + 1, 0).getDate();
        const periodEnd = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
        const periodLabel = `${fullMonths[monthStr]} ${year}`;

        return {
            metric_id: 'amfi_total_aum_cr',
            period_label: periodLabel,
            period_end: periodEnd,
            value: aumValue,
            display_value: `${aumValue.toLocaleString('en-IN')} Cr`,
            unit: 'INR Crore',
            data_type: 'official',
            verification_status: 'verified',
            source: 'Association of Mutual Funds in India (AMFI)',
            source_url: url,
            notes: 'Grand Total of Net Assets Under Management for all Mutual Funds in India'
        };
    } catch (e) {
        console.error("AMFI extraction error:", e.message);
        throw e;
    }
}

module.exports = { extract };
