const { extract } = require('./lib/connectors/iamai');

async function test() {
    try {
        const data = await extract();
        console.log(JSON.stringify(data, null, 2));
    } catch(e) {
        console.error(e);
    }
}
test();
