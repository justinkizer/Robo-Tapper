/* global createjs */
import { BAR, BARS } from './bar.js';
import { PLAYER } from './player.js';
import Input from './input.js';
import SteinManager from './steins.js';
import CustomerManager from './customers.js';
import StatusScreens from './status_screens.js';
import Tick from './tick.js';

export default class Game {
  constructor() {
    this.difficulty = 6000;
    this.timeouts = [];
    this.screens = new StatusScreens;
    this.start = this.start.bind(this);
  }

  start(buttonClicked) {
    this.setup(buttonClicked);
    const TICK = new Tick(this);
    createjs.Ticker.on('tick', TICK.handleCollisions);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', this.stage);
    document.body.addEventListener('keydown', this.input.movePlayer);
    document.body.addEventListener('keyup', this.input.restartIdle);
  }

  setup(buttonClicked) {
    document.getElementById('Start/Restart').blur();
    document.getElementById('robo-tapper-canvas').focus();
    clearInterval(this.customerGenerator);
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    createjs.Ticker.removeAllEventListeners();
    createjs.Ticker.addEventListener('tick', createjs.Tween);
    this.stage = new createjs.Stage('robo-tapper-canvas');
    this.player = PLAYER();
    this.steins = new SteinManager;
    this.customerManager = new CustomerManager(this.stage);
    this.timeouts = [];
    this.input = new Input(this.player, this.timeouts, this.steins, this.stage);
    this.screens.getNewStage(this.stage);
    if (buttonClicked) {
      this.screens.levelNum = 1;
      this.difficulty = 6000;
      this.screens.livesLeft = 3;
      this.screens.updateScore(0, this.stage);
    }
    if (this.screens.livesLeft === 0) {
      this.screens.livesLeft = 3;
    }
    this.stage.addChild(BAR, this.player);
    this.screens.showLivesAndScore(this.stage);
    this.player.gotoAndPlay('idle');
    this.customerManager.createCustomers(this.stage);
    this.stage.setChildIndex(this.player, this.stage.getNumChildren()-1);
    this.customerGenerator = setInterval(() => {
      this.customerManager.createCustomers(this.stage);
      this.stage.setChildIndex(this.player,
        this.stage.getNumChildren()-1
      );
    }, this.difficulty);
  }

}
