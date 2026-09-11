const https = require('https');
const pdf = require('pdf-parse');

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // Handle redirect if any, but aai.aero might just be direct
                return fetchHtml(new URL(res.headers.location, url).toString()).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function fetchPdf(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchPdf(new URL(res.headers.location, url).toString()).then(resolve).catch(reject);
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject);
    });
}

async function extract() {
    try {
        const pageUrl = 'https://www.aai.aero/en/business-opportunities/aai-traffic-news';
        const html = await fetchHtml(pageUrl);

        // Find the latest TR pdf link
        // AAI links look like https://www.aai.aero/sites/default/files/traffic-news/TRjul2k26.pdf
        const match = html.match(/href="(https:\/\/www\.aai\.aero)?(\/sites\/default\/files\/traffic-news\/TR[a-zA-Z0-9_-]+\.pdf)"/i);
        if (!match) {
            throw new Error("Could not find AAI Traffic News PDF link on the page.");
        }
        const pdfPath = match[2]; // match[2] will be the relative path starting with /sites...
        const pdfUrl = 'https://www.aai.aero' + pdfPath;

        const pdfBuffer = await fetchPdf(pdfUrl);
        const data = await pdf(pdfBuffer);
        const lines = data.text.split('\n');

        let domesticValue = null;
        let passengersSection = false;
        let reportMonth = null;
        let reportYear = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            // Try to find the report month/year
            if (!reportMonth && line.toUpperCase().includes('AIR TRAFFIC REPORT')) {
                const titleMatch = line.match(/AIR TRAFFIC REPORT\s*[-–]\s*([A-Z]+)[,\s]*(\d{4})/i);
                if (titleMatch) {
                    reportMonth = titleMatch[1];
                    reportYear = titleMatch[2];
                }
            }

            if (line.includes('Passengers (in million)')) {
                passengersSection = true;
            }
            if (passengersSection && line.includes('Domestic')) {
                // Next line usually contains the numbers
                const dataLine = lines[i+1].trim();
                const numMatch = dataLine.match(/^([\d\.]+)\s+([\d\.]+)\s+([-\d\.]+)$/);
                if (numMatch) {
                    domesticValue = parseFloat(numMatch[1]);
                    break;
                }
            }
        }

        if (domesticValue === null) {
            throw new Error("Could not extract domestic passenger value from PDF.");
        }

        if (!reportMonth || !reportYear) {
            const fileMatch = pdfPath.match(/TR([a-z]{3})2k(\d{2})\.pdf/i);
            if (fileMatch) {
                const months = { jan: 'January', feb: 'February', mar: 'March', apr: 'April', may: 'May', jun: 'June', jul: 'July', aug: 'August', sep: 'September', oct: 'October', nov: 'November', dec: 'December' };
                reportMonth = months[fileMatch[1].toLowerCase()] || fileMatch[1];
                reportYear = '20' + fileMatch[2];
            } else {
                throw new Error("Could not determine report month/year from PDF.");
            }
        } else {
            // Capitalize month properly
            reportMonth = reportMonth.charAt(0).toUpperCase() + reportMonth.slice(1).toLowerCase();
        }

        // Calculate period_end
        const monthIndex = new Date(`${reportMonth} 1, 2000`).getMonth(); // 0-11
        const yearInt = parseInt(reportYear, 10);
        // last day of the month
        const lastDay = new Date(yearInt, monthIndex + 1, 0).getDate();
        const periodEnd = `${yearInt}-${String(monthIndex + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
        const periodLabel = `${reportMonth} ${reportYear}`;

        return {
            metric_id: 'aai_domestic_passengers',
            period_label: periodLabel,
            period_end: periodEnd,
            value: domesticValue,
            display_value: `${domesticValue.toFixed(2)} million`,
            unit: 'millions',
            data_type: 'official',
            verification_status: 'verified',
            source: 'Airports Authority of India (AAI)',
            source_url: pdfUrl,
            notes: 'Domestic passenger traffic handled at Indian airports'
        };

    } catch (e) {
        console.error("AAI extraction error:", e.message);
        throw e;
    }
}

module.exports = { extract };
