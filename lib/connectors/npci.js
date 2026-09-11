const fetch = require('node-fetch');

function getFinancialYearRange(date = new Date()) {
  const month = date.getMonth(); // 0 = Jan, 3 = Apr
  const year = date.getFullYear();
  if (month < 3) {
    return `${year - 1}-${year.toString().slice(-2)}`;
  } else {
    return `${year}-${(year + 1).toString().slice(-2)}`;
  }
}

async function extractNPCI() {
  const yr = getFinancialYearRange();
  const apiUrl = `https://www.npci.org.in/api/product-statistic/tab/detail?product_name=upi&tab_name=product-statistics-upi&year_range=${yr}&excel_type=monthly&page_no=1&page_size=10&locale=en`;
  const displayUrl = 'https://www.npci.org.in/product/upi/product-statistics';
  
  console.log(`[NPCI Connector] Fetching JSON API: ${apiUrl}...`);
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': displayUrl
      }
    });

    console.log(`[NPCI Connector] Status: ${response.status}`);
    
    if (response.status === 403) {
      console.error('[NPCI Connector] Extraction failed. HTTP 403: Request blocked by bot protection.');
      // Fail safely as per Source Governance Rule #1
      return {
        success: false,
        error: 'HTTP 403: Bot protection'
      };
    }

    if (!response.ok) {
      console.error(`[NPCI Connector] Extraction failed. HTTP ${response.status}`);
      return {
        success: false,
        error: `HTTP ${response.status}`
      };
    }

    const data = await response.json();
    
    let records = [];
    if (Array.isArray(data)) {
        records = data;
    } else if (data && Array.isArray(data.data)) {
        records = data.data;
    } else if (data && data.items && Array.isArray(data.items)) {
        records = data.items;
    } else {
        return { success: false, error: 'Extraction failed: Unrecognized JSON schema. Expected array of records.' };
    }

    if (records.length === 0) {
       return { success: false, error: 'Extraction failed: No records found for current year_range.' };
    }

    // Sort by ID descending to get the latest record
    records.sort((a, b) => b.id - a.id);
    const latest = records[0];

    // Schema Check
    if (!latest.volume_in_mn || !latest.month) {
       return { success: false, error: 'Extraction failed: Missing required fields (volume_in_mn, month) in latest record.' };
    }

    // Normalization (Commas removed, parse float)
    const volMnStr = latest.volume_in_mn.toString().replace(/,/g, '');
    const volMnNum = parseFloat(volMnStr);

    if (isNaN(volMnNum)) {
       return { success: false, error: 'Extraction failed: volume_in_mn is not a valid number.' };
    }

    // Unit Conversion: million to billion
    const valBillion = volMnNum / 1000;

    return {
      success: true,
      data: {
        value: valBillion,
        display_value: `${valBillion.toFixed(2)}B`,
        period_label: latest.month, // e.g., "July-2026"
        source_url: displayUrl // The provenance URL remains the HTML page
      }
    };
  } catch (error) {
    console.error('[NPCI Connector] Network/Parsing error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = { extractNPCI, getFinancialYearRange };
