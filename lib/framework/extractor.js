/**
 * Extracts a specific value from raw text or structured data using deterministic rules.
 */
function extractValue(rawContent, rule) {
    if (rule.type === 'regex') {
        const text = typeof rawContent === 'object' ? rawContent.text : rawContent;
        const match = text.match(rule.pattern);
        if (match && match[rule.group || 1]) {
            return { value: match[rule.group || 1].trim() };
        }
        throw new Error(`Regex pattern ${rule.pattern} did not match.`);
    }
    
    if (rule.type === 'cheerio') {
        const cheerio = require('cheerio');
        const html = typeof rawContent === 'object' ? rawContent.html : rawContent;
        const $ = cheerio.load(html);
        const element = $(rule.selector);
        if (element.length === 0) throw new Error(`Selector ${rule.selector} not found.`);
        return { value: element.text().trim() };
    }
    
    if (rule.type === 'ai') {
        throw new Error('AI extraction not fully implemented in this POC. Use deterministic rules.');
    }
    
    if (rule.type === 'json') {
        const json = typeof rawContent === 'object' ? JSON.parse(rawContent.text) : JSON.parse(rawContent);
        
        // Legacy support
        if (typeof rule.evaluate === 'function') {
            const res = rule.evaluate(json);
            if (typeof res === 'object' && res !== null && 'value' in res) {
                return res;
            }
            return { value: String(res) };
        }

        // Deterministic JSON path configuration
        if (rule.arrayPath && rule.valuePath && rule.periodPath) {
            let arrayTarget = json;
            const pathParts = rule.arrayPath.split('.');
            for (const part of pathParts) {
                if (arrayTarget && arrayTarget[part] !== undefined) {
                    arrayTarget = arrayTarget[part];
                } else {
                    throw new Error(`Path ${rule.arrayPath} not found in JSON.`);
                }
            }
            
            if (!Array.isArray(arrayTarget)) {
                throw new Error(`Target at arrayPath ${rule.arrayPath} is not an array.`);
            }

            let bestObs = null;
            let bestPeriodNum = -Infinity;

            for (const obs of arrayTarget) {
                const val = obs[rule.valuePath];
                const period = obs[rule.periodPath];

                if (val === null || val === undefined) continue;
                if (period === null || period === undefined) continue;

                // Strip non-digits to parse the year
                const periodStr = String(period);
                const periodNum = parseInt(periodStr.replace(/\D/g, ''), 10);
                if (isNaN(periodNum)) continue;

                if (periodNum > bestPeriodNum) {
                    bestPeriodNum = periodNum;
                    bestObs = { value: String(val), period: periodStr };
                }
            }

            if (!bestObs) {
                throw new Error('No valid observation found in the JSON array.');
            }

            return bestObs;
        }

        throw new Error('JSON rule requires evaluate function or deterministic arrayPath, valuePath, periodPath configuration.');
    }
    
    throw new Error(`Unsupported extraction rule type: ${rule.type}`);
}

module.exports = { extractValue };
