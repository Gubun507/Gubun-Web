/**
 * ╔══════════════════════════════════════════════════════╗
 * ║   GUBUN — MaleWarrior.js  (corregido)               ║
 * ║   Guerrero Masculino — Pixel Art por Partes          ║
 * ╚══════════════════════════════════════════════════════╝
 */
import { px, rect, PIXEL } from '../../SpriteSystem.js';

// ═══════════════════════════════════════════════════════════
//  PALETA DEFAULT — GUERRERO
// ═══════════════════════════════════════════════════════════
export const MW_PALETTE = {
  skin:         '#e8b88a',  skinShadow:   '#ca9060',  skinDark:     '#a87040',
  hair:         '#7a3b1e',  hairShadow:   '#5c2c0e',  hairLight:    '#a05030',
  armor:        '#1e3a5f',  armorShadow:  '#0f1f35',  armorLight:   '#3b6ea5',
  gold:         '#f59e0b',  goldShadow:   '#b45309',  goldLight:    '#fde68a',
  iris:         '#16a34a',  irisLight:    '#4ade80',  pupil:        '#14532d',
  eyeWhite:     '#f8fafc',  eyeLine:      '#0f0806',
  boot:         '#292524',  bootSeam:     '#44403c',
  blade:        '#e2e8f0',  bladeShadow:  '#94a3b8',  bladeEdge:    '#ffffff',
  hilt:         '#f59e0b',  hiltShadow:   '#92400e',
  energyA:      '#38bdf8',  energyB:      '#7dd3fc',  energyGlow:   '#0ea5e9',
  outline:      '#0f0806',
};

// ═══════════════════════════════════════════════════════════
//  HELPERS — PARTES
// ═══════════════════════════════════════════════════════════

function drawShadow(ctx, pal) {
  ctx.globalAlpha = 0.25;
  rect(ctx, 4, 24, 10, 2, '#000000');
  rect(ctx, 5, 25,  8, 1, '#000000');
  ctx.globalAlpha = 1.0;
}

// ── Cabeza masculina (más cuadrada) ───────────────────
function drawHead(ctx, pal) {
  rect(ctx, 5, 4, 8, 10, pal.outline);
  rect(ctx, 6, 5, 6,  8, pal.skin);
  // Mandíbula cuadrada
  rect(ctx, 5, 12, 8, 2, pal.outline);
  rect(ctx, 6, 12, 6, 1, pal.skin);
  px(ctx, 6,  13, pal.skinShadow);
  px(ctx, 11, 13, pal.skinShadow);
  // Sombra lateral
  px(ctx, 11,  5, pal.skinShadow); px(ctx, 11, 6, pal.skinShadow);
  px(ctx, 11,  7, pal.skinShadow); px(ctx, 11, 8, pal.skinShadow);
  px(ctx, 11,  9, pal.skinShadow); px(ctx, 11,10, pal.skinShadow);
}

// ── Ojos masculinos más pequeños ─────────────────────
function drawEyes(ctx, pal) {
  // Cejas
  rect(ctx, 6, 6, 3, 1, pal.outline);
  rect(ctx, 9, 6, 3, 1, pal.outline);
  // Ojo izquierdo
  rect(ctx, 6, 7, 3, 2, pal.outline);
  px(ctx, 6, 7, pal.eyeWhite); px(ctx, 7, 7, pal.eyeWhite); px(ctx, 8, 7, pal.eyeWhite);
  px(ctx, 6, 8, pal.iris);     px(ctx, 7, 8, pal.irisLight);
  px(ctx, 6, 8, pal.pupil);
  // Ojo derecho
  rect(ctx, 9, 7, 3, 2, pal.outline);
  px(ctx, 9, 7, pal.eyeWhite); px(ctx, 10, 7, pal.eyeWhite); px(ctx, 11, 7, pal.eyeWhite);
  px(ctx, 9, 8, pal.iris);     px(ctx, 10, 8, pal.irisLight);
  px(ctx, 9, 8, pal.pupil);
  // Nariz y boca
  px(ctx, 8,  10, pal.skinDark);
  rect(ctx, 7, 11, 4, 1, pal.skinDark);
}

