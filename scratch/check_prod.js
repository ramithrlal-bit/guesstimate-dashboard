const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function check() {
  const res = await fetch('https://guesstimate-dashboard.vercel.app/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
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
    const parent = $(`[data-metric="${m}"]`);
    const label = parent.find('.l').text().trim();
    const value = parent.find('.v').text().trim();
    console.log(`${m} (${label}): ${value}`);
  });
}

check().catch(console.error);
