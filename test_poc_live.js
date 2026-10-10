require('dotenv').config();
const { extractPocAgri } = require('./lib/connectors/poc_agri');
const { extractPocHealthcare } = require('./lib/connectors/poc_healthcare');
const { extractPocEcommerce } = require('./lib/connectors/poc_ecommerce');

(async () => {
    console.log('\n--- LIVE RUN: Agriculture ---');
    const agri = await extractPocAgri(false);
    console.log(agri);

    console.log('\n--- LIVE RUN: Healthcare ---');
    const hc = await extractPocHealthcare(false);
    console.log(hc);

    console.log('\n--- LIVE RUN: E-commerce ---');
    const ecom = await extractPocEcommerce(false);
    console.log(ecom);
})();
