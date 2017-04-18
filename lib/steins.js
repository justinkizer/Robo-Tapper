/* global createjs */

export default class SteinManager {
  constructor() {
    this.fullSteins = [];
    this.emptySteins = [];
  }

  newStein(fillStatus, x, y, scaleX, scaleY, xLimit) {
    let imagePath;
    if (fillStatus === 'full') {
      imagePath = 'assets/fullStein.png';
    } else {
      imagePath = 'assets/emptyStein.png';
    }
    const STEINS_DATA = {
      images: [imagePath],
      frames: {width:40.8, height:42},
      animations: {
        stein:[0, 0, false, 0],
      }
    };
    const SPRITE_SHEET = new createjs.SpriteSheet(STEINS_DATA);
    const STEIN = new createjs.Sprite(SPRITE_SHEET, 'STEIN');
    [STEIN.x, STEIN.y, STEIN.scaleX, STEIN.scaleY, STEIN.xLimit] = [
      x,
      y,
      scaleX || STEIN.scaleX,
      scaleY || STEIN.scaleY,
      xLimit || STEIN.xLimit
    ];
    return STEIN;
  }

}
