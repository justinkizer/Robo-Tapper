/* global createjs */
import { BARS } from './bar.js';

export default class Input {
  constructor(player, timeouts, steins, stage) {
    [this.idleTimeout, this.inMotion, this.barIndex] = [false, false, 0];
    [this.player, this.timeouts, this.stage, this.steins] = [
      player, timeouts, stage, steins
    ];
    this.restartIdle = this.restartIdle.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
  }

  restartIdle(e) {
    if (e.keyCode === 37 || e.keyCode === 39) {
      this.player.gotoAndPlay('idle');
      this.player.scaleX = BARS[this.barIndex].scale;
      this.player.regX = 0;
      this.inMotion = false;
    } else if (e.keyCode === 32) {
      this.player.gotoAndPlay('serve');
      this.inMotion = false;
      const NEW_FULL_STEIN = this.steins.newStein('full',
        BARS[this.barIndex].startPosX, BARS[this.barIndex].startPosY + 50,
        null, null, BARS[this.barIndex].posXLimits[0]
      );
      NEW_FULL_STEIN.tween = createjs.Tween.get(NEW_FULL_STEIN, { loop: false })
        .to({ x: BARS[this.barIndex].posXLimits[0] },
        ((BARS[this.barIndex].posXLimits[1] -
        BARS[this.barIndex].posXLimits[0]) * 2.5),
        createjs.Ease.getPowInOut(1)
      );
      this.steins.fullSteins.push(NEW_FULL_STEIN);
      this.idleTimeout = setTimeout(() => {
        if (this.player.rotation !== -90) {this.player.gotoAndPlay('idle');}
      }, 300);
      this.stage.addChild(NEW_FULL_STEIN);
      this.stage.setChildIndex(this.player, this.stage.getNumChildren()-1);
      this.timeouts.push(this.idleTimeout);
    }
  }

  movePlayer(e) {
    switch(this.player.y) {
      case 425:
        this.barIndex = 0;
        break;
      case 310:
        this.barIndex = 1;
        break;
      case 185:
        this.barIndex = 2;
        break;
      case 81:
        this.barIndex = 3;
        break;
    }

    if (e.keyCode === 37) {
      this.moveLeft();
    } else if (e.keyCode === 39) {
      this.moveRight();
    } else if (e.keyCode === 38) {
      this.moveUp();
    } else if (e.keyCode === 40) {
      this.moveDown();
    } else if (e.keyCode === 32) {
      this.fillStein();
    }
  }

  moveLeft() {
    clearTimeout(this.idleTimeout);
    if (!this.inMotion) {
      [this.inMotion, this.player.scaleX] = [true, BARS[this.barIndex].scale];
      this.player.gotoAndPlay('run');
    }
    if (this.player.x > BARS[this.barIndex].posXLimits[0]) {
      this.player.x -= 25;
    }
  }

  moveRight() {
    clearTimeout(this.idleTimeout);
    if (!this.inMotion) {
      this.inMotion = true;
      this.player.scaleX = -(BARS[this.barIndex].scale);
      this.player.regX = 150;
      this.player.gotoAndPlay('run');
    }
    if (this.player.x < BARS[this.barIndex].posXLimits[1]) {
      this.player.x += 25;
    }
  }

  moveUp() {
    if (this.barIndex === 3) {
      this.barIndex = 0;
    } else {
      this.barIndex += 1;
    }
    this.matchPlayerPositionWithBar();
  }

  moveDown() {
    if (this.barIndex === 0) {
      this.barIndex = 3;
    } else {
      this.barIndex -= 1;
    }
    this.matchPlayerPositionWithBar();
  }

  fillStein() {
    clearTimeout(this.idleTimeout);
    if (!this.inMotion) {
      this.inMotion = true;
      this.matchPlayerPositionWithBar();
      this.player.x += 30;
      this.player.gotoAndPlay('fill');
    }
  }

  matchPlayerPositionWithBar() {
    this.player.x = BARS[this.barIndex].startPosX;
    this.player.y = BARS[this.barIndex].startPosY;
    this.player.scaleX = BARS[this.barIndex].scale;
    this.player.scaleY = BARS[this.barIndex].scale;
  }

}
