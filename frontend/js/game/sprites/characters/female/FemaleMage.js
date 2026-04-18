/**
 * ╔══════════════════════════════════════════════════════╗
 * ║   GUBUN — FemaleMage.js  (corregido)                ║
 * ║   Maga Femenina — Pixel Art dibujado por partes      ║
 * ╚══════════════════════════════════════════════════════╝
 */
import { px, rect, PIXEL } from '../../SpriteSystem.js';

// ═══════════════════════════════════════════════════════════
//  PALETA DEFAULT — MAGA
// ═══════════════════════════════════════════════════════════
export const FM_PALETTE = {
  skin:        '#f5c5a3',  skinShadow:  '#dba882',  skinDark:    '#c08060',
  hair:        '#2dd4bf',  hairShadow:  '#0d9488',  hairDark:    '#0a6b60',
  robe:        '#7c3aed',  robeShadow:  '#4c1d95',  robeLight:   '#c4b5fd',
  cloth:       '#f0f9ff',  clothShadow: '#bae6fd',
  iris:        '#2563eb',  irisLight:   '#93c5fd',  pupil:       '#1e3a8a',
  eyeWhite:    '#f8fafc',  eyeLine:     '#0f0806',
  gold:        '#f59e0b',  goldShadow:  '#b45309',  goldBuckle:  '#fde68a',
  boot:        '#1e293b',  bootSeam:    '#475569',
  magicA:      '#a78bfa',  magicB:      '#f0abfc',  magicGlow:   '#818cf8',
  blade:       '#e2e8f0',  bladeShadow: '#94a3b8',  bladeEdge:   '#ffffff',
  hilt:        '#fbbf24',
  outline:     '#0f0806',
};

// ═══════════════════════════════════════════════════════════
//  HELPERS — PARTES DIBUJADAS PÍXEL POR PÍXEL
// ═══════════════════════════════════════════════════════════

function drawShadow(ctx, pal) {
  ctx.globalAlpha = 0.22;
  rect(ctx, 4, 24, 10, 2, '#000000');
  rect(ctx, 5, 25,  8, 1, '#000000');
  ctx.globalAlpha = 1.0;
}

// ── Pelo trasero (mechones largos detrás de todo) ─────────
function drawHairBack(ctx, pal, sway = 0) {
  const s = Math.round(sway);
  // Mechón izquierdo
  for (let i = 0; i < 12; i++) {
    const a = Math.max(0, 1 - i / 14);
    ctx.globalAlpha = a;
    px(ctx, 3 + s, 8 + i, pal.hairDark);
    px(ctx, 4 + s, 8 + i, pal.hairShadow);
    if (i > 2) px(ctx, 3 + s, 9 + i, pal.hairDark);
  }
  // Mechón derecho
  for (let i = 0; i < 12; i++) {
    const a = Math.max(0, 1 - i / 14);
    ctx.globalAlpha = a;
    px(ctx, 14 - s, 8 + i, pal.hairDark);
    px(ctx, 13 - s, 8 + i, pal.hairShadow);
  }
  ctx.globalAlpha = 1.0;
}

// ── Cabeza — óvalo de piel ──────────────────────────────
function drawHead(ctx, pal) {
  // Contorno
  rect(ctx, 5,  4, 8, 10, pal.outline);
  // Interior piel
  rect(ctx, 6,  5, 6,  8, pal.skin);
  // Mejillas
  px(ctx, 6,  9, pal.skinShadow); px(ctx, 6, 10, pal.skinShadow);
  px(ctx, 11, 9, pal.skinShadow); px(ctx, 11,10, pal.skinShadow);
  // Mentón
  rect(ctx, 6, 13, 6,  1, pal.skin);
  px(ctx, 7, 14, pal.skinShadow);
  px(ctx, 8, 14, pal.skinShadow);
}

