/* ============================================================
   Edwin Shajan — Portfolio (Modern) — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- Year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Custom cursor ---- */
  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && dot && ring) {
    var rx = 0, ry = 0, dx = 0, dy = 0;
    window.addEventListener('mousemove', function (e) {
      dx = e.clientX; dy = e.clientY;
      dot.style.left = dx + 'px'; dot.style.top = dy + 'px';
    });
    (function loop() {
      rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('[data-cursor], a, button')) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('[data-cursor], a, button')) document.body.classList.remove('cursor-hover');
    });
  }

  /* ---- Nav: scrolled state + mobile toggle + active link ---- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Stat counters ---- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('.stat-num');
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); io2.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io2.observe(n); });
  } else {
    nums.forEach(animateCount);
  }

  /* ---- Hero role rotator (scramble effect) ---- */
  var roleEl = document.getElementById('roleRotate');
  var roles = ['Penetration Tester', 'Offensive Security', 'Bug Hunter', 'CVE Author', 'CTF Champion'];
  var chars = '!<>-_\\/[]{}—=+*^?#________';
  if (roleEl) {
    var ri = 0;
    function scrambleTo(text) {
      var from = roleEl.textContent;
      var length = Math.max(from.length, text.length);
      var queue = [];
      for (var i = 0; i < length; i++) {
        var fromCh = from[i] || '';
        var toCh = text[i] || '';
        var startF = Math.floor(Math.random() * 18);
        var endF = startF + Math.floor(Math.random() * 18);
        queue.push({ from: fromCh, to: toCh, start: startF, end: endF, char: '' });
      }
      var frame = 0;
      function update() {
        var out = '', done = 0;
        for (var i = 0; i < queue.length; i++) {
          var q = queue[i];
          if (frame >= q.end) { done++; out += q.to; }
          else if (frame >= q.start) {
            if (!q.char || Math.random() < 0.28) q.char = chars[Math.floor(Math.random() * chars.length)];
            out += '<span class="scr">' + q.char + '</span>';
          } else { out += q.from; }
        }
        roleEl.innerHTML = out;
        if (done < queue.length) { frame++; requestAnimationFrame(update); }
        else { roleEl.textContent = text; }
      }
      update();
    }
    setInterval(function () {
      ri = (ri + 1) % roles.length;
      scrambleTo(roles[ri]);
    }, 2800);
  }

  /* ---- Faux terminal typing ---- */
  var term = document.getElementById('termBody');
  if (term) {
    var lines = [
      { html: '<span class="tc-prompt">edwin@bcg</span>:<span class="tc-key">~</span>$ whoami', delay: 30 },
      { html: 'edwin_shajan — penetration tester', delay: 12 },
      { html: '', delay: 0 },
      { html: '<span class="tc-prompt">edwin@bcg</span>:<span class="tc-key">~</span>$ ./scan --target scope', delay: 30 },
      { html: '<span class="tc-ok">[+]</span> Recon ............ done', delay: 12 },
      { html: '<span class="tc-ok">[+]</span> Enumeration ...... done', delay: 12 },
      { html: '<span class="tc-warn">[!]</span> 300+ findings reported', delay: 12 },
      { html: '<span class="tc-ok">[+]</span> CVEs: 2025-25381, 2025-25382', delay: 12 },
      { html: '', delay: 0 },
      { html: '<span class="tc-prompt">edwin@bcg</span>:<span class="tc-key">~</span>$ status', delay: 30 },
      { html: '<span class="tc-ok">NCIIPC Top 15 — India · Q1 2025 ✔</span>', delay: 12 },
      { html: '<span class="tc-prompt">edwin@bcg</span>:<span class="tc-key">~</span>$ <span class="term-caret">▋</span>', delay: 0 }
    ];
    var li = 0;
    function typeLine() {
      if (li >= lines.length) return;
      var lineDiv = document.createElement('div');
      lineDiv.className = 'term-line';
      term.appendChild(lineDiv);
      var raw = lines[li].html;
      // type by revealing — simplest reliable approach: render full html after short stagger
      lineDiv.innerHTML = raw;
      term.scrollTop = term.scrollHeight;
      li++;
      setTimeout(typeLine, raw === '' ? 90 : 230 + Math.random() * 160);
    }
    // start when in view
    if ('IntersectionObserver' in window) {
      var io3 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { typeLine(); io3.disconnect(); }
        });
      }, { threshold: 0.3 });
      io3.observe(term);
    } else { typeLine(); }
  }

  /* ---- Achievement card glow follows pointer ---- */
  document.querySelectorAll('.ach-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---- Theme toggle (dark <-> light), persisted ---- */
  var THEME_KEY = 'es-theme';
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  function isLight() { return root.getAttribute('data-theme') === 'light'; }
  function setTheme(t) {
    if (t === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(isLight() ? 'dark' : 'light');
    });
  }

  /* ---- Embedded interactive terminal overlay + Kali-style boot ---- */
  var overlay   = document.getElementById('termOverlay');
  var frame     = document.getElementById('termFrame');
  var closeBtn  = document.getElementById('termClose');
  var openers   = [document.getElementById('termLaunch'), document.getElementById('heroTermLaunch')];
  var splash    = document.getElementById('bootSplash');
  var bootLog   = document.getElementById('bootLog');
  var bootProg  = document.getElementById('bootProg');
  var bootPct   = document.getElementById('bootPct');
  var frameLoaded = false;
  var booting = false;
  var bootDone = false;
  var bootTimers = [];

  var BOOT_STEPS = [
    { ok: true,  t: 'Mounted /opt/wordlists and /usr/share/seclists.' },
    { ok: true,  t: 'Started Recon Network Stack.' },
    { ok: true,  t: 'Reached target Multi-User System.' },
    { ok: true,  t: 'Started Burp Suite proxy listener (:8080).' },
    { ok: true,  t: 'Started Metasploit RPC daemon.' },
    { ok: true,  t: 'Loaded exploit + payload modules (300+).' },
    { ok: true,  t: 'Started Nmap / Nuclei / FFUF services.' },
    { ok: true,  t: 'Started OpenSSH secure shell.' },
    { ok: false, t: 'Initializing offensive security environment ...' }
  ];

  function clearBootTimers() { bootTimers.forEach(clearTimeout); bootTimers = []; }

  function runBoot() {
    booting = true; bootDone = false;
    splash.classList.remove('done');
    bootLog.innerHTML = '';
    bootProg.style.width = '0%';
    if (bootPct) bootPct.textContent = '0';

    var stepGap = 150;
    BOOT_STEPS.forEach(function (s, i) {
      bootTimers.push(setTimeout(function () {
        var div = document.createElement('div');
        if (s.ok) div.innerHTML = '[<span class="b-ok">  OK  </span>] ' + s.t;
        else div.innerHTML = '<span class="b-st">' + s.t + '</span>';
        bootLog.appendChild(div);
      }, i * stepGap));
    });

    // progress bar fills over the full boot duration
    var total = BOOT_STEPS.length * stepGap + 450;
    var startT = Date.now();
    (function progress() {
      if (!booting) return;
      var p = Math.min((Date.now() - startT) / total, 1);
      var pct = Math.round(p * 100);
      bootProg.style.width = pct + '%';
      if (bootPct) bootPct.textContent = pct;
      if (p < 1) { bootTimers.push(setTimeout(progress, 60)); }
      else { finishBoot(); }
    })();
  }

  function finishBoot() {
    if (bootDone) return;
    bootDone = true; booting = false;
    clearBootTimers();
    bootProg.style.width = '100%';
    if (bootPct) bootPct.textContent = '100';
    splash.classList.add('done');
  }

  function skipBoot() { if (booting || !bootDone) finishBoot(); }

  function openTerm(e) {
    if (e) e.preventDefault();
    if (!frameLoaded) {
      // load the shell already "booted" — our splash is the boot animation
      frame.src = '../terminal/index.html?boot=skip';
      frameLoaded = true;
    }
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('term-open');
    if (links) links.classList.remove('open');
    if (toggle) toggle.classList.remove('open');
    runBoot();
  }
  function closeTerm() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('term-open');
    clearBootTimers(); booting = false;
  }

  openers.forEach(function (o) { if (o) o.addEventListener('click', openTerm); });
  if (closeBtn) closeBtn.addEventListener('click', closeTerm);
  if (splash) splash.addEventListener('click', skipBoot);
  document.addEventListener('keydown', function (e) {
    if (!overlay || !overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeTerm();
    else if ((e.key === 'Enter' || e.key === ' ') && !bootDone) { e.preventDefault(); skipBoot(); }
  });
})();
