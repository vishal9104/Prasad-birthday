/* =========================================
   Birthday Memory Site — main.js
   ========================================= */

/* ---- Floating Petals ---- */
(function spawnPetals() {
  const container = document.getElementById('petals');
  if (!container) return;
  const symbols = ['✿', '❀', '✦', '·', '✸', '⁕', '✽'];
  const colors  = ['#C9826B', '#E8B4A0', '#C4A265', '#D4A080', '#B09080'];

  function createPetal() {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left     = Math.random() * 100 + 'vw';
    el.style.fontSize = (10 + Math.random() * 14) + 'px';
    el.style.color    = colors[Math.floor(Math.random() * colors.length)];
    const dur = 7 + Math.random() * 9;
    el.style.animationDuration  = dur + 's';
    el.style.animationDelay     = (Math.random() * 8) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 9) * 1000);
  }

  for (let i = 0; i < 20; i++) createPetal();
  setInterval(createPetal, 1200);
})();


/* ---- Scroll Reveal ---- */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
})();


/* ---- Read config.js values and patch DOM ---- */
(function applyConfig() {
  if (typeof BIRTHDAY_CONFIG === 'undefined') return;
  const c = BIRTHDAY_CONFIG;

  // Name
  if (c.friendName) {
    const nameEl = document.getElementById('friend-name');
    if (nameEl) nameEl.textContent = c.friendName;
    document.title = 'Happy Birthday, ' + c.friendName + ' 🌸';
  }

  // Birthday date
  if (c.birthdayDate) {
    const dateEl = document.getElementById('hero-date');
    if (dateEl) dateEl.textContent = c.birthdayDate;
  }

  // Letter paragraphs
  if (c.letterParagraphs && c.letterParagraphs.length) {
    const body = document.getElementById('letter-body');
    if (body) {
      body.innerHTML = c.letterParagraphs.map(p => `<p>${p}</p>`).join('');
    }
  }

  // Signature
  if (c.signature) {
    const sign = document.getElementById('letter-sign');
    if (sign) sign.innerHTML = c.signature;
  }

  // Memories
  if (c.memories && c.memories.length) {
    const grid = document.getElementById('memories-grid');
    if (grid) {
      grid.innerHTML = c.memories.map(m => `
        <div class="memory-card reveal">
          <div class="memory-photo ${m.image ? '' : 'no-image'}"
               ${m.image ? `style="background-image:url('${m.image}')"` : ''}>
            ${!m.image ? '📷' : ''}
            <div class="memory-overlay"></div>
          </div>
          <div class="memory-body">
            <span class="memory-date">${m.date || ''}</span>
            <p class="memory-caption">${m.caption || ''}</p>
          </div>
        </div>
      `).join('');
      // re-observe new elements
      const newItems = grid.querySelectorAll('.reveal');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 120);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      newItems.forEach(el => obs.observe(el));
    }
  }

  // Words
  if (c.loveWords && c.loveWords.length) {
    const wg = document.getElementById('words-grid');
    if (wg) {
      wg.innerHTML = c.loveWords.map((w, i) => `
        <div class="word-card reveal">
          <span class="word-num">${String(i + 1).padStart(2, '0')}</span>
          <p>${w}</p>
        </div>
      `).join('');
    }
  }

  // Closing from
  if (c.closingFrom) {
    const cf = document.getElementById('closing-from');
    if (cf) cf.textContent = c.closingFrom;
  }
})();
