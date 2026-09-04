(async function(){
  "use strict";
  
  let DATA;
  try {
    const response = await fetch('data/states.json');
    DATA = await response.json();
  } catch (err) {
    console.error("Failed to fetch states data:", err);
    return;
  }
  var states = DATA.states;

  function fmtPop(n){
    if(n >= 10000000){ return (n/10000000).toFixed(n>=100000000?1:2).replace(/\.0$/,'') + ' Cr'; }
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

  // ---- Build map ----
  var svg = document.getElementById('indiaMap');
  var ns = 'http://www.w3.org/2000/svg';
  states.forEach(function(s){
    var path = document.createElementNS(ns, 'path');
    path.setAttribute('d', s.path);
    path.setAttribute('data-id', s.id);
    path.setAttribute('class', popClass(s.pop));
    path.setAttribute('tabindex', '0');
    path.setAttribute('role', 'button');
    path.setAttribute('aria-label', s.name + ', population ' + fmtFull(s.pop));
    svg.appendChild(path);
  });

  var tooltip = document.getElementById('mapTooltip');
  function showTooltip(s, x, y){
    tooltip.innerHTML = '<b>'+s.name+'</b>' +
      '<div class="tt-row">Population: '+fmtFull(s.pop)+' ('+fmtPop(s.pop)+')</div>' +
      '<div class="tt-row">Share of India: '+s.share+'%</div>' +
      '<div class="tt-row">Rank: '+s.rank+'</div>';
    tooltip.style.display = 'block';
    var tw = 230, th = 90;
    var left = x + 16, top = y + 16;
    if(left + tw > window.innerWidth) left = x - tw - 16;
    if(top + th > window.innerHeight) top = y - th - 16;
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }
  function hideTooltip(){ tooltip.style.display = 'none'; }

  var byId = {};
  states.forEach(function(s){ byId[s.id] = s; });

  function selectState(id, scroll){
    var s = byId[id];
    if(!s) return;
    document.querySelectorAll('#indiaMap path.selected').forEach(function(p){ p.classList.remove('selected'); });
    var p = svg.querySelector('path[data-id="'+id+'"]');
    if(p) p.classList.add('selected');
    document.getElementById('spName').textContent = s.name;
    document.getElementById('spPop').textContent = fmtFull(s.pop);
    document.getElementById('spShare').textContent = s.share + '%';
    document.getElementById('spRank').textContent = s.rank;
    document.getElementById('spGrowth').textContent = '+' + s.growth + '%';
    document.getElementById('spNote').textContent = s.note || '';
    document.getElementById('statePanel').classList.add('show');
    document.querySelectorAll('#stateTableBody tr').forEach(function(tr){
      tr.classList.toggle('selected', tr.getAttribute('data-id') === id);
    });
    if(scroll){
      var row = document.querySelector('#stateTableBody tr[data-id="'+id+'"]');
      if(row) row.scrollIntoView({block:'nearest'});
    }
  }

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
  // Touch devices don't get hover, so show the tooltip briefly on tap too
  svg.addEventListener('touchstart', function(e){
    var t = e.target;
    if(t.tagName === 'path'){
      var s = byId[t.getAttribute('data-id')];
      var touch = e.touches[0];
      if(s && touch) showTooltip(s, touch.clientX, touch.clientY);
    }
  }, {passive:true});
  document.addEventListener('touchstart', function(e){
    if(!svg.contains(e.target)) hideTooltip();
  }, {passive:true});

  // ---- Build state table ----
  var tbody = document.getElementById('stateTableBody');
  var sortDesc = true;
  function renderTable(filterText){
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
      tr.addEventListener('click', function(){ selectState(s.id, false); document.getElementById('indiaMap').scrollIntoView({block:'center', behavior:'smooth'}); });
      tbody.appendChild(tr);
    });
  }
  renderTable('');

  document.getElementById('stateSearch').addEventListener('input', function(e){
    renderTable(e.target.value);
  });
  document.getElementById('sortPopBtn').addEventListener('click', function(e){
    sortDesc = !sortDesc;
    e.target.textContent = 'Sort: population ' + (sortDesc ? '↓' : '↑');
    renderTable(document.getElementById('stateSearch').value);
  });

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
    var q = searchInput.value.trim().toLowerCase();
    var anyVisible = false;

    sections.forEach(function(sec){
      var secCat = sec.getAttribute('data-cat');
      var catOk = (activeCat === 'all' || activeCat === secCat);

      if(!q){
        // chip-only mode
        sec.classList.toggle('hide', !catOk);
        // reset any card-level hides from a previous search
        sec.querySelectorAll('.card, .ex, .prompt').forEach(function(el){ el.classList.remove('hide'); });
        if(catOk) anyVisible = true;
        return;
      }

      // search mode: ignore chip, filter individual items across all sections
      var items = sec.querySelectorAll('.card, .ex, .prompt');
      var secHasMatch = false;
      items.forEach(function(el){
        var match = el.textContent.toLowerCase().indexOf(q) !== -1;
        el.classList.toggle('hide', !match);
        if(match) secHasMatch = true;
      });
      // also check plain text (sec-note, table rows) in case section has no card-level items
      if(!secHasMatch){
        var plain = sec.textContent.toLowerCase().indexOf(q) !== -1 && sec.querySelectorAll('.card,.ex,.prompt').length === 0;
        secHasMatch = plain;
      }
      sec.classList.toggle('hide', !secHasMatch);
      if(secHasMatch) anyVisible = true;
    });

    noMatch.classList.toggle('show', !anyVisible);
  }

  searchInput.addEventListener('input', applyFilter);

  // ---- Back to top ----
  var backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', function(){
      backTop.classList.toggle('show', window.scrollY > 600);
    });
  }

  // ---- Supabase Integration ----
  const SUPABASE_URL = 'https://ylxxyhkylixdejxakbys.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_KmVN6kXwRq9MfCJezk_ibA_L1FUB8Lb';

  async function loadDashboardData() {
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || !window.supabase) {
      console.log('Supabase not configured or library not loaded, using hardcoded values.');
      return;
    }

    try {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      
      const { data, error } = await client
        .from('latest_observations')
        .select('*');

      if (error) {
        console.error('Supabase query error:', error);
        return; // fallback to hardcoded
      }

      if (!data || data.length === 0) {
        console.log('No verified data found in Supabase, keeping hardcoded values.');
        return; // fallback to hardcoded
      }

      // Hydrate DOM
      data.forEach(obs => {
        const el = document.querySelector(`[data-metric="${obs.metric_key}"]`);
        if (el && obs.display_value) {
          el.innerHTML = obs.display_value;
        }
      });
      console.log('Dashboard hydrated with verified data from Supabase.');
    } catch (err) {
      console.error('Failed to load dashboard data from Supabase:', err);
    }
  }

  loadDashboardData();

})();