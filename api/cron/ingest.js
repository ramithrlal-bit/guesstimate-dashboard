const { extractNPCI } = require('../../lib/connectors/npci');
const { extractWorldBankPopulation } = require('../../lib/connectors/worldbank');
const { extractTRAI } = require('../../lib/connectors/trai');
const { extract: extractVahan } = require('../../lib/connectors/vahan');
const { persistObservation } = require('../../lib/core/persister');
const { extractRBIRepoRate } = require('../../lib/connectors/rbi');

module.exports = async function(req, res) {
  // Cron authorization check for Vercel
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('Starting ingestion pipeline...');
  
  const results = {};

  // 1. NPCI Connector (Disabled due to bot protection)
  const npciResult = await extractNPCI();
  if (npciResult.success) {
    try {
      const persistRes = await persistObservation({
        metric_id: 'upi_vol_monthly',
        value: npciResult.data.value,
        display_value: npciResult.data.display_value,
        period_label: npciResult.data.period_label,
        source_url: npciResult.data.source_url,
        data_type: 'numeric' // NPCI currently has this, keep unchanged
      });
      results.npci = { success: true, status: persistRes.status };
    } catch (e) {
      console.error('[Ingest] Failed to persist NPCI data:', e.message);
      results.npci = { success: false, error: e.message };
    }
  } else {
    console.error('[Ingest] NPCI Connector Failed:', npciResult.error);
    console.log('[Ingest] Skipping downstream pipeline for NPCI due to upstream failure.');
    results.npci = { success: false, error: npciResult.error };
  }

  // 2. World Bank Connector
  const wbResult = await extractWorldBankPopulation();
  if (wbResult.success) {
    try {
      // The connector already returns the full payload structure correctly formatted
      const persistRes = await persistObservation(wbResult.data);
      results.worldbank = { success: true, status: persistRes.status };
    } catch (e) {
      console.error('[Ingest] Failed to persist World Bank data:', e.message);
      results.worldbank = { success: false, error: e.message };
    }
  } else {
    console.error('[Ingest] World Bank Connector Failed:', wbResult.error);
    results.worldbank = { success: false, error: wbResult.error };
  }
  
  // 3. TRAI Connector
  const traiResult = await extractTRAI();
  if (traiResult.success) {
    try {
      const persistRes = await persistObservation(traiResult.data);
      results.trai = { success: true, status: persistRes.status };
    } catch (e) {
      console.error('[Ingest] Failed to persist TRAI data:', e.message);
      results.trai = { success: false, error: e.message };
    }
  } else {
    console.error('[Ingest] TRAI Connector Failed:', traiResult.error);
    results.trai = { success: false, error: traiResult.error };
  }

  // 4. VAHAN Connector
  try {
    const vahanData = await extractVahan();
    const persistRes = await persistObservation(vahanData);
    results.vahan = { success: true, status: persistRes.status };
  } catch (e) {
    console.error('[Ingest] VAHAN Connector Failed:', e.message);
    results.vahan = { success: false, error: e.message };
  }

  // 5. AAI Connector
  try {
    const { extract: extractAAI } = require('../../lib/connectors/aai');
    const aaiData = await extractAAI();
    const persistRes = await persistObservation(aaiData);
    results.aai = { success: true, status: persistRes.status };
  } catch (e) {
    console.error('[Ingest] AAI Connector Failed:', e.message);
    results.aai = { success: false, error: e.message };
  }

  // 6. AMFI Connector
  try {
    const { extract: extractAMFI } = require('../../lib/connectors/amfi');
    const amfiData = await extractAMFI();
    const persistRes = await persistObservation(amfiData);
    results.amfi = { success: true, status: persistRes.status };
  } catch (e) {
    console.error('[Ingest] AMFI Connector Failed:', e.message);
    results.amfi = { success: false, error: e.message };
  }

  // 7. RBI Connector
  const rbiResult = await extractRBIRepoRate();
  if (rbiResult.success) {
    try {
      const persistRes = await persistObservation(rbiResult.data);
      results.rbi = { success: true, status: persistRes.status };
    } catch (e) {
      console.error('[Ingest] Failed to persist RBI data:', e.message);
      results.rbi = { success: false, error: e.message };
    }
  } else {
    console.error('[Ingest] RBI Connector Failed:', rbiResult.error);
    results.rbi = { success: false, error: rbiResult.error };
  }

  // 8. IAMAI Connector
  try {
    const { extract: extractIAMAI } = require('../../lib/connectors/iamai');
    const iamaiDataArray = await extractIAMAI();
    results.iamai = { success: true, status: [] };
    for (const data of iamaiDataArray) {
      const persistRes = await persistObservation(data);
      results.iamai.status.push(persistRes.status);
    }
  } catch (e) {
    console.error('[Ingest] IAMAI Connector Failed:', e.message);
    results.iamai = { success: false, error: e.message };
  }

  console.log('Ingestion pipeline finished.');
  return res.status(200).json({ success: true, results });
};