// ── Pelo corto spiky masculino ────────────────────────
function drawHair(ctx, pal) {
  // Base superior
  rect(ctx, 5, 1, 8, 5, pal.outline);
  rect(ctx, 6, 2, 6, 3, pal.hair);
  rect(ctx, 5, 3, 8, 2, pal.hair);
  // Sombras internas
  px(ctx, 6, 3, pal.hairShadow); px(ctx, 11, 3, pal.hairShadow);
  px(ctx, 8, 2, pal.hairShadow);
  // Mechones spiky (sobresalen del outline)
  px(ctx, 5, 1, pal.hair);  px(ctx, 6, 1, pal.hair);
  px(ctx, 8, 1, pal.hair);
  px(ctx, 11,1, pal.hair);  px(ctx, 12,1, pal.hair);
  // Laterales
  px(ctx, 4, 3, pal.hairShadow); px(ctx, 4, 4, pal.hairShadow);
  px(ctx, 13,3, pal.hairShadow); px(ctx, 13,4, pal.hairShadow);
  // Brillo
  px(ctx, 7, 2, pal.hairLight); px(ctx, 9, 2, pal.hairLight);
}

// ── Cuello ────────────────────────────────────────────
function drawNeck(ctx, pal) {
  rect(ctx, 7, 14, 4, 2, pal.outline);
  rect(ctx, 8, 14, 2, 2, pal.skin);
}

// ── Cuerpo — Armadura ─────────────────────────────────
function drawArmor(ctx, pal, lean = 0) {
  const x = 4 + lean;
  // Torso
  rect(ctx, x,   13, 10, 8, pal.outline);
  rect(ctx, x+1, 14,  8, 6, pal.armor);
  // Placa pectoral
  rect(ctx, x+2, 14, 6, 3, pal.armorLight);
  // Sombras laterales
  rect(ctx, x+1, 14, 2, 6, pal.armorShadow);
  rect(ctx, x+7, 14, 2, 6, pal.armorShadow);
  // Línea central (coraza)
  px(ctx, x+4, 14, pal.armorShadow); px(ctx, x+5, 14, pal.armorShadow);
  px(ctx, x+4, 15, pal.armorShadow); px(ctx, x+5, 15, pal.armorShadow);
  // Hombreras doradas
  rect(ctx, x,   13, 3, 3, pal.outline);
  rect(ctx, x+1, 13, 2, 2, pal.gold);
  px(ctx, x+1, 13, pal.goldLight); // destello
  rect(ctx, x+7, 13, 3, 3, pal.outline);
  rect(ctx, x+7, 13, 2, 2, pal.gold);
  px(ctx, x+7, 13, pal.goldLight);
}

// ── Cinturón de armadura ──────────────────────────────
function drawBelt(ctx, pal) {
  rect(ctx, 4, 20, 10, 2, pal.outline);
  rect(ctx, 5, 20,  8, 1, pal.armorLight);
  rect(ctx, 5, 21,  8, 1, pal.armorShadow);
  // Hebilla central
  rect(ctx, 8, 19, 2, 4, pal.gold);
  px(ctx, 8, 19, pal.outline); px(ctx, 9, 19, pal.outline);
  px(ctx, 8, 22, pal.outline); px(ctx, 9, 22, pal.outline);
}

// ── Piernas con faldón de armadura ────────────────────
function drawLegs(ctx, pal, leftDy = 0, rightDy = 0) {
  rect(ctx, 5, 22+leftDy,  3, 3, pal.outline);
  rect(ctx, 6, 23+leftDy,  2, 2, pal.armor);
  px(ctx, 6, 22+leftDy, pal.armorLight);

  rect(ctx, 10, 22+rightDy, 3, 3, pal.outline);
  rect(ctx, 10, 23+rightDy, 2, 2, pal.armor);
  px(ctx, 11, 22+rightDy, pal.armorLight);
}