// ── Ojos grandes anime ─────────────────────────────────
function drawEyes(ctx, pal) {
  // Ojo izquierdo (x 6-8)
  rect(ctx, 6, 7, 3, 4, pal.outline);
  rect(ctx, 6, 7, 3, 1, pal.eyeWhite);      // blanco superior
  rect(ctx, 6, 8, 3, 3, pal.iris);           // iris grande
  px(ctx, 6,  8, pal.irisLight);             // brillo iris
  rect(ctx, 6, 9, 3, 2, pal.pupil);          // pupila
  px(ctx, 7, 8, '#ffffff');                  // destello
  // Ojo derecho (x 9-11)
  rect(ctx, 9, 7, 3, 4, pal.outline);
  rect(ctx, 9, 7, 3, 1, pal.eyeWhite);
  rect(ctx, 9, 8, 3, 3, pal.iris);
  px(ctx, 9,  8, pal.irisLight);
  rect(ctx, 9, 9, 3, 2, pal.pupil);
  px(ctx, 10, 8, '#ffffff');
  // Pestañas superiores
  rect(ctx, 5, 6, 5, 1, pal.eyeLine);
  rect(ctx, 8, 6, 5, 1, pal.eyeLine);
  // Labio / blush
  px(ctx, 8, 12, pal.skinDark);
  px(ctx, 9, 12, pal.skinDark);
}

// ── Pelo frontal (flequillo anime) ────────────────────
function drawHairFront(ctx, pal) {
  // Parte superior
  rect(ctx, 4, 1, 10, 1, pal.outline);
  rect(ctx, 4, 2, 10, 3, pal.hair);
  px(ctx, 3, 2, pal.outline); px(ctx, 14, 2, pal.outline);
  // Volumen
  px(ctx, 3, 3, pal.hairShadow); px(ctx, 14, 3, pal.hairShadow);
  // Sombras internas del pelo
  px(ctx, 5, 3, pal.hairDark); px(ctx, 10, 3, pal.hairDark);
  px(ctx, 7, 2, pal.hairDark); // mechón central sombra
  // Flequillo (cae sobre la frente)
  rect(ctx, 5, 4, 2, 2, pal.hair);          // flequillo izquierdo
  rect(ctx, 11,4, 2, 2, pal.hair);          // flequillo derecho
  rect(ctx, 4, 4, 2, 1, pal.hairShadow);    // base izquierda
  rect(ctx, 12,4, 2, 1, pal.hairShadow);    // base derecha
  // Mechón central
  px(ctx, 8, 4, pal.hairShadow); px(ctx, 9, 4, pal.hairShadow);
  px(ctx, 8, 5, pal.hairDark);
  // Contorno lateral del pelo
  px(ctx, 4,  5, pal.hair); px(ctx, 4,  6, pal.hair); px(ctx, 4,  7, pal.hairShadow);
  px(ctx, 13, 5, pal.hair); px(ctx, 13, 6, pal.hair); px(ctx, 13, 7, pal.hairShadow);
}

// ── Cuello y escote ──────────────────────────────────
function drawNeck(ctx, pal) {
  rect(ctx, 7, 14, 4, 2, pal.outline);
  rect(ctx, 8, 14, 2, 2, pal.skin);
}

// ── Cuerpo / Túnica superior ─────────────────────────
function drawRobeTop(ctx, pal, lean = 0) {
  const x = 4 + lean;
  // Silueta de hombros
  rect(ctx, x,   13, 10, 8, pal.outline);
  // Interior de la túnica
  rect(ctx, x+1, 14,  8, 6, pal.robe);
  // Detalle de pliegues verticales
  px(ctx, x+2, 14, pal.robeShadow); px(ctx, x+2, 15, pal.robeShadow);
  px(ctx, x+2, 16, pal.robeShadow); px(ctx, x+2, 17, pal.robeShadow);
  px(ctx, x+7, 14, pal.robeShadow); px(ctx, x+7, 15, pal.robeShadow);
  px(ctx, x+7, 16, pal.robeShadow); px(ctx, x+7, 17, pal.robeShadow);
  // Luz central
  px(ctx, x+4, 14, pal.robeLight); px(ctx, x+5, 14, pal.robeLight);
  px(ctx, x+4, 15, pal.robeLight);
  // Collar interior blanco (scoop neck)
  rect(ctx, x+3, 13, 4, 3, pal.cloth);
  rect(ctx, x+4, 13, 2, 4, pal.cloth);
  px(ctx, x+3, 15, pal.clothShadow); px(ctx, x+6, 15, pal.clothShadow);
}

