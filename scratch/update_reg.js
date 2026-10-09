const fs = require('fs');
let content = fs.readFileSync('lib/core/registry.js', 'utf8');
const toInsert = {
    'upi_vol_annual': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'upi_val_annual': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'upi_vol_monthly': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_upi_unique_users': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_daily_avg_upi_transactions': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_yoy_growth_transaction_volume': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_total_bank_deposits_2025': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_total_bank_credit_2025': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_gross_npa_mar_2025_20_yr_low': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_psb_profit_fy25': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_bank_branches': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_atms': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_bank_account_holders_jan_dhan': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_crar_capital_buffer': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'amfi_total_aum_cr': { approved_domain: 'amfiindia.com', extraction_method: 'LIVE_PRIMARY', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_credit_cards': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_debit_cards': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_mobile_wallet_accounts': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_bnpl_users': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_monthly_sip_inflow': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_fintech_unicorns': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 },
    'fintech_digital_payments_value_2025': { approved_domain: 'unknown', extraction_method: 'MANUAL_NO_RELIABLE_SOURCE', expected_unit: 'unknown', min_value: 0, max_value: 1000000000000 }
};
content = content.replace(/\"bonus_rbi_repo_rate_2026\": \{\s+\"approved_domain\": \"unknown\",/g, '"bonus_rbi_repo_rate_2026": {\n        "approved_domain": "rbi.org.in",');
let insertStr = '';
for (const [k, v] of Object.entries(toInsert)) {
    insertStr += '    "' + k + '": ' + JSON.stringify(v, null, 4).replace(/\n/g, '\n    ') + ',\n';
}
content = content.replace('module.exports = {', 'module.exports = {\n' + insertStr);
fs.writeFileSync('lib/core/registry.js', content);
console.log('Registry updated.');