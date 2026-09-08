const fetch = require('node-fetch');

async function extractWorldBankPopulation() {
  const sourceUrl = 'https://api.worldbank.org/v2/country/ind/indicator/SP.POP.TOTL?format=json&mrnev=1';
  
  console.log(`[WorldBank Connector] Fetching ${sourceUrl}...`);
  try {
    const response = await fetch(sourceUrl);

    console.log(`[WorldBank Connector] Status: ${response.status}`);
    
    if (!response.ok) {
      console.error(`[WorldBank Connector] Extraction failed. HTTP ${response.status}`);
      return {
        success: false,
        error: `HTTP ${response.status}`
      };
    }

    const json = await response.json();

    // World Bank API returns an array: [paginationInfo, dataArray]
    if (!json || !json[1] || json[1].length === 0) {
      console.error('[WorldBank Connector] Unexpected JSON structure or empty data');
      return {
        success: false,
        error: 'Unexpected JSON structure or empty data'
      };
    }

    const record = json[1][0];
    const rawValue = record.value;
    const year = record.date;

    if (rawValue === null || typeof rawValue === 'undefined') {
      console.error('[WorldBank Connector] Latest population value is null');
      return {
        success: false,
        error: 'Latest population value is null'
      };
    }

    // Convert to billions and round to 3 decimal places
    const valueInBillion = rawValue / 1_000_000_000;
    const normalizedValue = parseFloat(valueInBillion.toFixed(3));

    return {
      success: true,
      data: {
        metric_id: 'pop_india_total',
        value: normalizedValue,
        display_value: `${normalizedValue}B`,
        period_label: year,
        period_start: `${year}-01-01`,
        period_end: `${year}-12-31`,
        source_url: sourceUrl,
        data_type: 'official'
      }
    };
  } catch (error) {
    console.error('[WorldBank Connector] Network/Parsing error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = { extractWorldBankPopulation };
