const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(
  '<td class="num">~35–40%</td><td class="num">~1,000–1,300</td>',
  '<td class="num"><span class="v" data-metric="quickcommerce_blinkit_market_share">~35–40%</span></td><td class="num"><span class="v" data-metric="quickcommerce_blinkit_dark_stores">~1,000–1,300</span></td>'
);
content = content.replace(
  '<td class="num">~20–25%</td><td class="num">~700–900</td>',
  '<td class="num"><span class="v" data-metric="quickcommerce_zepto_market_share">~20–25%</span></td><td class="num"><span class="v" data-metric="quickcommerce_zepto_dark_stores">~700–900</span></td>'
);
content = content.replace(
  '<td class="num">~20–25%</td><td class="num">~700–900</td><td>Deep cross-sell with Swiggy',
  '<td class="num"><span class="v" data-metric="quickcommerce_instamart_market_share">~20–25%</span></td><td class="num"><span class="v" data-metric="quickcommerce_instamart_dark_stores">~700–900</span></td><td>Deep cross-sell with Swiggy'
);

fs.writeFileSync('index.html', content);
console.log('Injected data-metrics to table');
