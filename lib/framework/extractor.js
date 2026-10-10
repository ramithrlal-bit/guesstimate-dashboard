/**
 * Extracts a specific value from raw text or structured data using deterministic rules.
 */
function extractValue(rawContent, rule) {
    if (rule.type === 'regex') {
        const text = typeof rawContent === 'object' ? rawContent.text : rawContent;
        const match = text.match(rule.pattern);
        if (match && match[rule.group || 1]) {
            return match[rule.group || 1].trim();
        }
        throw new Error(`Regex pattern ${rule.pattern} did not match.`);
    }
    
    if (rule.type === 'cheerio') {
        const cheerio = require('cheerio');
        const html = typeof rawContent === 'object' ? rawContent.html : rawContent;
        const $ = cheerio.load(html);
        const element = $(rule.selector);
        if (element.length === 0) throw new Error(`Selector ${rule.selector} not found.`);
        return element.text().trim();
    }
    
    // Stub for AI-assisted extraction
    if (rule.type === 'ai') {
        throw new Error('AI extraction not fully implemented in this POC. Use deterministic rules.');
    }
    
    throw new Error(`Unsupported extraction rule type: ${rule.type}`);
}

module.exports = { extractValue };
