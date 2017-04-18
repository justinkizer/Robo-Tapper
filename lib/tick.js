/* global createjs */
import { BARS } from './bar.js';

export default class Tick {
  constructor(that) {
    this.screens = that.screens;
    this.customerGenerator = that.customerGenerator;
    this.customers = that.customerManager.customers;
    this.steins = that.steins;
    this.fullSteins = that.steins.fullSteins;
    this.emptySteins = that.steins.emptySteins;
    this.stage = that.stage;
    this.player = that.player;
    this.input = that.input;
    this.timeouts = that.timeouts;
    this.start = that.start;
    this.that = that;
    this.handleCollisions = this.handleCollisions.bind(this);
  }

  handleCollisions() {
    this.checkForCustomerFullSteinCollisions();
    this.checkForPlayerEmptySteinCollisions();
    this.checkForCustomersAtFinishLine();
    this.checkForServedOutCustomers();
    this.checkForFallingEmptySteins();
    this.checkForFallingFullSteins();
  }

  checkForCustomerFullSteinCollisions() {
    for (let i = 0; i < this.customers.length; i++) {
      for (let j = 0; j < this.fullSteins.length; j++) {
        if (this.fullSteinHitCustomer(i, j)) {
          this.fullSteins[j].x = 0;
          this.stage.removeChild(this.fullSteins[j]);
          this.fullSteins[j].tween.setPaused(true);
          this.fullSteins.splice(
            this.fullSteins.indexOf(this.fullSteins[j]), 1
          );
          this.serve(this.customers[i]);
        }
      }
    }
  }

  fullSteinHitCustomer(i, j) {
    return this.fullSteins[j].x !== 0 &&
      Math.floor(this.customers[i].x) >= Math.floor(this.fullSteins[j].x) &&
        (Math.floor(this.fullSteins[j].y) - Math.floor(this.customers[i].y))
          === 45 && !this.customers[i].drinking;
  }

  checkForPlayerEmptySteinCollisions() {
    for (let i = 0; i < this.emptySteins.length; i++) {
      if (this.emptySteinHitPlayer(i)) {
        this.emptySteins[i].tween.setPaused(true);
        this.stage.removeChild(this.emptySteins[i]);
        this.screens.updateScore(this.screens.currentScore + 100, this.stage);
        this.emptySteins.splice(
          this.emptySteins.indexOf(this.emptySteins[i]), 1
        );
      }
    }
  }

  emptySteinHitPlayer(i) {
    return this.emptySteins[i] && this.emptySteins[i].x !== 0 &&
      Math.floor(this.player.x) <= Math.floor(this.emptySteins[i].x) &&
        (Math.floor(this.emptySteins[i].y) - Math.floor(this.player.y)) === 45;
  }