// ── Botas ────────────────────────────────────────────
function drawBoots(ctx, pal, leftDy = 0, rightDy = 0) {
  rect(ctx, 5, 25+leftDy,  4, 2, pal.outline);
  rect(ctx, 5, 25+leftDy,  3, 1, pal.boot);
  px(ctx, 5, 26+leftDy, pal.bootSeam); px(ctx, 7, 26+leftDy, pal.bootSeam);

  rect(ctx, 10, 25+rightDy, 4, 2, pal.outline);
  rect(ctx, 10, 25+rightDy, 3, 1, pal.boot);
  px(ctx, 10, 26+rightDy, pal.bootSeam); px(ctx, 12, 26+rightDy, pal.bootSeam);
}

// ── Brazo izquierdo (con escudo) ──────────────────────
function drawArmL(ctx, pal, dy = 0, pose = 'shield') {
  if (pose === 'shield') {
    rect(ctx, 2, 13+dy, 3, 8, pal.outline);
    rect(ctx, 3, 14+dy, 2, 7, pal.armor);
    // Escudo
    rect(ctx, 0, 12+dy, 3, 8, pal.outline);
    rect(ctx, 0, 13+dy, 2, 6, pal.armorLight);
    px(ctx, 0, 14+dy, pal.armor); px(ctx, 0, 15+dy, pal.armor);
    rect(ctx, 0, 15+dy, 2, 1, pal.gold);
    rect(ctx, 0, 17+dy, 2, 1, pal.gold);
  } else if (pose === 'raised') {
    rect(ctx, 2, 10+dy, 3, 9, pal.outline);
    rect(ctx, 3, 11+dy, 2, 8, pal.armor);
  } else if (pose === 'idle') {
    rect(ctx, 2, 14+dy, 3, 7, pal.outline);
    rect(ctx, 3, 15+dy, 2, 6, pal.armor);
    px(ctx, 3, 20+dy, pal.skin);
  }
}

// ── Brazo derecho (sostiene espada) ──────────────────
function drawArmR(ctx, pal, dy = 0, pose = 'idle') {
  if (pose === 'idle') {
    rect(ctx, 13, 14+dy, 3, 7, pal.outline);
    rect(ctx, 13, 15+dy, 2, 6, pal.armor);
    px(ctx, 13, 20+dy, pal.skin);
  } else if (pose === 'wind_up') {
    rect(ctx, 13, 9+dy, 3, 7, pal.outline);
    rect(ctx, 13, 10+dy, 2, 6, pal.armor);
  } else if (pose === 'strike') {
    rect(ctx, 12, 12+dy, 5, 5, pal.outline);
    rect(ctx, 12, 13+dy, 4, 4, pal.armor);
  }
}

// ── Espada ────────────────────────────────────────────
function drawSword(ctx, pal, x, y, angle = 'up') {
  if (angle === 'up') {
    for (let i = 0; i < 11; i++) {
      px(ctx, x,   y+i, pal.outline);
      px(ctx, x+1, y+i, i < 3 ? pal.bladeEdge : pal.blade);
      if (i > 2) px(ctx, x+2, y+i, pal.bladeShadow);
    }
    rect(ctx, x-1, y+10, 5, 2, pal.outline);
    rect(ctx, x,   y+10, 3, 1, pal.hilt);
    rect(ctx, x+1, y+11, 1, 2, pal.hiltShadow);
  } else if (angle === 'slash') {
    for (let i = 0; i < 10; i++) {
      px(ctx, x-i,   y+i, pal.outline);
      px(ctx, x-i+1, y+i, i < 3 ? pal.bladeEdge : pal.blade);
    }
    rect(ctx, x-8, y+9, 4, 2, pal.outline);
    rect(ctx, x-7, y+9, 2, 1, pal.hilt);
  }
}

