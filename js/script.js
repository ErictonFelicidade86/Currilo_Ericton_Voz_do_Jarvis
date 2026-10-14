(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============ fundo tecnológico em canvas ============ */
  var cv = document.getElementById('bg'), ctx = cv.getContext('2d');
  var W = 0, H = 0, dpr = 1, nodes = [], sweep = 0, raf = null;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.floor(W * dpr); cv.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var target = Math.max(28, Math.min(92, Math.round(W * H / 17000)));
    nodes = [];
    for (var i = 0; i < target; i++){
      nodes.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
        r: Math.random() * 1.5 + .7
      });
    }
  }

  function grid(){
    ctx.strokeStyle = 'rgba(56,225,255,0.055)';
    ctx.lineWidth = 1;
    var step = 56;
    ctx.beginPath();
    for (var x = (W % step) / 2; x < W; x += step){ ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (var y = (H % step) / 2; y < H; y += step){ ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();
  }

  function draw(){
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#05080f';
    ctx.fillRect(0, 0, W, H);
    grid();

    var i, j, a, b, dx, dy, d2, max = 128 * 128;
    for (i = 0; i < nodes.length; i++){
      a = nodes[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20;
      if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20;
    }
    for (i = 0; i < nodes.length; i++){
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++){
        b = nodes[j];
        dx = a.x - b.x; dy = a.y - b.y; d2 = dx * dx + dy * dy;
        if (d2 < max){
          ctx.strokeStyle = 'rgba(56,225,255,' + (0.3 * (1 - d2 / max)).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (i = 0; i < nodes.length; i++){
      a = nodes[i];
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = i % 9 === 0 ? 'rgba(255,178,74,.85)' : 'rgba(150,235,255,.75)';
      ctx.fill();
    }

    sweep += 1.1;
    if (sweep > H + 240) sweep = -240;
    var g = ctx.createLinearGradient(0, sweep - 160, 0, sweep + 160);
    g.addColorStop(0, 'rgba(56,225,255,0)');
    g.addColorStop(.5, 'rgba(56,225,255,.07)');
    g.addColorStop(1, 'rgba(56,225,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, sweep - 160, W, 320);

    raf = requestAnimationFrame(draw);
  }

  function start(){ if (raf === null) raf = requestAnimationFrame(draw); }
  function stop(){ if (raf !== null){ cancelAnimationFrame(raf); raf = null; } }
  function drawStatic(){
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#05080f'; ctx.fillRect(0, 0, W, H);
    grid();
    for (var i = 0; i < nodes.length; i++){
      var a = nodes[i];
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(150,235,255,.7)'; ctx.fill();
    }
  }

  resize();
  window.addEventListener('resize', function(){ resize(); if (reduce){ stop(); drawStatic(); } });
  if (reduce) drawStatic(); else start();
  document.addEventListener('visibilitychange', function(){
    if (reduce) return;
    if (document.hidden) stop(); else start();
  });

  /* ============ idioma ============ */
  var lang = 'pt';
  try { var saved = localStorage.getItem('ericton.lang'); if (saved === 'en' || saved === 'pt') lang = saved; } catch (e){}

  var STR = {
    pt: {
      standby: 'sistema em espera',
      booting: 'sistema inicializando',
      welcome: 'bem-vindo',
      soundOn: 'Som: ligado',
      soundOff: 'Som: desligado',
      htmlLang: 'pt-BR',
      lines: [
        '> inicializando interface...',
        '> carregando perfil: ERICTON F. DE BRITO',
        '> módulos: QA · FRONTEND · AUTOMAÇÃO',
        '> integridade dos dados: 100%',
        '> sistema pronto.'
      ],
      greeting: 'Bem-vindo ao portfólio do meu senhor. Fique à vontade para navegar.'
    },
    en: {
      standby: 'system on standby',
      booting: 'system initializing',
      welcome: 'welcome',
      soundOn: 'Sound: on',
      soundOff: 'Sound: off',
      htmlLang: 'en',
      lines: [
        '> initializing interface...',
        '> loading profile: ERICTON F. DE BRITO',
        '> modules: QA · FRONTEND · AUTOMATION',
        '> data integrity: 100%',
        '> system ready.'
      ],
      greeting: "Welcome to my master's portfolio. Feel free to look around."
    }
  };
  function T(key){ return STR[lang][key]; }

  /* guarda o texto original (pt) de cada elemento traduzível */
  var swapText = [], swapHtml = [];
  Array.prototype.forEach.call(document.querySelectorAll('[data-en]'), function(el){
    swapText.push({ el: el, pt: el.textContent, en: el.getAttribute('data-en') });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-en-html]'), function(el){
    swapHtml.push({ el: el, pt: el.innerHTML, en: el.getAttribute('data-en-html') });
  });

  var langBtns = document.querySelectorAll('.lang');
  var booting = false, bootDone = false, typing = 0;

  function applyLang(){
    var i;
    for (i = 0; i < swapText.length; i++) swapText[i].el.textContent = swapText[i][lang];
    for (i = 0; i < swapHtml.length; i++) swapHtml[i].el.innerHTML = swapHtml[i][lang];
    for (i = 0; i < langBtns.length; i++){
      langBtns[i].setAttribute('aria-pressed', langBtns[i].getAttribute('data-lang') === lang ? 'true' : 'false');
    }
    document.documentElement.lang = T('htmlLang');
    syncMute();
    kicker.textContent = bootDone ? T('welcome') : (booting ? T('booting') : T('standby'));
    if (booting || bootDone) renderLines();
  }

  function setLang(next){
    if (next === lang) return;
    lang = next;
    stopVoice();
    try { localStorage.setItem('ericton.lang', lang); } catch (e){}
    applyLang();
  }

  Array.prototype.forEach.call(langBtns, function(b){
    b.addEventListener('click', function(){ setLang(b.getAttribute('data-lang')); });
  });

  /* ============ relógio ============ */
  var clock = document.getElementById('clock');
  function tick(){
    try { clock.textContent = new Date().toLocaleTimeString('pt-BR', { hour12: false }); }
    catch (e){ clock.textContent = ''; }
  }
  tick(); setInterval(tick, 1000);

  /* ============ voz do Jarvis (gravações embutidas) ============ */
  var muted = false;
  var SRC = { pt: 'assets/audio/jarvis-pt.mp3', en: 'assets/audio/jarvis-en.mp3' };
  var players = {};

  function getAudio(code){
    if (!players[code]){
      players[code] = new Audio(SRC[code]);
      players[code].preload = 'auto';
      players[code].volume = 1;
    }
    return players[code];
  }

  /* reserva: se o navegador recusar o áudio, usa a síntese do sistema */
  function pickVoice(){
    if (!('speechSynthesis' in window)) return null;
    var vs = window.speechSynthesis.getVoices() || [];
    var want = lang === 'pt' ? /^pt/i : /^en/i;
    var pool = vs.filter(function(v){ return want.test(v.lang); });
    if (!pool.length) pool = vs;
    var pref = lang === 'pt'
      ? ['ricardo', 'daniel', 'felipe', 'google portugu']
      : ['daniel', 'alex', 'google uk english male', 'google us english'];
    for (var p = 0; p < pref.length; p++){
      for (var i = 0; i < pool.length; i++){
        if (pool[i].name.toLowerCase().indexOf(pref[p]) !== -1) return pool[i];
      }
    }
    return pool[0] || null;
  }
  if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = pickVoice;

  function synth(){
    if (muted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(T('greeting'));
      u.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
      var v = pickVoice();
      if (v) u.voice = v;
      u.rate = 0.96; u.pitch = 0.8; u.volume = 1;
      window.speechSynthesis.speak(u);
    } catch (e){}
  }

  function stopVoice(){
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e){}
    for (var k in players){
      if (Object.prototype.hasOwnProperty.call(players, k)){
        try { players[k].pause(); players[k].currentTime = 0; } catch (e){}
      }
    }
  }

  function speak(){
    if (muted) return;
    stopVoice();
    try {
      var a = getAudio(lang);
      a.currentTime = 0;
      var p = a.play();
      if (p && p.catch) p.catch(function(){ synth(); });
    } catch (e){ synth(); }
  }

  /* bip de inicialização via Web Audio */
  var actx = null;
  function boopSweep(){
    if (muted) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!actx) actx = new AC();
      if (actx.state === 'suspended') actx.resume();
      var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
      o.type = 'sine';
      o.frequency.setValueAtTime(130, t);
      o.frequency.exponentialRampToValueAtTime(880, t + .7);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.09, t + .08);
      g.gain.exponentialRampToValueAtTime(0.0001, t + .9);
      o.connect(g); g.connect(actx.destination);
      o.start(t); o.stop(t + .95);
    } catch (e){}
  }

  /* ============ sequência de boot ============ */
  var boot = document.getElementById('boot'),
      log = document.getElementById('log'),
      kicker = document.getElementById('bootKicker'),
      startBtn = document.getElementById('startBtn'),
      enterBtn = document.getElementById('enterBtn'),
      replayBtn = document.getElementById('replayBtn'),
      skipBtn = document.getElementById('skipBtn'),
      flash = document.getElementById('flash');

  document.documentElement.classList.add('boot-lock');

  function renderLines(){
    var lines = T('lines');
    typing++;
    log.innerHTML = '';
    for (var i = 0; i < lines.length; i++){
      var li = document.createElement('li');
      li.textContent = lines[i];
      log.appendChild(li);
    }
  }

  function typeLines(done){
    var lines = T('lines');
    if (reduce){ renderLines(); done(); return; }
    log.innerHTML = '';
    var run = ++typing, li = 0;
    function nextLine(){
      if (run !== typing) return;
      if (li >= lines.length){ done(); return; }
      var el = document.createElement('li');
      log.appendChild(el);
      var text = lines[li], c = 0;
      (function typeChar(){
        if (run !== typing) return;
        el.textContent = text.slice(0, c);
        if (c <= text.length){ c++; setTimeout(typeChar, 18); }
        else { li++; setTimeout(nextLine, 130); }
      })();
    }
    nextLine();
  }

  function finishBoot(){
    bootDone = true;
    kicker.textContent = T('welcome');
    enterBtn.classList.remove('hidden');
    replayBtn.classList.remove('hidden');
    enterBtn.focus();
  }

  function runBoot(){
    booting = true;
    startBtn.classList.add('hidden');
    kicker.textContent = T('booting');
    boopSweep();
    speak();
    typeLines(finishBoot);
  }

  function enter(){
    if (!reduce) flash.classList.add('go');
    boot.classList.add('leaving');
    document.documentElement.classList.add('booted');
    setTimeout(function(){
      boot.hidden = true;
      document.documentElement.classList.remove('boot-lock');
      window.scrollTo(0, 0);
      var h = document.querySelector('.hero h1');
      if (h){ h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }, reduce ? 20 : 950);
  }

  startBtn.addEventListener('click', runBoot);
  enterBtn.addEventListener('click', enter);
  replayBtn.addEventListener('click', function(){ speak(); });
  skipBtn.addEventListener('click', function(){ muted = true; stopVoice(); syncMute(); enter(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !boot.hidden) enter(); });

  /* ============ rodapé: som e voltar ao topo ============ */
  var muteBtn = document.getElementById('muteBtn');
  function syncMute(){
    muteBtn.textContent = muted ? T('soundOff') : T('soundOn');
    muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
  }
  muteBtn.addEventListener('click', function(){
    muted = !muted;
    if (muted) stopVoice();
    syncMute();
  });
  document.getElementById('speakAgain').addEventListener('click', function(){ speak(); });
  document.getElementById('toTop').addEventListener('click', function(){
    try { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }
    catch (e){ window.scrollTo(0, 0); }
  });

  applyLang();
})();
