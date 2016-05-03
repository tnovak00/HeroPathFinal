controls = {
    create: function(){
        bg = game.add.image(0, 0, 'controlsBG');
		var playButton = this.game.add.button(380,550,"backMenu",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
        //going to menu state
		this.game.state.start("GameMenu");
	}
}