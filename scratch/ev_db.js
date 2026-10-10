require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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

const toDelete = ['ev_e_2_wheelers_2025', 'ev_sales_2w', 'ev_share_2w', 'ev_e_3_wheelers_2025', 'ev_e_4_wheelers_2025'];

(async () => {
    // Delete deprecated
    const { error: delErr } = await supabase.from('metrics').delete().in('metric_id', toDelete);
    if (delErr) console.error('Del err', delErr);
    
    for (const [k, v] of Object.entries(metrics)) {
        const payload = {
            metric_id: k,
            name: v.name,
            category: "Mobility & EV",
            unit: v.unit,
            format_template: v.template
        };
        const { error } = await supabase.from('metrics').upsert(payload, { onConflict: 'metric_id' });
        if (error) {
            console.error('Error inserting', k, error);
        } else {
            console.log('Inserted', k);
        }
    }
})();
