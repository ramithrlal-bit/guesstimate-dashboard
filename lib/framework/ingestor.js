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
        let extractedValue, extractedPeriod;
        const extractionResult = extractValue(rawContent, config.extractionRule);
        
        if (typeof extractionResult === 'object' && extractionResult !== null) {
            extractedValue = extractionResult.value;
            extractedPeriod = extractionResult.period;
        } else {
            extractedValue = extractionResult;
        }

        console.log(`[Ingestor] Extracted raw string: "${extractedValue}"`);
        if (extractedPeriod) {
            console.log(`[Ingestor] Extracted dynamic period: "${extractedPeriod}"`);
        }
        
        // 3. Normalise
        const value = normaliseValue(extractedValue, 'numeric', config.unitConversion);
        console.log(`[Ingestor] Normalised value: ${value}`);
        
        // 4. Validate
        validateValue(config.metric_id, value, config.url);
        console.log(`[Ingestor] Validation passed.`);

        // Dynamic period logic
        let periodLabel = extractedPeriod || config.period_label;
        let periodStart = config.period_start;
        let periodEnd = config.period_end;

        // Auto-generate start/end for year-only strings if not explicitly provided
        if (extractedPeriod && /^\d{4}$/.test(extractedPeriod)) {
            periodStart = periodStart || `${extractedPeriod}-01-01`;
            periodEnd = periodEnd || `${extractedPeriod}-12-31`;
        }
        
        const observation = {
            metric_id: config.metric_id,
            value: value,
            display_value: config.formatDisplay(value),
            period_label: periodLabel,
            period_start: periodStart,
            period_end: periodEnd,
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
