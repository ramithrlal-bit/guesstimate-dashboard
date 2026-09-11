require('dotenv').config();
const { extractWorldBankPopulation } = require('../lib/connectors/worldbank');
const { persistObservation } = require('../lib/core/persister');
const { createClient } = require('@supabase/supabase-js');

async function testWorldBank() {
  console.log('1. Extracting from World Bank Connector...');
  const extractResult = await extractWorldBankPopulation();
  
  if (!extractResult.success) {
    console.error('Extraction failed:', extractResult.error);
    return;
  }

  console.log('Extraction Success:', extractResult.data);

  console.log('2. Updating Supabase via persister...');
  try {
    const result = await persistObservation(extractResult.data);
    console.log('Persister Result:', result);
  } catch (error) {
    console.error('Persister failed:', error.message);
  }

  console.log('3. Confirming read back from Supabase...');
  try {
    const supabaseUrl = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
    const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_KmVN6kXwRq9MfCJezk_ibA_L1FUB8Lb';
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('latest_observations')
      .select('*')
      .eq('metric_key', 'pop_india_total')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Failed to read back from Supabase:', error);
    } else {
      console.log('Latest Observation in DB:', data || 'Not found');
    }
  } catch (err) {
    console.error('Supabase read error:', err.message);
  }
}

testWorldBank();
