const fs = require('fs');

const replacement = `
  <div class="sec-head"><span class="sec-num">08</span><h2>Healthcare</h2></div>
  <p class="sec-note">Frequently the base for pharma, insurance and health-app guesstimates.</p>

  <div class="sub-title">Market and expenditure</div>
  <div class="grid cols-3">
    <div class="card accent" data-cat="healthcare"><span class="v" data-metric="healthcare_market_size_projected">~$320B</span><span class="l">Healthcare Market Size (Projected)</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_expenditure_pct_gdp">~3.2%</span><span class="l">Healthcare Expenditure as % of GDP</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_govt_expenditure_share">~41%</span><span class="l">Govt Share of Health Expenditure</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_private_expenditure_share">~59%</span><span class="l">Private Share of Health Expenditure</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_per_capita_expenditure">Rs 5,500</span><span class="l">Per Capita Health Expenditure</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_out_of_pocket_expenditure">~39%</span><span class="l">Out-of-Pocket Exp. Share</span></div>
    <div class="card teal" data-cat="healthcare"><span class="v" data-metric="healthcare_health_insured_lives">~550M</span><span class="l">Health-Insured Lives</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_health_insurance_penetration">~37%</span><span class="l">Health Insurance Penetration</span></div>
  </div>

  <div class="sub-title">Infrastructure and access</div>
  <div class="grid cols-3">
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_hospitals">~70,000</span><span class="l">Total Hospitals</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_hospital_beds_total">~2M</span><span class="l">Hospital Beds (Total)</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_hospital_beds_per_1000">1.4/1000</span><span class="l">Hospital Beds per 1,000 (vs US 2.8)</span></div>
    <div class="card accent" data-cat="healthcare"><span class="v" data-metric="healthcare_registered_doctors">~1.3M</span><span class="l">Registered Doctors</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_doctors_per_1000">0.9/1000</span><span class="l">Doctors per 1,000</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_nurses_registered">~3.5M</span><span class="l">Registered Nurses</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_primary_health_centres">~30,000</span><span class="l">Primary Health Centres (PHCs)</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_diagnostic_market_size">~$13B</span><span class="l">Diagnostic Market Size</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_pharmacies">~9 Lakh</span><span class="l">Pharmacies</span></div>
  </div>

  <div class="sub-title">Healthcare outcomes</div>
  <div class="grid cols-3">
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_life_expectancy">~70 years</span><span class="l">Life Expectancy</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_infant_mortality_rate">26 per 1000</span><span class="l">Infant Mortality Rate</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_maternal_mortality_ratio">97 per 100k</span><span class="l">Maternal Mortality Ratio</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_annual_births">~23M</span><span class="l">Annual Births</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_diabetics">100M+</span><span class="l">Diabetics</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_hypertension_patients">200M+</span><span class="l">Hypertension Patients</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_immunisation_coverage">~76%</span><span class="l">Immunisation Coverage</span></div>
    <div class="card teal" data-cat="healthcare"><span class="v" data-metric="healthcare_mental_health_treatment_gap">&gt;80%</span><span class="l">Mental Health Treatment Gap</span></div>
  </div>

  <div class="sub-title">Industry and digital health</div>
  <div class="grid cols-3">
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_pharma_market_size">~$50B</span><span class="l">Pharma Market Size</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_medical_devices_market">~$11B</span><span class="l">Medical Devices Market</span></div>
    <div class="card" data-cat="healthcare"><span class="v" data-metric="healthcare_telemedicine_consultations">~200M+</span><span class="l">Telemedicine Consults (eSanjeevani)</span></div>
  </div>`;

let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="sec-head"><span class="sec-num">08<\/span><h2>Healthcare<\/h2><\/div>[\s\S]*?<div class="ex-group-title">Worked examples/m;
html = html.replace(regex, replacement.trim() + '\n  <div class="ex-group-title">Worked examples');
fs.writeFileSync('index.html', html);
console.log('Replaced Healthcare HTML');
