const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '..', '..', 'index.html');
const registryPath = path.join(__dirname, '..', 'core', 'registry.js');

let html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const newMetrics = {};

function slugify(text) {
  if (!text) return 'metric_' + Math.random().toString(36).substr(2, 5);
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// Find all elements with class v or num that don't have data-metric
let counter = 0;
$('span.v, span.num').each((i, el) => {
  const $el = $(el);
  if ($el.attr('data-metric')) return; // Already has it

  // Determine section to prefix slug
  let section = $el.closest('section.sec').attr('id') || 'general';

  // Find label
  let labelText = '';
  const nextLbl = $el.next('span.l, span.lbl');
  if (nextLbl.length) {
    labelText = nextLbl.text();
  } else {
    // maybe parent or sibling?
    const parentCell = $el.closest('.cell');
    if (parentCell.length) {
      labelText = parentCell.find('.lbl').text();
    }
  }

  // Handle table cells
  if ($el.closest('td').length) {
      // It's a table cell, the label might be in the first column
      const tr = $el.closest('tr');
      labelText = tr.find('td').first().text();
      // add column header if possible
      const colIndex = $el.closest('td').index();
      const table = $el.closest('table');
      const header = table.find('th').eq(colIndex).text();
      if(header) {
          labelText += '_' + header;
      }
  }

  if (!labelText) {
      // Just use the text of the element itself as a last resort fallback, or random
      labelText = 'metric';
  }

  let baseSlug = slugify(labelText);
  let metricId = `${section}_${baseSlug}`;

  // Ensure unique
  let count = 1;
  let finalId = metricId;
  while (newMetrics[finalId] || $(`[data-metric="${finalId}"]`).length) {
      finalId = `${metricId}_${count}`;
      count++;
  }

  $el.attr('data-metric', finalId);
  
  newMetrics[finalId] = {
    original_text: $el.html().trim(), // Keep HTML in case of spans inside
    label: labelText,
    section: section
  };
  counter++;
});

fs.writeFileSync(htmlPath, $.html());
console.log(`Updated index.html with ${counter} new data-metric attributes.`);
fs.writeFileSync(path.join(__dirname, 'new_metrics.json'), JSON.stringify(newMetrics, null, 2));
console.log('Saved new metrics to new_metrics.json');
