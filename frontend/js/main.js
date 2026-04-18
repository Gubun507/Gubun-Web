/* ============================================================
   GUBUN MMORPG — main.js
   ============================================================ */

// ── Navigation ──────────────────────────────────────────────

function entrarJuego() {
  window.location.href = 'juego.html';
}

// Navbar scroll shrink
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Stars (hero screen decoration) ──────────────────────────

const starsContainer = document.getElementById('stars');
if (starsContainer) {
  for (let i = 0; i < 28; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      top: ${Math.random() * 65}%;
      left: ${Math.random() * 100}%;
      animation-duration: ${1.5 + Math.random() * 2.5}s;
      animation-delay: ${Math.random() * 3}s;
      opacity: ${0.3 + Math.random() * 0.7};
    `;
    starsContainer.appendChild(star);
  }
}

// ── Scroll-reveal for feature cards ─────────────────────────

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger each card slightly
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-anim]').forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});

// ── Market Data ──────────────────────────────────────────────

const MARKET_ITEMS = [
  { id: 1,  icon: '🧙', nombre: 'Mago Arcano',         nivel: 15, tipo: 'personaje',   rareza: 'epic',      precio: 450,  vendedor: 'DragonSlayer_99' },
  { id: 2,  icon: '⚔️', nombre: 'Espada del Destino',  nivel: null, tipo: 'arma',       rareza: 'rare',      precio: 280,  vendedor: 'IronForge' },
  { id: 3,  icon: '🏹', nombre: 'Arquero de Sombras',   nivel: 8,  tipo: 'personaje',   rareza: 'rare',      precio: 320,  vendedor: 'NightHunter' },
  { id: 4,  icon: '🛡️', nombre: 'Escudo Ancestral',     nivel: null, tipo: 'arma',       rareza: 'common',    precio: 150,  vendedor: 'GuardianX' },
  { id: 5,  icon: '🔮', nombre: 'Orbe de Poder Eterno', nivel: null, tipo: 'objeto',     rareza: 'legendary', precio: 800,  vendedor: 'MysticWiz' },
  { id: 6,  icon: '🧝', nombre: 'Elfo del Bosque',      nivel: 12, tipo: 'personaje',   rareza: 'epic',      precio: 550,  vendedor: 'WoodElf_23' },
  { id: 7,  icon: '⚗️', nombre: 'Poción de Vida X',     nivel: null, tipo: 'consumible', rareza: 'common',    precio: 75,   vendedor: 'Alchemist_Pro' },
  { id: 8,  icon: '💎', nombre: 'Cristal Legendario',   nivel: null, tipo: 'objeto',     rareza: 'legendary', precio: 1200, vendedor: 'GemHunter' },
  { id: 9,  icon: '🗡️', nombre: 'Daga del Viento',      nivel: null, tipo: 'arma',       rareza: 'rare',      precio: 195,  vendedor: 'ShadowBlade' },
  { id: 10, icon: '🦹', nombre: 'Paladin de la Luz',    nivel: 20, tipo: 'personaje',   rareza: 'legendary', precio: 950,  vendedor: 'HolyKnight7' },
  { id: 11, icon: '🐉', nombre: 'Invocar Dragón',       nivel: null, tipo: 'consumible', rareza: 'epic',      precio: 600,  vendedor: 'DrakeKeeper' },
  { id: 12, icon: '🎯', nombre: 'Arco Élfico',          nivel: null, tipo: 'arma',       rareza: 'common',    precio: 110,  vendedor: 'ForestRanger' },
];

const RARITY_LABEL = { common: 'Común', rare: 'Raro', epic: 'Épico', legendary: 'Legendario' };
const RARITY_CLASS = { common: 'badge-common', rare: 'badge-rare', epic: 'badge-epic', legendary: 'badge-legendary' };

// ── Render Market ────────────────────────────────────────────

function renderMarket(items) {
  const grid = document.getElementById('marketGrid');
  if (!grid) return;

  // Update stats
  const countEl = document.getElementById('itemCount');
  const minEl   = document.getElementById('minPrice');

  if (countEl) countEl.textContent = items.length;
  if (minEl) {
    const min = items.length ? Math.min(...items.map(i => i.precio)) : '—';
    minEl.textContent = items.length ? min : '—';
  }

  grid.innerHTML = '';

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon">🔍</span>
        <p>No se encontraron ítems con esos filtros.</p>
      </div>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';

    const levelStr = item.nivel ? ` · Lv.${item.nivel}` : '';

    card.innerHTML = `
      <span class="item-icon">${item.icon}</span>
      <span class="item-badge ${RARITY_CLASS[item.rareza]}">${RARITY_LABEL[item.rareza]}</span>
      <div class="item-name">${item.nombre}${levelStr}</div>
      <div class="item-meta">Vendedor: ${item.vendedor}</div>
      <div class="item-footer">
        <div class="item-price">🪙 ${item.precio.toLocaleString()}</div>
        <button class="btn-buy" onclick="comprar(${item.id})">Comprar</button>
      </div>`;

    grid.appendChild(card);
  });
}

// ── Buy Handler ──────────────────────────────────────────────

function comprar(id) {
  const item = MARKET_ITEMS.find(i => i.id === id);
  if (!item) return;

  // TODO: Integrar con WebSocket / backend
  const confirmed = confirm(`¿Comprar "${item.nombre}" por 🪙 ${item.precio.toLocaleString()} oro?`);
  if (confirmed) {
    alert(`✅ ¡Compra exitosa!\n"${item.nombre}" ahora es tuyo.`);
  }
}

// ── Filter & Sort Logic ──────────────────────────────────────

function applyFilters() {
  const query   = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
  const rarity  = document.getElementById('filterRarity')?.value || 'all';
  const type    = document.getElementById('filterType')?.value   || 'all';
  const sort    = document.getElementById('sortBy')?.value       || 'default';

  let filtered = [...MARKET_ITEMS];

  if (query)          filtered = filtered.filter(i => i.nombre.toLowerCase().includes(query));
  if (rarity !== 'all') filtered = filtered.filter(i => i.rareza === rarity);
  if (type   !== 'all') filtered = filtered.filter(i => i.tipo   === type);

  if (sort === 'precio-asc')  filtered.sort((a, b) => a.precio - b.precio);
  if (sort === 'precio-desc') filtered.sort((a, b) => b.precio - a.precio);
  if (sort === 'nombre')      filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));

  renderMarket(filtered);
}

// ── Init Market (only on mercado.html) ──────────────────────

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('marketGrid')) {
    renderMarket(MARKET_ITEMS);

    document.getElementById('searchInput')?.addEventListener('input',  applyFilters);
    document.getElementById('filterRarity')?.addEventListener('change', applyFilters);
    document.getElementById('filterType')?.addEventListener('change',   applyFilters);
    document.getElementById('sortBy')?.addEventListener('change',       applyFilters);
  }
});