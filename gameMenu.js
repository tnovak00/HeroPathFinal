
var health = 100;

//item check
var bone = false;
var potions = 0;
var p1 = false;
var p2 = false;
var message = false;

var hermes = false;
var cerberus = false;

var level1beat = false;
var level2beat = false;
var level3beat = false;
var level4beat = false;

gameMenu = {
    create: function(){
        bg = game.add.image(0, 0, 'menuBG');
        game.add.image(0, 0, 'title');
		var playButton = this.game.add.button(380,550,"play",this.playTheGame,this);
        var controlButton = this.game.add.button(100, 300, "controls", this.controls, this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
        //going to level select state
		this.game.state.start("LevelSelect");
	},
    controls: function(){
        //going to control display state
		this.game.state.start("Controls");
	}
}