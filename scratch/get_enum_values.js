require('dotenv').config({ path: ['.env.local', '.env'] });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getEnumValues() {
  // Query to get enum values for data_type_enum
  const { data, error } = await supabase.rpc('get_enum_values', { enum_name: 'verification_status_enum' });
  
  if (error) {
    console.log("RPC failed, trying raw query via a regular select if possible, or we will just fetch 1 observation.");
    
    // Fallback: Fetch a single observation to see what its verification_status is
    const { data: obs, error: obsErr } = await supabase
        .from('observations')
        .select('verification_status')
        .limit(10);
        
    if (obsErr) {
        console.error("Failed to fetch observations", obsErr);
    } else {
        console.log("Sample observations verification_status:");
        console.log([...new Set(obs.map(o => o.verification_status))]);
    }
  } else {
    console.log("Enum values:");
    console.log(data);
  }
}

getEnumValues();
