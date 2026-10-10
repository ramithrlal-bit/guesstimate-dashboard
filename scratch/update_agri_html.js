const fs = require('fs');
const replacement = `
<section class="sec" id="agriculture" data-cat="agriculture">
  <div class="sec-head"><span class="sec-num">09</span><h2>Agriculture</h2></div>
  <p class="sec-note">Vital for rural economics, FMCG sizing, and microfinance guesstimates.</p>

  <div class="sub-title">Market and production</div>
  <div class="grid cols-3">
    <div class="card accent" data-cat="agriculture"><span class="v" data-metric="agri_gva_share">~18%</span><span class="l">Agri Share of GVA</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_total_foodgrain_production">~330 MT</span><span class="l">Total Foodgrain Production</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_rice_production">~135 MT</span><span class="l">Rice Production</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_wheat_production">~110 MT</span><span class="l">Wheat Production</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_horticulture_production">~350 MT</span><span class="l">Horticulture Production</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_exports_value">~$50B</span><span class="l">Agri Exports Value</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_imports_value">~$35B</span><span class="l">Agri Imports Value</span></div>
  </div>

  <div class="sub-title">Farmers and economics</div>
  <div class="grid cols-3">
    <div class="card teal" data-cat="agriculture"><span class="v" data-metric="agri_operational_landholdings">~146M</span><span class="l">Operational Landholdings</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_average_holding_size">1.08 Ha</span><span class="l">Average Holding Size</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_workforce_share">~45%</span><span class="l">Agri Workforce Share</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_irrigation_coverage">~55%</span><span class="l">Irrigation Coverage</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_fertiliser_consumption">~60 MT</span><span class="l">Fertiliser Consumption</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_credit_flow">Rs 20L Cr</span><span class="l">Agri Credit Flow</span></div>
  </div>

  <div class="sub-title">Supply chain and markets</div>
  <div class="grid cols-3">
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_enam_mandis">~1,360</span><span class="l">e-NAM Mandis</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_cold_storage_capacity">~40 MT</span><span class="l">Cold Storage Capacity</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_food_processing_market">~$300B</span><span class="l">Food Processing Market</span></div>
    <div class="card teal" data-cat="agriculture"><span class="v" data-metric="agri_post_harvest_losses">~15%</span><span class="l">Post-Harvest Losses</span></div>
  </div>

  <div class="sub-title">Sustainability and technology</div>
  <div class="grid cols-3">
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_organic_farming_area">~2.9M Ha</span><span class="l">Organic Farming Area</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_pm_kisan_beneficiaries">~110M</span><span class="l">PM-KISAN Beneficiaries</span></div>
    <div class="card" data-cat="agriculture"><span class="v" data-metric="agri_pmfby_insured_area">~50M Ha</span><span class="l">PMFBY Insured Area</span></div>
  </div>
</section>
`;

let html = fs.readFileSync('index.html', 'utf8');

// Also update the section headers:
// Original index:
// 08 Healthcare
// 09 Economy -> becomes 10
// 10 Global -> becomes 11
// 11 Frameworks -> becomes 12
// 12 Interview -> becomes 13
// 13 Bonus -> becomes 14

html = html.replace('id="economy"', replacement.trim() + '\n\n<section class="sec" id="economy"');
html = html.replace('<span class="sec-num">09</span><h2>Economy</h2>', '<span class="sec-num">10</span><h2>Economy</h2>');
html = html.replace('<span class="sec-num">10</span><h2>Global Context</h2>', '<span class="sec-num">11</span><h2>Global Context</h2>');
html = html.replace('<span class="sec-num">11</span><h2>Frameworks</h2>', '<span class="sec-num">12</span><h2>Frameworks</h2>');
html = html.replace('<span class="sec-num">12</span><h2>Interview Practice</h2>', '<span class="sec-num">13</span><h2>Interview Practice</h2>');
html = html.replace('<span class="sec-num">13</span><h2>Bonus Checks</h2>', '<span class="sec-num">14</span><h2>Bonus Checks</h2>');

// Add navigation link
html = html.replace('<a href="#healthcare" class="nav-btn">Healthcare</a>', '<a href="#healthcare" class="nav-btn">Healthcare</a>\n    <a href="#agriculture" class="nav-btn">Agriculture</a>');

fs.writeFileSync('index.html', html);
console.log('Inserted Agriculture HTML');
