const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const block = fs.readFileSync('scratch/ecommerce_block.html', 'utf8');
const searchTarget = 'data-metric="ecommerce_e_commerce_share_of_total_retail"';
const closingDivs = '</div>\n  </div>';
const idx = html.indexOf(searchTarget);
if (idx !== -1) {
    const endIdx = html.indexOf(closingDivs, idx) + closingDivs.length;
    html = html.slice(0, endIdx) + '\n\n' + block + html.slice(endIdx);
    fs.writeFileSync('index.html', html);
    console.log('Successfully updated index.html');
} else {
    console.log('Target string not found in index.html');
}
