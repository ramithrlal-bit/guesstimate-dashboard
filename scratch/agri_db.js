require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const metrics = {
    // Market and production
    "agri_gva_share": { name: "Agri Share of GVA", unit: "%", template: "~{{val}}%" },
    "agri_total_foodgrain_production": { name: "Total Foodgrain Production", unit: "MT", template: "~{{val}} MT" },
    "agri_rice_production": { name: "Rice Production", unit: "MT", template: "~{{val}} MT" },
    "agri_wheat_production": { name: "Wheat Production", unit: "MT", template: "~{{val}} MT" },
    "agri_horticulture_production": { name: "Horticulture Production", unit: "MT", template: "~{{val}} MT" },
    "agri_exports_value": { name: "Agri Exports Value", unit: "$", template: "~${{val}}B" },
    "agri_imports_value": { name: "Agri Imports Value", unit: "$", template: "~${{val}}B" },
    
    // Farmers and economics
    "agri_operational_landholdings": { name: "Operational Landholdings", unit: "M", template: "~{{val}}M" },
    "agri_average_holding_size": { name: "Average Holding Size", unit: "Hectares", template: "{{val}} Ha" },
    "agri_workforce_share": { name: "Agri Workforce Share", unit: "%", template: "~{{val}}%" },
    "agri_irrigation_coverage": { name: "Irrigation Coverage", unit: "%", template: "~{{val}}%" },
    "agri_fertiliser_consumption": { name: "Fertiliser Consumption", unit: "MT", template: "~{{val}} MT" },
    "agri_credit_flow": { name: "Agri Credit Flow", unit: "Lakh Cr", template: "Rs {{val}}L Cr" },
    
    // Supply chain
    "agri_enam_mandis": { name: "e-NAM Mandis", unit: "Mandis", template: "~{{val}}" },
    "agri_cold_storage_capacity": { name: "Cold Storage Capacity", unit: "MT", template: "~{{val}} MT" },
    "agri_food_processing_market": { name: "Food Processing Market", unit: "$", template: "~${{val}}B" },
    "agri_post_harvest_losses": { name: "Post-Harvest Losses", unit: "%", template: "~{{val}}%" },
    
    // Sustainability & Govt
    "agri_organic_farming_area": { name: "Organic Farming Area", unit: "M Ha", template: "~{{val}}M Ha" },
    "agri_pm_kisan_beneficiaries": { name: "PM-KISAN Beneficiaries", unit: "M", template: "~{{val}}M" },
    "agri_pmfby_insured_area": { name: "PMFBY Insured Area", unit: "M Ha", template: "~{{val}}M Ha" }
};

(async () => {
    for (const [k, v] of Object.entries(metrics)) {
        const payload = {
            metric_id: k,
            name: v.name,
            category: "Agriculture",
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