// ── Cinturón dorado ───────────────────────────────────
function drawBelt(ctx, pal) {
  rect(ctx, 4, 19, 10, 2, pal.outline);
  rect(ctx, 5, 19,  8, 1, pal.gold);
  rect(ctx, 5, 20,  8, 1, pal.goldShadow);
  // Hebilla central
  rect(ctx, 8, 18, 2, 4, pal.goldBuckle);
  px(ctx, 8, 18, pal.outline); px(ctx, 9, 18, pal.outline);
  px(ctx, 8, 21, pal.outline); px(ctx, 9, 21, pal.outline);
  px(ctx, 8, 19, pal.gold);
}

// ── Falda / Túnica inferior ──────────────────────────
function drawRobeBottom(ctx, pal, sway = 0) {
  const s = Math.round(sway);
  const w = 12 - Math.abs(s);
  rect(ctx, 3 + s, 21, w,     5, pal.outline);
  rect(ctx, 4 + s, 22, w - 2, 4, pal.robe);
  // Pliegues de la falda
  px(ctx, 5+s, 22, pal.robeShadow); px(ctx, 5+s, 23, pal.robeShadow); px(ctx, 5+s, 24, pal.robeShadow);
  px(ctx, 8,   22, pal.robeLight);  px(ctx, 8,   23, pal.robeLight);
  px(ctx, 11+s,22, pal.robeShadow); px(ctx, 11+s,23, pal.robeShadow);
}

// ── Botas ────────────────────────────────────────────
function drawBoots(ctx, pal, leftDy = 0, rightDy = 0) {
  // Bota izquierda
  rect(ctx, 5, 24 + leftDy,  3, 3, pal.outline);
  rect(ctx, 6, 25 + leftDy,  2, 2, pal.boot);
  px(ctx,  6, 25 + leftDy, pal.bootSeam);
  // Bota derecha
  rect(ctx, 10, 24 + rightDy, 3, 3, pal.outline);
  rect(ctx, 10, 25 + rightDy, 2, 2, pal.boot);
  px(ctx,  11, 25 + rightDy, pal.bootSeam);
}

// ── Brazo izquierdo ───────────────────────────────────
function drawArmL(ctx, pal, dy = 0, pose = 'idle') {
  if (pose === 'idle') {
    rect(ctx, 2, 14+dy, 3, 6, pal.outline);
    rect(ctx, 3, 15+dy, 1, 5, pal.skin);
    px(ctx, 3, 19+dy, pal.skinShadow);
    rect(ctx, 2, 20+dy, 3, 2, pal.outline);
    rect(ctx, 3, 20+dy, 1, 2, pal.skin);
  } else if (pose === 'raised') {
    rect(ctx, 1, 9+dy, 4, 9, pal.outline);
    rect(ctx, 2, 10+dy, 2, 8, pal.skin);
    // Mano abierta
    rect(ctx, 1, 9+dy, 4, 3, pal.outline);
    rect(ctx, 1, 10+dy, 3, 2, pal.skin);
  } else if (pose === 'attack') {
    rect(ctx, 0, 13+dy, 5, 4, pal.outline);
    rect(ctx, 1, 14+dy, 3, 3, pal.skin);
  }
}

// ── Brazo derecho ─────────────────────────────────────
function drawArmR(ctx, pal, dy = 0, pose = 'idle') {
  if (pose === 'idle') {
    rect(ctx, 13, 14+dy, 3, 6, pal.outline);
    rect(ctx, 14, 15+dy, 1, 5, pal.skin);
    px(ctx, 14, 19+dy, pal.skinShadow);
    rect(ctx, 13, 20+dy, 3, 2, pal.outline);
    rect(ctx, 14, 20+dy, 1, 2, pal.skin);
  } else if (pose === 'staff') {
    rect(ctx, 13, 12+dy, 3, 8, pal.outline);
    rect(ctx, 14, 13+dy, 1, 7, pal.skin);
  } else if (pose === 'wind_up') {
    rect(ctx, 13, 9+dy, 3, 7, pal.outline);
    rect(ctx, 14, 10+dy, 1, 6, pal.skin);
  } else if (pose === 'strike') {
    rect(ctx, 13, 12+dy, 4, 5, pal.outline);
    rect(ctx, 13, 13+dy, 3, 4, pal.skin);
  }
}

