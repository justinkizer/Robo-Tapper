/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global createjs */

var BARS = exports.BARS = [{
  startPosX: 600,
  startPosY: 425,
  scale: 1,
  posXLimits: [200, 600]
}, {
  startPosX: 560,
  startPosY: 310,
  scale: 1,
  posXLimits: [240, 560]
}, {
  startPosX: 520,
  startPosY: 185,
  scale: 0.98,
  posXLimits: [280, 520]
}, {
  startPosX: 495,
  startPosY: 75,
  scale: 0.96,
  posXLimits: [319.5, 495]
}];

var BACKGROUND_DATA = {
  images: ['assets/background.png'],
  frames: { width: 960, height: 600 },
  animations: {
    show: [0, 0, 'show', 0.075]
  }
};

var BACKGROUND_SPRITE_SHEET = new createjs.SpriteSheet(BACKGROUND_DATA);

var BAR = exports.BAR = new createjs.Sprite(BACKGROUND_SPRITE_SHEET, 'show');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global createjs */

var SteinManager = function () {
  function SteinManager() {
    _classCallCheck(this, SteinManager);

    this.fullSteins = [];
    this.emptySteins = [];
  }

  _createClass(SteinManager, [{
    key: 'newStein',
    value: function newStein(fillStatus, x, y, scaleX, scaleY, xLimit) {
      var imagePath = void 0;
      if (fillStatus === 'full') {
        imagePath = 'assets/fullStein.png';
      } else {
        imagePath = 'assets/emptyStein.png';
      }
      var STEINS_DATA = {
        images: [imagePath],
        frames: { width: 40.8, height: 42 },
        animations: {
          stein: [0, 0, false, 0]
        }
      };
      var SPRITE_SHEET = new createjs.SpriteSheet(STEINS_DATA);
      var STEIN = new createjs.Sprite(SPRITE_SHEET, 'STEIN');
      var _ref = [x, y, scaleX || STEIN.scaleX, scaleY || STEIN.scaleY, xLimit || STEIN.xLimit];
      STEIN.x = _ref[0];
      STEIN.y = _ref[1];
      STEIN.scaleX = _ref[2];
      STEIN.scaleY = _ref[3];
      STEIN.xLimit = _ref[4];

      return STEIN;
    }
  }]);

  return SteinManager;
}();

exports.default = SteinManager;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global createjs */


var _bar = __webpack_require__(0);

var _player = __webpack_require__(6);

var _input = __webpack_require__(4);

var _input2 = _interopRequireDefault(_input);

var _steins = __webpack_require__(1);

var _steins2 = _interopRequireDefault(_steins);

var _customers = __webpack_require__(3);

var _customers2 = _interopRequireDefault(_customers);

var _status_screens = __webpack_require__(7);

var _status_screens2 = _interopRequireDefault(_status_screens);

var _tick = __webpack_require__(8);