  checkForCustomersAtFinishLine() {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customerIsAtTheFinishLine(i)) {
        this.freezeAnimationsAndInput();
        this.player.rotation = -90;
        this.player.gotoAndPlay('faceplant');
        this.player.scaleX = -(BARS[this.customers[i].barIndex].scale);
        this.player.x = BARS[this.customers[i].barIndex].startPosX - 30;
        this.player.y = BARS[this.customers[i].barIndex].startPosY + 10;
        this.customers[i].scaleX = -1;
        this.customers[i].x += 50;
        this.customers[i].gotoAndPlay('walk');
        this.customers[i].tweens.push(createjs.Tween.get(this.customers[i],
          { loop: false, override: true}).to({ x:
          BARS[this.customers[i].barIndex].posXLimits[0] + 100},
          (BARS[this.customers[i].barIndex].posXLimits[1] -
          BARS[this.customers[i].barIndex].posXLimits[0]) * 5,
          createjs.Ease.getPowInOut(1))
        );
        createjs.Tween.get(this.player, { loop: false, override: true}).to({ x:
          BARS[this.customers[i].barIndex].posXLimits[0]},
          (BARS[this.customers[i].barIndex].posXLimits[1] -
          BARS[this.customers[i].barIndex].posXLimits[0]) * 5,
          createjs.Ease.getPowInOut(1)
        );
        this.processFailState((BARS[this.customers[i].barIndex].posXLimits[1] -
          BARS[this.customers[i].barIndex].posXLimits[0]) * 5.5);
      }
    }
  }

  customerIsAtTheFinishLine(i) {
    return this.customers[i].x ===
      BARS[this.customers[i].barIndex].posXLimits[1] + 30;
  }

  checkForServedOutCustomers() {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customerIsServedOut(i)) {
        this.screens.updateScore(this.screens.currentScore +
          this.customers[i].scoreValue, this.stage
        );
        this.stage.removeChild(this.customers[i]);
        this.customers[i].tweens.forEach(tween => tween.setPaused(true));
        this.customers.splice(this.customers.indexOf(this.customers[i]), 1);
        this.checkWhetherAllCustomersAreServedOut();
      }
    }
  }

  customerIsServedOut(i) {
    return this.customers[i].x < BARS[this.customers[i].barIndex].posXLimits[0]
      - 35;
  }

  checkWhetherAllCustomersAreServedOut() {
    if (this.customers.length < 1) {
      this.freezeAnimationsAndInput();
      this.that.difficulty = this.that.difficulty / 1.5;
      this.player.gotoAndPlay('dance');
      this.screens.levelNum += 1;
      this.timeouts.push(setTimeout(() => {
        this.screens.levelWon(this.stage);
      }, 1000));
      this.timeouts.push(setTimeout(this.start, 3000)
      );
    }
  }

  checkForFallingEmptySteins() {
    for (let i = 0; i < this.emptySteins.length; i++) {
      if (this.steinIsFalling(i, this.emptySteins)) {
        this.freezeAnimationsAndInput();
        this.player.gotoAndPlay('scared');
        const FALLING_STEIN = this.steins.newStein('empty',
          this.emptySteins[i].x, this.emptySteins[i].y
        );
        this.stage.addChild(FALLING_STEIN);
        this.stage.removeChild(this.emptySteins[i]);
        this.emptySteins.splice(this.emptySteins
          .indexOf(this.emptySteins[i]), 1
        );
        createjs.Tween.get(FALLING_STEIN, { loop: false, override: true})
          .to({ y: (FALLING_STEIN.y + 75)}, 1000, createjs.Ease.getPowInOut(1));
        this.processFailState(1000);
      }
    }
  }

  checkForFallingFullSteins() {
    for (let i = 0; i < this.fullSteins.length; i++) {
      if (this.steinIsFalling(i, this.fullSteins)) {
        this.freezeAnimationsAndInput();
        this.player.gotoAndPlay('scared');
        const FALLING_STEIN = this.steins.newStein('full',
          this.fullSteins[i].x, this.fullSteins[i].y
        );
        this.stage.addChild(FALLING_STEIN);
        this.stage.removeChild(this.fullSteins[i]);
        this.fullSteins.splice(this.fullSteins.indexOf(this.fullSteins[i]), 1);
        createjs.Tween.get(FALLING_STEIN, { loop: false, override: true})
          .to({ y: (FALLING_STEIN.y + 75)}, 1000, createjs.Ease.getPowInOut(1)
        );
        this.processFailState(1000);
      }
    }
  }

  steinIsFalling(i, steins) {
    return steins[i] && steins[i].xLimit === steins[i].x;
  }

  freezeAnimationsAndInput() {
    document.body.removeEventListener('keydown', this.input.movePlayer);
    document.body.removeEventListener('keyup', this.input.restartIdle);
    clearInterval(this.customerGenerator);
    clearTimeout(this.input.idleTimeout);
    for (let i = 0; i < this.customers.length; i++) {
      this.customers[i].tweens.forEach(tween => tween.setPaused(true));
    }
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.fullSteins.forEach(stein => stein.tween.setPaused(true));
    this.emptySteins.forEach(stein => stein.tween.setPaused(true));
  }

  processFailState(speed) {
    this.screens.updateScore(0, this.stage);
    this.screens.updateLives(this.screens.livesLeft - 1, this.stage);
    this.transitionScreen = () => this.screens.lifeLost(this.stage);
    if (this.screens.livesLeft <= 0) {
      this.transitionScreen = () => this.screens.gameOver(this.stage);
      this.screens.levelNum = 1;
      this.that.difficulty = 6000;
    }
    this.timeouts.push(setTimeout(() => {
      this.stage.addChild(this.transitionScreen());
      this.timeouts.push(setTimeout(this.start, 2000));
      this.customers = []; this.fullSteins = []; this.emptySteins = [];
    }, speed));
  }

  serve(customer) {
    customer.gotoAndPlay('drink');
    customer.drinking = true;
    const ORIGINAL_X = customer.x;
    customer.tweens.push(createjs.Tween.get(customer, {loop: false,
      override: true}).to({ x: customer.x - 120 }, 150,
      createjs.Ease.getPowInOut(1)).to({ x:
      BARS[customer.barIndex].posXLimits[1] + 30 }, customer.speed,
      createjs.Ease.getPowInOut(1))
    );
    if (ORIGINAL_X - 115 > BARS[customer.barIndex].posXLimits[0] - 35) {
      this.timeouts.push(setTimeout(() => {
        if (this.customers.indexOf(customer) !== -1) {
          const NEW_EMPTY_STEIN = this.steins.newStein('empty', customer.x + 50,
            customer.y + 40, null, null, BARS[customer.barIndex].posXLimits[1]
            + 90
          );
          customer.gotoAndPlay('walkAngry');
          customer.drinking = false;
          if (this.player.currentAnimation !== 'faceplant') {
            NEW_EMPTY_STEIN.tween = createjs.Tween.get(NEW_EMPTY_STEIN, {
              loop: false }).to({ x: BARS[customer.barIndex].posXLimits[1] +
              90 }, ((BARS[customer.barIndex].posXLimits[1] -
              BARS[customer.barIndex].posXLimits[0]) * 10),
              createjs.Ease.getPowInOut(1)
            );
            this.stage.addChild(NEW_EMPTY_STEIN);
            this.emptySteins.push(NEW_EMPTY_STEIN);
            this.stage.setChildIndex(this.player,
              this.stage.getNumChildren()-1
            );
          }
        }
      }, 1000));
    }
  }

}
