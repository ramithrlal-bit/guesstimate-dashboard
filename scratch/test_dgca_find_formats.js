const https = require('https');
https.get('https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/inventory/statistics/statistics.jsp', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const dataUrls = data.match(/data-url="([^"]+)"/g) || [];
    const hrefs = data.match(/href="([^"]+)"/g) || [];
    
    const nonPdfDataUrls = dataUrls.filter(l => !l.toLowerCase().includes('.pdf') && !l.includes('servicename'));
    const nonPdfHrefs = hrefs.filter(h => h.includes('.xls') || h.includes('.csv') || h.includes('.xlsx') || h.includes('.json'));
    
    console.log("Non-PDF Data URLs:", nonPdfDataUrls);
    console.log("Non-PDF Hrefs:", nonPdfHrefs);
  });
}).on('error', e => console.error(e));
