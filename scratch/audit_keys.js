const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const registry = require('../lib/core/registry.js');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    // 1. Extract from HTML
    const htmlMatch = html.match(/data-metric="quickcommerce_[^"]+"/g) || [];
    const htmlKeys = [...new Set(htmlMatch.map(s => s.replace('data-metric="', '').replace('"', '')))];
    
    // 2. Extract from Registry
    const regKeys = Object.keys(registry.metrics || {}).filter(k => k.startsWith('quickcommerce_'));
    
    // 3. Extract from Supabase
    const { data: metricsData, error } = await supabase.from('metrics').select('metric_id').eq('category', 'Quick Commerce');
    if (error) { console.error(error); return; }
    
    const dbKeys = metricsData.map(r => r.metric_id);
    
    console.log('HTML Keys Count:', htmlKeys.length);
    console.log('Registry Keys Count:', regKeys.length);
    console.log('Supabase Keys Count:', dbKeys.length);
    
    const allKeys = new Set([...htmlKeys, ...regKeys, ...dbKeys]);
    for (const k of allKeys) {
        if (!htmlKeys.includes(k) || !regKeys.includes(k) || !dbKeys.includes(k)) {
            console.log(`Mismatch for ${k} -> HTML: ${htmlKeys.includes(k)}, Registry: ${regKeys.includes(k)}, DB: ${dbKeys.includes(k)}`);
        }
    }
})();
