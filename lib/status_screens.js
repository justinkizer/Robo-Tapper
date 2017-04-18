/* global createjs */
import SteinManager from './steins.js';

export default class StatusScreens {
  constructor(stage) {
    [this.livesLeft, this.highScore, this.currentScore, this.levelNum] = [
      3, 0, 0, 1
    ];
    this.highScoreText = new createjs.Text(`High   Score: ${this.highScore}`,
      '26px ARCADECLASSIC', '#FFFFFF'
    );
    [this.highScoreText.x, this.highScoreText.y] = [580, 15];
    this.currentScoreText = new createjs.Text(`Score: ${this.currentScore}`,
      '26px ARCADECLASSIC', '#FFFFFF'
    );
    [this.currentScoreText.x, this.currentScoreText.y] = [580, 35];
    this.livesText = new createjs.Text('Lives:', '26px ARCADECLASSIC',
      '#FFFFFF'
    );
    [this.livesText.x, this.livesText.y] = [580, 55];
    this.lives = [
      (new SteinManager).newStein('full', 663, 58, 0.75, 0.5),
      (new SteinManager).newStein('full', 693, 58, 0.75, 0.5),
      (new SteinManager).newStein('full', 723, 58, 0.75, 0.5)
    ];
  }

  getNewStage(stage) {
    this.stage = stage;
  }

  updateScore(currentScore) {
    this.highScore = currentScore > this.highScore ? currentScore :
      this.highScore;
    this.currentScore = currentScore;
    this.stage.removeChild(this.highScoreText);
    this.stage.removeChild(this.currentScoreText);
    this.highScoreText = new createjs.Text(`High   Score: ${this.highScore}`,
      '26px ARCADECLASSIC', '#FFFFFF'
    );
    [this.highScoreText.x, this.highScoreText.y] = [580, 15];
    this.currentScoreText = new createjs.Text(`Score: ${this.currentScore}`,
      '26px ARCADECLASSIC', '#FFFFFF'
    );
    [this.currentScoreText.x, this.currentScoreText.y] = [580, 35];
    this.stage.addChild(this.highScoreText, this.currentScoreText);
  }

  updateLives(livesLeft) {
    this.stage.removeChild(this.livesText);
    this.stage.addChild(this.livesText);
    this.livesLeft = livesLeft;
    if (livesLeft < 3) {
      this.stage.removeChild(this.lives[2]);
    }
    if (livesLeft < 2) {
      this.stage.removeChild(this.lives[1]);
    }
    if (livesLeft < 1) {
      this.stage.removeChild(this.lives[0]);
    }
  }

  levelWon() {
    const LEVEL_WON_DATA = {
      images: ['assets/levelWon.png'],
      frames: {width:960, height:600},
      animations: {
          show:[0, 0, 'show', 0.075]
      }
    };
    const LEVEL_WON_SPRITE_SHEET = new createjs.SpriteSheet(LEVEL_WON_DATA);
    const LEVEL_WON = new createjs.Sprite(LEVEL_WON_SPRITE_SHEET, 'show');
    LEVEL_WON.scaleX = .9525;
    const LEVEL_TEXT = new createjs.Text(`Level ${this.levelNum}`,
      '46px ARCADECLASSIC', '#FFFFFF'
    );
    [LEVEL_TEXT.x, LEVEL_TEXT.y] = [385, 275];
    const LEVEL_TEXT_2 = new createjs.Text(`Level ${this.levelNum}`,
      '46px ARCADECLASSIC', '#00b9fb'
    );
    [LEVEL_TEXT_2.x, LEVEL_TEXT_2.y] = [388, 278];
    this.stage.addChild(LEVEL_WON, LEVEL_TEXT_2, LEVEL_TEXT);
    this.showLivesAndScore();
  }

  lifeLost() {
    const LIFE_LOST_DATA = {
      images: ['assets/lifeLost.png'],
      frames: {width:960, height:600},
      animations: {
          show:[0, 0, 'show', 0.075]
      }
    };
    const LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
    const LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET, 'show');
    [LIFE_LOST.x, LIFE_LOST.scaleX] = [23, 0.9525];
    this.stage.addChild(LIFE_LOST);
    this.showLivesAndScore();
  }

  gameOver() {
    const GAME_OVER_DATA = {
      images: ['assets/gameOver.png'],
      frames: {width:960, height:600},
      animations: {
          show:[0, 0, 'show', 0.075]
      }
    };
    const GAME_OVER_SPRITE_SHEET = new createjs.SpriteSheet(GAME_OVER_DATA);
    const GAME_OVER = new createjs.Sprite(GAME_OVER_SPRITE_SHEET, 'show');
    [GAME_OVER.x, GAME_OVER.scaleX] = [23, 0.9525];
    this.stage.addChild(GAME_OVER);
    this.showLivesAndScore();
  }

  showLivesAndScore() {
    this.stage.addChild(
      this.highScoreText, this.currentScoreText, this.livesText,
      ...this.lives.slice(0,this.livesLeft)
    );
  }

}
