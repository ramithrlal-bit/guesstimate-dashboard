// api/core/registry.js
// Source Governance Registry
// Only metrics explicitly defined here, matching the exact domain, can be ingested.

module.exports = {
  metrics: {
    "upi_vol_monthly": {
        "approved_domain": "npci.org.in",
        "extraction_method": "html_table",
        "expected_unit": "B",
        "min_value": 0,
        "max_value": 1000
    },
    "pop_india_total": {
        "approved_domain": "api.worldbank.org",
        "extraction_method": "api_json",
        "expected_unit": "B",
        "min_value": 1,
        "max_value": 2
    },
    "trai_telephone_subscribers_total": {
        "approved_domain": "trai.gov.in",
        "extraction_method": "pdf_parse",
        "expected_unit": "B",
        "min_value": 0.5,
        "max_value": 2
    },
    "ev_sales_total": {
        "approved_domain": "analytics.parivahan.gov.in",
        "extraction_method": "api_json",
        "expected_unit": "units",
        "min_value": 0,
        "max_value": 5000000
    },
    "aai_domestic_passengers": {
        "approved_domain": "aai.aero",
        "extraction_method": "pdf_parse",
        "expected_unit": "millions",
        "min_value": 0,
        "max_value": 100
    },
    "amfi_total_aum_cr": {
        "approved_domain": "portal.amfiindia.com",
        "extraction_method": "xls_parse",
        "expected_unit": "INR Crore",
        "min_value": 1000000,
        "max_value": 20000000
    },
    "general_world_population": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "general_internet_users_india": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "general_working_age_population": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "general_smartphone_users_india": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_urban_population": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_rural_population": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_working_age_15_64": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_median_age": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_male_female_population": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_population_2025_est": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_share_of_india": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_population_rank": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_projected_growth_2026": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_tier_1_the_8_metros_x_class": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_tier_2_y_class_cities": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_tier_3_z_class_towns": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_villages_rural": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_india_s_global_rank_by_population": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_india_under_25_years_old": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_india_of_working_age_15_64": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "population_median_age_vs_china_39_us_38": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_internet_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_smartphone_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_5g_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_fintech_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_upi_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_online_shoppers": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_upi_transaction_volume_dec_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_total_social_media_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_avg_daily_video_watch_time_per_user_youtube": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_ott_subscribers": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "digital_mobile_gaming_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_upi_unique_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_daily_avg_upi_transactions": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_yoy_growth_transaction_volume": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_total_bank_deposits_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_total_bank_credit_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_gross_npa_mar_2025_20_yr_low": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_psb_profit_fy25": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_bank_branches": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_atms": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_bank_account_holders_jan_dhan": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_crar_capital_buffer": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_credit_cards": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_debit_cards": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_mobile_wallet_accounts": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_bnpl_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_monthly_sip_inflow": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_fintech_unicorns": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "fintech_digital_payments_value_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_e_commerce_market_size_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_market_size_2026_est": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_online_shoppers_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_projected_shoppers_2030": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_cagr_2025_2030": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_india_s_global_rank_e_retail_market": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_total_retail_market_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_e_commerce_fy24": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_organized_retail_share": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_kirana_mom_and_pop_stores": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_e_commerce_cagr_to_fy30": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_e_commerce_share_of_total_retail": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_quick_commerce_gmv_fy25_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_projected_gmv_2027_28": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_yoy_gmv_growth_2025": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_monthly_transacting_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_typical_delivery_promise": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_share_of_online_grocery_gmv_overtook_e_grocery": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_average_order_value": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_orders_per_user_per_month": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_typical_dark_store_size": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_skus_per_dark_store": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_fastest_expanding_categories": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_where_80_of_gmv_is_concentrated_today": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_contribution_margin_leading_players_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_delivery_partners_top_platform_peak": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "quickcommerce_cities_with_active_dark_store_networks": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_COMPANY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_ev_share_of_new_vehicle_sales": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_e_2_wheelers_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_e_3_wheelers_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_e_4_wheelers_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_e_car_share_of_car_sales_may_2026": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_cars_registered": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_two_wheelers_registered": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_evs_on_road_total": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_daily_metro_riders": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_daily_railway_passengers": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ev_car_ownership_per_1_000_people": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_edtech_market_size_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_projected_market_2030_31": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_internet_users_base": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_student_population_base": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_cagr_2025_2035": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_edtech_users_today": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_schools_total": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_college_students": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_engineering_grads_yr": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_mba_grads_yr": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_iits": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_iims": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_literacy_rate": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "edtech_govt_spend_on_education_gdp": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_registered_doctors": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_hospitals": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_hospital_beds_vs_us_2_8_1000": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_pharmacies": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_annual_births": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_diabetics": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_hypertension_patients": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_health_insured_lives": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_mental_health_treatment_gap": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_total_health_expenditure_recent_years": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "healthcare_healthcare_market_projected_ibef_next_few_years": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_share_of_gdp_gva": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_farmers_cultivators": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_agricultural_households": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_arable_land": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_agri_exports_fy25": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_food_processing_market": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_agri_gdp_growth_fy26": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_average_farm_size": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_cold_storage_capacity": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_market_size_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_urban_rural_share": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_revenue_growth_fy26": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_modern_trade_share": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_rural_volume_growth_q2_2025": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_projected_market_2030": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_dpiit_recognised_startups": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_angel_investors": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_vc_funds": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_incubators": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_unicorns_2026": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_soonicorns": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_funding_raised_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_top_sectors": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_top_startup_hubs": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_sector_size_2025": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_growth_yoy": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_ott_revenue_fy25": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_ott_subscribers": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_tv_households": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_newspaper_readers": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_bollywood_films_yr": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_projected_sector_size_2030": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_sector_size_2025_1": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_direct_share_of_gdp": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_urban_housing_shortfall": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_pmay_houses_built": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_home_loan_book": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_avg_home_price_metro": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_office_space_demand": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "economy_top_players": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_PRIMARY",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_population": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_households": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_gdp": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_median_household_income": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_internet_penetration": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_credit_card_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_india_s_share_of_world_population": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_india_s_share_of_world_gdp": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_india_s_share_of_global_internet_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_india_s_global_rank_upi_transaction_volume": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_share_of_global_pharma_exports_by_volume": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_share_of_global_it_services_offshoring": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_world_population": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_world_internet_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_world_smartphone_users": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_world_gdp": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_global_e_commerce_market": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_cars_on_the_road_worldwide": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_annual_flight_passengers_worldwide": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_global_pharma_market": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "global_s_p_500_market_cap": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_countries_in_the_world": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_india_s_land_area_7th_largest": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_lok_sabha_rajya_sabha_seats": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_districts_in_india": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_constitutionally_scheduled_languages": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_india_real_gdp_growth_fy26_rbi_est": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_rbi_repo_rate_2026": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_india_forex_reserves_may_2026": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_life_expectancy_at_birth": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_sex_ratio_females_per_1_000_males_2011_census": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_india_s_global_rank_by_nominal_gdp": {
        "approved_domain": "unknown",
        "extraction_method": "LIVE_RESEARCH",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "bonus_projected_world_population_2050": {
        "approved_domain": "unknown",
        "extraction_method": "CALCULATED",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    }
}
};
