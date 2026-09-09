const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

async function discover() {
  const url = 'https://www.trai.gov.in/release-publication/reports/telecom-subscriptions-reports';
  console.log('Fetching', url);
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.select ? cheerio.load(html) : cheerio.load(html); // Fallback for diff cheerio versions

  // Finding the first report row
  // Assuming it's in a table or list
  const reports = [];
  $('a').each((i, el) => {
    const text = $(el).text().trim();
    const href = $(el).attr('href');
    if (text && href && (text.includes('Telecom Subscription Data') || text.includes('Telecom Subscription'))) {
      reports.push({ text, href });
    }
  });
  
  console.log('Found report links:');
  console.log(reports.slice(0, 5));

  // The TRAI site usually has a specific class or structure for the releases.
  // Let's print out text of some views-field title if it exists
  const viewsTitles = [];
  $('.views-field-title a').each((i, el) => {
    viewsTitles.push({
      text: $(el).text().trim(),
      href: $(el).attr('href')
    });
  });
  console.log('\nViews Titles:');
  console.log(viewsTitles.slice(0, 5));
}

discover().catch(console.error);
