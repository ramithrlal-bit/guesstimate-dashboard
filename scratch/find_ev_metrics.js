require('dotenv').config({ path: ['.env.local', '.env'] });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findEVMetrics() {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .ilike('name', '%vehicle%');
    
  const { data: data2, error: error2 } = await supabase
    .from('metrics')
    .select('*')
    .ilike('name', '%ev%');

  console.log("Vehicle metrics:");
  console.log(data);
  
  console.log("EV metrics:");
  console.log(data2);
}

findEVMetrics().catch(console.error);
