require('dotenv').config();
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

async function verify() {
  console.log('Fetching database observations...');
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: observations, error } = await supabase
    .from('latest_observations')
    .select('metric_key, display_value, period_label');
    
  if (error) {
    console.error('Error fetching Supabase:', error);
    process.exit(1);
  }
  
  const dbMap = {};
  for (const obs of observations) {
    dbMap[obs.metric_key] = obs;
  }

  console.log('Launching browser to check production...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('https://guesstimate-dashboard.vercel.app/', { waitUntil: 'networkidle0' });
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('Extracting rendered metrics...');
  const renderedMetrics = await page.evaluate(() => {
    const results = {};
    const metricElements = document.querySelectorAll('[data-metric]');
    
    metricElements.forEach(el => {
      const metricKey = el.getAttribute('data-metric');
      results[metricKey] = el.textContent.trim();
    });
    
    console.log('Has window.supabase?', !!window.supabase);
    return results;
  });
  
  await browser.close();
  
  console.log('--- VERIFICATION RESULTS ---');
  
  const metricsToCheck = [
    'digital_social_media_user_identities',
    'digital_youtube_ad_reach',
    'digital_instagram_ad_reach',
    'digital_facebook_ad_reach',
    'digital_snapchat_ad_reach',
    'digital_linkedin_members',
    'digital_x_ad_reach',
    'digital_ott_subscribers',
    'digital_mobile_gaming_users',
    
    'digital_internet_users',
    'digital_5g_users',
    'upi_vol_annual',
    'upi_val_annual',
    'upi_vol_monthly',
    'fintech_upi_unique_users',
    'fintech_daily_avg_upi_transactions',
    'fintech_yoy_growth_transaction_volume',
    'fintech_total_bank_deposits_2025',
    'fintech_total_bank_credit_2025',
    'fintech_gross_npa_mar_2025_20_yr_low',
    'fintech_psb_profit_fy25',
    'fintech_bank_branches',
    'fintech_atms',
    'fintech_bank_account_holders_jan_dhan',
    'fintech_crar_capital_buffer',
    'fintech_credit_cards',
    'fintech_debit_cards',
    'fintech_mobile_wallet_accounts',
    'fintech_bnpl_users',
    'fintech_monthly_sip_inflow',
    'fintech_fintech_unicorns',
    'fintech_digital_payments_value_2025',
    'bonus_rbi_repo_rate_2026',
    
    'pop_india_total',
    'trai_telephone_subscribers_total',
    'ev_sales_total',
    'aai_domestic_passengers',
    'amfi_total_aum_cr'
  ];
  
  console.log('Metric | DB Value | Rendered Value | DB Period | Match');
  console.log('---|---|---|---|---');
  
  for (const key of metricsToCheck) {
    const dbVal = dbMap[key] ? dbMap[key].display_value : 'null';
    const dbPeriod = dbMap[key] ? dbMap[key].period_label : 'null';
    
    let renVal = renderedMetrics[key];
    if (renVal === undefined) renVal = 'Not Found In DOM';
    
    let match = 'FAIL';
    
    if (dbVal === renVal || (dbVal === 'null' && (renVal === '—' || renVal === '?"'))) {
      match = 'PASS';
    }
    
    console.log(`${key} | ${dbVal} | ${renVal} | ${dbPeriod} | ${match}`);
  }
}

verify().catch(console.error);