// ── Staff del mago ────────────────────────────────────
function drawStaff(ctx, pal, x, y, glow = false) {
  // Palo
  for (let i = 0; i < 13; i++) {
    px(ctx, x,     y+i, pal.outline);
    px(ctx, x + 1, y+i, i % 2 === 0 ? '#8b5cf6' : '#6d28d9');
  }
  // Orbe en la punta
  rect(ctx, x-1, y-3, 5, 4, pal.outline);
  rect(ctx, x,   y-2, 3, 3, glow ? pal.magicA : '#a78bfa');
  px(ctx, x+1,   y-2, glow ? '#ffffff' : pal.magicGlow);
  if (glow) {
    ctx.globalAlpha = 0.35;
    rect(ctx, x-2, y-4, 7, 6, pal.magicB);
    ctx.globalAlpha = 1.0;
  }
}

// ── Espada ────────────────────────────────────────────
function drawSword(ctx, pal, x, y, angle = 'up') {
  if (angle === 'up') {
    for (let i = 0; i < 10; i++) {
      px(ctx, x,   y+i, pal.outline);
      px(ctx, x+1, y+i, i < 3 ? pal.bladeEdge : pal.blade);
      if (i > 2) px(ctx, x+2, y+i, pal.bladeShadow);
    }
    rect(ctx, x-1, y+9, 5, 2, pal.outline);
    rect(ctx, x,   y+9, 3, 1, pal.hilt);
    px(ctx, x+1, y+11, pal.hilt);
  } else if (angle === 'slash') {
    for (let i = 0; i < 9; i++) {
      px(ctx, x-i,   y+i, pal.outline);
      px(ctx, x-i+1, y+i, i < 3 ? pal.bladeEdge : pal.blade);
    }
    rect(ctx, x-7, y+8, 4, 2, pal.outline);
    rect(ctx, x-6, y+8, 2, 1, pal.hilt);
  }
}

// ── Efecto de tajo (arco de luz) ──────────────────────
function drawSlashFX(ctx, pal, progress) {
  if (progress <= 0) return;
  const cx = 9, cy = 13;
  const r1 = 2 + progress * 5;
  const r2 = 4 + progress * 8;
  ctx.globalAlpha = (1 - progress) * 0.85;
  for (let rx = -Math.ceil(r2); rx <= Math.ceil(r2); rx++) {
    for (let ry = -Math.ceil(r2); ry <= Math.ceil(r2); ry++) {
      const d = Math.sqrt(rx * rx + ry * ry);
      if (d >= r1 && d <= r2) px(ctx, cx+rx, cy+ry, pal.bladeEdge);
    }
  }
  ctx.globalAlpha = 1.0;
}

// ── Proyectil mágico ─────────────────────────────────
function drawMagicOrb(ctx, pal, x, y, size = 2) {
  ctx.globalAlpha = 0.9;
  rect(ctx, x-size, y-size, size*2+1, size*2+1, pal.magicB);
  rect(ctx, x-1,    y-1,    3,        3,         pal.magicA);
  px(ctx, x, y, '#ffffff');
  ctx.globalAlpha = 0.35;
  rect(ctx, x-size-1, y-size-1, size*2+3, size*2+3, pal.magicGlow);
  ctx.globalAlpha = 1.0;
}

// ═══════════════════════════════════════════════════════════
//  FRAMES — IDLE
// ═══════════════════════════════════════════════════════════

function idleFront(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 0);
  drawRobeBottom(ctx, pal, 0);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 0);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, 0, 'staff');
  drawStaff(ctx, pal, 14, 5, false);
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

function idleBack(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 0);
  drawRobeBottom(ctx, pal, 0);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 0);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, 0, 'staff');
  // Cabeza de espalda
  rect(ctx, 5, 4, 8, 10, pal.outline);
  rect(ctx, 6, 5, 6,  9, pal.hairShadow);
  rect(ctx, 7, 5, 4,  4, pal.hairDark);
  // Pelo largo por detrás
  rect(ctx, 4, 2, 10, 5, pal.hair);
  rect(ctx, 3, 3, 12, 3, pal.hairShadow);
  px(ctx, 5, 2, pal.hairShadow); px(ctx, 12, 2, pal.hairShadow);
}

