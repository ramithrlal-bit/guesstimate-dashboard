const fs = require('fs');
const path = require('path');
const registryPath = path.join(__dirname, '../lib/core/registry.js');

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

const registry = require(registryPath);

for (const [k, v] of Object.entries(metrics)) {
    let max = 1000000000000;
    if (v.unit === '%') max = 100;
    if (v.unit === 'M') max = 2000;
    if (v.unit === 'MT') max = 2000;
    if (v.unit === 'Hectares') max = 50;
    if (v.unit === 'M Ha') max = 500;
    if (v.unit === 'Lakh Cr') max = 100;
    
    const val = {
        approved_domain: null,
        extraction_method: 'MANUAL_NO_RELIABLE_SOURCE',
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
console.log('Saved agriculture registry');
