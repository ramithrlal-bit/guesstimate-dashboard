require('dotenv').config();
const fetch = require('node-fetch');

async function getEnums() {
  const url = `${process.env.SUPABASE_URL}/rest/v1/?apikey=${process.env.SUPABASE_SERVICE_ROLE_KEY}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log("OpenAPI Definitions:", Object.keys(json.definitions));
    if (json.definitions.observations) {
      console.log("Observations properties:", json.definitions.observations.properties.data_type);
    }
  } catch(e) {
    console.error(e);
  }
}
getEnums();
