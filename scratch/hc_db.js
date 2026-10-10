require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const metrics = {
    // Market and expenditure
    "healthcare_market_size_projected": { name: "Healthcare Market Size (Projected)", unit: "$", template: "~${{val}}B" },
    "healthcare_expenditure_pct_gdp": { name: "Healthcare Expenditure as % of GDP", unit: "%", template: "~{{val}}%" },
    "healthcare_govt_expenditure_share": { name: "Govt Share of Health Expenditure", unit: "%", template: "~{{val}}%" },
    "healthcare_private_expenditure_share": { name: "Private Share of Health Expenditure", unit: "%", template: "~{{val}}%" },
    "healthcare_per_capita_expenditure": { name: "Per Capita Health Expenditure", unit: "Rs", template: "Rs {{val}}" },
    "healthcare_out_of_pocket_expenditure": { name: "Out-of-Pocket Exp. Share", unit: "%", template: "~{{val}}%" },
    "healthcare_health_insured_lives": { name: "Health-Insured Lives", unit: "M", template: "~{{val}}M" },
    "healthcare_health_insurance_penetration": { name: "Health Insurance Penetration", unit: "%", template: "~{{val}}%" },
    
    // Infrastructure and access
    "healthcare_hospitals": { name: "Total Hospitals", unit: "hospitals", template: "~{{val}}" },
    "healthcare_hospital_beds_total": { name: "Hospital Beds (Total)", unit: "M", template: "~{{val}}M" },
    "healthcare_hospital_beds_per_1000": { name: "Hospital Beds per 1,000", unit: "beds", template: "{{val}}/1000" },
    "healthcare_registered_doctors": { name: "Registered Doctors", unit: "M", template: "~{{val}}M" },
    "healthcare_doctors_per_1000": { name: "Doctors per 1,000", unit: "doctors", template: "{{val}}/1000" },
    "healthcare_nurses_registered": { name: "Registered Nurses", unit: "M", template: "~{{val}}M" },
    "healthcare_primary_health_centres": { name: "Primary Health Centres (PHCs)", unit: "PHCs", template: "~{{val}}" },
    "healthcare_diagnostic_market_size": { name: "Diagnostic Market Size", unit: "$", template: "~${{val}}B" },
    "healthcare_pharmacies": { name: "Pharmacies", unit: "Lakh", template: "~{{val}} Lakh" },
    
    // Outcomes
    "healthcare_life_expectancy": { name: "Life Expectancy", unit: "years", template: "~{{val}} years" },
    "healthcare_infant_mortality_rate": { name: "Infant Mortality Rate", unit: "per 1000", template: "{{val}} per 1000" },
    "healthcare_maternal_mortality_ratio": { name: "Maternal Mortality Ratio", unit: "per 100k", template: "{{val}} per 100k" },
    "healthcare_annual_births": { name: "Annual Births", unit: "M", template: "~{{val}}M" },
    "healthcare_diabetics": { name: "Diabetics", unit: "M", template: "{{val}}M+" },
    "healthcare_hypertension_patients": { name: "Hypertension Patients", unit: "M", template: "{{val}}M+" },
    "healthcare_immunisation_coverage": { name: "Immunisation Coverage", unit: "%", template: "~{{val}}%" },
    "healthcare_mental_health_treatment_gap": { name: "Mental Health Treatment Gap", unit: "%", template: ">{{val}}%" },
    
    // Industry & Digital
    "healthcare_pharma_market_size": { name: "Pharma Market Size", unit: "$", template: "~${{val}}B" },
    "healthcare_medical_devices_market": { name: "Medical Devices Market", unit: "$", template: "~${{val}}B" },
    "healthcare_telemedicine_consultations": { name: "Telemedicine Consultations", unit: "M", template: "~{{val}}M+" }
};

const toDelete = [
    'healthcare_hospital_beds_vs_us_2_8_1000',
    'healthcare_total_health_expenditure_recent_years',
    'healthcare_healthcare_market_projected_ibef_next_few_years'
];

(async () => {
    // Delete deprecated
    const { error: delErr } = await supabase.from('metrics').delete().in('metric_id', toDelete);
    if (delErr) console.error('Del err', delErr);
    
    for (const [k, v] of Object.entries(metrics)) {
        const payload = {
            metric_id: k,
            name: v.name,
            category: "Healthcare",
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
