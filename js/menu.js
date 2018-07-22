NetaCoin.Menu = function(game) {};
var mode;
var audio;
NetaCoin.Menu.prototype = {
  create: function() {
    // Background image and flair images.
    this.add.image(0, 0, 'background');
    var net = this.add.sprite(game.world.centerX - 50, game.world.centerY + 50, 'net');
    var anim = net.animations.add('swing', null, 30, true);
    anim.play();
    
    // Turn on audio.
    audio = this.add.audio('music', 1, true);
    audio.play();

    // Title Text
    var title = this.add.text(300, 200, "Neta Coin");
    title.font = "Press Start 2P";
    title.fontSize = 32;
    title.anchor.setTo(.5, .5);

    // Easy, medium, or hard text.
    // first, set the default font style in an object


    var easy = this.add.text(300, 350, "Easy", this.defaultStyle);
    easy.anchor.setTo(.5, .5);
    easy.inputEnabled = true;
    easy.events.onInputOver.add(this.over, this);
    easy.events.onInputOut.add(this.out, this);
    easy.events.onInputDown.add(this.down, this);

    var medium = this.add.text(300, 400, "Medium", this.defaultStyle);
    medium.anchor.setTo(.5, .5);
    medium.inputEnabled = true;
    medium.events.onInputOver.add(this.over, this);
    medium.events.onInputOut.add(this.out, this);
    medium.events.onInputDown.add(this.down, this);


    var hard = this.add.text(300, 450, "Hard", this.defaultStyle);
    hard.anchor.setTo(.5, .5);
    hard.inputEnabled = true;
    hard.events.onInputOver.add(this.over, this);
    hard.events.onInputOut.add(this.out, this);
    hard.events.onInputDown.add(this.down, this);
  }, // end create()

  over: function(text) {
    text.setStyle({
      backgroundColor:'yellow',
      font: "Press Start 2P",
      fontSize: 24
    }, true);
  }, // end over()

  out: function(text) {
    text.setStyle(this.defaultStyle, true);
  }, // end out()

  down: function(text) {
    mode = text.text;
    this.state.start('play');
  },
  
  defaultStyle: {
    font: "Press Start 2P",
    fontSize: 24
  }
  
};