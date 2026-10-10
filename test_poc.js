require('dotenv').config();
const { extractPocAgri } = require('./lib/connectors/poc_agri');
const { extractPocHealthcare } = require('./lib/connectors/poc_healthcare');
const { extractPocEcommerce } = require('./lib/connectors/poc_ecommerce');

(async () => {
    console.log('\n--- DRY RUN: Agriculture ---');
    const agri = await extractPocAgri(true);
    console.log(agri);

    console.log('\n--- DRY RUN: Healthcare ---');
    const hc = await extractPocHealthcare(true);
    console.log(hc);

    console.log('\n--- DRY RUN: E-commerce ---');
    const ecom = await extractPocEcommerce(true);
    console.log(ecom);
})();
