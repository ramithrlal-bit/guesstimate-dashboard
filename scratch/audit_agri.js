require('dotenv').config();
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// 1. HTML
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/data-metric="agri_[^"]+"/g) || [];
const htmlKeys = [...new Set(match.map(s => s.replace('data-metric="', '').replace('"', '')))];

// 2. Registry
const registry = require('../lib/core/registry.js');
const regKeys = Object.keys(registry.metrics || {}).filter(k => k.startsWith('agri_'));

(async () => {
    // 3. Supabase Metrics
    const { data: mData } = await supabase.from('metrics').select('metric_id').like('metric_id', 'agri_%');
    const dbKeys = mData.map(r => r.metric_id);
    
    console.log('HTML Count:', htmlKeys.length);
    console.log('Registry Count:', regKeys.length);
    console.log('DB Count:', dbKeys.length);
    
    const allKeys = [...new Set([...htmlKeys, ...regKeys, ...dbKeys])];
    for (const k of allKeys) {
        if (!htmlKeys.includes(k) || !regKeys.includes(k) || !dbKeys.includes(k)) {
            console.log('Mismatch:', k);
        }
    }
    
    // 4. Registry constraints
    let badConstraints = 0;
    for (const k of regKeys) {
        const v = registry.metrics[k] || registry[k];
        if (v.extraction_method !== 'MANUAL_NO_RELIABLE_SOURCE') {
            console.log('Bad extraction method:', k, v.extraction_method);
            badConstraints++;
        }
        if (v.min_value !== 0) console.log('Bad min_value:', k, v.min_value);
        if (v.expected_unit === '%' && v.max_value !== 100) {
            console.log('Bad max_value for %:', k, v.max_value);
            badConstraints++;
        }
    }
    console.log('Bad constraints:', badConstraints);
    
    // 5. Observations
    const { data: obsData } = await supabase.from('observations').select('id, metric_id').in('metric_id', dbKeys);
    console.log('Observations found:', obsData.length);
    
})();
