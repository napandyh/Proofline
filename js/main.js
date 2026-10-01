/* Proofline — main.js
   Optional extras. The page is fully readable with this file missing or
   JavaScript turned off. Four small features, each in its own block:
     1. Mobile menu button
     2. "X of Y milestones complete" counter
     3. Demo video: swap in assets/demo.mp4 if it exists
     4. Hero "robot monitor" animation                                    */
(function () {
  'use strict';

  /* ---------- 1. Mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.hidden = false; // the button is only useful when JS runs
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---------- 2. Milestone counter ----------
     Reads the data-done="true/false" attributes in the Progress section. */
  const items = document.querySelectorAll('#progress-list li');
  const summary = document.getElementById('progress-summary');
  if (items.length && summary) {
    const done = document.querySelectorAll('#progress-list li[data-done="true"]').length;
    summary.textContent = done + ' of ' + items.length + ' milestones complete';
    summary.style.setProperty('--pct', Math.round((done / items.length) * 100) + '%');
    summary.hidden = false;
  }

  /* ---------- 3. Demo video ----------
     Asks the browser for the video's details. If assets/demo.mp4 exists,
     the "coming soon" box is replaced by the player. If not, nothing changes. */
  const video = document.getElementById('demo-video');
  const placeholder = document.getElementById('demo-placeholder');
  if (video && placeholder) {
    video.addEventListener('loadedmetadata', () => {
      video.poster = video.dataset.poster; // assets/demo-poster.png
      video.hidden = false;
      placeholder.hidden = true;
    }, { once: true });
    video.preload = 'metadata';
    video.load();
  }

  /* ---------- 4. Robot monitor animation ----------
     The line is revealed left to right. When the score crosses the
     threshold the status flips to ALARM; about 1 second later the
     "predicted failure" marker appears. Loops every 8 seconds.     */
  const fig = document.getElementById('monitor');
  if (!fig) return;
  const clip = document.getElementById('reveal-rect');
  const cursor = document.getElementById('cursor');
  const readout = document.getElementById('monitor-score');
  const pauseBtn = document.getElementById('monitor-pause');
  const line = document.getElementById('score-line');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Chart geometry: these numbers must match the SVG in index.html.
  const X_START = 40, X_END = 468;   // left and right edge of the plot
  const Y_ZERO = 220, Y_SCALE = 180; // y position of score 0, and pixels per 1.0 of score
  const THRESHOLD = 0.7;
  const SWEEP_MS = 6000;             // time to draw the line across
  const LOOP_MS = 8000;              // full loop, including a 2 s pause at the end
  const FAIL_X = Number(document.getElementById('fail-marker').dataset.x);

  // Read the chart points straight out of the SVG path ("M40,180 L52,196 ...")
  const points = line.getAttribute('d').match(/-?[\d.]+,-?[\d.]+/g).map((p) => p.split(',').map(Number));

  // Score at any x position, by drawing a straight line between neighbouring points
  function scoreAt(x) {
    for (let i = 1; i < points.length; i++) {
      const [xa, ya] = points[i - 1], [xb, yb] = points[i];
      if (xb >= x) return (Y_ZERO - (ya + ((yb - ya) * (x - xa)) / (xb - xa))) / Y_SCALE;
    }
    return (Y_ZERO - points[points.length - 1][1]) / Y_SCALE;
  }

  // Where the line first crosses the threshold
  let crossX = X_END;
  for (let x = X_START; x <= X_END; x++) { if (scoreAt(x) >= THRESHOLD) { crossX = x; break; } }

  // Draw one frame with the "now" point at position x
  function render(x) {
    clip.setAttribute('width', x);
    cursor.setAttribute('transform', 'translate(' + x + ' 0)');
    readout.textContent = scoreAt(x).toFixed(2);
    fig.dataset.phase = x >= FAIL_X ? 'failed' : x >= crossX ? 'alarm' : 'nominal';
  }

  let elapsed = 0, last = null, frameId = 0, paused = false, onScreen = true;

  function frame(now) {
    if (last !== null) elapsed = (elapsed + now - last) % LOOP_MS;
    last = now;
    render(X_START + (X_END - X_START) * Math.min(elapsed / SWEEP_MS, 1));
    frameId = requestAnimationFrame(frame);
  }
  function start() {
    if (frameId || paused || !onScreen || reduceMotion.matches) return;
    last = null;
    frameId = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(frameId); frameId = 0; }

  // Pause / play button (moving content must be pausable for accessibility)
  pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.textContent = paused ? 'Play animation' : 'Pause animation';
    paused ? stop() : start();
  });

  // Reduced motion: show the finished picture and no button
  function applyMotionPreference() {
    if (reduceMotion.matches) { stop(); render(X_END); pauseBtn.hidden = true; }
    else { pauseBtn.hidden = false; start(); }
  }
  reduceMotion.addEventListener('change', applyMotionPreference);

  // Save battery: only animate while the monitor is on screen
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      onScreen ? start() : stop();
    }).observe(fig);
  }

  applyMotionPreference();
})();