function idleLeft(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 0);
  drawRobeBottom(ctx, pal, 0);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, -1);
  // Brazo del fondo (derecho) oculto por el cuerpo
  rect(ctx, 12, 14, 2, 8, pal.robe);
  drawArmL(ctx, pal, 0, 'idle');
  drawStaff(ctx, pal, 13, 6, false);
  // Cabeza de perfil izquierdo
  rect(ctx, 6, 4, 7, 10, pal.outline);
  rect(ctx, 7, 5, 5,  9, pal.skin);
  px(ctx, 11, 5, pal.skinShadow); px(ctx, 11, 6, pal.skinShadow);
  px(ctx, 11, 7, pal.skinShadow); px(ctx, 11, 8, pal.skinShadow);
  // Ojo de perfil
  rect(ctx, 9, 7, 2, 3, pal.outline);
  px(ctx, 9, 7, pal.eyeWhite);  px(ctx, 10, 7, pal.eyeWhite);
  px(ctx, 9, 8, pal.iris);      px(ctx, 9, 9, pal.irisLight);
  px(ctx, 10, 6, pal.eyeLine);  // pestaña
  // Nariz de perfil
  px(ctx, 11, 10, pal.skinDark); px(ctx, 12, 11, pal.skinDark);
  // Pelo de perfil
  rect(ctx, 5, 1, 8, 5, pal.hair);
  rect(ctx, 5, 3, 8, 3, pal.hairShadow);
  px(ctx, 5, 5, pal.hair); px(ctx, 5, 6, pal.hairShadow);
  rect(ctx, 4, 2, 3, 3, pal.hairDark);
}

// ═══════════════════════════════════════════════════════════
//  WALK CYCLE — 4 FRAMES
// ═══════════════════════════════════════════════════════════

const WALK_PHASE = [
  { leftDy: -1, rightDy:  1, sway:  1, bob: -1 },
  { leftDy:  0, rightDy:  0, sway:  0, bob:  0 },
  { leftDy:  1, rightDy: -1, sway: -1, bob: -1 },
  { leftDy:  0, rightDy:  0, sway:  0, bob:  0 },
];

function walkFront(ctx, pal, f) {
  const ph = WALK_PHASE[f];
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, ph.sway);
  drawRobeBottom(ctx, pal, ph.sway);
  drawBoots(ctx, pal, ph.leftDy, ph.rightDy);
  drawBelt(ctx, pal);
  ctx.save(); ctx.translate(0, ph.bob * PIXEL);
  drawRobeTop(ctx, pal, 0);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, ph.rightDy, 'idle');  // brazos balancean opuesto
  drawArmR(ctx, pal, ph.leftDy,  'staff');
  drawStaff(ctx, pal, 14, 5 + ph.leftDy, false);
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
  ctx.restore();
}

function walkBack(ctx, pal, f) {
  const ph = WALK_PHASE[f];
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, ph.sway);
  drawRobeBottom(ctx, pal, ph.sway);
  drawBoots(ctx, pal, ph.leftDy, ph.rightDy);
  drawBelt(ctx, pal);
  ctx.save(); ctx.translate(0, ph.bob * PIXEL);
  drawRobeTop(ctx, pal, 0);
  drawArmL(ctx, pal, ph.rightDy, 'idle');
  drawArmR(ctx, pal, ph.leftDy,  'idle');
  // Cabeza de espalda
  rect(ctx, 5, 4, 8, 10, pal.outline);
  rect(ctx, 6, 5, 6,  9, pal.hairShadow);
  rect(ctx, 4, 2, 10, 5, pal.hair);
  rect(ctx, 3, 3, 12, 3, pal.hairShadow);
  ctx.restore();
}

