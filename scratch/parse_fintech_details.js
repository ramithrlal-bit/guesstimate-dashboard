const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const dom = new JSDOM(html);
const document = dom.window.document;

const fintechSection = document.getElementById('fintech');
const metrics = fintechSection.querySelectorAll('[data-metric]');

const results = [];
metrics.forEach(el => {
  const metricKey = el.getAttribute('data-metric');
  let currentVal = el.textContent.trim();
  
  // Find the label next to it. Usually <span class="l">Label</span>
  // It could be a sibling.
  const parent = el.parentElement;
  let label = '';
  const labelEl = parent.querySelector('.l, .lbl');
  if (labelEl) {
    label = labelEl.textContent.trim();
  }
  
  // Is there a unit inside .v?
  let unit = '';
  const unitEl = el.querySelector('.unit');
  if (unitEl) {
    unit = unitEl.textContent.trim();
  }
  
  results.push(`${metricKey} | ${currentVal} | ${label} | ${unit}`);
});

console.log(results.join('\n'));