// ── Efecto tajo ───────────────────────────────────────
function drawSlashFX(ctx, pal, progress) {
  if (progress <= 0) return;
  const cx = 9, cy = 14;
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

// ── Orbe de energía ───────────────────────────────────
function drawEnergyOrb(ctx, pal, x, y, size = 2) {
  ctx.globalAlpha = 0.9;
  rect(ctx, x-size, y-size, size*2+1, size*2+1, pal.energyB);
  rect(ctx, x-1,    y-1,    3,        3,         pal.energyA);
  px(ctx, x, y, '#ffffff');
  ctx.globalAlpha = 0.3;
  rect(ctx, x-size-1, y-size-1, size*2+3, size*2+3, pal.energyGlow);
  ctx.globalAlpha = 1.0;
}

// ═══════════════════════════════════════════════════════════
//  FRAMES — IDLE
// ═══════════════════════════════════════════════════════════

function idleFront(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawArmor(ctx, pal, 0);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'shield');
  drawArmR(ctx, pal, 0, 'idle');
  drawSword(ctx, pal, 14, 8, 'up');
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHair(ctx, pal);
}

function idleBack(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawArmor(ctx, pal, 0);
  drawArmL(ctx, pal, 0, 'idle');
  drawArmR(ctx, pal, 0, 'idle');
  // Cabeza espalda
  rect(ctx, 5, 4, 8, 10, pal.outline);
  rect(ctx, 6, 5, 6,  9, pal.skinShadow);
  rect(ctx, 5, 1, 8,  5, pal.hair);
  rect(ctx, 6, 2, 6,  3, pal.hairShadow);
  px(ctx, 5, 2, pal.hair); px(ctx, 12, 2, pal.hair);
}

function idleLeft(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0);
  drawBoots(ctx, pal, 0, 0);
  drawBelt(ctx, pal);
  drawArmor(ctx, pal, -1);
  // Brazo fondo oculto
  rect(ctx, 12, 13, 2, 9, pal.armor);
  drawArmR(ctx, pal, 0, 'idle');
  drawSword(ctx, pal, 13, 9, 'up');
  drawNeck(ctx, pal);
  // Cabeza perfil
  rect(ctx, 6, 4, 8, 10, pal.outline);
  rect(ctx, 7, 5, 6,  9, pal.skin);
  px(ctx, 12, 5, pal.skinShadow); px(ctx, 12, 6, pal.skinShadow);
  px(ctx, 12, 7, pal.skinShadow); px(ctx, 12, 8, pal.skinShadow);
  px(ctx, 12, 9, pal.skinShadow);
  // Ojo perfil
  rect(ctx, 10, 7, 2, 2, pal.outline);
  px(ctx, 10, 7, pal.eyeWhite); px(ctx, 11, 7, pal.eyeWhite);
  px(ctx, 10, 8, pal.iris);
  px(ctx, 11, 6, pal.eyeLine);
  px(ctx, 12, 10, pal.skinDark); px(ctx, 12, 11, pal.skinDark);
  rect(ctx, 11, 12, 2, 1, pal.skinDark);
  // Pelo perfil
  rect(ctx, 6, 1, 8, 5, pal.hair);
  rect(ctx, 7, 2, 6, 3, pal.hairShadow);
  px(ctx, 6, 4, pal.hair); px(ctx, 6, 5, pal.hairShadow);
}

// ═══════════════════════════════════════════════════════════
//  WALK CYCLE — 4 FRAMES
// ═══════════════════════════════════════════════════════════

const WALK_PHASE = [
  { leftDy: -1, rightDy:  1, bob: -1 },
  { leftDy:  0, rightDy:  0, bob:  0 },
  { leftDy:  1, rightDy: -1, bob: -1 },
  { leftDy:  0, rightDy:  0, bob:  0 },
];

