/* ============================================================
   Edwin Shajan — Portfolio (Pure Terminal) — engine
   ============================================================ */
(function () {
  'use strict';

  var output    = document.getElementById('output');
  var screen    = document.getElementById('screen');
  var inputLine = document.getElementById('inputLine');
  var quickbar  = document.getElementById('quickbar');
  var cmdInput  = document.getElementById('cmd');
  var mirror    = document.getElementById('mirror');

  var history = [];
  var histIdx = -1;

  /* ---------- helpers ---------- */
  function el(html, cls) {
    var d = document.createElement('div');
    d.className = 'line' + (cls ? ' ' + cls : '');
    d.innerHTML = html;
    return d;
  }
  function print(html, cls) {
    output.appendChild(el(html, cls));
    scrollDown();
  }
  function printRaw(node) { output.appendChild(node); scrollDown(); }
  function scrollDown() { screen.scrollTop = screen.scrollHeight; }
  function blank() { print('&nbsp;'); }

  function typeLine(text, cls, speed, cb) {
    var line = el('', cls);
    output.appendChild(line);
    var i = 0;
    var caret = '<span class="auto-caret">▋</span>';
    (function tick() {
      line.innerHTML = escapeHtml(text.slice(0, i)) + (i < text.length ? caret : '');
      scrollDown();
      if (i < text.length) { i++; setTimeout(tick, speed); }
      else { line.innerHTML = escapeHtml(text); if (cb) cb(); }
    })();
  }
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------- content ---------- */
  var BANNER =
    '<div class="banner-wrap">' +
    '<pre class="banner">' +
    '╭──┤ EDWIN SHAJAN ├─────────────────────────────────╮\n' +
    '│  penetration tester · offensive security · @ BCG  │\n' +
    '╰───────────────────────────────────────────────────╯' +
    '</pre></div>';

  var CMDS = {
    help: function () {
      return '<div class="block">' +
        '<span class="c-dim"># available commands — click or type</span>\n\n' +
        cmd('about') + '         who I am, the short version\n' +
        cmd('experience') + '    where I have worked\n' +
        cmd('achievements') + '  CVEs, U.S. Govt Hall of Fame, CTF wins\n' +
        cmd('press') + '         media coverage &amp; news articles\n' +
        cmd('skills') + '        offensive security skill set\n' +
        cmd('tools') + '         the arsenal I work with\n' +
        cmd('projects') + '      things I have built\n' +
        cmd('certs') + '         certifications\n' +
        cmd('education') + '     academic background\n' +
        cmd('languages') + '     languages I speak\n' +
        cmd('stats') + '         impact by the numbers\n' +
        cmd('contact') + '       how to reach me\n' +
        cmd('banner') + '        show the banner again\n' +
        cmd('clear') + '         clear the screen\n' +
        '</div>';
    },

    about: function () {
      return block(
        '<span class="ok">whoami</span>\n' +
        '<div class="kv">' +
        kv('user', 'edwin_shajan') +
        kv('role', 'Penetration Tester @ Boston Consulting Group') +
        kv('focus', 'Offensive Security · Web · API · Mobile') +
        kv('location', 'Thrissur, Kerala, India') +
        kv('status', '<span class="c-green">available for offensive security work</span>') +
        '</div>\n' +
        'BCA graduate and penetration tester with strong expertise in offensive\n' +
        'security. Reported <span class="c-white bold">300+ vulnerabilities</span>, including critical findings to\n' +
        "India's national infrastructure via NCIIPC. Recognized among the\n" +
        '<span class="c-accent2 bold">Top 15 Security Researchers in India (Q1 2025)</span>. Driven by curiosity,\n' +
        'responsible disclosure, and the thrill of a clean exploit chain.\n\n' +
        '<span class="c-dim">next:</span> ' + cmd('experience') + ' · ' + cmd('achievements')
      );
    },

    experience: function () {
      return block(
        '<span class="ok">cat experience.log</span>\n\n' +
        job('Boston Consulting Group (BCG)', 'Penetration Tester', 'Aug 2025 — Present', [
          'Performed Web &amp; API penetration testing and DAST assessments.',
          'Managed the end-to-end testing lifecycle: scoping, testing, reporting, retesting.',
          'Partnered with developers to remediate vulnerabilities and validate fixes.',
          'Tracked SLA breaches and improved compliance for mandatory assessments.',
          'Mentored junior team members and ensured quality of deliverables.'
        ]) +
        job('KSmart — Local Self Govt, Kerala', 'Penetration Tester', 'Jul 2025 — Aug 2025', [
          'Performed a full black-box penetration test of KSmart&#39;s website.',
          'Discovered and reported multiple severe issues, strengthening their posture.',
          'Earned the paid engagement via responsible disclosure of initial findings.'
        ]) +
        job('NCIIPC', 'Security Researcher', 'Oct 2024 — Mar 2025', [
          'Ethically reported <span class="c-white">200+ vulnerabilities</span> across Indian websites.',
          'Recognized among the <span class="c-accent2">Top 15 Security Researchers in India</span> — Q1 2025.',
          'Strengthened orgs through responsible disclosure &amp; collaboration.',
          'Performed independent vulnerability assessments using ethical methodologies.'
        ], true)
      );
    },

    achievements: function () {
      return block(
        '<span class="ok">./achievements --all</span>\n\n' +
        '<span class="warn"></span><span class="c-white bold">Published CVE Author</span> <span class="c-dim">(3)</span>\n' +
        '  <span class="c-accent">CVE-2025-25381</span>   <span class="c-accent">CVE-2025-25382</span>   <span class="c-accent">CVE-2025-45777</span>\n\n' +
        '<span class="warn"></span><span class="c-white bold">U.S. Government Hall of Fame</span> <span class="c-dim">(Bugcrowd · as edshaj)</span>\n' +
        '  <span class="c-accent2">Dept. of Homeland Security</span>   <span class="c-accent2">Dept. of the Treasury</span>\n\n' +
        ach('Repelled DXPLOIT attack', 'Helped secure a Kerala Govt village website under attack by the Malaysian hacker group DXPLOIT.') +
        ach('1st Prize — Xploit CTF', 'Xactitude 2025 national IT fest, Kristu Jayanti College (Autonomous).') +
        ach('1st Prize — Sankalpa CTF', 'Capture-The-Flag winner at Jain (Deemed-to-be University).') +
        ach('NCIIPC Top 15 — Q1 2025', 'Featured in the <a href="https://nciipc.gov.in/documents/NCIIPC_Newsletter_Apr25.pdf" target="_blank" rel="noopener">NCIIPC newsletter</a> via the RVDP program.') +
        ach('Acknowledged by NCIIPC &amp; CERT-In', 'Official recognition from India&#39;s national cyber-defense bodies.') +
        '\n<span class="c-dim"># notable organizations secured</span>\n' +
        '<span class="c-cyan">KSRTC · BESCOM · KSEB · Asianet Satellite · Bisleri ·\n' +
        'Royal Enfield · Parivahan · Maharashtra SFDA · Jubilee Mission Hospital</span>\n\n' +
        '<span class="c-dim">// type</span> ' + cmd('press') + ' <span class="c-dim">for media coverage &amp; articles</span>'
      );
    },

    press: function () {
      return block(
        '<span class="ok">./press --featured-in</span>\n\n' +
        pressItem('The Week', 'Property-tax loophole exposed in Kerala Govt website (Jan 2025)', 'https://www.theweek.in/news/india/2025/01/02/exclusive-ethical-hacker-exposes-a-major-property-tax-loophole-in-kerala-government-website.html') +
        pressItem('The Week', 'KSRTC vulnerability exposes data of 4 lakh+ students (Jun 2025)', 'https://www.theweek.in/news/india/2025/06/12/exclusive-ksrtc-website-vulnerability-exposes-personal-data-of-over-4-lakh-students.html') +
        pressItem('News Malayalam', 'Rajiv Gandhi Cancer Institute patient data on dark web', 'https://www.newsmalayalam.com/article/newsroom/delhis-rajiv-gandhi-cancer-institutes-patient-data-up-for-sale-in-dark-web') +
        pressItem('YouTube', 'Video feature / coverage', 'https://www.youtube.com/watch?v=8PDLopynqaU') +
        pressItem('NCIIPC', 'Top 15 Security Researchers newsletter (Q1 2025)', 'https://nciipc.gov.in/documents/NCIIPC_Newsletter_Apr25.pdf')
      );
    },

    skills: function () {
      return block(
        '<span class="ok">ls -la skills/</span>\n\n' +
        skillRow('Penetration Testing') + skillRow('Vulnerability Assessment') +
        skillRow('Web &amp; API Security') + skillRow('Android Security') +
        skillRow('OWASP Mobile Top 10') + skillRow('LLM Security Automation') +
        skillRow('Security Research') + skillRow('Networking') +
        skillRow('Incident Analysis') + skillRow('Triage &amp; VRP') +
        '\n<span class="c-dim">soft:</span> Problem Solving · Collaboration · Strategic Thinking · Documentation'
      );
    },

    tools: function () {
      return block(
        '<span class="ok">which --arsenal</span>\n\n' +
        '<div class="kv">' +
        kv('web &amp; api', 'Burp Suite · SQLMap · Nuclei · FFUF · Postman · jwt_tool') +
        kv('recon/scan', 'subfinder · httpx · Shodan · Nmap · Acunetix') +
        kv('mobile', 'MobSF · Frida · apktool · jadx · Android Studio') +
        kv('exploit/net', 'Metasploit · Wireshark · Hydra · John the Ripper') +
        kv('code', 'Python · Bash') +
        kv('os/platforms', 'Kali Linux · Linux/Unix · Windows · MySQL') +
        kv('cloud', 'Google Cloud · AWS (basic)') +
        kv('workflow', 'Jira') +
        '</div>'
      );
    },

    projects: function () {
      return block(
        '<span class="ok">cat projects/secukit.md</span>\n\n' +
        '<span class="c-white bold">SecuKit</span> <span class="c-dim">— Security Toolkit for Researchers · Nov 2024 — Mar 2025</span>\n\n' +
        'A unified GUI integrating popular command-line tools —\n' +
        '<span class="c-accent2">Nuclei, SQLMap, Nmap, FFUF, Dirbuster</span> — into one application.\n' +
        'Simplifies tool management, streamlines testing workflows, and boosts\n' +
        'productivity through automation and real-time assistance.\n\n' +
        '<span class="c-dim">stack:</span> Python · GUI · Automation'
      );
    },

    certs: function () {
      return block(
        '<span class="ok">ls certs/</span>\n\n' +
        cert('Certified Penetration Tester (CPT)', 'RedTeam Hacker Academy', true) +
        cert('Ethical Hacking Essentials (EHE)', 'EC-Council') +
        cert('Android Bug Bounty: Hunt Like a Rat', 'EC-Council') +
        cert('Google Cybersecurity Professional V2', 'Google · Coursera') +
        cert('Google Cloud Cybersecurity', 'Google Cloud', true) +
        cert('TechA Network Hacking Prevention', 'Infosys Springboard')
      );
    },

    education: function () {
      return block(
        '<span class="ok">cat education.txt</span>\n\n' +
        '<span class="c-white bold">Bachelor of Computer Applications (BCA)</span>\n' +
        '<span class="c-accent2">Christ University, Bangalore</span> <span class="c-dim">· Jun 2022 — May 2025</span>\n\n' +
        '<span class="c-white bold">Certified Penetration Tester (CPT)</span>\n' +
        '<span class="c-accent2">RedTeam Hacker Academy</span> <span class="c-dim">· May 2025 — present</span>'
      );
    },

    languages: function () {
      return block(
        '<span class="ok">locale</span>\n\n' +
        '<div class="kv">' +
        kv('English', 'Professional Working Proficiency') +
        kv('Hindi', 'Full Professional Proficiency') +
        kv('Malayalam', 'Native Proficiency') +
        '</div>'
      );
    },

    stats: function () {
      return block(
        '<span class="ok">./impact --summary</span>\n\n' +
        '<span class="c-accent bold">  300+</span>  vulnerabilities reported\n' +
        '<span class="c-accent bold">  180+</span>  organizations secured\n' +
        '<span class="c-accent bold">     3</span>  CVEs assigned\n' +
        '<span class="c-accent bold">Top 15</span>  security researcher in India (Q1 2025)'
      );
    },

    contact: function () {
      return block(
        '<span class="ok">./connect.sh</span>\n\n' +
        '<div class="kv">' +
        kv('email', '<a href="mailto:edwinshaj@gmail.com">edwinshaj@gmail.com</a>') +
        kv('linkedin', '<a href="https://www.linkedin.com/in/edwin-shajan" target="_blank" rel="noopener">linkedin.com/in/edwin-shajan</a>') +
        '</div>\n' +
        '<span class="c-green">// open to offensive security engagements &amp; collaboration.</span>'
      );
    },

    banner: function () { return '<div class="block">' + BANNER + '</div>'; },

    sudo: function () {
      return '<span class="warn"></span>edwin is not in the sudoers file. ' +
        '<span class="c-dim">This incident will be reported. 🚨</span>';
    },

    ls: function () {
      return '<span class="c-accent2">about.md  experience.log  achievements/  press/  skills/  tools/  projects/  certs/  contact.sh</span>';
    }
  };

  /* aliases */
  var ALIAS = {
    whoami: 'about', me: 'about', exp: 'experience', work: 'experience',
    ach: 'achievements', awards: 'achievements', cve: 'achievements', cves: 'achievements',
    hof: 'achievements', halloffame: 'achievements',
    skill: 'skills', tool: 'tools', arsenal: 'tools', project: 'projects',
    cert: 'certs', certifications: 'certs', edu: 'education',
    lang: 'languages', email: 'contact', linkedin: 'contact', social: 'contact',
    media: 'press', news: 'press', articles: 'press',
    'neofetch': 'about', '?': 'help', man: 'help'
  };

  /* ---------- block builders ---------- */
  function block(inner) { return '<div class="block">' + inner + '</div>'; }
  function cmd(name) { return '<span class="cmd-link" data-cmd="' + name + '">' + name + '</span>'; }
  function kv(k, v) { return '<span class="k">' + k + '</span><span>' + v + '</span>'; }
  function pressItem(src, title, url) {
    return '<span class="bullet"><a href="' + url + '" target="_blank" rel="noopener">' + title + '</a>\n' +
           '    <span class="c-dim">— ' + src + ' ↗</span></span>\n';
  }
  function job(org, role, date, bullets, last) {
    var h = '<span class="c-white bold">' + role + '</span>  <span class="c-dim">' + date + '</span>\n' +
            '<span class="c-accent2">' + org + '</span>\n';
    bullets.forEach(function (b) { h += '<span class="bullet">' + b + '</span>\n'; });
    if (!last) h += '<span class="divider">' + '─'.repeat(40) + '</span>\n';
    return h;
  }
  function ach(title, desc) {
    return '<span class="ok"></span><span class="c-white bold">' + title + '</span>\n' +
           '    <span class="c-dim">' + desc + '</span>\n';
  }
  function skillRow(name) { return '<span class="ok"></span>' + name + '\n'; }
  function cert(name, org, pursuing) {
    return '<span class="bullet">' + name + ' <span class="c-dim">— ' + org +
      (pursuing ? ' · <span class="c-amber">pursuing</span>' : '') + '</span></span>\n';
  }

  /* ---------- command runner ---------- */
  function runCommand(raw) {
    var name = (raw || '').trim().toLowerCase();
    // echo the prompt + command
    printRaw(el(promptHtml() + ' <span class="typed">' + escapeHtml(raw) + '</span>', 'echo-cmd'));
    if (name === '') return;

    if (name === 'clear' || name === 'cls') { output.innerHTML = ''; return; }
    if (name === 'help' || name === 'commands') { print(CMDS.help()); return; }

    var resolved = ALIAS[name] || name;
    var fn = CMDS[resolved];
    if (fn) { print(fn()); }
    else {
      print('<span class="c-accent">command not found:</span> ' + escapeHtml(name) +
        '  <span class="c-dim">— type</span> ' + cmd('help'));
    }
  }

  function promptHtml() {
    return '<span class="ps1"><span class="ps-user">edwin</span><span class="ps-at">@</span>' +
      '<span class="ps-host">shajan</span>:<span class="ps-path">~</span><span class="ps-dollar">$</span></span>';
  }

  /* ---------- input handling ---------- */
  function syncMirror() { mirror.textContent = cmdInput.value; }

  cmdInput.addEventListener('input', syncMirror);

  cmdInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var v = cmdInput.value;
      if (v.trim() !== '') { history.push(v); histIdx = history.length; }
      runCommand(v);
      cmdInput.value = ''; syncMirror();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length && histIdx > 0) { histIdx--; cmdInput.value = history[histIdx]; syncMirror(); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; cmdInput.value = history[histIdx]; }
      else { histIdx = history.length; cmdInput.value = ''; }
      syncMirror();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      var part = cmdInput.value.trim().toLowerCase();
      if (part) {
        var keys = Object.keys(CMDS).concat(Object.keys(ALIAS));
        var hit = keys.filter(function (k) { return k.indexOf(part) === 0; })[0];
        if (hit) { cmdInput.value = hit; syncMirror(); }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault(); output.innerHTML = '';
    }
  });

  // keep focus
  screen.addEventListener('click', function () {
    if (!inputLine.hidden && window.getSelection().toString() === '') cmdInput.focus();
  });

  // clickable commands (output + quickbar)
  document.body.addEventListener('click', function (e) {
    var t = e.target.closest('[data-cmd]');
    if (!t) return;
    var c = t.getAttribute('data-cmd');
    history.push(c); histIdx = history.length;
    runCommand(c);
    cmdInput.focus();
  });

  /* ---------- boot sequence ---------- */
  // NOTE: the [*] / [+] prefixes are added by CSS (.info::before / .ok::before),
  // so the text here must NOT repeat them.
  var bootLines = [
    { t: 'booting secure shell ...', c: 'info' },
    { t: 'kernel: offsec 6.6.6-redteam (x86_64)', c: 'ok' },
    { t: 'loading modules: recon nmap burp metasploit nuclei', c: 'ok' },
    { t: 'establishing encrypted session ... OK', c: 'ok' },
    { t: 'authenticating operator: edwin_shajan', c: 'ok' },
    { t: 'access granted — welcome, operator.', c: 'ok' }
  ];

  function boot() {
    // When embedded in the modern site, the parent plays the boot animation,
    // so we skip our own typed boot and present a ready shell immediately.
    var skip = false;
    try { skip = new URLSearchParams(location.search).get('boot') === 'skip'; } catch (e) {}
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (skip || reduce) {
      if (!skip) bootLines.forEach(function (l) { print(escapeHtml(l.t), l.c); });
      finishBoot();
      return;
    }
    var i = 0;
    (function next() {
      if (i >= bootLines.length) { setTimeout(finishBoot, 250); return; }
      typeLine(bootLines[i].t, bootLines[i].c, 9, function () {
        i++; setTimeout(next, 120);
      });
    })();
  }

  function finishBoot() {
    blank();
    print(CMDS.banner());
    print('Type <span class="cmd-link" data-cmd="help">help</span> to list commands, ' +
      'or click any chip below. Try <span class="cmd-link" data-cmd="about">about</span> first.', 'c-dim');
    blank();
    inputLine.hidden = false;
    quickbar.hidden = false;
    cmdInput.focus();
  }

  boot();
})();
