const fetch = require('node-fetch');
async function test() {
  try {
    const d = new Date();
    const m = d.getMonth();
    const y = d.getFullYear();
    const yr = m < 3 ? (y-1) + '-' + y.toString().slice(-2) : y + '-' + (y+1).toString().slice(-2);
    const url = `https://www.npci.org.in/api/product-statistic/tab/detail?product_name=upi&tab_name=product-statistics-upi&year_range=${yr}&excel_type=monthly&page_no=1&page_size=10&locale=en`;
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://www.npci.org.in/product/upi/product-statistics'
      }
    });
    console.log('Status:', r.status);
    if (r.ok) {
      const data = await r.json();
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error(e);
  }
}
test();