function walkLeft(ctx, pal, f) {
  const ph = WALK_PHASE[f];
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, ph.sway);
  drawRobeBottom(ctx, pal, ph.sway);
  drawBoots(ctx, pal, ph.leftDy, ph.rightDy);
  drawBelt(ctx, pal);
  ctx.save(); ctx.translate(0, ph.bob * PIXEL);
  drawRobeTop(ctx, pal, ph.sway);
  rect(ctx, 12, 14, 2, 8, pal.robe);
  drawArmL(ctx, pal, ph.rightDy, 'idle');
  drawStaff(ctx, pal, 13, 6 + ph.leftDy, false);
  // Cabeza perfil
  rect(ctx, 6, 4, 7, 10, pal.outline);
  rect(ctx, 7, 5, 5,  9, pal.skin);
  px(ctx, 11, 5, pal.skinShadow); px(ctx, 11, 6, pal.skinShadow);
  px(ctx, 11, 7, pal.skinShadow); px(ctx, 11, 8, pal.skinShadow);
  rect(ctx, 9, 7, 2, 3, pal.outline);
  px(ctx, 9, 7, pal.eyeWhite); px(ctx, 10, 7, pal.eyeWhite);
  px(ctx, 9, 8, pal.iris);     px(ctx, 9,  9, pal.irisLight);
  px(ctx, 10, 6, pal.eyeLine);
  px(ctx, 11, 10, pal.skinDark);
  rect(ctx, 5, 1, 8, 5, pal.hair);
  rect(ctx, 5, 3, 8, 3, pal.hairShadow);
  px(ctx, 5, 5, pal.hair); px(ctx, 5, 6, pal.hairShadow);
  ctx.restore();
}

// ═══════════════════════════════════════════════════════════
//  ATAQUE ESPADA — TAJO (3 frames)
// ═══════════════════════════════════════════════════════════

function atkSlash0(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, -1);
  drawRobeBottom(ctx, pal, -1);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, -1);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, -3, 'wind_up');
  drawSword(ctx, pal, 14, 4, 'up');
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

function atkSlash1(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 2);
  drawRobeBottom(ctx, pal, 2);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 1);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, -1, 'strike');
  drawSword(ctx, pal, 10, 9, 'slash');
  drawSlashFX(ctx, pal, 0.35);
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

function atkSlash2(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 1);
  drawRobeBottom(ctx, pal, 1);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 1);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, 2, 'idle');
  drawSword(ctx, pal, 12, 14, 'up');
  drawSlashFX(ctx, pal, 0.78);
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

// ═══════════════════════════════════════════════════════════
//  ATAQUE ESPADA — TAJO A DISTANCIA (4 frames)
// ═══════════════════════════════════════════════════════════

function atkRanged0(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, -1);
  drawRobeBottom(ctx, pal, -1);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, -1);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, -4, 'wind_up');
  drawSword(ctx, pal, 14, 3, 'up');
  ctx.globalAlpha = 0.45;
  rect(ctx, 12, 2, 6, 9, '#c4b5fd');
  ctx.globalAlpha = 1.0;
  drawMagicOrb(ctx, pal, 15, 5, 1);
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

function atkRanged1(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 2);
  drawRobeBottom(ctx, pal, 2);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 2);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, -1, 'strike');
  drawSword(ctx, pal, 8, 9, 'slash');
  // Onda de energía saliendo hacia izquierda
  for (let i = 0; i < 5; i++) {
    ctx.globalAlpha = 1 - i * 0.2;
    px(ctx, 3-i, 13+i, pal.magicA);
    px(ctx, 3-i, 14+i, pal.magicB);
    px(ctx, 2-i, 13+i, '#ffffff');
  }
  ctx.globalAlpha = 1.0;
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

function atkRanged2(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 1);
  drawRobeBottom(ctx, pal, 1);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 1);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, 1, 'idle');
  drawSword(ctx, pal, 12, 13, 'up');
  for (let i = 0; i < 4; i++) {
    ctx.globalAlpha = (0.5 - i * 0.1);
    px(ctx, -i, 16+i, pal.magicA);
    px(ctx, -i, 17+i, pal.magicB);
  }
  ctx.globalAlpha = 1.0;
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

function atkRanged3(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 0);
  drawRobeBottom(ctx, pal, 0);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 0);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, 0, 'staff');
  drawSword(ctx, pal, 13, 9, 'up');
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

// ═══════════════════════════════════════════════════════════
//  ATAQUE MÁGICO — PROYECTIL (4 frames)
// ═══════════════════════════════════════════════════════════

function atkMagic0(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, -1);
  drawRobeBottom(ctx, pal, -1);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 0);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, -3, 'raised');
  drawArmR(ctx, pal, 0, 'staff');
  drawStaff(ctx, pal, 14, 5, true);
  ctx.globalAlpha = 0.4;
  rect(ctx, 0, 8, 4, 4, pal.magicGlow);
  ctx.globalAlpha = 1.0;
  drawMagicOrb(ctx, pal, 2, 11, 1);
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