function walkFront(ctx, pal, f) {
  const ph = WALK_PHASE[f];
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, ph.leftDy, ph.rightDy);
  drawBoots(ctx, pal, ph.leftDy, ph.rightDy);
  drawBelt(ctx, pal);
  ctx.save(); ctx.translate(0, ph.bob * PIXEL);
  drawArmor(ctx, pal, 0);
  drawNeck(ctx, pal);
  drawArmL(ctx, pal, ph.rightDy, 'shield');
  drawArmR(ctx, pal, ph.leftDy, 'idle');
  drawSword(ctx, pal, 14, 8 + ph.leftDy, 'up');
  drawHead(ctx, pal);
  drawEyes(ctx, pal);
  drawHair(ctx, pal);
  ctx.restore();
}

function walkBack(ctx, pal, f) {
  const ph = WALK_PHASE[f];
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, ph.leftDy, ph.rightDy);
  drawBoots(ctx, pal, ph.leftDy, ph.rightDy);
  drawBelt(ctx, pal);
  ctx.save(); ctx.translate(0, ph.bob * PIXEL);
  drawArmor(ctx, pal, 0);
  drawArmL(ctx, pal, ph.rightDy, 'idle');
  drawArmR(ctx, pal, ph.leftDy,  'idle');
  rect(ctx, 5, 4, 8, 10, pal.outline);
  rect(ctx, 6, 5, 6,  9, pal.skinShadow);
  rect(ctx, 5, 1, 8,  5, pal.hair);
  rect(ctx, 6, 2, 6,  3, pal.hairShadow);
  ctx.restore();
}

function walkLeft(ctx, pal, f) {
  const ph = WALK_PHASE[f];
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, ph.leftDy, ph.rightDy);
  drawBoots(ctx, pal, ph.leftDy, ph.rightDy);
  drawBelt(ctx, pal);
  ctx.save(); ctx.translate(0, ph.bob * PIXEL);
  drawArmor(ctx, pal, ph.leftDy);
  rect(ctx, 12, 13, 2, 9, pal.armor);
  drawArmR(ctx, pal, ph.rightDy, 'idle');
  drawSword(ctx, pal, 13, 9+ph.rightDy, 'up');
  drawNeck(ctx, pal);
  // Cabeza perfil
  rect(ctx, 6, 4, 8, 10, pal.outline);
  rect(ctx, 7, 5, 6,  9, pal.skin);
  px(ctx, 12, 5, pal.skinShadow); px(ctx, 12, 6, pal.skinShadow);
  px(ctx, 12, 7, pal.skinShadow); px(ctx, 12, 8, pal.skinShadow);
  rect(ctx, 10, 7, 2, 2, pal.outline);
  px(ctx, 10, 7, pal.eyeWhite); px(ctx, 11, 7, pal.eyeWhite);
  px(ctx, 10, 8, pal.iris); px(ctx, 11, 6, pal.eyeLine);
  px(ctx, 12, 10, pal.skinDark);
  rect(ctx, 6, 1, 8, 5, pal.hair);
  rect(ctx, 7, 2, 6, 3, pal.hairShadow);
  px(ctx, 6, 4, pal.hair); px(ctx, 6, 5, pal.hairShadow);
  ctx.restore();
}

// ═══════════════════════════════════════════════════════════
//  ATAQUES
// ═══════════════════════════════════════════════════════════

function atkSlash0(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0); drawBoots(ctx, pal, 0, 0); drawBelt(ctx, pal);
  drawArmor(ctx, pal, -1);  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'shield');
  drawArmR(ctx, pal, -4, 'wind_up');
  drawSword(ctx, pal, 14, 3, 'up');
  ctx.globalAlpha = 0.3; rect(ctx, 12, 1, 6, 9, '#ffffff'); ctx.globalAlpha = 1.0;
  drawHead(ctx, pal); drawEyes(ctx, pal); drawHair(ctx, pal);
}

