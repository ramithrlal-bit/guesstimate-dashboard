require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const registry = require('../lib/core/registry');

async function run() {
  const s = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: existing, error } = await s.from('metrics').select('metric_id');
  if (error) throw error;
  
  const existingSet = new Set(existing.map(e => e.metric_id));
  
  const toInsert = [];
  for (const [key, config] of Object.entries(registry.metrics)) {
    if (!existingSet.has(key)) {
      toInsert.push({
        metric_id: key,
        name: key.replace(/_/g, ' '),
        category: 'Digital',
        unit: config.expected_unit || 'unknown',
        status: 'active'
      });
    }
  }
  
  if (toInsert.length > 0) {
    console.log(`Inserting ${toInsert.length} missing metrics...`);
    const { data, error: insertError } = await s.from('metrics').insert(toInsert).select();
    if (insertError) throw insertError;
    console.log('Inserted:', data.map(d => d.metric_id));
  } else {
    console.log('No missing metrics to insert.');
  }
}
run().catch(console.error);
