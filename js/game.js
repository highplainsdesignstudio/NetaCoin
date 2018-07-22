// Create the Phaser game object
var game = new Phaser.Game(600, 800, Phaser.AUTO);

/* Load Google Web Fonts. */
WebFont.load({
  google: {
    families: ['Press Start 2P']
  }
});

game.state.add('boot', NetaCoin.Boot);
game.state.add('load', NetaCoin.Load);
game.state.add('splash', NetaCoin.Splash);
game.state.add('menu', NetaCoin.Menu);
game.state.add('play', NetaCoin.Play);
game.state.add('end', NetaCoin.End);
game.state.start('boot');
