/**
 * Normalises raw string values into numbers and consistent units.
 */
function normaliseValue(rawValue, type = 'numeric', unitConversion = null) {
    if (type !== 'numeric') return rawValue;
    
    // Remove commas and extract numbers
    let cleaned = rawValue.replace(/,/g, '');
    let number = parseFloat(cleaned);
    
    if (isNaN(number)) {
        throw new Error(`Could not parse number from raw value: ${rawValue}`);
    }
    
    if (unitConversion === 'LMT_to_MT') {
        number = number / 10;
    } else if (unitConversion === 'Crore_to_Million') {
        number = number * 10;
    } else if (unitConversion === 'Lakh_to_Million') {
        number = number / 10;
    } else if (unitConversion === 'Million_to_Units') {
        number = number * 1000000;
    }
    
    // Round to 2 decimal places to avoid floating point weirdness
    return Math.round(number * 100) / 100;
}

module.exports = { normaliseValue };