function atkSlash1(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0); drawBoots(ctx, pal, 0, 0); drawBelt(ctx, pal);
  drawArmor(ctx, pal, 2);   drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'shield');
  drawArmR(ctx, pal, -1, 'strike');
  drawSword(ctx, pal, 8, 8, 'slash');
  drawSlashFX(ctx, pal, 0.35);
  drawHead(ctx, pal); drawEyes(ctx, pal); drawHair(ctx, pal);
}

function atkSlash2(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0); drawBoots(ctx, pal, 0, 0); drawBelt(ctx, pal);
  drawArmor(ctx, pal, 1);   drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'shield');
  drawArmR(ctx, pal, 2, 'idle');
  drawSword(ctx, pal, 12, 14, 'up');
  drawSlashFX(ctx, pal, 0.78);
  drawHead(ctx, pal); drawEyes(ctx, pal); drawHair(ctx, pal);
}

function atkRanged0(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0); drawBoots(ctx, pal, 0, 0); drawBelt(ctx, pal);
  drawArmor(ctx, pal, -1);  drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'shield');
  drawArmR(ctx, pal, -5, 'wind_up');
  drawSword(ctx, pal, 14, 2, 'up');
  ctx.globalAlpha = 0.45; rect(ctx, 12, 1, 6, 9, pal.energyGlow); ctx.globalAlpha = 1.0;
  drawEnergyOrb(ctx, pal, 15, 5, 1);
  drawHead(ctx, pal); drawEyes(ctx, pal); drawHair(ctx, pal);
}

function atkRanged1(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0); drawBoots(ctx, pal, 0, 0); drawBelt(ctx, pal);
  drawArmor(ctx, pal, 2);   drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'shield');
  drawArmR(ctx, pal, -1, 'strike');
  drawSword(ctx, pal, 7, 8, 'slash');
  for (let i = 0; i < 6; i++) {
    ctx.globalAlpha = 1 - i * 0.16;
    px(ctx, 2-i, 12+i, pal.energyA); px(ctx, 2-i, 13+i, pal.energyB); px(ctx, 1-i, 12+i, '#ffffff');
  }
  ctx.globalAlpha = 1.0;
  drawHead(ctx, pal); drawEyes(ctx, pal); drawHair(ctx, pal);
}

function atkRanged2(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0); drawBoots(ctx, pal, 0, 0); drawBelt(ctx, pal);
  drawArmor(ctx, pal, 1);   drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'shield');
  drawArmR(ctx, pal, 1, 'idle');
  drawSword(ctx, pal, 12, 13, 'up');
  for (let i = 0; i < 5; i++) {
    ctx.globalAlpha = 0.5 - i * 0.1;
    px(ctx, -i, 15+i, pal.energyA); px(ctx, -i, 16+i, pal.energyB);
  }
  ctx.globalAlpha = 1.0;
  drawHead(ctx, pal); drawEyes(ctx, pal); drawHair(ctx, pal);
}

function atkMagic0(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0); drawBoots(ctx, pal, 0, 0); drawBelt(ctx, pal);
  drawArmor(ctx, pal, 0);   drawNeck(ctx, pal);
  drawArmL(ctx, pal, -4, 'raised');
  drawArmR(ctx, pal, 0, 'idle');
  ctx.globalAlpha = 0.45; rect(ctx, -1, 7, 5, 5, pal.energyGlow); ctx.globalAlpha = 1.0;
  drawEnergyOrb(ctx, pal, 1, 10, 1);
  drawHead(ctx, pal); drawEyes(ctx, pal); drawHair(ctx, pal);
}

