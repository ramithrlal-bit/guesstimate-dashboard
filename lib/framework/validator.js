const registry = require('../core/registry');

/**
 * Validates the normalised value against the registry constraints.
 */
function validateValue(metricId, value, sourceUrl = null) {
    const meta = registry.metrics[metricId];
    if (!meta) {
        throw new Error(`Metric ${metricId} not found in registry.`);
    }
    
    if (typeof value === 'number') {
        if (value < meta.min_value || value > meta.max_value) {
            throw new Error(`Value ${value} is outside permitted bounds [${meta.min_value}, ${meta.max_value}] for metric ${metricId}`);
        }
    }

    if (sourceUrl && meta.approved_domain && meta.approved_domain !== 'unknown') {
        try {
            const urlObj = new URL(sourceUrl);
            if (urlObj.protocol !== 'https:') {
                throw new Error(`Source URL for ${metricId} must use HTTPS: ${sourceUrl}`);
            }
            if (urlObj.hostname !== meta.approved_domain && !urlObj.hostname.endsWith('.' + meta.approved_domain)) {
                throw new Error(`Domain ${urlObj.hostname} does not match approved ${meta.approved_domain} for metric ${metricId}`);
            }
        } catch (e) {
            if (e.message.startsWith('Domain') || e.message.startsWith('Source URL')) throw e;
            throw new Error(`Invalid source URL for ${metricId}: ${sourceUrl}`);
        }
    }
    
    return true;
}

module.exports = { validateValue };
