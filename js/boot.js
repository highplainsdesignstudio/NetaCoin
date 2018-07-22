var NetaCoin = {};

NetaCoin.Boot = function(game) {};

NetaCoin.Boot.prototype = {
  preload: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('load');
  }
};