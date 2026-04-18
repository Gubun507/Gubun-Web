/**
 * ╔══════════════════════════════════════════════════════╗
 * ║   GUBUN — SpriteSystem.js                           ║
 * ║   Motor de renderizado de sprites por partes         ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * Uso:
 *   import { CharacterSprite } from './SpriteSystem.js';
 *   import { FEMALE_MAGE_DEF }  from './characters/female/FemaleMage.js';
 *
 *   const mage = new CharacterSprite(FEMALE_MAGE_DEF);
 *   mage.setAnimation('walk_front');
 *   // En el game loop:
 *   mage.update(deltaMs);
 *   mage.render();
 *   // Usar mage.canvas como textura Three.js:
 *   const tex = new THREE.CanvasTexture(mage.canvas);
 */

// ── Constantes ────────────────────────────────────────────
export const PIXEL   = 4;   // píxeles CSS por "game pixel"
export const FRAME_W = 18;  // ancho del frame en game pixels
export const FRAME_H = 26;  // alto  del frame en game pixels

// ── Helpers de dibujo ────────────────────────────────────
/**
 * Dibuja un cuadrado de 1 game-pixel en el canvas ctx.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} gx  - coordenada X en game pixels
 * @param {number} gy  - coordenada Y en game pixels
 * @param {string} color - color CSS
 */
export function px(ctx, gx, gy, color) {
  if (!color || color === 'none') return;
  ctx.fillStyle = color;
  ctx.fillRect(gx * PIXEL, gy * PIXEL, PIXEL, PIXEL);
}

/**
 * Dibuja un rectángulo de (w×h) game-pixels.
 */
export function rect(ctx, gx, gy, gw, gh, color) {
  if (!color || color === 'none') return;
  ctx.fillStyle = color;
  ctx.fillRect(gx * PIXEL, gy * PIXEL, gw * PIXEL, gh * PIXEL);
}

// ── Clase principal ───────────────────────────────────────
export class CharacterSprite {
  /**
   * @param {Object} def - Definición del personaje (importado de FemaleMage.js etc.)
   * @param {Object} paletteOverrides - Colores personalizados { robe:'#ff0000', hair:'#00ffff', … }
   */
  constructor(def, paletteOverrides = {}) {
    this.def    = def;
    this.custom = paletteOverrides;

    // Canvas propio para cada personaje
    this.canvas        = document.createElement('canvas');
    this.canvas.width  = FRAME_W * PIXEL;   // 72px
    this.canvas.height = FRAME_H * PIXEL;   // 104px
    this.ctx           = this.canvas.getContext('2d');

    // Estado de animación
    this.animName  = null;
    this.frameIdx  = 0;
    this.timer     = 0;
    this.flipX     = false;    // para dirección derecha
    this.onAnimEnd = null;     // callback cuando termina una animación sin loop

    this.setAnimation('idle_front');
  }

  // ── Paleta combinada ──────────────────────────────────
  get palette() {
    return { ...this.def.defaultPalette, ...this.custom };
  }

  // ── Control de animación ──────────────────────────────
  setAnimation(name, { flip = false, onEnd = null } = {}) {
    if (this.animName === name && this.flipX === flip) return;
    this.animName  = name;
    this.frameIdx  = 0;
    this.timer     = 0;
    this.flipX     = flip;
    this.onAnimEnd = onEnd;
  }

  /** Actualiza el frame según deltaTime en ms */
  update(dt) {
    const anim = this.def.animations[this.animName];
    if (!anim) return;

    this.timer += dt;
    const ft = anim.frameTime ?? 120;
    if (this.timer >= ft) {
      this.timer -= ft;
      if (this.frameIdx < anim.frames.length - 1) {
        this.frameIdx++;
      } else {
        if (anim.loop !== false) {
          this.frameIdx = 0;
        }
        // loop = false → se queda en último frame y dispara callback
        if (this.onAnimEnd) { this.onAnimEnd(); this.onAnimEnd = null; }
      }
    }
  }

  /** Renderiza el frame actual en this.canvas */
  render() {
    const ctx  = this.ctx;
    const anim = this.def.animations[this.animName];
    if (!anim) return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.flipX) {
      ctx.save();
      ctx.translate(this.canvas.width, 0);
      ctx.scale(-1, 1);
    }

    const drawFn = anim.frames[this.frameIdx];
    if (typeof drawFn === 'function') {
      drawFn(ctx, this.palette);
    }

    if (this.flipX) ctx.restore();
  }

  /** Aplica colores personalizados (devuelve this para encadenar) */
  setColors(overrides) {
    this.custom = { ...this.custom, ...overrides };
    return this;
  }

  /** Exporta el frame actual como PNG data URL */
  exportFrame() {
    return this.canvas.toDataURL('image/png');
  }
}

// ── AnimatorController ────────────────────────────────────
/**
 * Maneja transiciones automáticas de animación según el estado del jugador.
 * Úsalo sobre un CharacterSprite.
 */
export class AnimatorController {
  constructor(sprite) {
    this.sprite    = sprite;
    this.facing    = 'front'; // front | back | left | right
    this.moving    = false;
    this.attacking = false;
    this.attackType = null;   // 'sword_slash' | 'sword_ranged' | 'magic_launch'
  }

  /** Llama en cada frame del game loop ANTES de sprite.update() */
  evaluate(keys) {
    if (this.attacking) return; // esperar a que termine el ataque

    const { w, s, a, d, f, g } = keys;
    this.moving = w || s || a || d;

    // Dirección
    if (w) this.facing = 'back';
    if (s) this.facing = 'front';
    if (a) this.facing = 'left';
    if (d) this.facing = 'right';

    // Ataques (prioridad sobre movimiento)
    if (f) { this._startAttack('sword_slash');  return; }
    if (g) { this._startAttack('magic_launch'); return; }

    // Animación de movimiento o idle
    const dir      = this.facing;
    const isRight  = dir === 'right';
    const animBase = isRight ? 'left' : dir; // right = left flipped
    const prefix   = this.moving ? 'walk' : 'idle';
    const animName = `${prefix}_${animBase}`;
    const flip     = isRight;

    this.sprite.setAnimation(animName, { flip });
  }

  _startAttack(type) {
    this.attacking  = true;
    this.attackType = type;
    const dir      = this.facing === 'right' ? 'left' : this.facing;
    const animName = `atk_${type}_${dir}`;
    const flip     = this.facing === 'right';

    this.sprite.setAnimation(animName, {
      flip,
      onEnd: () => { this.attacking = false; }
    });
  }
}
