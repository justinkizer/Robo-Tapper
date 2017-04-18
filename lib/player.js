/* global createjs */

export const PLAYER = () => {
  const PLAYER_DATA = {
    images: ['assets/player.png'],
    frames: {width:140.5, height:156},
    animations: {
      idle:[0, 1, 'idle', 0.075],
      run:[2, 4, 'run', 0.125],
      fill:[5, 8, false, 0.3],
      serve:[9, 9, 'serve', 0.0000005],
      faceplant:[10, 10, true, 0.15],
      dance:[11, 12, 'dance', 0.065],
      scared:[13, 14, 'scared', 0.065]
    }
  };

  const SPRITE_SHEET = new createjs.SpriteSheet(PLAYER_DATA);
  const PLAYER_SPRITE = new createjs.Sprite(SPRITE_SHEET, 'idle');

  [PLAYER_SPRITE.x, PLAYER_SPRITE.y] = [600, 425];

  return PLAYER_SPRITE;
};
