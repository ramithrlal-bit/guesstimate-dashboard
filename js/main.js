(async function(){
  "use strict";

  // ---- World Population Decimal Formatter (Task 2) ----
  function formatWorldPopulation(val) {
    const num = Number(val);
    if (!num || isNaN(num)) return '~8.3B';
    return '~' + (num / 1e9).toFixed(1) + 'B';
  }

  // ---- Supabase & Reference Data Hydration (Task 1) ----
  const SUPABASE_URL = 'https://ylxxyhkylixdejxakbys.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_KmVN6kXwRq9MfCJezk_ibA_L1FUB8Lb';

  async function loadDashboardData() {
    // 1. Resolve Reference Dataset (Synchronous bundle or asynchronous fetch)
    let refMap = window.REFERENCE_DATA || {};
    if (!refMap || Object.keys(refMap).length === 0) {
      try {
        const refRes = await fetch('data/reference_data.json');
        if (refRes.ok) {
          refMap = await refRes.json();
        }
      } catch (refErr) {
        console.warn('Reference data fetch failed, fallback to empty:', refErr);
      }
    }

    // 2. Query Verified Backend Observations from Supabase (Isolated fail-safe)
    const obsMap = {};
    if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const { data, error } = await client
          .from('latest_observations')
          .select('*')
          .eq('verification_status', 'verified');

        if (error) {
          console.warn('Supabase query error (proceeding with reference data):', error);
        } else if (data) {
          data.forEach(obs => {
            obsMap[obs.metric_key] = obs;
          });
        }
      } catch (sbErr) {
        console.warn('Supabase unreachable (proceeding with reference data):', sbErr);
      }
    }

    // 3. Hydrate All DOM [data-metric] Cards with Strict Precedence
    document.querySelectorAll('[data-metric]').forEach(el => {
      const key = el.getAttribute('data-metric');
      const obs = obsMap[key];
      const ref = refMap[key];

      // Dedicated 2026 projection check for headline population metrics
      const isPop2026Proj = (key === 'pop_india_total' || key === 'global_world_population') && ref && ref.reporting_period && ref.reporting_period.includes('2026');

      // Dedicated check for audited Section 02 Digital metrics where authoritative 2025/2026 updates supersede stale observations
      const isDigitalAudited = (
        key === 'digital_internet_users' ||
        key === 'hero_digital_internet_users' ||
        key === 'digital_internet_penetration' ||
        key === 'digital_internet_subscribers' ||
        key === 'digital_broadband_subscribers' ||
        key === 'digital_mobile_connections' ||
        key === 'trai_telephone_subscribers_total' ||
        key === 'digital_unique_mobile_subscribers' ||
        key === 'digital_urban_internet_users' ||
        key === 'digital_rural_internet_users' ||
        key === 'digital_smartphone_users' ||
        key === 'general_smartphone_users_india' ||
        key === 'digital_feature_phone_users' ||
        key === 'digital_5g_users' ||
        key === 'digital_fintech_users' ||
        key === 'digital_upi_users' ||
        key === 'digital_online_shoppers' ||
        key === 'digital_social_media_user_identities' ||
        key === 'digital_upi_monthly_transactions' ||
        key === 'digital_upi_transaction_volume_dec_2025' ||
        key === 'digital_upi_daily_transactions' ||
        key === 'digital_upi_annual_transactions' ||
        key === 'digital_avg_daily_video_watch_time_per_user_youtube' ||
        key === 'digital_whatsapp_users'
      ) && ref;

      // Dedicated check for audited Section 03 FinTech metrics where authoritative 2025/2026 updates supersede stale observations
      const isFintechAudited = (
        key === 'upi_vol_annual' ||
        key === 'upi_val_annual' ||
        key === 'upi_vol_monthly' ||
        key === 'fintech_upi_unique_users' ||
        key === 'fintech_daily_avg_upi_transactions' ||
        key === 'fintech_yoy_growth_transaction_volume' ||
        key === 'fintech_total_bank_deposits_2025' ||
        key === 'fintech_total_bank_credit_2025' ||
        key === 'fintech_gross_npa_mar_2025_20_yr_low' ||
        key === 'fintech_psb_profit_fy25' ||
        key === 'fintech_bank_branches' ||
        key === 'fintech_atms' ||
        key === 'fintech_bank_account_holders_jan_dhan' ||
        key === 'fintech_crar_capital_buffer' ||
        key === 'amfi_total_aum_cr' ||
        key === 'fintech_credit_cards' ||
        key === 'fintech_debit_cards' ||
        key === 'fintech_mobile_wallet_accounts' ||
        key === 'fintech_bnpl_users' ||
        key === 'fintech_monthly_sip_inflow' ||
        key === 'fintech_fintech_unicorns' ||
        key === 'fintech_digital_payments_value_2025'
      ) && ref;

      if (obs && !isPop2026Proj && !isDigitalAudited && !isFintechAudited) {
        // Priority 1: Verified Live Backend Observation (always overrides reference data)
        el.classList.remove('ref-metric');
        el.classList.add('verified-metric');

        if (key === 'global_world_population') {
          el.innerHTML = formatWorldPopulation(obs.value);
        } else if (obs.display_value && obs.display_value !== '—') {
          el.innerHTML = obs.display_value;
        } else if (obs.value !== null && obs.value !== undefined) {
          let num = Number(obs.value);
          let formatted = num.toLocaleString('en-IN');
          if (num >= 10000000) {
            formatted = (num / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
          } else if (num >= 1000000) {
            formatted = (num / 1000000).toFixed(2).replace(/\.00$/, '') + 'M';
          } else if (num >= 1000) {
            formatted = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
          }
          if (obs.format_template) {
            let baseVal = formatted.replace(/[a-zA-Z\s]+$/, '');
            el.innerHTML = obs.format_template.replace('{{val}}', baseVal);
          } else {
            el.innerHTML = formatted;
          }
        }

        const periodInfo = obs.period_label ? ' (' + obs.period_label + ')' : '';
        el.setAttribute('title', 'Verified Live Observation' + periodInfo + ' [' + (obs.data_type || 'official') + ']');
      } else if (ref) {
        // Priority 2: Authoritative Reference Data
        el.classList.remove('verified-metric');
        el.classList.add('ref-metric');

        if (key === 'global_world_population') {
          el.innerHTML = ref.display_value || formatWorldPopulation(ref.value);
        } else if (key === 'digital_internet_users' && el.classList.contains('num')) {
          el.innerHTML = '~1.03B';
        } else {
          el.innerHTML = ref.display_value;
        }

        const statusTag = ref.data_status || 'Reference';
        const periodTag = ref.reporting_period ? ' (' + ref.reporting_period + ')' : '';
        let tooltipText = 'Reference Data [' + statusTag + ']: ' + ref.source_name + periodTag;
        if (ref.definition) {
          tooltipText += '\nDefinition: ' + ref.definition;
        }
        if (ref.unit) {
          tooltipText += '\nUnit: ' + ref.unit;
        }
        if (ref.methodology_notes) {
          tooltipText += '\nNote: ' + ref.methodology_notes;
        }
        el.setAttribute('title', tooltipText);
      } else {
        // Priority 3: Fail-closed fallback (Data unavailable)
        el.classList.remove('verified-metric', 'ref-metric');
        el.innerHTML = '<span class="unavailable" title="Data unavailable">—</span>';
      }
    });

    console.log('Dashboard hydrated: verified backend observations prioritized, reference dataset populated, missing fail-closed.');
  }

  // Trigger metrics hydration immediately
  loadDashboardData();

  // ---- State Map & Table Setup ----
  let DATA;
  try {
    const response = await fetch('data/states.json');
    if (response.ok) {
      DATA = await response.json();
    }
  } catch (err) {
    console.warn("Failed to fetch states data:", err);
  }

  if (DATA && DATA.states) {
    var states = DATA.states;

    function fmtPop(n){
      if(n >= 10000000){ return (n/10000000).toFixed(2).replace(/\.00$/, '') + ' Cr'; }
      return (n/100000).toFixed(1) + ' L';
    }
    function fmtFull(n){ return n.toLocaleString('en-IN'); }
    function popClass(n){
      if(n < 2000000) return 'p1';
      if(n < 10000000) return 'p2';
      if(n < 35000000) return 'p3';
      if(n < 70000000) return 'p4';
      if(n < 110000000) return 'p5';
      return 'p6';
    }

    // Build SVG map
    var svg = document.getElementById('indiaMap');
    var ns = 'http://www.w3.org/2000/svg';
    if (svg) {
      states.forEach(function(s){
        var path = document.createElementNS(ns, 'path');
        path.setAttribute('d', s.path);
        path.setAttribute('data-id', s.id);
        path.setAttribute('class', popClass(s.pop));
        path.setAttribute('tabindex', '0');
        path.setAttribute('role', 'button');
        path.setAttribute('aria-label', s.name + ', population ' + fmtFull(s.pop) + ' (' + fmtPop(s.pop) + ')');
        svg.appendChild(path);
      });
    }

    var tooltip = document.getElementById('mapTooltip');
    function showTooltip(s, x, y){
      if (!tooltip) return;
      tooltip.innerHTML = '<b>'+s.name+'</b>' +
        '<div class="tt-row">Population: '+fmtFull(s.pop)+' ('+fmtPop(s.pop)+') [1 Mar 2026 proj.]</div>' +
        '<div class="tt-row">Share of India: '+s.share+'%</div>' +
        '<div class="tt-row">Rank: '+s.rank+'</div>';
      tooltip.style.display = 'block';
      var tw = 240, th = 95;
      var left = x + 16, top = y + 16;
      if(left + tw > window.innerWidth) left = x - tw - 16;
      if(top + th > window.innerHeight) top = y - th - 16;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }
    function hideTooltip(){ if (tooltip) tooltip.style.display = 'none'; }

    var byId = {};
    states.forEach(function(s){ byId[s.id] = s; });

    function selectState(id, scroll){
      var s = byId[id];
      if(!s) return;
      if (svg) {
        svg.querySelectorAll('path.selected').forEach(function(p){ p.classList.remove('selected'); });
        var p = svg.querySelector('path[data-id="'+id+'"]');
        if(p) p.classList.add('selected');
      }
      var spName = document.getElementById('spName');
      var spPop = document.getElementById('spPop');
      var spShare = document.getElementById('spShare');
      var spRank = document.getElementById('spRank');
      var spGrowth = document.getElementById('spGrowth');
      var spNote = document.getElementById('spNote');
      var spPanel = document.getElementById('statePanel');

      if (spName) spName.textContent = s.name;
      if (spPop) {
        spPop.textContent = fmtPop(s.pop);
        spPop.setAttribute('title', 'Exact population: ' + fmtFull(s.pop) + ' (MoHFW Table 8, 1 March 2026 projection)');
      }
      if (spShare) spShare.textContent = s.share + '%';
      if (spRank) spRank.textContent = s.rank;
      if (spGrowth) spGrowth.textContent = '+' + s.growth + '%';
      if (spNote) spNote.textContent = s.note || (s.name + ': projected population ' + fmtPop(s.pop) + ', ' + s.share + '% of India (MoHFW Report 2011–2036, 1 March 2026)');
      if (spPanel) spPanel.classList.add('show');

      document.querySelectorAll('#stateTableBody tr').forEach(function(tr){
        tr.classList.toggle('selected', tr.getAttribute('data-id') === id);
      });
      if(scroll){
        var row = document.querySelector('#stateTableBody tr[data-id="'+id+'"]');
        if(row) row.scrollIntoView({block:'nearest'});
      }
    }

    if (svg) {
      svg.addEventListener('mousemove', function(e){
        var t = e.target;
        if(t.tagName === 'path'){
          var s = byId[t.getAttribute('data-id')];
          if(s) showTooltip(s, e.clientX, e.clientY);
        }
      });
      svg.addEventListener('mouseleave', hideTooltip);
      svg.addEventListener('click', function(e){
        var t = e.target;
        if(t.tagName === 'path') selectState(t.getAttribute('data-id'), false);
      });
      svg.addEventListener('keydown', function(e){
        if((e.key === 'Enter' || e.key === ' ') && e.target.tagName === 'path'){
          e.preventDefault();
          selectState(e.target.getAttribute('data-id'), false);
        }
      });
      svg.addEventListener('touchstart', function(e){
        var t = e.target;
        if(t.tagName === 'path'){
          var s = byId[t.getAttribute('data-id')];
          var touch = e.touches[0];
          if(s && touch) showTooltip(s, touch.clientX, touch.clientY);
        }
      }, {passive:true});
    }

    document.addEventListener('touchstart', function(e){
      if(svg && !svg.contains(e.target)) hideTooltip();
    }, {passive:true});

    // Build state table
    var tbody = document.getElementById('stateTableBody');
    var sortDesc = true;
    function renderTable(filterText){
      if (!tbody) return;
      var list = states.slice();
      list.sort(function(a,b){ return sortDesc ? b.pop - a.pop : a.pop - b.pop; });
      if(filterText){
        var f = filterText.toLowerCase();
        list = list.filter(function(s){ return s.name.toLowerCase().indexOf(f) !== -1; });
      }
      tbody.innerHTML = '';
      list.forEach(function(s){
        var tr = document.createElement('tr');
        tr.setAttribute('data-id', s.id);
        tr.innerHTML = '<td class="num">'+s.rank+'</td><td>'+s.name+'</td><td class="num">'+fmtFull(s.pop)+'</td><td class="num">'+s.share+'%</td>';
        tr.addEventListener('click', function(){ selectState(s.id, false); if (svg) svg.scrollIntoView({block:'center', behavior:'smooth'}); });
        tbody.appendChild(tr);
      });
    }
    renderTable('');

    // Pre-select Uttar Pradesh on initial load so panel is immediately visible
    selectState('UP', false);

    var stateSearch = document.getElementById('stateSearch');
    if (stateSearch) {
      stateSearch.addEventListener('input', function(e){
        renderTable(e.target.value);
      });
    }

    var sortPopBtn = document.getElementById('sortPopBtn');
    if (sortPopBtn) {
      sortPopBtn.addEventListener('click', function(e){
        sortDesc = !sortDesc;
        e.target.textContent = 'Sort: population ' + (sortDesc ? '↓' : '↑');
        renderTable(document.getElementById('stateSearch').value);
      });
    }
  }

  // ---- Chip + search filtering (global) ----
  var chips = document.querySelectorAll('.chip');
  var sections = document.querySelectorAll('.sec');
  var activeCat = 'all';

  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      activeCat = chip.getAttribute('data-cat');
      applyFilter();
    });
  });

  var searchInput = document.getElementById('searchInput');
  var noMatch = document.getElementById('noMatch');

  function applyFilter(){
    if (!searchInput) return;
    var q = searchInput.value.trim().toLowerCase();
    var anyVisible = false;

    sections.forEach(function(sec){
      var secCat = sec.getAttribute('data-cat');
      var catOk = (activeCat === 'all' || activeCat === secCat);

      if(!q){
        sec.classList.toggle('hide', !catOk);
        sec.querySelectorAll('.card, .ex, .prompt').forEach(function(el){ el.classList.remove('hide'); });
        if(catOk) anyVisible = true;
        return;
      }

      var items = sec.querySelectorAll('.card, .ex, .prompt');
      var secHasMatch = false;
      items.forEach(function(el){
        var match = el.textContent.toLowerCase().indexOf(q) !== -1;
        el.classList.toggle('hide', !match);
        if(match) secHasMatch = true;
      });
      if(!secHasMatch){
        var plain = sec.textContent.toLowerCase().indexOf(q) !== -1 && sec.querySelectorAll('.card,.ex,.prompt').length === 0;
        secHasMatch = plain;
      }
      sec.classList.toggle('hide', !secHasMatch);
      if(secHasMatch) anyVisible = true;
    });

    if (noMatch) noMatch.classList.toggle('show', !anyVisible);
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  // ---- Back to top ----
  var backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', function(){
      backTop.classList.toggle('show', window.scrollY > 600);
    });
  }

})();
