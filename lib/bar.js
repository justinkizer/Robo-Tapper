/* global createjs */

export const BARS = [
  {
    startPosX: 600,
    startPosY: 425,
    scale: 1,
    posXLimits: [200, 600]
  },
  {
    startPosX: 560,
    startPosY: 310,
    scale: 1,
    posXLimits: [240, 560]
  },
  {
    startPosX: 520,
    startPosY: 185,
    scale: 0.98,
    posXLimits: [280, 520]
  },
  {
    startPosX: 495,
    startPosY: 75,
    scale: 0.96,
    posXLimits: [319.5, 495]
  }
];

const BACKGROUND_DATA = {
  images: ['assets/background.png'],
  frames: {width:960, height:600},
  animations: {
    show:[0, 0, 'show', 0.075]
  }
};

const BACKGROUND_SPRITE_SHEET = new createjs.SpriteSheet(BACKGROUND_DATA);

export const BAR = new createjs.Sprite(BACKGROUND_SPRITE_SHEET, 'show');
