/* ==========================================================================
   JUZY — behavior
   Reads content from content.js (window.JUZY_CONTENT) and wires up the page.
   ========================================================================== */
(function () {
  'use strict';
  var C = window.JUZY_CONTENT || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  /* ---------- helpers ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }

  /* ---------- bottle SVG ---------- */
  var uid = 0;
  function bottleSVG() {
    var id = 'b' + (++uid);
    var BODY = 'M84 72 L84 104 C84 128 46 134 46 176 L46 428 Q46 452 70 452 L150 452 Q174 452 174 428 L174 176 C174 134 136 128 136 104 L136 72 Z';
    var powder = '', bubbles = '', i;
    var xs = [-14, -8, -2, 4, 10, 16, -11, -5, 1, 7, 13, -16, 0, 9];
    for (i = 0; i < 14; i++) {
      powder += '<circle cx="' + (98 + (i * 7) % 26) + '" cy="92" r="' + (2.2 + (i % 3) * .8) + '" fill="#fff" stroke="var(--f1)" stroke-width="1.2" style="--d:' + (i * 0.05).toFixed(2) + 's;--x:' + xs[i] + 'px"/>';
    }
    for (i = 0; i < 9; i++) {
      bubbles += '<circle cx="' + (62 + i * 12 + (i % 2) * 5) + '" cy="' + (430 - (i % 3) * 14) + '" r="' + (3 + (i % 3)) + '" fill="#fff" style="--d:' + (i * 0.33).toFixed(2) + 's"/>';
    }
    return '' +
      '<svg class="bottle" data-state="idle" viewBox="0 0 220 480" role="img" aria-label="JUZY bottle">' +
      '<defs>' +
      '<linearGradient id="lg' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--f1)"/><stop offset="1" style="stop-color:var(--f2)"/></linearGradient>' +
      '<linearGradient id="wg' + id + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#CFEAFB"/><stop offset=".5" stop-color="#EAF7FF"/><stop offset="1" stop-color="#BFE1F7"/></linearGradient>' +
      '<linearGradient id="cg' + id + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1B4FD8"/><stop offset=".45" stop-color="#4F86FF"/><stop offset="1" stop-color="#123ABF"/></linearGradient>' +
      '<clipPath id="cp' + id + '"><path d="' + BODY + '"/></clipPath>' +
      '</defs>' +
      '<ellipse cx="110" cy="466" rx="66" ry="8" fill="rgba(11,42,138,.18)"/>' +
      '<g class="b-all">' +
      '<path d="' + BODY + '" fill="#F3FAFF" fill-opacity=".7"/>' +
      '<g clip-path="url(#cp' + id + ')">' +
      '<rect x="40" y="138" width="140" height="320" fill="url(#wg' + id + ')" opacity=".9"/>' +
      '<rect class="liquid" x="40" y="138" width="140" height="320" fill="url(#lg' + id + ')"/>' +
      '<g class="swirl"><ellipse cx="96" cy="230" rx="30" ry="9" fill="#fff" opacity=".45"/><ellipse cx="128" cy="300" rx="26" ry="8" fill="#fff" opacity=".4"/><ellipse cx="100" cy="370" rx="32" ry="9" fill="#fff" opacity=".35"/></g>' +
      '<g class="powder">' + powder + '</g>' +
      '<g class="bubbles">' + bubbles + '</g>' +
      '</g>' +
      '<path d="' + BODY + '" fill="none" stroke="#8FC6EC" stroke-width="3"/>' +
      '<path d="M58 182 C56 220 56 300 58 410" stroke="#fff" stroke-opacity=".75" stroke-width="6" stroke-linecap="round" fill="none"/>' +
      '<path d="M88 84h44M88 94h44" stroke="#8FC6EC" stroke-width="2" stroke-linecap="round"/>' +
      '<g><rect x="62" y="236" width="96" height="84" rx="18" fill="#fff" fill-opacity=".92"/>' +
      '<text x="110" y="283" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="34" fill="#1B4FD8" stroke="#D3EAFB" stroke-width="1.5" paint-order="stroke">JUZY</text>' +
      '<path d="M70 296 Q110 282 150 294" stroke="#5DB82B" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M82 305 Q112 297 140 304" stroke="#FF9A1F" stroke-width="3" fill="none" stroke-linecap="round"/></g>' +
      '<g class="b-cap">' +
      '<rect x="82" y="74" width="56" height="7" rx="3" fill="#123AB0"/>' +
      '<rect x="78" y="30" width="64" height="46" rx="9" fill="url(#cg' + id + ')"/>' +
      '<path d="M86 40v28M94 40v28M102 40v28M110 40v28M118 40v28M126 40v28M134 40v28" stroke="#0F2F9A" stroke-opacity=".35" stroke-width="2"/>' +
      '<g class="b-btn"><rect x="90" y="14" width="40" height="22" rx="8" fill="#2F6BFF"/><rect x="94" y="17" width="32" height="5" rx="2.5" fill="#fff" fill-opacity=".45"/></g>' +
      '</g>' +
      '<circle class="tap" cx="110" cy="22" r="16" fill="none" stroke="#FF9A1F" stroke-width="3" style="transform-box:fill-box;transform-origin:center"/>' +
      '<path class="arrow" d="M110 -26v28m-9-9 9 10 9-10" stroke="#FF9A1F" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<g>' +
      '<path class="spark" style="--d:.1s" d="M32 130l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#FF9A1F"/>' +
      '<path class="spark" style="--d:.35s" d="M190 190l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#27B5EA"/>' +
      '<path class="spark" style="--d:.6s" d="M186 110l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#5DB82B"/>' +
      '</g>' +
      '</g></svg>';
  }

  function mount(host) { host.innerHTML = bottleSVG(); return host.firstChild; }

  /* ---------- sequence runner ---------- */
  function Runner(svg, opts) {
    opts = opts || {};
    var timers = [], self = this;
    function set(s) { svg.setAttribute('data-state', s); if (opts.onState) opts.onState(s); }
    function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
    this.stop = function () { timers.forEach(clearTimeout); timers = []; };
    this.set = set;
    this.play = function () {
      self.stop();
      if (reduce) { set('enjoy'); return; }
      set('idle');
      at(650, function () { set('push'); });
      at(2100, function () { set('shake'); });
      at(4700, function () { set('enjoy'); });
      if (opts.loop) at(9800, self.play);
    };
  }

  /* ---------- flavors ---------- */
  var flavors = C.flavors || [];
  var STATUS = {
    initial: { label: 'Initial flavor', cls: '' },
    considering: { label: 'Under consideration', cls: 'tag-consider' }
  };
  var current = flavors[0] || { id: 'strawberry', name: 'Strawberry', color: '#F0476A', color2: '#D81E4C' };
  var runners = {};

  function setFlavor(id, replay) {
    var f = flavors.filter(function (x) { return x.id === id; })[0]; if (!f) return;
    current = f;
    document.documentElement.style.setProperty('--f1', f.color);
    document.documentElement.style.setProperty('--f2', f.color2);
    $$('[data-flavor]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.flavor === id ? 'true' : 'false'); });
    var st = STATUS[f.status] || STATUS.initial;
    $('#labEmoji').textContent = f.emoji || '';
    $('#labName').textContent = f.name;
    $('#labBn').textContent = f.bn || '';
    var tag = $('#labTag'); tag.textContent = st.label; tag.className = 'tag ' + st.cls;
    if (replay) {
      if (runners.hero) runners.hero.play();
      if (runners.lab) runners.lab.play();
    }
  }

  function renderFlavors() {
    var chips = $('#heroChips'), grid = $('#flavorGrid'); if (!chips || !grid) return;
    chips.innerHTML = flavors.filter(function (f) { return f.status === 'initial'; }).map(function (f) {
      return '<button class="fchip" type="button" data-flavor="' + esc(f.id) + '" aria-pressed="false" style="--c:' + esc(f.color) + '"><i></i>' + esc(f.name) + '</button>';
    }).join('');
    grid.innerHTML = flavors.map(function (f) {
      var st = STATUS[f.status] || STATUS.initial;
      var img = f.image ? '<img src="' + esc(f.image) + '" alt="" style="height:64px;width:auto;margin-bottom:6px;position:relative">' : '<span class="em" aria-hidden="true">' + esc(f.emoji || '') + '</span>';
      return '<button class="fcard" type="button" data-flavor="' + esc(f.id) + '" aria-pressed="false" style="--c:' + esc(f.color) + '">' + img +
        '<b>' + esc(f.name) + '</b><small lang="bn">' + esc(f.bn || '') + '</small><span class="tag ' + st.cls + '">' + st.label + '</span></button>';
    }).join('');
    $$('[data-flavor]').forEach(function (b) { b.addEventListener('click', function () { setFlavor(b.dataset.flavor, true); }); });
  }

  function renderVersions() {
    var packs = $('#packs');
    if (packs) packs.innerHTML = (C.packs || []).map(function (p) {
      var caps = ''; for (var i = 0; i < p.caps; i++) caps += '<i></i>';
      return '<div class="pack' + (p.caps > 6 ? ' big' : '') + '"><div class="caps" aria-hidden="true">' + caps + '</div><b>' + esc(p.name) + '</b><small>' + esc(p.text) + '</small></div>';
    }).join('');
    var specs = $('#specs');
    if (specs) specs.innerHTML = (C.specs || []).map(function (s) { return '<div><dt>' + esc(s.label) + '</dt><dd>' + esc(s.value) + '</dd></div>'; }).join('');
    var sn = $('#specsNote'); if (sn) sn.textContent = C.specsNote || '';
    var fl = $('#futureList');
    if (fl) fl.innerHTML = (C.future || []).map(function (x) { return '<li><b>' + esc(x.title) + '</b>' + esc(x.text) + '</li>'; }).join('');
  }

  /* ---------- socials & contact ---------- */
  var P = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.6C11.7 3 10.6 4.5 10.6 6.8v1.7H8.5v3h2.1V21H14v-9.5h2.4l.4-3z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" ' + P + '/><circle cx="12" cy="12" r="4" ' + P + '/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor"/><path d="M10 9.2v5.6l5-2.8z" fill="#fff"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.5 3c.3 2.300 1.700 3.800 4 4v3.200c-1.500 0-2.900-.5-4-1.300v6.100a5.500 5.500 0 1 1-5.500-5.500c.3 0 .6 0 .9.100v3.300a2.300 2.300 0 1 0 1.400 2.100V3z"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path ' + P + ' d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1"/></svg>'
  };
  var SOC_COLOR = { facebook: '#1877F2', instagram: '#E1306C', youtube: '#E62117', tiktok: '#111' };

  function renderSocials() {
    var list = C.socials || [];
    var box = $('#socials');
    if (box) {
      box.innerHTML = list.map(function (s, i) {
        var icon = ICONS[s.id] || ICONS.link, live = !!(s.url && s.url.trim());
        var inner = '<span class="si">' + icon + '</span><b>' + esc(s.label) + '</b><span class="d">' + esc(s.blurb || '') + '</span>' +
          (live ? '<span class="go">Visit →</span>' : '<span class="soon">Link coming soon</span>');
        var style = ' style="--c:' + (SOC_COLOR[s.id] || '#1B4FD8') + ';--i:' + i + '"';
        return live
          ? '<a class="soc reveal" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.label) + '"' + style + '>' + inner + '</a>'
          : '<button class="soc reveal" type="button" data-soon="' + esc(s.label) + '" aria-label="' + esc(s.label) + ' (link coming soon)"' + style + '>' + inner + '</button>';
      }).join('');
    }
    var foot = $('#footSocial');
    if (foot) {
      foot.innerHTML = list.map(function (s) {
        var icon = ICONS[s.id] || ICONS.link;
        return (s.url && s.url.trim())
          ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.label) + '">' + icon + '</a>'
          : '<button type="button" data-soon="' + esc(s.label) + '" aria-label="' + esc(s.label) + ' (link coming soon)">' + icon + '</button>';
      }).join('');
    }
    $$('[data-soon]').forEach(function (b) { b.addEventListener('click', function () { toast(b.dataset.soon + ' link coming soon'); }); });

    var c = C.contact || {}, cbox = $('#contact');
    if (cbox) {
      var soon = 'Coming soon';
      cbox.innerHTML =
        '<div class="cc"><b>Email</b>' + (c.email ? '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>' : soon) + '</div>' +
        '<div class="cc"><b>Phone</b>' + (c.phone ? esc(c.phone) : soon) + '</div>' +
        '<div class="cc"><b>Location</b>' + (c.location ? esc(c.location) : soon) + '</div>';
    }
  }

  /* ---------- inside-the-cap hotspots ---------- */
  var HOT = {
    capsule: { t: 'Flavor capsule', d: 'Holds the flavor powder in a sealed, pre-measured portion, kept dry and separate from your water until you push.' },
    ring: { t: 'Sealing ring', d: 'Keeps it fresh: the ring seals the cap against the bottle neck.' }
  };
  function initHot() {
    var panel = $('#hotPanel'); if (!panel) return;
    function show(k) {
      panel.innerHTML = '<b>' + HOT[k].t + '</b><span>' + HOT[k].d + '</span>';
      $$('.hot').forEach(function (h) { h.setAttribute('aria-pressed', h.dataset.hot === k ? 'true' : 'false'); });
    }
    $$('.hot').forEach(function (h) { h.addEventListener('click', function () { show(h.dataset.hot); }); });
    show('capsule');
  }

  /* ---------- why toggle ---------- */
  function initToggle() {
    var o = $('#tabOld'), n = $('#tabNew'), cmp = $('#compare'); if (!o || !n) return;
    function pick(mode) {
      cmp.dataset.mode = mode;
      o.setAttribute('aria-selected', mode === 'old'); n.setAttribute('aria-selected', mode === 'new');
    }
    o.addEventListener('click', function () { pick('old'); });
    n.addEventListener('click', function () { pick('new'); });
  }

  /* ---------- nav, scrolling ---------- */
  function initNav() {
    var nav = $('#nav'), burger = $('#burger'), links = $('#navLinks');
    function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 24); }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open'); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    $$('[data-scroll]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = $(a.getAttribute('href')); if (!t) return;
        e.preventDefault();
        links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
        t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    });
    var secs = $$('main section[id]');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) $$('.nav-links a:not(.btn)').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      secs.forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------- reveal + counters ---------- */
  function countUp(el) {
    var to = +el.dataset.to; if (reduce) { el.textContent = to; return; }
    var t0 = performance.now(), dur = 1400;
    (function step(t) {
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); $$('.count').forEach(function (c) { c.textContent = c.dataset.to; }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in'); io.unobserve(e.target);
        $$('.count', e.target).forEach(countUp);
      });
    }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- parallax drops + tilt ---------- */
  function initFx() {
    if (reduce) return;
    var drops = $$('.drop'), ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY; if (y < 900) drops.forEach(function (d) { d.style.transform = 'translateY(' + (y * d.dataset.speed) + 'px)'; });
        ticking = false;
      });
    }, { passive: true });
    $$('.tilt').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(700px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-4px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- bottles ---------- */
  function initBottles() {
    // hero: loops while visible
    var hero = mount($('#heroBottle'));
    var stepEls = $$('#heroSteps li');
    runners.hero = new Runner(hero, {
      loop: true,
      onState: function (s) { stepEls.forEach(function (li) { li.classList.toggle('on', li.dataset.s === s); }); }
    });
    $('#heroReplay').addEventListener('click', function () { runners.hero.play(); });
    hero.parentNode.addEventListener('click', function () { runners.hero.play(); });

    // flavor lab: plays when scrolled into view, then on tap
    var lab = mount($('#labBottle'));
    runners.lab = new Runner(lab, { loop: false });
    $('#labPush').addEventListener('click', function () { runners.lab.play(); });
    lab.parentNode.addEventListener('click', function () { runners.lab.play(); });

    // step cards: fixed looping states
    var s1 = mount($('#stepBottle1')), s2 = mount($('#stepBottle2')), s3 = mount($('#stepBottle3'));
    s2.setAttribute('data-state', 'shake'); s3.setAttribute('data-state', 'enjoy');
    var stepLoop;
    function loopPush() { s1.setAttribute('data-state', 'idle'); setTimeout(function () { s1.setAttribute('data-state', 'push'); }, 700); }
    if (reduce) { s1.setAttribute('data-state', 'push'); s2.setAttribute('data-state', 'enjoy'); }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) runners.hero.play(); else runners.hero.stop(); });
      }, { threshold: .25 }).observe($('#home'));
      var labIO = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { runners.lab.play(); labIO.disconnect(); } });
      }, { threshold: .4 });
      labIO.observe($('#labBottle'));
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !reduce) { loopPush(); stepLoop = setInterval(loopPush, 4200); }
          else clearInterval(stepLoop);
        });
      }, { threshold: .3 }).observe($('.steps'));
    } else { runners.hero.play(); runners.lab.play(); }
  }

  /* ---------- go ---------- */
  renderFlavors(); renderVersions(); renderSocials();
  initBottles();
  setFlavor(current.id, false);
  initHot(); initToggle(); initNav(); initReveal(); initFx();
})();
