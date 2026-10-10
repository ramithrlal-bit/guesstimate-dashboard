const fs = require('fs');
const path = require('path');
const registryPath = path.join(__dirname, '../lib/core/registry.js');

const metrics = {
    "ev_sales_total": { name: "Total EV sales, latest completed year", unit: "units", template: "{{val}}" },
    "ev_ev_share_of_new_vehicle_sales": { name: "EV share of new vehicle sales", unit: "%", template: "~{{val}}%" },
    "ev_e_2_wheelers_sales": { name: "E-2-wheelers sales", unit: "units", template: "{{val}}" },
    "ev_e_3_wheelers_sales": { name: "E-3-wheelers sales", unit: "units", template: "{{val}}" },
    "ev_e_4_wheelers_sales": { name: "E-4-wheelers (Cars) sales", unit: "units", template: "{{val}}" },
    "ev_e_car_share_of_car_sales_may_2026": { name: "E-car share of car sales", unit: "%", template: "~{{val}}%" },
    "ev_cars_registered": { name: "Total cars registered", unit: "M", template: "~{{val}}M" },
    "ev_two_wheelers_registered": { name: "Two-wheelers registered", unit: "M", template: "~{{val}}M" },
    "ev_evs_on_road_total": { name: "EVs on road (total)", unit: "M", template: "~{{val}}M+" },
    "ev_daily_metro_riders": { name: "Daily metro riders", unit: "M", template: "~{{val}}M+" },
    "ev_daily_railway_passengers": { name: "Daily railway passengers", unit: "M", template: "~{{val}}M" },
    "ev_car_ownership_per_1_000_people": { name: "Car ownership per 1,000 people", unit: "cars", template: "{{val}}" },
    "ev_market_size_revenue_2024": { name: "EV Market Size (Revenue)", unit: "$", template: "~${{val}}B" },
    "ev_battery_pack_price_per_kwh": { name: "Battery Pack Price", unit: "$/kWh", template: "${{val}}/kWh" },
    "ev_public_charging_stations": { name: "Public Charging Stations", unit: "stations", template: "~{{val}}" },
    "ev_electric_buses_on_road": { name: "Electric Buses on Road", unit: "buses", template: "~{{val}}" },
    "ev_fame_ii_subsidy_outlay": { name: "FAME II Subsidy Outlay", unit: "Cr", template: "Rs {{val}} Cr" }
};

const registry = require(registryPath);

// Find keys to clean up from registry (old nested ones like ev_e_2_wheelers_2025)
const toDelete = ['ev_e_2_wheelers_2025', 'ev_sales_2w', 'ev_share_2w', 'ev_e_3_wheelers_2025', 'ev_e_4_wheelers_2025'];
for (const k of toDelete) {
    delete registry[k];
    if (registry.metrics) delete registry.metrics[k];
}

for (const [k, v] of Object.entries(metrics)) {
    let max = 1000000000000;
    if (v.unit === '%') max = 100;
    if (v.unit === 'M') max = 5000;
    if (v.unit === 'cars' || v.unit === 'stations') max = 50000000;
    
    const val = {
        approved_domain: k === 'ev_sales_total' ? 'analytics.parivahan.gov.in' : null,
        extraction_method: k === 'ev_sales_total' ? 'JSON_API' : 'MANUAL_NO_RELIABLE_SOURCE',
        expected_unit: v.unit,
        min_value: 0,
        max_value: max
    };
    registry[k] = val;
    if (registry.metrics) {
        registry.metrics[k] = val;
    }
}

const fileContent = '// lib/core/registry.js\n// Source Governance Registry\n// Only metrics explicitly defined here, matching the exact domain, can be ingested.\n\nmodule.exports = ' + JSON.stringify(registry, null, 4) + ';\n';
fs.writeFileSync(registryPath, fileContent);
console.log('Saved registry');
