const fetch = require('node-fetch');

async function extractRBIRepoRate() {
  const url = 'https://www.rbi.org.in/';
  
  console.log(`[RBI Connector] Fetching ${url}...`);
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });

    console.log(`[RBI Connector] Status: ${response.status}`);
    
    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` };
    }

    const html = await response.text();
    
    // Look for "Policy Repo Rate" and the following value
    // e.g. <th>Policy Repo Rate</th><td>: 5.25%</td>
    const regex = /Policy Repo Rate\s*<\/th>\s*<td[^>]*>\s*:\s*([\d\.]+)%/is;
    const match = html.match(regex);
    
    if (match && match[1]) {
      const rateStr = match[1];
      const rateNum = parseFloat(rateStr);
      
      if (!isNaN(rateNum)) {
        return {
          success: true,
          data: {
            metric_id: 'bonus_rbi_repo_rate_2026',
            value: rateNum,
            display_value: `${rateNum.toFixed(2)}%`,
            period_label: 'Current',
            source_url: url,
            data_type: 'numeric'
          }
        };
      } else {
         return { success: false, error: 'Extraction failed: matched string is not a valid number.' };
      }
    } else {
      return { success: false, error: 'Extraction failed: could not find repo rate in HTML.' };
    }
  } catch (error) {
    console.error('[RBI Connector] Error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { extractRBIRepoRate };
