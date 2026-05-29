/* =========================================================
   Birthday Site — main.js
   ========================================================= */

/* ── BLAST INTRO ── */
(function initBlast() {
  const overlay  = document.getElementById('blast-overlay');
  const canvas   = document.getElementById('blast-canvas');
  const ctx      = canvas.getContext('2d');
  const mainSite = document.getElementById('main-site');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  // Confetti particles
  const COLORS = ['#C9826B','#E8B4A0','#C4A265','#F5EDE0','#fff','#FFD700','#FF6B9D','#A8E6CF'];
  const particles = [];

  for (let i = 0; i < 180; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 6 + Math.random() * 10,
      h: 3 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: 2 + Math.random() * 4,
      angle: Math.random() * 360,
      spin:  (Math.random() - 0.5) * 6,
      sway:  (Math.random() - 0.5) * 2,
      sx: Math.random() * canvas.width
    });
  }

  let frame = 0;
  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y    += p.speed;
      p.angle += p.spin;
      p.x    += p.sway;
      if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 180) requestAnimationFrame(drawConfetti);
  }
  drawConfetti();

  // Text animation
  const blastName = document.getElementById('blast-name');
  const blastSub  = document.getElementById('blast-sub');
  const blastEmoji = document.getElementById('blast-emoji');

  setTimeout(() => { blastEmoji.style.animation = 'bounceIn 0.6s ease both'; }, 100);
  setTimeout(() => { blastName.style.opacity = '1'; blastName.style.transform = 'translateY(0)'; }, 500);
  setTimeout(() => { blastSub.style.opacity  = '1'; }, 1200);

  // Transition out
  setTimeout(() => {
    overlay.style.transition = 'opacity 1s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      mainSite.style.display = 'block';
      setTimeout(() => mainSite.style.opacity = '1', 30);
      initPetals();
      initReveal();
    }, 1000);
  }, 3800);
})();


/* ── FLOATING PETALS ── */
function initPetals() {
  const container = document.getElementById('petals');
  if (!container) return;
  const symbols = ['✿','❀','✦','·','✸','⁕'];
  const colors  = ['#C9826B','#E8B4A0','#C4A265','#D4A080','#B09080'];

  function createPetal() {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left   = Math.random() * 100 + 'vw';
    el.style.fontSize = (10 + Math.random() * 14) + 'px';
    el.style.color  = colors[Math.floor(Math.random() * colors.length)];
    const dur = 7 + Math.random() * 9;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay   = (Math.random() * 4) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 5) * 1000);
  }
  for (let i = 0; i < 20; i++) createPetal();
  setInterval(createPetal, 1200);
}


/* ── SCROLL REVEAL ── */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => obs.observe(el));
}


/* ── APPLY CONFIG ── */
(function applyConfig() {
  if (typeof BIRTHDAY_CONFIG === 'undefined') return;
  const c = BIRTHDAY_CONFIG;

  // Letter
  if (c.letterParagraphs && c.letterParagraphs.length) {
    const body = document.getElementById('letter-body');
    if (body) body.innerHTML = c.letterParagraphs.map(p => `<p>${p}</p>`).join('');
  }
  if (c.signature) {
    const s = document.getElementById('letter-sign');
    if (s) s.innerHTML = c.signature;
  }

  // Memories — photo only, no text
  if (c.memories && c.memories.length) {
    const grid = document.getElementById('memories-grid');
    if (grid) {
      grid.innerHTML = c.memories.map(m => `
        <div class="memory-card reveal">
          <div class="memory-photo" style="background-image:url('${m.image}')">
            <div class="memory-overlay"></div>
          </div>
        </div>
      `).join('');
    }
  }

  // Love words
  if (c.loveWords && c.loveWords.length) {
    const wg = document.getElementById('words-grid');
    if (wg) {
      wg.innerHTML = c.loveWords.map((w, i) => `
        <div class="word-card reveal">
          <span class="word-num">${String(i + 1).padStart(2,'0')}</span>
          <p>${w}</p>
        </div>
      `).join('');
    }
  }

  if (c.closingFrom) {
    const cf = document.getElementById('closing-from');
    if (cf) cf.textContent = c.closingFrom;
  }
})();
