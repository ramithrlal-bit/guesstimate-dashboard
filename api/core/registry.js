// api/core/registry.js
// Source Governance Registry
// Only metrics explicitly defined here, matching the exact domain, can be ingested.

module.exports = {
  metrics: {
    upi_vol_monthly: {
      approved_domain: 'npci.org.in',
      extraction_method: 'html_table',
      expected_unit: 'B', // Must be billions
      min_value: 0,
      max_value: 1000 // Sanity check: UPI volume shouldn't exceed 1000B in near future
    },
    pop_india_total: {
      approved_domain: 'api.worldbank.org',
      extraction_method: 'api_json',
      expected_unit: 'B', // Must be billions
      min_value: 1,
      max_value: 2 // India population is roughly 1.4B
    },
    trai_telephone_subscribers_total: {
      approved_domain: 'trai.gov.in',
      extraction_method: 'pdf_parse',
      expected_unit: 'B', // Must be billions
      min_value: 0.5,
      max_value: 2 // Should be roughly 1.1 - 1.2 billion
    },
    ev_sales_total: {
      approved_domain: 'analytics.parivahan.gov.in',
      extraction_method: 'api_json',
      expected_unit: 'units', 
      min_value: 0,
      max_value: 5000000 
    },
    aai_domestic_passengers: {
      approved_domain: 'aai.aero',
      extraction_method: 'pdf_parse',
      expected_unit: 'millions',
      min_value: 0,
      max_value: 100 // Typically around 20-30 million per month
    },
    amfi_total_aum_cr: {
      approved_domain: 'portal.amfiindia.com',
      extraction_method: 'xls_parse',
      expected_unit: 'INR Crore',
      min_value: 1000000,
      max_value: 20000000 // AUM is around 85 Lakh Crore (8500000)
    }
    // Future metrics added here after source governance audit
  }
};
