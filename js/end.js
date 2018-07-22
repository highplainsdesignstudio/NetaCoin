NetaCoin.End = function(game) {};

NetaCoin.End.prototype = {
  create: function() {
    // Keep the background showing.
    this.add.image(0, 0, 'background');
    audio.stop();
    audio = this.add.audio('end');
    audio.play();

    // Reset Global variables.
    var localCount = coinCount;
    coinCount = 0;
    redCoinCount = 0;
    netSpeed = 300;

    var gameOverText = this.add.text(game.world.centerX, game.world.centerY - 150, "GAME OVER");
    gameOverText.anchor.setTo(.5, .5);
    gameOverText.font = "Press Start 2P";
    gameOverText.fontSize = 32;

    var gameOverScore = this.add.text(game.world.centerX, game.world.centerY + 50, 
      "You netted " + localCount + " coins! Double Click to play again.");
    gameOverScore.anchor.setTo(.5, .5);
    gameOverScore.font = "Press Start 2P";
    gameOverScore.fontSize = 24;
    gameOverScore.width = 500;
    gameOverScore.wordWrap = true;
    gameOverScore.wordWrapWidth = 500;
    console.log(gameOverScore);

    this.game.input.onTap.add(function(pointer, dbl) {
      if(dbl) {
        game.state.start('menu');
      }
    });

  } // end create()

};