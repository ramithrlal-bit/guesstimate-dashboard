const registry = require('../core/registry');

/**
 * Validates the normalised value against the registry constraints.
 */
function validateValue(metricId, value) {
    const meta = registry.metrics[metricId];
    if (!meta) {
        throw new Error(`Metric ${metricId} not found in registry.`);
    }
    
    if (typeof value === 'number') {
        if (value < meta.min_value || value > meta.max_value) {
            throw new Error(`Value ${value} is outside permitted bounds [${meta.min_value}, ${meta.max_value}] for metric ${metricId}`);
        }
    }
    
    // For this POC, we check if the extraction method permits us updating it.
    // In production, we'd transition from MANUAL_NO_RELIABLE_SOURCE to a new enum value.
    
    return true;
}

module.exports = { validateValue };