function atkMagic1(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0); drawBoots(ctx, pal, 0, 0); drawBelt(ctx, pal);
  drawArmor(ctx, pal, 1);   drawNeck(ctx, pal);
  drawArmL(ctx, pal, -3, 'raised');
  drawArmR(ctx, pal, 0, 'idle');
  drawEnergyOrb(ctx, pal, -1, 12, 2);
  for (let i = 1; i < 3; i++) { ctx.globalAlpha = 0.3/i; drawEnergyOrb(ctx, pal, i*2, 12, 1); }
  ctx.globalAlpha = 1.0;
  drawHead(ctx, pal); drawEyes(ctx, pal); drawHair(ctx, pal);
}

function atkMagic2(ctx, pal) {
  drawShadow(ctx, pal);
  drawLegs(ctx, pal, 0, 0); drawBoots(ctx, pal, 0, 0); drawBelt(ctx, pal);
  drawArmor(ctx, pal, 0);   drawNeck(ctx, pal);
  drawArmL(ctx, pal, 0, 'shield');
  drawArmR(ctx, pal, 0, 'idle');
  drawSword(ctx, pal, 14, 8, 'up');
  drawHead(ctx, pal); drawEyes(ctx, pal); drawHair(ctx, pal);
}

// ═══════════════════════════════════════════════════════════
//  EXPORTACIÓN
// ═══════════════════════════════════════════════════════════
export const MALE_WARRIOR_DEF = {
  id:   'male_warrior',
  name: 'Guerrero',
  gender: 'male',
  defaultPalette: MW_PALETTE,

  customizableParts: [
    { key: 'armor',  label: 'Armadura',  linkedShadow: 'armorShadow', linkedLight: 'armorLight' },
    { key: 'hair',   label: 'Cabello',   linkedShadow: 'hairShadow', linkedLight: 'hairLight' },
    { key: 'iris',   label: 'Ojos',      linkedLight: 'irisLight' },
    { key: 'skin',   label: 'Piel',      linkedShadow: 'skinShadow', linkedDark: 'skinDark' },
    { key: 'boot',   label: 'Botas',     linkedSeam: 'bootSeam' },
    { key: 'gold',   label: 'Hombreras', linkedShadow: 'goldShadow', linkedLight: 'goldLight' },
  ],

  animations: {
    idle_front: { frames: [idleFront],  frameTime: 800, loop: true,  label: 'Reposo' },
    idle_back:  { frames: [idleBack],   frameTime: 800, loop: true,  label: 'Reposo Espalda' },
    idle_left:  { frames: [idleLeft],   frameTime: 800, loop: true,  label: 'Reposo Perfil' },

    walk_front: { frames: [(c,p)=>walkFront(c,p,0),(c,p)=>walkFront(c,p,1),(c,p)=>walkFront(c,p,2),(c,p)=>walkFront(c,p,3)], frameTime: 110, loop: true, label: 'Caminar' },
    walk_back:  { frames: [(c,p)=>walkBack(c,p,0),(c,p)=>walkBack(c,p,1),(c,p)=>walkBack(c,p,2),(c,p)=>walkBack(c,p,3)],   frameTime: 110, loop: true, label: 'Caminar Espalda' },
    walk_left:  { frames: [(c,p)=>walkLeft(c,p,0),(c,p)=>walkLeft(c,p,1),(c,p)=>walkLeft(c,p,2),(c,p)=>walkLeft(c,p,3)],   frameTime: 110, loop: true, label: 'Caminar Perfil' },

    atk_sword_slash_front:  { frames: [atkSlash0, atkSlash1, atkSlash2],        frameTime: 80, loop: false, label: '⚔️ Tajo' },
    atk_sword_ranged_front: { frames: [atkRanged0, atkRanged1, atkRanged2],     frameTime: 90, loop: false, label: '⚔️ Tajo Distancia' },
    atk_magic_launch_front: { frames: [atkMagic0, atkMagic1, atkMagic2],        frameTime: 100,loop: false, label: '⚡ Proyectil' },
  }
};
