const fs = require('fs');

const replacement = `
      <div class="grid cols-2">
        <div class="card accent" data-cat="ev"><span class="v" data-metric="ev_sales_total">---</span><span class="l">Total EV sales, latest completed year (units)</span></div>
        <div class="card" data-cat="ev"><span class="v" data-metric="ev_ev_share_of_new_vehicle_sales">~8%</span><span class="l">EV share of new vehicle sales</span></div>
        <div class="card" data-cat="ev"><span class="v" data-metric="ev_e_2_wheelers_sales">1.28M</span><span class="l">E-2-wheelers sales</span></div>
        <div class="card" data-cat="ev"><span class="v" data-metric="ev_e_3_wheelers_sales">0.8M</span><span class="l">E-3-wheelers sales</span></div>
        <div class="card" data-cat="ev"><span class="v" data-metric="ev_e_4_wheelers_sales">~176,560</span><span class="l">E-4-wheelers (Cars) sales</span></div>
        <div class="card" data-cat="ev"><span class="v" data-metric="ev_e_car_share_of_car_sales_may_2026">~7%</span><span class="l">E-car share of car sales</span></div>
      </div>
    </div>
    <div class="side">
      <div class="tb-title">Quick guesstimate template</div>
      <ol class="steps">
        <li>Anchor: 2.3M total EVs sold/year</li>
        <li>Segment by vehicle type (2W / 3W / 4W)</li>
        <li>Apply city-tier penetration (metros higher)</li>
        <li>Estimate charging stations needed (ratio-based)</li>
        <li>Sanity check vs. Vahan portal data</li>
      </ol>
    </div>
  </div>
  
  <div class="sub-title">Market economics & infrastructure</div>
  <div class="grid cols-3">
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_market_size_revenue_2024">~$3.2B</span><span class="l">EV Market Size (Revenue)</span></div>
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_battery_pack_price_per_kwh">$139/kWh</span><span class="l">Battery Pack Price</span></div>
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_public_charging_stations">~12,146</span><span class="l">Public Charging Stations</span></div>
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_electric_buses_on_road">~9,500</span><span class="l">Electric Buses on Road</span></div>
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_fame_ii_subsidy_outlay">Rs 10k Cr</span><span class="l">FAME II Subsidy Outlay</span></div>
  </div>

  <div class="sub-title">Mobility, broader context</div>
  <div class="grid cols-3">
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_cars_registered">~50M</span><span class="l">Total cars registered</span></div>
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_two_wheelers_registered">~250M</span><span class="l">Two-wheelers registered</span></div>
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_evs_on_road_total">~3M+</span><span class="l">EVs on road (total)</span></div>
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_daily_metro_riders">~12M+</span><span class="l">Daily metro riders</span></div>
    <div class="card" data-cat="ev"><span class="v" data-metric="aai_domestic_passengers">~220M</span><span class="l">Air passengers per year</span></div>
    <div class="card" data-cat="ev"><span class="v" data-metric="ev_daily_railway_passengers">~23M</span><span class="l">Daily railway passengers</span></div>
    <div class="card teal" data-cat="ev"><span class="v" data-metric="ev_car_ownership_per_1_000_people">34</span><span class="l">Car ownership per 1,000 people</span></div>
  </div>`;

let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="grid cols-2">[\s\S]*?<div class="card teal" data-cat="ev">.*?<\/div>\s*<\/div>/;
html = html.replace(regex, replacement.trim());
fs.writeFileSync('index.html', html);
console.log('Replaced HTML');
