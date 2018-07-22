NetaCoin.Play = function (game) {};

var coinCount = 0;
var coinCountHUD;
var netSpeed = 300;
var redCoinCount = 0;

NetaCoin.Play.prototype = {
  preload: function () {
    //* Determine the difficulty mode of the game.
    switch (mode) {
      case "Easy":
        this.difficulty = 1;
        break;
      case "Medium":
        this.difficulty = 2;
        break;
      case "Hard":
        this.difficulty = 3;
        break;
      default:
        this.difficulty = 1;
    }
  }, // end preload()

  create: function () {
    var diff = this.difficulty;
    //* Background image.
    this.add.image(0, 0, 'background');

    this.makeHUD();

    //* A net.
    this.net = this.add.sprite(300, 600, 'net', 'Net 0.aseprite');
    this.net.anchor.setTo(.5, .5);
    // netAnim = this.net.animations.add('catch', null, 2, true, false);
    // netAnim.play();
    this.physics.enable(this.net);

    //* A coin group.
    this.coinGroup = this.add.group();
    this.coinGroup.enableBody = true;
    this.createCoins(diff);

  }, // end create()

  update: function () {
    //* Update coinCountHUD text as coins are caught.
    coinCountHUD.text = "Coins: " + coinCount;

    //* Move the net to the pointer. 
    if (this.net.y >= (100 * this.difficulty)) {
      this.physics.arcade.moveToPointer(this.net, netSpeed);
    } else {
      this.physics.arcade.moveToXY(this.net, this.net.x, 800, 60);
    }

    // Check for collision between net and coinGroup.
    this.physics.arcade.overlap(this.net, this.coinGroup, function (net, coin) {
      var rand = Math.random() * (3-1) + 1;
      rand = Math.round(rand);
      var sfx = this.add.audio('coin' + rand);
      sfx.play();
      // netAnim.play();
      console.log(coin.tint);
      switch(coin.tint) {
        case 0xff0000: 
          redCoinCount++;
          break;
        case 0xffff00:
          coinCount++;
        break;
        case 0x0000ff:
          netSpeed += 5;
      }
      coin.kill();
    }, function (net, coin) {
      // determines how close the coin and net centers should be for a catch.
      if ((net.centerX - coin.centerX >= -60/this.difficulty) && (net.centerX - coin.centerX <= 60/this.difficulty) &&
        (net.centerY - coin.centerY >= -60/this.difficulty) && (net.centerY - coin.centerY <= 60/this.difficulty)) {
        return true;
      }
      return false;
      // }
    }, this);

    //* Check for lose scenario. This is based on how many red coins are collected.
    if (redCoinCount >= 1) {
      console.log("End game");
      this.state.start('end');
    }

  }, // end update()

  makeHUD: function() {
    //* Create the HUD.
    coinCountHUD = this.add.text(50, 50, "Coins: " + coinCount);
    coinCountHUD.font = "Press Start 2P";
    coinCountHUD.fontSize = 16;

  }, // end makeHUD()

  createCoins: function (diff) {
    //* Count to 10 and create coins in a group.
    //* Initially, the coins are equally spaced throughout the top.
    for (let i = 1; i <= 10; i++) {
      this.coinGroup.create((i * 60) - 15, 10, 'coin');
    }
    //* For each of the coins in the group, add the necessary attributes.
    //* It should determine what kind of coin it should be FIRST, 
    //* then it should create the attributes for it. 
    this.coinGroup.forEach(function (coin) {
      coin.anchor.setTo(.5, .5);
      coin.autoCull = true;
      coin.body.gravity.y = Math.random() * (diff * 100);
      coin.events.onKilled.add(function (coin) {
        // should then reset the sprite
        coin.reset(Math.random() * (590 - 10) + 10, 10);
        NetaCoin.Play.prototype.determineCoinType(coin, diff);
      });
      coin.outOfCameraBoundsKill = true;
      coin.scale.setTo(3 / diff, 3 / diff);
      coin.setScaleMinMax(1, 1, 2.5, 2.5);

      var spin = coin.animations.add('spin', null, 30, true);
      spin.play();

      NetaCoin.Play.prototype.determineCoinType(coin, diff);
    });
  }, // end createCoins()

  determineCoinType: function (coin, diff) {
    var coinType = Math.random();
    console.log(coinType);
    console.log(diff);
    if (coinType < (.1 * diff + (coinCount*.0025))) {
      NetaCoin.Play.prototype.createRedCoin(coin);
    } else if (coinType >= (.1 * diff + (coinCount*.0025)) && coinType < .5) {
      NetaCoin.Play.prototype.createSpeedCoin(coin);
    }
    else {
      NetaCoin.Play.prototype.createMoneyCoin(coin);
    }
  }, // end determineCoinType()

  createRedCoin: function (coin) {
    console.log("Created a red coin!");
    coin.tint = 0xff0000;
    //* Coin animation.  
  }, // end createRedCoin()

  createSpeedCoin: function (coin) {
    console.log("Created a speed coin!");
    coin.tint = 0x0000ff;
  }, // end createSpeedCoin()

  createMoneyCoin: function (coin) {
    console.log("Created a money coin!");
    coin.tint = 0xffff00;
  }, // end createMoneyCoin()

  net: null,
  coinGroup: null,
  difficulty: null
};