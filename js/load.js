NetaCoin.Load = function(game) {};

NetaCoin.Load.prototype = {
  preload: function() {
    // Load audio
    this.load.audio('thunder', '/assets/system/hpds_splash.mp3');
    this.load.audio('coin1', '/assets/audio/coin1.wav');
    this.load.audio('coin2', '/assets/audio/coin2.wav');
    this.load.audio('coin3', '/assets/audio/coin3.wav');
    this.load.audio('music', '/assets/audio/Rainy_Day_Games.mp3');
    this.load.audio('end', '/assets/audio/Stomach_Thumps.mp3');

    // Load Atlases.
    this.load.atlas('splash', '/assets/system/hpds_splash.png', '/assets/system/hpds_splash.json');

    // Load JSON hashes.
    this.load.atlasJSONHash('net', '/assets/images/Net.png', '/assets/images/Net.json');
    this.load.atlasJSONHash('coin', '/assets/images/coin.png', '/assets/images/coin.json');

    // Load images
    this.load.image('background', '/assets/images/gradient_BG.png');
  },

  create: function() {
    this.state.start('splash');
    // this.state.start('menu');
  }
};
