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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global createjs */

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Start").onclick = init;
  document.getElementById("Restart").onclick = init;
  init();
});

var init = function init() {

  document.getElementById("Start").blur();
  document.getElementById("Restart").blur();
  document.getElementById("robo-tapper-canvas").focus();
  var stage = new createjs.Stage("robo-tapper-canvas");
  var hit;
  var emptySteinTween;
  var tick = function tick(event) {
    var customers = [customer0, customer1, customer2];
    for (var i = 0; i < customers.length; i++) {
      if (fullStein.x !== 0 && Math.floor(customers[i].x) >= Math.floor(fullStein.x) && Math.floor(fullStein.y) - Math.floor(customers[i].y) === 45) {
        hit = true;
        fullStein.x = 0;
        stage.removeChild(fullStein);
        steinTween.setPaused(true);
        serve(customers[i]);
      }
      if (customers[i].x < bars[customers[i].barIndex].posXLimits[0] - 35) {
        stage.removeChild(customers[i]);
        customers[i].tweens.forEach(function (tween) {
          return tween.setPaused(true);
        });
        // stage.removeChild(emptyStein);
        // if (emptySteinTween) { emptySteinTween.setPaused(true); }
        // need to pause the tween animation for the customer and emptyStein as well
      }
      if (emptyStein.x !== 0 && Math.floor(animation.x) <= Math.floor(emptyStein.x) && Math.floor(emptyStein.y) - Math.floor(animation.y) === 45) {
        // emptySteinTween.pause(true);
        stage.removeChild(emptyStein);
      }
      // console.log(customers[i].x, bars[customers[i].barIndex].posXLimits[1]);
      if (customers[i].x === bars[customers[i].barIndex].posXLimits[1] + 30) {
        document.body.removeEventListener('keydown', movePlayer);
        document.body.removeEventListener('keyup', restartIdle);
        animation.gotoAndPlay("faceplant");
        animation.rotation = -90;
        animation.scaleX = -bars[customers[i].barIndex].scale;
        animation.x = bars[customers[i].barIndex].startPosX - 30;
        animation.y = bars[customers[i].barIndex].startPosY + 10;
        customers[i].scaleX = -1;
        customers[i].x += 50;
        customers[i].gotoAndPlay("walk");
        for (var j = 0; j < customers.length; j++) {
          if (customers[i] !== customers[j]) {
            customers[j].tweens.forEach(function (tween) {
              return tween.setPaused(true);
            });
          }
        }
        customers[i].tweens.push(createjs.Tween.get(customers[i], { loop: false, override: true }).to({ x: bars[customers[i].barIndex].posXLimits[0] + 100 }, (bars[customers[i].barIndex].posXLimits[1] - bars[customers[i].barIndex].posXLimits[0]) * 5, createjs.Ease.getPowInOut(1)));
        createjs.Tween.get(animation, { loop: false, override: true }).to({ x: bars[customers[i].barIndex].posXLimits[0] }, (bars[customers[i].barIndex].posXLimits[1] - bars[customers[i].barIndex].posXLimits[0]) * 5, createjs.Ease.getPowInOut(1));
        setTimeout(function () {
          return stage.addChild(gameOver);
        }, (bars[customers[i].barIndex].posXLimits[1] - bars[customers[i].barIndex].posXLimits[0]) * 5);
      }
    }
    if (emptyStein.xLimit === emptyStein.x) {
      // document.body.removeEventListener('keydown', movePlayer);
      // document.body.removeEventListener('keyup', restartIdle);
      // stage.addChild(gameOver);
    }
  };
  createjs.Ticker.on("tick", tick);

  var serve = function serve(customer) {
    customer.gotoAndPlay("drink");
    var originalx = customer.x;
    customer.tweens.push(createjs.Tween.get(customer, { loop: false, override: true }).to({ x: customer.x - 120 }, 150, createjs.Ease.getPowInOut(1)).to({ x: bars[customer.barIndex].posXLimits[1] + 30 }, customer.speed, createjs.Ease.getPowInOut(1)));
    if (originalx - 115 > bars[customer.barIndex].posXLimits[0] - 35) {
      setTimeout(function () {
        emptyStein.x = customer.x + 50;
        emptyStein.y = customer.y + 40;
        emptyStein.xLimit = bars[customer.barIndex].posXLimits[1] + 40;
        customer.gotoAndPlay("walkAngry");
        emptySteinTween = createjs.Tween.get(emptyStein, { loop: false }).to({ x: bars[customer.barIndex].posXLimits[1] + 40 }, (bars[customer.barIndex].posXLimits[1] - bars[customer.barIndex].posXLimits[0]) * 10, createjs.Ease.getPowInOut(1)); //.to({ alpha: 0, x: bars[barIndex].posXLimits[0] - 25 }, 100)
        // createjs.Tween.get(customer0, { loop: false })
        //   .to({ x: bars[randomBarIndex].posXLimits[1] + 30 }, randomSpeed, createjs.Ease.getPowInOut(1));
        stage.addChild(emptyStein);
      }, 1000);
    }
  };

  var bars = [{
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

  var data = {
    images: ["assets/Player.png"],
    frames: { width: 140.5, height: 156 },
    animations: {
      idle: [0, 1, "idle", 0.075],
      run: [2, 4, "run", 0.125],
      fill: [5, 8, false, 0.15],
      serve: [9, 9, "serve", 0.0000005],
      faceplant: [10, 10, true, 0.15],
      dance: [11, 12, "dance", 0.065],
      scared: [13, 14, "scared", 0.065]
    }
  };

  var gameOverData = {
    images: ["assets/gameOver.png"],
    frames: { width: 960, height: 600 },
    animations: {
      show: [0, 0, "show", 0.075]
    }
  };

  var steinsData = {
    images: ["assets/Steins.png"],
    frames: { width: 40.8, height: 42 },
    animations: {
      full: [0, 0, false, 0],
      empty: [1, 1, false, 0] }
  };

  var steinsData2 = {
    images: ["assets/EmptyStein.png"],
    frames: { width: 40.8, height: 42 },
    animations: {
      full: [0, 0, false, 0],
      empty: [1, 1, false, 0] }
  };

  var customer0Data = {
    images: ["assets/NPC0.png"],
    frames: { width: 80, height: 75 },
    animations: {
      walk: [0, 1, "walk", 0.05],
      walkAngry: [0, 2, "walkAngry", 0.05],
      drink: [3, 5, false, 0.05]
    }
  };

  var customer1Data = {
    images: ["assets/NPC1.png"],
    frames: { width: 80, height: 75 },
    animations: {
      walk: [0, 1, "walk", 0.05],
      walkAngry: [0, 2, "walkAngry", 0.05],
      drink: [3, 5, false, 0.05]
    }
  };

  var customer2Data = {
    images: ["assets/NPC2.png"],
    frames: { width: 90, height: 75 },
    animations: {
      walk: [0, 1, "walk", 0.05],
      walkAngry: [0, 2, "walkAngry", 0.05],
      drink: [3, 5, false, 0.05]
    }
  };

  var customer0SpriteSheet = new createjs.SpriteSheet(customer0Data);
  var customer0 = new createjs.Sprite(customer0SpriteSheet, "walkAngry");
  var randomBarIndex = Math.floor(Math.random() * 4);
  customer0.barIndex = randomBarIndex;
  var randomSpeed = (Math.floor(Math.random() * 5) + 5) * 1750;
  customer0.speed = randomSpeed;
  customer0.x = bars[randomBarIndex].posXLimits[0];
  customer0.y = bars[randomBarIndex].startPosY + 5;
  customer0.scaleX = bars[randomBarIndex].scale;
  customer0.scaleY = bars[randomBarIndex].scale;
  stage.addChild(customer0);
  customer0.gotoAndPlay("walkAngry");
  customer0.tweens = [];
  customer0.tweens.push(createjs.Tween.get(customer0, { loop: false }).to({ x: bars[randomBarIndex].posXLimits[1] + 30 }, randomSpeed, createjs.Ease.getPowInOut(1)));

  var customer1SpriteSheet = new createjs.SpriteSheet(customer1Data);
  var customer1 = new createjs.Sprite(customer1SpriteSheet, "walkAngry");
  randomBarIndex = Math.floor(Math.random() * 4);
  customer1.barIndex = randomBarIndex;
  randomSpeed = (Math.floor(Math.random() * 5) + 5) * 1750;
  customer1.speed = randomSpeed;
  customer1.x = bars[randomBarIndex].posXLimits[0];
  customer1.y = bars[randomBarIndex].startPosY + 5;
  customer1.scaleX = bars[randomBarIndex].scale;
  customer1.scaleY = bars[randomBarIndex].scale;
  stage.addChild(customer1);
  customer1.gotoAndPlay("walkAngry");
  customer1.tweens = [];
  customer1.tweens.push(createjs.Tween.get(customer1, { loop: false }).to({ x: bars[randomBarIndex].posXLimits[1] + 30 }, randomSpeed, createjs.Ease.getPowInOut(1)));

  var customer2SpriteSheet = new createjs.SpriteSheet(customer2Data);
  var customer2 = new createjs.Sprite(customer2SpriteSheet, "walkAngry");
  randomBarIndex = Math.floor(Math.random() * 4);
  customer2.barIndex = randomBarIndex;
  randomSpeed = (Math.floor(Math.random() * 5) + 5) * 1750;
  customer2.speed = randomSpeed;
  customer2.x = bars[randomBarIndex].posXLimits[0];
  customer2.y = bars[randomBarIndex].startPosY + 5;
  customer2.scaleX = bars[randomBarIndex].scale;
  customer2.scaleY = bars[randomBarIndex].scale;
  stage.addChild(customer2);
  customer2.gotoAndPlay("walkAngry");
  customer2.tweens = [];
  customer2.tweens.push(createjs.Tween.get(customer2, { loop: false }).to({ x: bars[randomBarIndex].posXLimits[1] + 30 }, randomSpeed, createjs.Ease.getPowInOut(1)));

  var steinSpriteSheet = new createjs.SpriteSheet(steinsData);
  var steinSpriteSheet2 = new createjs.SpriteSheet(steinsData2);
  var fullStein = new createjs.Sprite(steinSpriteSheet, "full");
  var emptyStein = new createjs.Sprite(steinSpriteSheet2, "full");

  var gameOverSpriteSheet = new createjs.SpriteSheet(gameOverData);
  var gameOver = new createjs.Sprite(gameOverSpriteSheet, "show");

  var spriteSheet = new createjs.SpriteSheet(data);
  var animation = new createjs.Sprite(spriteSheet, "idle");
  animation.scaleX = 1;
  animation.scaleY = 1;
  animation.x = bars[0].startPosX;
  animation.y = bars[0].startPosY;

  stage.addChild(animation);

  animation.gotoAndPlay("idle");

  var steinTween = null;

  var restartIdle = function restartIdle(e) {
    if (e.keyCode === 37 || e.keyCode === 39) {
      animation.gotoAndPlay("idle");
      animation.scaleX = bars[barIndex].scale;
      animation.regX = 0;
      animate = null;
    } else if (e.keyCode === 32) {
      //&& steinIsFull) {
      animate = null;
      animation.gotoAndPlay("serve");
      fullStein.x = bars[barIndex].startPosX;
      fullStein.y = bars[barIndex].startPosY + 50;
      steinTween = createjs.Tween.get(fullStein, { loop: false }).to({ x: bars[barIndex].posXLimits[0] }, (bars[barIndex].posXLimits[1] - bars[barIndex].posXLimits[0]) * 2.5, createjs.Ease.getPowInOut(1)); //.to({ alpha: 0, x: bars[barIndex].posXLimits[0] - 25 }, 100)
      idleTimeout = setTimeout(function () {
        return animation.gotoAndPlay("idle");
      }, 300);
      stage.addChild(fullStein);

      // animation.gotoAndPlay("dance");
    }
  };

  // steinIsFull = true;
  var idleTimeout = null;
  var animate = null;
  var barIndex = null;

  var movePlayer = function movePlayer(e) {
    switch (animation.y) {
      case 425:
        barIndex = 0;
        break;
      case 310:
        barIndex = 1;
        break;
      case 185:
        barIndex = 2;
        break;
      case 81:
        barIndex = 3;
        break;
    }

    if (e.keyCode === 37) {

      clearTimeout(idleTimeout);
      if (!animate) {
        animate = true;
        animation.scaleX = bars[barIndex].scale;
        animation.gotoAndPlay("run");
      }
      if (animation.x > bars[barIndex].posXLimits[0]) {
        animation.x -= 25;
      }
    } else if (e.keyCode === 39) {
      clearTimeout(idleTimeout);
      if (!animate) {
        animate = true;
        animation.scaleX = -bars[barIndex].scale;
        animation.regX = 150;
        animation.gotoAndPlay("run");
      }
      if (animation.x < bars[barIndex].posXLimits[1]) {
        animation.x += 25;
      }
    } else if (e.keyCode === 38) {
      if (barIndex === 3) {
        barIndex = 0;
      } else {
        barIndex += 1;
      }
      animation.x = bars[barIndex].startPosX;
      animation.y = bars[barIndex].startPosY;
      animation.scaleX = bars[barIndex].scale;
      animation.scaleY = bars[barIndex].scale;
    } else if (e.keyCode === 40) {
      if (barIndex === 0) {
        barIndex = 3;
      } else {
        barIndex -= 1;
      }
      animation.x = bars[barIndex].startPosX;
      animation.y = bars[barIndex].startPosY;
      animation.scaleX = bars[barIndex].scale;
      animation.scaleY = bars[barIndex].scale;
    } else if (e.keyCode === 32) {
      clearTimeout(idleTimeout);
      if (!animate) {
        animate = true;
        animation.x = bars[barIndex].startPosX + 30;
        animation.y = bars[barIndex].startPosY;
        animation.scaleX = bars[barIndex].scale;
        animation.scaleY = bars[barIndex].scale;
        animation.gotoAndPlay("fill");
      }
    }
  };

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stage);
  document.body.addEventListener('keydown', movePlayer);
  document.body.addEventListener('keyup', restartIdle);
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map