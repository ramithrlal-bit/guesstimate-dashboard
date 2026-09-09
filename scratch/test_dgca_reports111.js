const https = require('https');

https.get('https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/inventory/statistics/statistics.jsp', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const idIndex = data.indexOf('id="reports111"');
        if (idIndex > -1) {
            console.log('Found reports111 div!');
            console.log(data.substring(idIndex, idIndex + 2000));
        } else {
            console.log('Not found');
        }
    });
}).on('error', e => console.error(e));
