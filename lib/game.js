/* global createjs */

// NOTE: All code currently below is considered "playground/sandbox" code and is yet to be refactored and organized appropriately

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("Start/Restart").onclick = () => init("restart");
  document.getElementById("Start/Restart").focus();
});

  var levelNum = 1;
  var difficulty = difficulty || 6000;
  var highScore = 0;
  var currentScore = 0;
  var livesLeft = 3;
  var timeouts = [];
  var transitionScreen = null;

const init = buttonClicked => {
  if (buttonClicked) {
    levelNum = 1;
    difficulty = 6000;
    livesLeft = 3;
    currentScore = 0;
  }
  if (livesLeft === 0) {
    livesLeft = 3;
  }
  timeouts.forEach(timeout => clearTimeout(timeout));
  var customers = [];
  var customerGenerator = null;
  document.getElementById("Start/Restart").blur();
  document.getElementById("robo-tapper-canvas").focus();
  var stage = new createjs.Stage("robo-tapper-canvas");
  var hit;
  var newEmptyStein;
  var newFullStein;
  var emptySteins = [];
  var fullSteins = [];
  var highScoreText = new createjs.Text();
  highScoreText.font = "26px ARCADECLASSIC";
  highScoreText.x = 580;
  highScoreText.y = 15;
  highScoreText.color = "#FFFFFF";
  var currentScoreText = new createjs.Text();
  currentScoreText.font = "26px ARCADECLASSIC";
  currentScoreText.x = 580;
  currentScoreText.y = 35;
  currentScoreText.color = "#FFFFFF";
  var livesText = new createjs.Text();
  livesText.font = "26px ARCADECLASSIC";
  livesText.x = 580;
  livesText.y = 55;
  livesText.color = "#FFFFFF";
  const tick = event => {
    highScore = currentScore > highScore ? currentScore : highScore;
    highScoreText.text = `High   Score: ${highScore}`;
    currentScoreText.text = `Score: ${currentScore}`;
    livesText.text = "Lives:";
    stage.addChild(highScoreText);
    stage.addChild(currentScoreText);
    stage.addChild(livesText);
    if (livesLeft > 2) {
      stage.addChild(livesStein03);
    }
    if (livesLeft > 1) {
      stage.addChild(livesStein02);
    }
    if (livesLeft > 0) {
      stage.addChild(livesStein01);
    }

    for (var i = 0; i < customers.length; i++) {
      for (let l = 0; l < fullSteins.length; l++) {
        if (fullSteins[l].x !== 0 && Math.floor(customers[i].x) >= Math.floor(fullSteins[l].x) && (Math.floor(fullSteins[l].y) - Math.floor(customers[i].y)) === 45 && !customers[i].drinking) {
          hit = true;
          fullSteins[l].x = 0;
          stage.removeChild(fullSteins[l]);
          fullSteins[l].tween.setPaused(true);
          fullSteins.splice(fullSteins.indexOf(fullSteins[l]), 1);
          serve(customers[i]);
        }
      }
      for (let k = 0; k < emptySteins.length; k++) {
        if (emptySteins[k] && emptySteins[k].x !== 0 && Math.floor(player.x) <= Math.floor(emptySteins[k].x) && (Math.floor(emptySteins[k].y) - Math.floor(player.y)) === 45) {
          emptySteins[k].tween.setPaused(true);
          stage.removeChild(emptySteins[k]);
          currentScore += 100;
          emptySteins.splice(emptySteins.indexOf(emptySteins[k]), 1);
        }
      }
      if (customers[i].x === bars[customers[i].barIndex].posXLimits[1] + 30) {
        document.body.removeEventListener('keydown', movePlayer);
        document.body.removeEventListener('keyup', restartIdle);
        player.rotation = -90;
        player.gotoAndPlay("faceplant");
        player.scaleX = -(bars[customers[i].barIndex].scale);
        player.x = bars[customers[i].barIndex].startPosX - 30;
        player.y = bars[customers[i].barIndex].startPosY + 10;
        customers[i].scaleX = -1;
        customers[i].x += 50;
        customers[i].gotoAndPlay("walk");
        for (var j = 0; j < customers.length; j++) {
            customers[j].tweens.forEach(tween => tween.setPaused(true));
        }
        fullSteins.forEach(stein => stein.tween.setPaused(true));
        emptySteins.forEach(stein => stein.tween.setPaused(true));
        customers[i].tweens.push(createjs.Tween.get(customers[i], { loop: false, override: true})
          .to({ x: bars[customers[i].barIndex].posXLimits[0] + 100}, (bars[customers[i].barIndex].posXLimits[1] - bars[customers[i].barIndex].posXLimits[0]) * 5, createjs.Ease.getPowInOut(1)));
        createjs.Tween.get(player, { loop: false, override: true})
          .to({ x: bars[customers[i].barIndex].posXLimits[0]}, (bars[customers[i].barIndex].posXLimits[1] - bars[customers[i].barIndex].posXLimits[0]) * 5, createjs.Ease.getPowInOut(1));
          currentScore = 0;
          livesLeft -= 1;
          transitionScreen = lifeLost;
          if (livesLeft <= 0) {
            transitionScreen = gameOver;
            levelNum = 1;
            difficulty = 6000;

          }
          clearInterval(customerGenerator);
          timeouts.push(setTimeout(() => {stage.addChild(transitionScreen); timeouts.push(setTimeout(init, 2000));  stage.setChildIndex(transitionScreen, stage.getNumChildren()-1); customers = []; fullSteins = []; emptySteins = [];}, (bars[customers[i].barIndex].posXLimits[1] - bars[customers[i].barIndex].posXLimits[0]) * 5.5));
      }
      if (customers[i].x < bars[customers[i].barIndex].posXLimits[0] - 35) {
        currentScore += customers[i].scoreValue;
        stage.removeChild(customers[i]);
        customers[i].tweens.forEach(tween => tween.setPaused(true));
        customers.splice(customers.indexOf(customers[i]), 1);
      }
      if (customers.length < 1) {
        document.body.removeEventListener('keydown', movePlayer);
        document.body.removeEventListener('keyup', restartIdle);
        emptySteins.forEach(stein => stein.tween.setPaused(true));
        fullSteins.forEach(stein => stein.tween.setPaused(true));
        clearInterval(customerGenerator);
        difficulty = difficulty / 1.5;
        player.gotoAndPlay("dance");
        levelNum += 1;
        var levelText = new createjs.Text();
        levelText.font = "46px ARCADECLASSIC";
        levelText.x = 385;
        levelText.y = 275;
        levelText.color = "#FFFFFF";
        levelText.text = `Level ${levelNum}`;
        var levelText2 = new createjs.Text();
        levelText2.font = "46px ARCADECLASSIC";
        levelText2.x = 388;
        levelText2.y = 278;
        levelText2.color = "#00b9fb";
        levelText2.text = `Level ${levelNum}`;
        timeouts.push(setTimeout(() => {stage.addChild(levelWon); stage.addChild(levelText2); stage.addChild(levelText);}, 1000));
        timeouts.push(setTimeout(init, 3000));
      }
    }
    for (let m = 0; m < emptySteins.length; m++) {
      if (emptySteins[m] && emptySteins[m].xLimit === emptySteins[m].x) {
        document.body.removeEventListener('keydown', movePlayer);
        document.body.removeEventListener('keyup', restartIdle);
        player.gotoAndPlay("scared");
        let fallingStein = new createStein("empty");
        fallingStein.x = emptySteins[m].x;
        fallingStein.y = emptySteins[m].y;
        stage.addChild(fallingStein);
        stage.removeChild(emptySteins[m]);
        emptySteins.splice(emptySteins.indexOf(emptySteins[m]), 1);
        currentScore = 0;
        livesLeft -= 1;
        transitionScreen = lifeLost;
        if (livesLeft <= 0) {
          transitionScreen = gameOver;
          levelNum = 1;
          difficulty = 6000;
        }
        timeouts.forEach(timeout => clearTimeout(timeout));
        fullSteins.forEach(stein => stein.tween.setPaused(true));
        emptySteins.forEach(stein => stein.tween.setPaused(true));
        customers.forEach(customer => customer.tweens.forEach(tween => tween.setPaused(true)));
        clearInterval(customerGenerator);
        createjs.Tween.get(fallingStein, { loop: false, override: true})
          .to({ y: (fallingStein.y + 75)}, 1000, createjs.Ease.getPowInOut(1));
        setTimeout(() => {
          stage.addChild(transitionScreen);
          stage.setChildIndex(transitionScreen, stage.getNumChildren()-1);
          timeouts.push(setTimeout(init, 2000));
        }, 1000);
      }
    }
    for (let n = 0; n < fullSteins.length; n++) {
      if (fullSteins[n] && fullSteins[n].xLimit === fullSteins[n].x) {
        document.body.removeEventListener('keydown', movePlayer);
        document.body.removeEventListener('keyup', restartIdle);
        player.gotoAndPlay("scared");
        fullSteins.forEach(stein => stein.tween.setPaused(true));
        emptySteins.forEach(stein => stein.tween.setPaused(true));
        timeouts.forEach(timeout => clearTimeout(timeout));
        clearInterval(customerGenerator);
        customers.forEach(customer => customer.tweens.forEach(tween => tween.setPaused(true)));
        currentScore = 0;
        livesLeft -= 1;
        transitionScreen = lifeLost;
        if (livesLeft <= 0) {
          transitionScreen = gameOver;
          levelNum = 1;
          difficulty = 6000;
        }
        let fallingStein = new createStein("full");
        fallingStein.x = fullSteins[n].x;
        fallingStein.y = fullSteins[n].y;
        stage.addChild(fallingStein);
        stage.removeChild(fullSteins[n]);
        fullSteins.splice(fullSteins.indexOf(fullSteins[n]), 1);
        createjs.Tween.get(fallingStein, { loop: false, override: true})
          .to({ y: (fallingStein.y + 75)}, 1000, createjs.Ease.getPowInOut(1));
        setTimeout(() => {
          stage.addChild(transitionScreen);
          stage.setChildIndex(transitionScreen, stage.getNumChildren()-1);
          timeouts.push(setTimeout(init, 2000));
        }, 1000);
      }
    }
  };
  createjs.Ticker.on("tick", tick);

  const serve = customer => {
    customer.gotoAndPlay("drink");
    customer.drinking = true;
    let originalx = customer.x;
    customer.tweens.push(createjs.Tween.get(customer, { loop: false, override: true})
      .to({ x: customer.x - 120 }, 150, createjs.Ease.getPowInOut(1)).to({ x: bars[customer.barIndex].posXLimits[1] + 30 }, customer.speed, createjs.Ease.getPowInOut(1)));
      if (originalx - 115 > bars[customer.barIndex].posXLimits[0] - 35) {
        timeouts.push(setTimeout(() => {
          if (customers.indexOf(customer) !== -1) {
            newEmptyStein = createStein("empty");
            newEmptyStein.x = customer.x + 50;
            newEmptyStein.y = customer.y + 40;
            newEmptyStein.xLimit = bars[customer.barIndex].posXLimits[1] + 90;
            customer.gotoAndPlay("walkAngry");
            customer.drinking = false;
            newEmptyStein.tween = createjs.Tween.get(newEmptyStein, { loop: false })
            .to({ x: bars[customer.barIndex].posXLimits[1] + 90 }, ((bars[customer.barIndex].posXLimits[1] - bars[customer.barIndex].posXLimits[0]) * 10), createjs.Ease.getPowInOut(1));
            stage.addChild(newEmptyStein); emptySteins.push(newEmptyStein); stage.setChildIndex(player, stage.getNumChildren()-1);
          }
        }, 1000));
      }

  };

  var bars = [
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

    var data = {
      images: ["assets/Player.png"],
      frames: {width:140.5, height:156},
      animations: {
          idle:[0, 1, "idle", 0.075],
          run:[2, 4, "run", 0.125],
          fill:[5, 8, false, 0.3],
          serve:[9, 9, "serve", 0.0000005],
          faceplant:[10, 10, true, 0.15],
          dance:[11, 12, "dance", 0.065],
          scared:[13, 14, "scared", 0.065]
      }
    };

    var gameOverData = {
      images: ["assets/gameOver.png"],
      frames: {width:960, height:600},
      animations: {
          show:[0, 0, "show", 0.075]
      }
    };

    var levelWonData = {
      images: ["assets/LevelWon.png"],
      frames: {width:960, height:600},
      animations: {
          show:[0, 0, "show", 0.075]
      }
    };

    var backgroundData = {
      images: ["assets/background2.png"],
      frames: {width:960, height:600},
      animations: {
          show:[0, 0, "show", 0.075]
      }
    };

    var lifeLostData = {
      images: ["assets/lifeLost.png"],
      frames: {width:960, height:600},
      animations: {
          show:[0, 0, "show", 0.075]
      }
    };

    var steinsData = {
      images: ["assets/Steins.png"],
      frames: {width:40.8, height:42},
      animations: {
          full:[0, 0, false, 0],
          empty:[1, 1, false, 0]          }
    };

    var steinsData2 = {
      images: ["assets/EmptyStein.png"],
      frames: {width:40.8, height:42},
      animations: {
          full:[0, 0, false, 0],
          empty:[1, 1, false, 0]          }
    };

  const createStein = fillStatus => {
    let stein;
    let spriteSheet;
    if (fillStatus === "full") {
      spriteSheet = new createjs.SpriteSheet(steinsData);
    } else {
      spriteSheet = new createjs.SpriteSheet(steinsData2);
    }
    stein = new createjs.Sprite(spriteSheet, "full");
    return stein;
  };

  const createCustomers = () => {
    var customerData = [{
      images: ["assets/NPC0.png"],
      frames: {width:80, height:75},
      animations: {
          walk:[0, 1, "walk", 0.05],
          walkAngry:[0, 2, "walkAngry", 0.05],
          drink:[3, 5, false, 0.05]
      }
    },
    {
      images: ["assets/NPC1.png"],
      frames: {width:80, height:75},
      animations: {
          walk:[0, 1, "walk", 0.05],
          walkAngry:[0, 2, "walkAngry", 0.05],
          drink:[3, 5, false, 0.05]
      }
    },
    {
      images: ["assets/NPC2.png"],
      frames: {width:90, height:75},
      animations: {
          walk:[0, 1, "walk", 0.05],
          walkAngry:[0, 2, "walkAngry", 0.05],
          drink:[3, 5, false, 0.05]
      }
    }];

    const numCustomers = Math.floor(Math.random() * 3);

    for (var i = 0; i <= numCustomers; i++) {
      var customer0SpriteSheet = new createjs.SpriteSheet(customerData[Math.floor(Math.random() * 2)]);
      var customer0 = new createjs.Sprite(customer0SpriteSheet, "walkAngry");
      var randomBarIndex = Math.floor(Math.random() * 4);
      customer0.barIndex = randomBarIndex;
      var randomSpeed = ((Math.floor(Math.random() * 5) + 5) * 1750);
      customer0.speed = randomSpeed;
      customer0.x = bars[randomBarIndex].posXLimits[0];
      customer0.y = bars[randomBarIndex].startPosY + 5;
      customer0.scaleX = bars[randomBarIndex].scale;
      customer0.scaleY = bars[randomBarIndex].scale;
      stage.addChild(customer0);
      customers.push(customer0);
      customer0.gotoAndPlay("walkAngry");
      customer0.tweens = [];
      customer0.scoreValue = 50;
      customer0.tweens.push(createjs.Tween.get(customer0, { loop: false })
        .to({ x: bars[randomBarIndex].posXLimits[1] + 30 }, randomSpeed, createjs.Ease.getPowInOut(1)));
    }
  };

    var steinSpriteSheet = new createjs.SpriteSheet(steinsData);
    var steinSpriteSheet2 = new createjs.SpriteSheet(steinsData2);
    var fullStein = new createjs.Sprite(steinSpriteSheet, "full");
    var emptyStein = new createjs.Sprite(steinSpriteSheet2, "full");

    var livesStein01 = new createjs.Sprite(steinSpriteSheet, "full");
    var livesStein02 = new createjs.Sprite(steinSpriteSheet, "full");
    var livesStein03 = new createjs.Sprite(steinSpriteSheet, "full");
    livesStein01.y = 58;
    livesStein01.x = 663;
    livesStein01.scaleX = 0.75;
    livesStein01.scaleY = 0.5;
    livesStein02.y = 58;
    livesStein02.x = 693;
    livesStein02.scaleX = 0.75;
    livesStein02.scaleY = 0.5;
    livesStein03.y = 58;
    livesStein03.x = 723;
    livesStein03.scaleX = 0.75;
    livesStein03.scaleY = 0.5;

    var gameOverSpriteSheet = new createjs.SpriteSheet(gameOverData);
    var gameOver = new createjs.Sprite(gameOverSpriteSheet, "show");
    gameOver.x = 23;
    gameOver.scaleX = .9525;

    var backgroundSpriteSheet = new createjs.SpriteSheet(backgroundData);
    var background = new createjs.Sprite(backgroundSpriteSheet, "show");

    var levelWonSpriteSheet = new createjs.SpriteSheet(levelWonData);
    var levelWon = new createjs.Sprite(levelWonSpriteSheet, "show");
    levelWon.scaleX = .9525;

    var lifeLostSpriteSheet = new createjs.SpriteSheet(lifeLostData);
    var lifeLost = new createjs.Sprite(lifeLostSpriteSheet, "show");
    lifeLost.x = 23;
    lifeLost.scaleX = .9525;

    var spriteSheet = new createjs.SpriteSheet(data);
    var player = new createjs.Sprite(spriteSheet, "idle");
    player.scaleX = 1;
    player.scaleY = 1;
    player.x = bars[0].startPosX;
    player.y = bars[0].startPosY;
    stage.addChild(background);
    stage.addChild(player);

    player.gotoAndPlay("idle");
    createCustomers();
    customerGenerator = setInterval(() => { createCustomers(); stage.setChildIndex(player, stage.getNumChildren()-1);}, difficulty);

    const restartIdle = (e) => {
      if (e.keyCode === 37 || e.keyCode === 39) {
        player.gotoAndPlay("idle");
        player.scaleX = bars[barIndex].scale;
        player.regX = 0;
        animate = null;
      } else if (e.keyCode === 32) { //&& steinIsFull) {
        animate = null;
        player.gotoAndPlay("serve");
        newFullStein = createStein("full");
        newFullStein.x = bars[barIndex].startPosX;
        newFullStein.y = bars[barIndex].startPosY + 50;
        newFullStein.xLimit = bars[barIndex].posXLimits[0];
        newFullStein.tween = createjs.Tween.get(newFullStein, { loop: false })
          .to({ x: bars[barIndex].posXLimits[0] }, ((bars[barIndex].posXLimits[1] - bars[barIndex].posXLimits[0]) * 2.5), createjs.Ease.getPowInOut(1)); //.to({ alpha: 0, x: bars[barIndex].posXLimits[0] - 25 }, 100)
          fullSteins.push(newFullStein);
        idleTimeout = setTimeout(() => {if (player.rotation !== -90) {player.gotoAndPlay("idle");}}, 300);
        stage.addChild(newFullStein);
        stage.setChildIndex(player, stage.getNumChildren()-1);
        timeouts.push(idleTimeout);
      }
    };

  var idleTimeout = null;
  var animate = null;
  var barIndex = null;

  const movePlayer = e => {
    switch(player.y) {
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
        player.scaleX = bars[barIndex].scale;
        player.gotoAndPlay("run");
      }
      if (player.x > bars[barIndex].posXLimits[0]) {
        player.x -= 25;
      }
    } else if (e.keyCode === 39) {
      clearTimeout(idleTimeout);
      if (!animate) {
        animate = true;
        player.scaleX = -(bars[barIndex].scale);
        player.regX = 150;
        player.gotoAndPlay("run");
      }
      if (player.x < bars[barIndex].posXLimits[1]) {
        player.x += 25;
      }
    } else if (e.keyCode === 38) {
      if (barIndex === 3) {
        barIndex = 0;
      } else {
        barIndex += 1;
      }
        player.x = bars[barIndex].startPosX;
        player.y = bars[barIndex].startPosY;
        player.scaleX = bars[barIndex].scale;
        player.scaleY = bars[barIndex].scale;
      }
    else if (e.keyCode === 40) {
      if (barIndex === 0) {
        barIndex = 3;
      } else {
        barIndex -= 1;
      }
      player.x = bars[barIndex].startPosX;
      player.y = bars[barIndex].startPosY;
      player.scaleX = bars[barIndex].scale;
      player.scaleY = bars[barIndex].scale;
      }
    else if (e.keyCode === 32) {
      clearTimeout(idleTimeout);
      if (!animate) {
        animate = true;
        player.x = bars[barIndex].startPosX + 30;
        player.y = bars[barIndex].startPosY;
        player.scaleX = bars[barIndex].scale;
        player.scaleY = bars[barIndex].scale;
        player.gotoAndPlay("fill");
      }
    }
  };

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stage);
  document.body.addEventListener('keydown', movePlayer);
  document.body.addEventListener('keyup', restartIdle);
};
