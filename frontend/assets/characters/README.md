# Assets / Characters

## Estructura de Carpetas

`
characters/
├── female/
│   └── mage/
│       ├── parts/          ← PNGs individuales por parte (exportados del visor)
│       │   ├── body/
│       │   ├── head/
│       │   ├── hair/
│       │   ├── eyes/
│       │   ├── robe_top/
│       │   ├── robe_bottom/
│       │   ├── arm_left/
│       │   ├── arm_right/
│       │   ├── boots/
│       │   └── weapons/
│       │       ├── staff/
│       │       └── sword/
│       └── animations/     ← Frames exportados por animación
│           ├── idle/
│           ├── walk/
│           └── attack/
│               ├── sword/
│               │   ├── tajo/
│               │   └── tajo_distancia/
│               └── magic/
│                   ├── lanzar_proyectil/
│                   └── explosion/
└── male/
    └── warrior/            ← Misma estructura que female/mage/
`

## Cómo usar los sprites en el juego

El sistema está definido en:
  frontend/js/game/sprites/SpriteSystem.js    ← Motor de render
  frontend/js/game/sprites/characters/female/FemaleMage.js
  frontend/js/game/sprites/characters/male/MaleWarrior.js

Para previsualizar: abrir frontend/sprite_viewer.html en el navegador.

## Personalización de Colores

Cada personaje tiene customizableParts definidas. Se puede cambiar:
- Maga: túnica, cabello, ojos, piel, botas
- Guerrero: armadura, cabello, ojos, piel, botas, hombreras

## Animaciones disponibles

### Maga (FemaleMage)
- idle_front / idle_back / idle_left  (+ right = flip de left)
- walk_front / walk_back / walk_left  (4 frames cada una)
- atk_sword_slash_front              (3 frames — tecla F)
- atk_sword_ranged_front             (4 frames — tecla F [hold])
- atk_magic_launch_front             (4 frames — tecla G)

### Guerrero (MaleWarrior)
- Mismas categorías que la maga
- Diferencia visual: armadura con escudo, espada más grande

## Teclas de ataque en el juego
- F → Ataque espada (tajo o tajo a distancia)
- G → Ataque mágico (proyectil)
