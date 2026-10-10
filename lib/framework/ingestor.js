const { retrieveSource } = require('./retriever');
const { extractValue } = require('./extractor');
const { normaliseValue } = require('./normaliser');
const { validateValue } = require('./validator');
const { persistObservation } = require('../core/persister');

/**
 * Orchestrates the ingestion pipeline for a single metric.
 */
async function processIngestion(config, isDryRun = false) {
    try {
        console.log(`[Ingestor] Processing ${config.metric_id} from ${config.url}`);
        
        // 1. Retrieve
        const rawContent = await retrieveSource(config.url, config.retrieverOptions);
        
        // 2. Extract
        const rawString = extractValue(rawContent, config.extractionRule);
        console.log(`[Ingestor] Extracted raw string: "${rawString}"`);
        
        // 3. Normalise
        const value = normaliseValue(rawString, 'numeric', config.unitConversion);
        console.log(`[Ingestor] Normalised value: ${value}`);
        
        // 4. Validate
        validateValue(config.metric_id, value);
        console.log(`[Ingestor] Validation passed.`);
        
        const observation = {
            metric_id: config.metric_id,
            value: value,
            display_value: config.formatDisplay(value),
            period_label: config.period_label,
            period_end: config.period_end,
            source_url: config.url,
            data_type: config.data_type
        };
        
        // 5. Persist
        if (isDryRun) {
            console.log(`[Ingestor] Dry run complete. Would persist:`, observation);
            return { success: true, status: 'dry_run', data: observation };
        } else {
            const persistRes = await persistObservation(observation);
            return { success: true, status: persistRes.status, data: observation };
        }
    } catch (error) {
        console.error(`[Ingestor] Error processing ${config.metric_id}: ${error.message}`);
        return { success: false, error: error.message };
    }
}

module.exports = { processIngestion };
