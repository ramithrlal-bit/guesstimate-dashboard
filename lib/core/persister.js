const { createClient } = require('@supabase/supabase-js');
const registry = require('./registry');

async function persistObservation({
  metric_id,
  value,
  display_value,
  period_label,
  period_start,
  period_end,
  source_url,
  data_type
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase credentials not found in environment variables.');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // 1. Fetch latest observation for this metric
  const { data: latestObs, error: fetchError } = await supabase
    .from('latest_observations')
    .select('*')
    .eq('metric_key', metric_id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is no rows found
    console.error('Error fetching latest observation:', fetchError);
    throw fetchError;
  }

  // 2. Change Detection & Idempotency
  if (latestObs) {
    // If exact same period and exact same value -> Unchanged
    if (latestObs.period_label === period_label && latestObs.value === value) {
      console.log(`[UNCHANGED] ${metric_id} for ${period_label} remains ${value}. Skipping insert.`);
      return { status: 'unchanged', observation: latestObs };
    }
    
    // If same period but different value -> Correction
    if (latestObs.period_label === period_label && latestObs.value !== value) {
      console.log(`[CORRECTION] ${metric_id} for ${period_label} changed from ${latestObs.value} to ${value}. Inserting new version.`);
    }

    // If different period -> New Period
    if (latestObs.period_label !== period_label) {
      console.log(`[NEW PERIOD] ${metric_id} updating from ${latestObs.period_label} to ${period_label}. Value: ${value}.`);
    }
  } else {
    console.log(`[INITIAL] No previous observation found for ${metric_id}. Inserting first record.`);
  }

  // 3. Validation & Persistence
  let verification_status = 'unverified';
  
  const metricConfig = registry.metrics[metric_id];
  if (metricConfig) {
    let isValid = true;
    
    // Check Domain
    try {
      const urlObj = new URL(source_url);
      if (urlObj.hostname !== metricConfig.approved_domain && !urlObj.hostname.endsWith('.' + metricConfig.approved_domain)) {
        console.error(`[VALIDATION FAILED] Domain ${urlObj.hostname} does not match approved ${metricConfig.approved_domain}`);
        isValid = false;
      }
    } catch(e) {
       isValid = false;
    }
    
    // Check Range and ensure strict number
    if (typeof value !== 'number' || isNaN(value) || value === null) {
      console.error(`[VALIDATION FAILED] Value is not a valid strict number`);
      isValid = false;
    } else if (value < metricConfig.min_value || value > metricConfig.max_value) {
      console.error(`[VALIDATION FAILED] Value ${value} is outside approved range ${metricConfig.min_value}-${metricConfig.max_value}`);
      isValid = false;
    }

    if (isValid) {
      verification_status = 'verified';
    }
  } else {
    console.warn(`[REGISTRY MISSING] No registry config for ${metric_id}. Defaulting to unverified.`);
  }

  // We need to resolve the internal integer metric_id from the string metric_key
  const { data: metricRecord, error: metricError } = await supabase
    .from('metrics')
    .select('id')
    .eq('metric_id', metric_id)
    .single();

  if (metricError || !metricRecord) {
    throw new Error(`Metric key ${metric_id} not found in database.`);
  }

  const newObservation = {
    metric_id: metricRecord.id,
    value: value,
    display_value: display_value,
    period_label: period_label,
    period_start: period_start,
    period_end: period_end,
    source_url: source_url,
    data_type: data_type,
    verification_status: verification_status,
    notes: 'Automated extraction'
  };

  const { data: insertedData, error: insertError } = await supabase
    .from('observations')
    .insert([newObservation])
    .select()
    .single();

  if (insertError) {
    if (insertError.code === '23505') {
      console.log(`[DUPLICATE] Race condition prevented by unique constraint for ${metric_id} (${period_label}: ${value}).`);
      return { status: 'duplicate_prevented' };
    }
    console.error('Error inserting observation:', insertError);
    throw insertError;
  }

  console.log(`[SUCCESS] Successfully persisted observation for ${metric_id} (Status: ${verification_status}). ID: ${insertedData.id}`);
  return { status: 'inserted', observation: insertedData };
}

module.exports = { persistObservation };
