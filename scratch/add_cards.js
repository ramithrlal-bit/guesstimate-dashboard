const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const additionalCards = `    <div class="card" data-cat="quickcommerce"><span class="v" data-metric="quickcommerce_customer_retention_3_months">~50–60%</span><span class="l">Customer retention (3 months)</span></div>
    <div class="card" data-cat="quickcommerce"><span class="v" data-metric="quickcommerce_delivery_cost_per_order">~Rs 40–50</span><span class="l">Delivery cost per order</span></div>
  </div>`;

content = content.replace('  </div>\n  <p class="sec-note" style="margin:10px 0 0;">Competitive dynamics', additionalCards + '\n  <p class="sec-note" style="margin:10px 0 0;">Competitive dynamics');

fs.writeFileSync('index.html', content);
console.log('Added additional cards to HTML');
