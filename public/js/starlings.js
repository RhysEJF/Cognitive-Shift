/**
 * Starling Swarm Effect
 * Particles spawn at the cursor, expand briefly, then chase the mouse
 * along its trail path — maintaining swarm-like spread.
 * The human pilots the swarm.
 * Vanilla Canvas2D — no dependencies.
 */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('starlings-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var hero = canvas.parentElement;

  // --- Config ---
  var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  var MAX_PARTICLES = isMobile ? 400 : 800;
  var SPAWN_RATE = isMobile ? 3 : 6;
  var PARTICLE_LIFE = 160;
  var BURST_SPEED = 3;
  var TRAIL_MAX = 600;
  var PAUSE_FRAMES = 18;   // ~0.3s pause at spawn before chasing
  var ADVANCE_RATE = 1.8;  // trail points per frame — steady, no acceleration

  // --- State ---
  var particles = [];
  var trail = [];
  var trailId = 0;
  var mouse = { x: -9999, y: -9999, active: false, moving: false };
  var lastSpawnPos = { x: -9999, y: -9999 };
  var moveTimer = 0;

  function resize() {
    var rect = hero.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function getTrailPoint(id) {
    if (trail.length === 0) return null;
    var firstId = trail[0].id;
    var idx = id - firstId;
    if (idx < 0) return trail[0];
    if (idx >= trail.length) return trail[trail.length - 1];
    return trail[idx];
  }

  function spawn(x, y) {
    var angle = Math.random() * Math.PI * 2;
    var speed = BURST_SPEED * (0.3 + Math.random() * 0.7);
    return {
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      age: 0,
      life: PARTICLE_LIFE * (0.7 + Math.random() * 0.3),
      radius: 1.5 + Math.random() * 2.5,
      birthId: trailId - 1,
      trailPos: trailId - 1,                    // advances toward head each frame
      chaseTarget: -1,                           // snapshot of headId when chase begins
      offsetAngle: Math.random() * Math.PI * 2,  // perpendicular spread direction
      offsetDist: 6 + Math.random() * 24         // how far off the trail line (6–30px)
    };
  }

  // --- Pointer tracking ---
  function onPointerMove(e) {
    var rect = hero.getBoundingClientRect();
    var cx, cy;
    if (e.touches) {
      cx = e.touches[0].clientX;
      cy = e.touches[0].clientY;
    } else {
      cx = e.clientX;
      cy = e.clientY;
    }
    mouse.x = cx - rect.left;
    mouse.y = cy - rect.top;
    mouse.active = true;
    mouse.moving = true;
    clearTimeout(moveTimer);
    moveTimer = setTimeout(function () { mouse.moving = false; }, 100);

    trail.push({ x: mouse.x, y: mouse.y, id: trailId++ });
    while (trail.length > TRAIL_MAX) trail.shift();
  }

  function onPointerLeave() {
    mouse.active = false;
    mouse.moving = false;
  }

  hero.addEventListener('mousemove', onPointerMove);
  hero.addEventListener('mouseleave', onPointerLeave);
  hero.addEventListener('touchmove', onPointerMove, { passive: true });
  hero.addEventListener('touchend', onPointerLeave);

  // --- Update ---
  function update() {
    if (mouse.active && mouse.moving) {
      var dx = mouse.x - lastSpawnPos.x;
      var dy = mouse.y - lastSpawnPos.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var count = Math.min(Math.ceil(SPAWN_RATE * (1 + dist * 0.05)), 10);
      for (var s = 0; s < count && particles.length < MAX_PARTICLES; s++) {
        particles.push(spawn(mouse.x, mouse.y));
      }
      lastSpawnPos.x = mouse.x;
      lastSpawnPos.y = mouse.y;
    }

    var headId = trailId - 1;

    var i = particles.length;
    while (i--) {
      var p = particles[i];
      p.age++;

      if (p.age >= p.life) {
        particles.splice(i, 1);
        continue;
      }

      var progress = p.age / p.life; // 0 → 1

      // --- Phase 1: Burst (pause + expand) ---
      if (p.age <= PAUSE_FRAMES) {
        // Outward kick, decays during pause
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.90;
        p.vy *= 0.90;
      } else {
        // --- Phase 2: Chase along the trail ---
        // Snapshot where the mouse is when chase begins — particle
        // only follows trail up to this point, then stays and fades.
        // New particles handle any new mouse movement.
        if (p.chaseTarget === -1) {
          p.chaseTarget = headId;
        }

        // Kill remaining burst velocity
        p.vx *= 0.5;
        p.vy *= 0.5;
        p.x += p.vx;
        p.y += p.vy;

        // Advance at steady rate, never past the snapshot target
        if (p.trailPos < p.chaseTarget) {
          p.trailPos += ADVANCE_RATE;
          if (p.trailPos > p.chaseTarget) p.trailPos = p.chaseTarget;
        }

        var pt = getTrailPoint(Math.round(p.trailPos));
        if (pt) {
          var chaseProgress = (p.age - PAUSE_FRAMES) / (p.life - PAUSE_FRAMES);
          var spreadScale = 0.3 + 0.7 * (1 - chaseProgress); // 1.0 → 0.3

          p.offsetAngle += 0.015;

          var targetX = pt.x + Math.cos(p.offsetAngle) * p.offsetDist * spreadScale;
          var targetY = pt.y + Math.sin(p.offsetAngle) * p.offsetDist * spreadScale;

          // Constant lerp — no acceleration
          p.x += (targetX - p.x) * 0.12;
          p.y += (targetY - p.y) * 0.12;
        }
      }
    }
  }

  // --- Draw ---
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var progress = p.age / p.life;

      // Opacity: fade in, hold, fade out
      var alpha;
      if (progress < 0.05) {
        alpha = progress / 0.05;
      } else if (progress > 0.6) {
        alpha = (1 - progress) / 0.4;
      } else {
        alpha = 1;
      }
      var baseAlpha = 0.5 - progress * 0.3;
      alpha *= baseAlpha;
      if (alpha <= 0) continue;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200, 164, 92, ' + alpha.toFixed(3) + ')';
      ctx.fill();
    }

    // Cursor glow
    if (mouse.active && mouse.moving) {
      var grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 20);
      grd.addColorStop(0, 'rgba(200, 164, 92, 0.2)');
      grd.addColorStop(1, 'rgba(200, 164, 92, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  loop();
})();