function atkMagic1(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, -1);
  drawRobeBottom(ctx, pal, -1);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, -1);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, -5, 'raised');
  drawArmR(ctx, pal, 0, 'staff');
  drawStaff(ctx, pal, 14, 3, true);
  ctx.globalAlpha = 0.5;
  rect(ctx, -1, 5, 6, 6, pal.magicB);
  ctx.globalAlpha = 1.0;
  drawMagicOrb(ctx, pal, 2, 8, 2);
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

function atkMagic2(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 2);
  drawRobeBottom(ctx, pal, 2);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 1);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'attack');
  drawArmR(ctx, pal, 0, 'staff');
  drawStaff(ctx, pal, 14, 5, true);
  // Proyectil en vuelo hacia la izquierda
  drawMagicOrb(ctx, pal, -1, 12, 2);
  for (let i = 1; i < 4; i++) {
    ctx.globalAlpha = 0.3 / i;
    drawMagicOrb(ctx, pal, i, 12, 1);
  }
  ctx.globalAlpha = 1.0;
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

function atkMagic3(ctx, pal) {
  drawShadow(ctx, pal);
  drawHairBack(ctx, pal, 1);
  drawRobeBottom(ctx, pal, 1);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawRobeTop(ctx, pal, 0);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, 0, 'staff');
  drawStaff(ctx, pal, 14, 5, false);
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHairFront(ctx, pal);
}

// ═══════════════════════════════════════════════════════════
//  EXPORTACIÓN
// ═══════════════════════════════════════════════════════════
export const FEMALE_MAGE_DEF = {
  id:   'female_mage',
  name: 'Maga',
  gender: 'female',
  defaultPalette: FM_PALETTE,

  customizableParts: [
    { key: 'robe',      label: 'Túnica',      linkedShadow: 'robeShadow', linkedLight: 'robeLight' },
    { key: 'hair',      label: 'Cabello',     linkedShadow: 'hairShadow', linkedDark: 'hairDark' },
    { key: 'iris',      label: 'Ojos',        linkedLight: 'irisLight' },
    { key: 'skin',      label: 'Piel',        linkedShadow: 'skinShadow', linkedDark: 'skinDark' },
    { key: 'boot',      label: 'Botas',       linkedSeam: 'bootSeam' },
    { key: 'gold',      label: 'Cinturón',    linkedShadow: 'goldShadow' },
  ],

  animations: {
    idle_front: { frames: [idleFront],                frameTime: 800, loop: true,  label: 'Reposo' },
    idle_back:  { frames: [idleBack],                 frameTime: 800, loop: true,  label: 'Reposo Espalda' },
    idle_left:  { frames: [idleLeft],                 frameTime: 800, loop: true,  label: 'Reposo Perfil' },

    walk_front: { frames: [(c,p)=>walkFront(c,p,0),(c,p)=>walkFront(c,p,1),(c,p)=>walkFront(c,p,2),(c,p)=>walkFront(c,p,3)], frameTime: 110, loop: true, label: 'Caminar' },
    walk_back:  { frames: [(c,p)=>walkBack(c,p,0),(c,p)=>walkBack(c,p,1),(c,p)=>walkBack(c,p,2),(c,p)=>walkBack(c,p,3)],   frameTime: 110, loop: true, label: 'Caminar Espalda' },
    walk_left:  { frames: [(c,p)=>walkLeft(c,p,0),(c,p)=>walkLeft(c,p,1),(c,p)=>walkLeft(c,p,2),(c,p)=>walkLeft(c,p,3)],   frameTime: 110, loop: true, label: 'Caminar Perfil' },

    atk_sword_slash_front:  { frames: [atkSlash0, atkSlash1, atkSlash2],              frameTime: 80,  loop: false, label: '⚔️ Tajo' },
    atk_sword_ranged_front: { frames: [atkRanged0, atkRanged1, atkRanged2, atkRanged3], frameTime: 90,  loop: false, label: '⚔️ Tajo Distancia' },
    atk_magic_launch_front: { frames: [atkMagic0, atkMagic1, atkMagic2, atkMagic3],   frameTime: 95,  loop: false, label: '✨ Proyectil Mágico' },
  }
};
