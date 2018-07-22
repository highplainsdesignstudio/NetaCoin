


NetaCoin.Splash = function(game) {};

NetaCoin.Splash.prototype = {

	create: function() {
    var audio = this.add.audio('thunder', 1);
    audio.play();
    var splash = this.add.sprite(this.world.centerX, this.world.centerY, 
			'splash','hpds_splash_screen0.png');
    splash.anchor.set(.5, .5);
    var anim = splash.animations.add('ripple', null, 15, true);
    anim.play();
    this.time.events.add(Phaser.Timer.SECOND * 2.5, this.fadeout, this, splash);
    this.time.events.add(Phaser.Timer.SECOND * 4.8, this.menu, this);
  },
  
  fadeout: function(splash) {
    this.add.tween(splash).to({alpha:0}, 2000, Phaser.Easing.Linear.None, true);
  },
  
  menu: function() {
    this.state.start('menu');
  }
    
};