var _tick2 = _interopRequireDefault(_tick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.difficulty = 6000;
    this.timeouts = [];
    this.screens = new _status_screens2.default();
    this.start = this.start.bind(this);
  }

  _createClass(Game, [{
    key: 'start',
    value: function start(buttonClicked) {
      this.setup(buttonClicked);
      var TICK = new _tick2.default(this);
      createjs.Ticker.on('tick', TICK.handleCollisions);
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener('tick', this.stage);
      document.body.addEventListener('keydown', this.input.movePlayer);
      document.body.addEventListener('keyup', this.input.restartIdle);
    }
  }, {
    key: 'setup',
    value: function setup(buttonClicked) {
      var _this = this;

      document.getElementById('Start/Restart').blur();
      document.getElementById('robo-tapper-canvas').focus();
      clearInterval(this.customerGenerator);
      this.timeouts.forEach(function (timeout) {
        return clearTimeout(timeout);
      });
      createjs.Ticker.removeAllEventListeners();
      createjs.Ticker.addEventListener('tick', createjs.Tween);
      this.stage = new createjs.Stage('robo-tapper-canvas');
      this.player = (0, _player.PLAYER)();
      this.steins = new _steins2.default();
      this.customerManager = new _customers2.default(this.stage);
      this.timeouts = [];
      this.input = new _input2.default(this.player, this.timeouts, this.steins, this.stage);
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
      this.stage.addChild(_bar.BAR, this.player);
      this.screens.showLivesAndScore(this.stage);
      this.player.gotoAndPlay('idle');
      this.customerManager.createCustomers(this.stage);
      this.stage.setChildIndex(this.player, this.stage.getNumChildren() - 1);
      this.customerGenerator = setInterval(function () {
        _this.customerManager.createCustomers(_this.stage);
        _this.stage.setChildIndex(_this.player, _this.stage.getNumChildren() - 1);
      }, this.difficulty);
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global createjs */


var _bar = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomerManager = function () {
  function CustomerManager(stage) {
    _classCallCheck(this, CustomerManager);

    this.customers = [];
    this.stage = stage;
  }

  _createClass(CustomerManager, [{
    key: 'createCustomers',
    value: function createCustomers() {
      var NUMBER_OF_CUSTOMERS = Math.floor(Math.random() * 3);
      for (var i = 0; i <= NUMBER_OF_CUSTOMERS; i++) {
        this.createCustomer();
      }
    }
  }, {
    key: 'createCustomer',
    value: function createCustomer() {
      var RANDOM_SELECTOR = Math.floor(Math.random() * 3);
      var RANDOM_SPEED = (Math.floor(Math.random() * 5) + 5) * 1750;
      var RANDOM_BAR_INDEX = Math.floor(Math.random() * 4);

      var IMAGE_PATHS = ['assets/customer0.png', 'assets/customer1.png', 'assets/customer2.png'];
      var FRAME_DIMENSIONS = [{ width: 90, height: 75 }, { width: 80, height: 75 }];

      var CUSTOMER_DATA = {
        images: [IMAGE_PATHS[RANDOM_SELECTOR]],
        frames: FRAME_DIMENSIONS[RANDOM_SELECTOR === 2 ? 0 : 1],
        animations: {
          walk: [0, 1, 'walk', 0.05],
          walkAngry: [0, 2, 'walkAngry', 0.05],
          drink: [3, 5, false, 0.05]
        }
      };

      var CUSTOMER_SPRITE_SHEET = new createjs.SpriteSheet(CUSTOMER_DATA);
      var CUSTOMER = new createjs.Sprite(CUSTOMER_SPRITE_SHEET, 'walkAngry');

      var SETTERS = ['speed', 'barIndex', 'x', 'y', 'scaleX', 'scaleY', 'tweens', 'scoreValue'];

      var VALUES = [RANDOM_SPEED, RANDOM_BAR_INDEX, _bar.BARS[RANDOM_BAR_INDEX].posXLimits[0], _bar.BARS[RANDOM_BAR_INDEX].startPosY + 5, _bar.BARS[RANDOM_BAR_INDEX].scale, _bar.BARS[RANDOM_BAR_INDEX].scale, [], 50];

      for (var i = 0; i < SETTERS.length; i++) {
        CUSTOMER[SETTERS[i]] = VALUES[i];
      }

      CUSTOMER.tweens.push(createjs.Tween.get(CUSTOMER, { loop: false }).to({ x: _bar.BARS[RANDOM_BAR_INDEX].posXLimits[1] + 30 }, RANDOM_SPEED, createjs.Ease.getPowInOut(1)));

      CUSTOMER.gotoAndPlay('walkAngry');

      this.customers.push(CUSTOMER);
      this.stage.addChild(CUSTOMER);
    }
  }]);

  return CustomerManager;
}();

exports.default = CustomerManager;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global createjs */


var _bar = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = function () {
  function Input(player, timeouts, steins, stage) {
    _classCallCheck(this, Input);

    var _ref = [false, false, 0];
    this.idleTimeout = _ref[0];
    this.inMotion = _ref[1];
    this.barIndex = _ref[2];
    var _ref2 = [player, timeouts, stage, steins];
    this.player = _ref2[0];
    this.timeouts = _ref2[1];
    this.stage = _ref2[2];
    this.steins = _ref2[3];

    this.restartIdle = this.restartIdle.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
  }

  _createClass(Input, [{
    key: 'restartIdle',
    value: function restartIdle(e) {
      var _this = this;

      if (e.keyCode === 37 || e.keyCode === 39) {
        this.player.gotoAndPlay('idle');
        this.player.scaleX = _bar.BARS[this.barIndex].scale;
        this.player.regX = 0;
        this.inMotion = false;
      } else if (e.keyCode === 32) {
        this.player.gotoAndPlay('serve');
        this.inMotion = false;
        var NEW_FULL_STEIN = this.steins.newStein('full', _bar.BARS[this.barIndex].startPosX, _bar.BARS[this.barIndex].startPosY + 50, null, null, _bar.BARS[this.barIndex].posXLimits[0]);
        NEW_FULL_STEIN.tween = createjs.Tween.get(NEW_FULL_STEIN, { loop: false }).to({ x: _bar.BARS[this.barIndex].posXLimits[0] }, (_bar.BARS[this.barIndex].posXLimits[1] - _bar.BARS[this.barIndex].posXLimits[0]) * 2.5, createjs.Ease.getPowInOut(1));
        this.steins.fullSteins.push(NEW_FULL_STEIN);
        this.idleTimeout = setTimeout(function () {
          if (_this.player.rotation !== -90) {
            _this.player.gotoAndPlay('idle');
          }
        }, 300);
        this.stage.addChild(NEW_FULL_STEIN);
        this.stage.setChildIndex(this.player, this.stage.getNumChildren() - 1);
        this.timeouts.push(this.idleTimeout);
      }
    }
  }, {
    key: 'movePlayer',
    value: function movePlayer(e) {
      switch (this.player.y) {
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
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      clearTimeout(this.idleTimeout);
      if (!this.inMotion) {
        var _ref3 = [true, _bar.BARS[this.barIndex].scale];
        this.inMotion = _ref3[0];
        this.player.scaleX = _ref3[1];

        this.player.gotoAndPlay('run');
      }
      if (this.player.x > _bar.BARS[this.barIndex].posXLimits[0]) {
        this.player.x -= 25;
      }
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      clearTimeout(this.idleTimeout);
      if (!this.inMotion) {
        this.inMotion = true;
        this.player.scaleX = -_bar.BARS[this.barIndex].scale;
        this.player.regX = 150;
        this.player.gotoAndPlay('run');
      }
      if (this.player.x < _bar.BARS[this.barIndex].posXLimits[1]) {
        this.player.x += 25;
      }
    }
  }, {
    key: 'moveUp',
    value: function moveUp() {
      if (this.barIndex === 3) {
        this.barIndex = 0;
      } else {
        this.barIndex += 1;
      }
      this.matchPlayerPositionWithBar();
    }
  }, {
    key: 'moveDown',
    value: function moveDown() {
      if (this.barIndex === 0) {
        this.barIndex = 3;
      } else {
        this.barIndex -= 1;
      }
      this.matchPlayerPositionWithBar();
    }
  }, {
    key: 'fillStein',
    value: function fillStein() {
      clearTimeout(this.idleTimeout);
      if (!this.inMotion) {
        this.inMotion = true;
        this.matchPlayerPositionWithBar();
        this.player.x += 30;
        this.player.gotoAndPlay('fill');
      }
    }
  }, {
    key: 'matchPlayerPositionWithBar',
    value: function matchPlayerPositionWithBar() {
      this.player.x = _bar.BARS[this.barIndex].startPosX;
      this.player.y = _bar.BARS[this.barIndex].startPosY;
      this.player.scaleX = _bar.BARS[this.barIndex].scale;
      this.player.scaleY = _bar.BARS[this.barIndex].scale;
    }
  }]);

  return Input;
}();

exports.default = Input;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _game2.default();
  document.getElementById('Start/Restart').onclick = function () {
    return game.start('clicked');
  };
  document.getElementById('Start/Restart').focus();
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global createjs */

var PLAYER = exports.PLAYER = function PLAYER() {
  var PLAYER_DATA = {
    images: ['assets/player.png'],
    frames: { width: 140.5, height: 156 },
    animations: {
      idle: [0, 1, 'idle', 0.075],
      run: [2, 4, 'run', 0.125],
      fill: [5, 8, false, 0.3],
      serve: [9, 9, 'serve', 0.0000005],
      faceplant: [10, 10, true, 0.15],
      dance: [11, 12, 'dance', 0.065],
      scared: [13, 14, 'scared', 0.065]
    }
  };

  var SPRITE_SHEET = new createjs.SpriteSheet(PLAYER_DATA);
  var PLAYER_SPRITE = new createjs.Sprite(SPRITE_SHEET, 'idle');

  var _ref = [600, 425];
  PLAYER_SPRITE.x = _ref[0];
  PLAYER_SPRITE.y = _ref[1];


  return PLAYER_SPRITE;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global createjs */


var _steins = __webpack_require__(1);

var _steins2 = _interopRequireDefault(_steins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StatusScreens = function () {
  function StatusScreens(stage) {
    _classCallCheck(this, StatusScreens);

    var _ref = [3, 0, 0, 1];
    this.livesLeft = _ref[0];
    this.highScore = _ref[1];
    this.currentScore = _ref[2];
    this.levelNum = _ref[3];

    this.highScoreText = new createjs.Text('High   Score: ' + this.highScore, '26px ARCADECLASSIC', '#FFFFFF');
    var _ref2 = [580, 15];
    this.highScoreText.x = _ref2[0];
    this.highScoreText.y = _ref2[1];

    this.currentScoreText = new createjs.Text('Score: ' + this.currentScore, '26px ARCADECLASSIC', '#FFFFFF');
    var _ref3 = [580, 35];
    this.currentScoreText.x = _ref3[0];
    this.currentScoreText.y = _ref3[1];

    this.livesText = new createjs.Text('Lives:', '26px ARCADECLASSIC', '#FFFFFF');
    var _ref4 = [580, 55];
    this.livesText.x = _ref4[0];
    this.livesText.y = _ref4[1];

    this.lives = [new _steins2.default().newStein('full', 663, 58, 0.75, 0.5), new _steins2.default().newStein('full', 693, 58, 0.75, 0.5), new _steins2.default().newStein('full', 723, 58, 0.75, 0.5)];
  }

  _createClass(StatusScreens, [{
    key: 'getNewStage',
    value: function getNewStage(stage) {
      this.stage = stage;
    }
  }, {
    key: 'updateScore',
    value: function updateScore(currentScore) {
      this.highScore = currentScore > this.highScore ? currentScore : this.highScore;
      this.currentScore = currentScore;
      this.stage.removeChild(this.highScoreText);
      this.stage.removeChild(this.currentScoreText);
      this.highScoreText = new createjs.Text('High   Score: ' + this.highScore, '26px ARCADECLASSIC', '#FFFFFF');
      var _ref5 = [580, 15];
      this.highScoreText.x = _ref5[0];
      this.highScoreText.y = _ref5[1];

      this.currentScoreText = new createjs.Text('Score: ' + this.currentScore, '26px ARCADECLASSIC', '#FFFFFF');
      var _ref6 = [580, 35];
      this.currentScoreText.x = _ref6[0];
      this.currentScoreText.y = _ref6[1];

      this.stage.addChild(this.highScoreText, this.currentScoreText);
    }
  }, {
    key: 'updateLives',
    value: function updateLives(livesLeft) {
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
  }, {
    key: 'levelWon',
    value: function levelWon() {
      var LEVEL_WON_DATA = {
        images: ['assets/levelWon.png'],
        frames: { width: 960, height: 600 },
        animations: {
          show: [0, 0, 'show', 0.075]
        }
      };
      var LEVEL_WON_SPRITE_SHEET = new createjs.SpriteSheet(LEVEL_WON_DATA);
      var LEVEL_WON = new createjs.Sprite(LEVEL_WON_SPRITE_SHEET, 'show');
      LEVEL_WON.scaleX = .9525;
      var LEVEL_TEXT = new createjs.Text('Level ' + this.levelNum, '46px ARCADECLASSIC', '#FFFFFF');
      var _ref7 = [385, 275];
      LEVEL_TEXT.x = _ref7[0];
      LEVEL_TEXT.y = _ref7[1];

      var LEVEL_TEXT_2 = new createjs.Text('Level ' + this.levelNum, '46px ARCADECLASSIC', '#00b9fb');
      var _ref8 = [388, 278];
      LEVEL_TEXT_2.x = _ref8[0];
      LEVEL_TEXT_2.y = _ref8[1];

      this.stage.addChild(LEVEL_WON, LEVEL_TEXT_2, LEVEL_TEXT);
      this.showLivesAndScore();
    }
  }, {
    key: 'lifeLost',
    value: function lifeLost() {
      var LIFE_LOST_DATA = {
        images: ['assets/lifeLost.png'],
        frames: { width: 960, height: 600 },
        animations: {
          show: [0, 0, 'show', 0.075]
        }
      };
      var LIFE_LOST_SPRITE_SHEET = new createjs.SpriteSheet(LIFE_LOST_DATA);
      var LIFE_LOST = new createjs.Sprite(LIFE_LOST_SPRITE_SHEET, 'show');
      var _ref9 = [23, 0.9525];
      LIFE_LOST.x = _ref9[0];
      LIFE_LOST.scaleX = _ref9[1];

      this.stage.addChild(LIFE_LOST);
      this.showLivesAndScore();
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      var GAME_OVER_DATA = {
        images: ['assets/gameOver.png'],
        frames: { width: 960, height: 600 },
        animations: {
          show: [0, 0, 'show', 0.075]
        }
      };
      var GAME_OVER_SPRITE_SHEET = new createjs.SpriteSheet(GAME_OVER_DATA);
      var GAME_OVER = new createjs.Sprite(GAME_OVER_SPRITE_SHEET, 'show');
      var _ref10 = [23, 0.9525];
      GAME_OVER.x = _ref10[0];
      GAME_OVER.scaleX = _ref10[1];

      this.stage.addChild(GAME_OVER);
      this.showLivesAndScore();
    }
  }, {
    key: 'showLivesAndScore',
    value: function showLivesAndScore() {
      var _stage;

      (_stage = this.stage).addChild.apply(_stage, [this.highScoreText, this.currentScoreText, this.livesText].concat(_toConsumableArray(this.lives.slice(0, this.livesLeft))));
    }
  }]);

  return StatusScreens;
}();

exports.default = StatusScreens;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global createjs */


var _bar = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tick = function () {
  function Tick(that) {
    _classCallCheck(this, Tick);

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

  _createClass(Tick, [{
    key: 'handleCollisions',
    value: function handleCollisions() {
      this.checkForCustomerFullSteinCollisions();
      this.checkForPlayerEmptySteinCollisions();
      this.checkForCustomersAtFinishLine();
      this.checkForServedOutCustomers();
      this.checkForFallingEmptySteins();
      this.checkForFallingFullSteins();
    }
  }, {
    key: 'checkForCustomerFullSteinCollisions',
    value: function checkForCustomerFullSteinCollisions() {
      for (var i = 0; i < this.customers.length; i++) {
        for (var j = 0; j < this.fullSteins.length; j++) {
          if (this.fullSteinHitCustomer(i, j)) {
            this.fullSteins[j].x = 0;
            this.stage.removeChild(this.fullSteins[j]);
            this.fullSteins[j].tween.setPaused(true);
            this.fullSteins.splice(this.fullSteins.indexOf(this.fullSteins[j]), 1);
            this.serve(this.customers[i]);
          }
        }
      }
    }
  }, {
    key: 'fullSteinHitCustomer',
    value: function fullSteinHitCustomer(i, j) {
      return this.fullSteins[j].x !== 0 && Math.floor(this.customers[i].x) >= Math.floor(this.fullSteins[j].x) && Math.floor(this.fullSteins[j].y) - Math.floor(this.customers[i].y) === 45 && !this.customers[i].drinking;
    }
  }, {
    key: 'checkForPlayerEmptySteinCollisions',
    value: function checkForPlayerEmptySteinCollisions() {
      for (var i = 0; i < this.emptySteins.length; i++) {
        if (this.emptySteinHitPlayer(i)) {
          this.emptySteins[i].tween.setPaused(true);
          this.stage.removeChild(this.emptySteins[i]);
          this.screens.updateScore(this.screens.currentScore + 100, this.stage);
          this.emptySteins.splice(this.emptySteins.indexOf(this.emptySteins[i]), 1);
        }
      }
    }
  }, {
    key: 'emptySteinHitPlayer',
    value: function emptySteinHitPlayer(i) {
      return this.emptySteins[i] && this.emptySteins[i].x !== 0 && Math.floor(this.player.x) <= Math.floor(this.emptySteins[i].x) && Math.floor(this.emptySteins[i].y) - Math.floor(this.player.y) === 45;
    }
  }, {
    key: 'checkForCustomersAtFinishLine',
    value: function checkForCustomersAtFinishLine() {
      for (var i = 0; i < this.customers.length; i++) {
        if (this.customerIsAtTheFinishLine(i)) {
          this.freezeAnimationsAndInput();
          this.player.rotation = -90;
          this.player.gotoAndPlay('faceplant');
          this.player.scaleX = -_bar.BARS[this.customers[i].barIndex].scale;
          this.player.x = _bar.BARS[this.customers[i].barIndex].startPosX - 30;
          this.player.y = _bar.BARS[this.customers[i].barIndex].startPosY + 10;
          this.customers[i].scaleX = -1;
          this.customers[i].x += 50;
          this.customers[i].gotoAndPlay('walk');
          this.customers[i].tweens.push(createjs.Tween.get(this.customers[i], { loop: false, override: true }).to({ x: _bar.BARS[this.customers[i].barIndex].posXLimits[0] + 100 }, (_bar.BARS[this.customers[i].barIndex].posXLimits[1] - _bar.BARS[this.customers[i].barIndex].posXLimits[0]) * 5, createjs.Ease.getPowInOut(1)));
          createjs.Tween.get(this.player, { loop: false, override: true }).to({ x: _bar.BARS[this.customers[i].barIndex].posXLimits[0] }, (_bar.BARS[this.customers[i].barIndex].posXLimits[1] - _bar.BARS[this.customers[i].barIndex].posXLimits[0]) * 5, createjs.Ease.getPowInOut(1));
          this.processFailState((_bar.BARS[this.customers[i].barIndex].posXLimits[1] - _bar.BARS[this.customers[i].barIndex].posXLimits[0]) * 5.5);
        }
      }
    }
  }, {
    key: 'customerIsAtTheFinishLine',
    value: function customerIsAtTheFinishLine(i) {
      return this.customers[i].x === _bar.BARS[this.customers[i].barIndex].posXLimits[1] + 30;
    }
  }, {
    key: 'checkForServedOutCustomers',
    value: function checkForServedOutCustomers() {
      for (var i = 0; i < this.customers.length; i++) {
        if (this.customerIsServedOut(i)) {
          this.screens.updateScore(this.screens.currentScore + this.customers[i].scoreValue, this.stage);
          this.stage.removeChild(this.customers[i]);
          this.customers[i].tweens.forEach(function (tween) {
            return tween.setPaused(true);
          });
          this.customers.splice(this.customers.indexOf(this.customers[i]), 1);
          this.checkWhetherAllCustomersAreServedOut();
        }
      }
    }
  }, {
    key: 'customerIsServedOut',
    value: function customerIsServedOut(i) {
      return this.customers[i].x < _bar.BARS[this.customers[i].barIndex].posXLimits[0] - 35;
    }
  }, {
    key: 'checkWhetherAllCustomersAreServedOut',
    value: function checkWhetherAllCustomersAreServedOut() {
      var _this = this;

      if (this.customers.length < 1) {
        this.freezeAnimationsAndInput();
        this.that.difficulty = this.that.difficulty / 1.5;
        this.player.gotoAndPlay('dance');
        this.screens.levelNum += 1;
        this.timeouts.push(setTimeout(function () {
          _this.screens.levelWon(_this.stage);
        }, 1000));
        this.timeouts.push(setTimeout(this.start, 3000));
      }
    }
  }, {
    key: 'checkForFallingEmptySteins',
    value: function checkForFallingEmptySteins() {
      for (var i = 0; i < this.emptySteins.length; i++) {
        if (this.steinIsFalling(i, this.emptySteins)) {
          this.freezeAnimationsAndInput();
          this.player.gotoAndPlay('scared');
          var FALLING_STEIN = this.steins.newStein('empty', this.emptySteins[i].x, this.emptySteins[i].y);
          this.stage.addChild(FALLING_STEIN);
          this.stage.removeChild(this.emptySteins[i]);
          this.emptySteins.splice(this.emptySteins.indexOf(this.emptySteins[i]), 1);
          createjs.Tween.get(FALLING_STEIN, { loop: false, override: true }).to({ y: FALLING_STEIN.y + 75 }, 1000, createjs.Ease.getPowInOut(1));
          this.processFailState(1000);
        }
      }
    }
  }, {
    key: 'checkForFallingFullSteins',
    value: function checkForFallingFullSteins() {
      for (var i = 0; i < this.fullSteins.length; i++) {
        if (this.steinIsFalling(i, this.fullSteins)) {
          this.freezeAnimationsAndInput();
          this.player.gotoAndPlay('scared');
          var FALLING_STEIN = this.steins.newStein('full', this.fullSteins[i].x, this.fullSteins[i].y);
          this.stage.addChild(FALLING_STEIN);
          this.stage.removeChild(this.fullSteins[i]);
          this.fullSteins.splice(this.fullSteins.indexOf(this.fullSteins[i]), 1);
          createjs.Tween.get(FALLING_STEIN, { loop: false, override: true }).to({ y: FALLING_STEIN.y + 75 }, 1000, createjs.Ease.getPowInOut(1));
          this.processFailState(1000);
        }
      }
    }
  }, {
    key: 'steinIsFalling',
    value: function steinIsFalling(i, steins) {
      return steins[i] && steins[i].xLimit === steins[i].x;
    }
  }, {
    key: 'freezeAnimationsAndInput',
    value: function freezeAnimationsAndInput() {
      document.body.removeEventListener('keydown', this.input.movePlayer);
      document.body.removeEventListener('keyup', this.input.restartIdle);
      clearInterval(this.customerGenerator);
      clearTimeout(this.input.idleTimeout);
      for (var i = 0; i < this.customers.length; i++) {
        this.customers[i].tweens.forEach(function (tween) {
          return tween.setPaused(true);
        });
      }
      this.timeouts.forEach(function (timeout) {
        return clearTimeout(timeout);
      });
      this.fullSteins.forEach(function (stein) {
        return stein.tween.setPaused(true);
      });
      this.emptySteins.forEach(function (stein) {
        return stein.tween.setPaused(true);
      });
    }
  }, {
    key: 'processFailState',
    value: function processFailState(speed) {
      var _this2 = this;

      this.screens.updateScore(0, this.stage);
      this.screens.updateLives(this.screens.livesLeft - 1, this.stage);
      this.transitionScreen = function () {
        return _this2.screens.lifeLost(_this2.stage);
      };
      if (this.screens.livesLeft <= 0) {
        this.transitionScreen = function () {
          return _this2.screens.gameOver(_this2.stage);
        };
        this.screens.levelNum = 1;
        this.that.difficulty = 6000;
      }
      this.timeouts.push(setTimeout(function () {
        _this2.stage.addChild(_this2.transitionScreen());
        _this2.timeouts.push(setTimeout(_this2.start, 2000));
        _this2.customers = [];_this2.fullSteins = [];_this2.emptySteins = [];
      }, speed));
    }
  }, {
    key: 'serve',
    value: function serve(customer) {
      var _this3 = this;

      customer.gotoAndPlay('drink');
      customer.drinking = true;
      var ORIGINAL_X = customer.x;
      customer.tweens.push(createjs.Tween.get(customer, { loop: false,
        override: true }).to({ x: customer.x - 120 }, 150, createjs.Ease.getPowInOut(1)).to({ x: _bar.BARS[customer.barIndex].posXLimits[1] + 30 }, customer.speed, createjs.Ease.getPowInOut(1)));
      if (ORIGINAL_X - 115 > _bar.BARS[customer.barIndex].posXLimits[0] - 35) {
        this.timeouts.push(setTimeout(function () {
          if (_this3.customers.indexOf(customer) !== -1) {
            var NEW_EMPTY_STEIN = _this3.steins.newStein('empty', customer.x + 50, customer.y + 40, null, null, _bar.BARS[customer.barIndex].posXLimits[1] + 90);
            customer.gotoAndPlay('walkAngry');
            customer.drinking = false;
            if (_this3.player.currentAnimation !== 'faceplant') {
              NEW_EMPTY_STEIN.tween = createjs.Tween.get(NEW_EMPTY_STEIN, {
                loop: false }).to({ x: _bar.BARS[customer.barIndex].posXLimits[1] + 90 }, (_bar.BARS[customer.barIndex].posXLimits[1] - _bar.BARS[customer.barIndex].posXLimits[0]) * 10, createjs.Ease.getPowInOut(1));
              _this3.stage.addChild(NEW_EMPTY_STEIN);
              _this3.emptySteins.push(NEW_EMPTY_STEIN);
              _this3.stage.setChildIndex(_this3.player, _this3.stage.getNumChildren() - 1);
            }
          }
        }, 1000));
      }
    }
  }]);

  return Tick;
}();

exports.default = Tick;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map