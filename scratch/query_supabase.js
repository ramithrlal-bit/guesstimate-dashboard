const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_KmVN6kXwRq9MfCJezk_ibA_L1FUB8Lb';

async function check() {
  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data, error } = await client
    .from('latest_observations')
    .select('*');

  if (error) {
    console.error('Supabase query error:', error);
    return;
  }

  const metrics = [
    'digital_internet_users',
    'digital_rural_internet_users',
    'digital_urban_internet_users',
    'digital_internet_penetration',
    'digital_social_media_user_identities',
    'digital_youtube_ad_reach',
    'digital_instagram_ad_reach',
    'digital_facebook_ad_reach',
    'digital_snapchat_ad_reach',
    'digital_linkedin_members',
    'digital_x_ad_reach',
    'digital_5g_users',
    'digital_smartphone_users',
    'digital_ott_subscribers',
    'digital_mobile_gaming_users'
  ];

  metrics.forEach(m => {
    const obs = data.find(d => d.metric_key === m);
    if (obs) {
      console.log(`${m}: ${obs.display_value} (Status: ${obs.verification_status})`);
    } else {
      console.log(`${m}: Not found in DB`);
    }
  });
}

check().catch(console.error);
