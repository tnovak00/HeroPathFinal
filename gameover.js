gameover = {
	create: function(){
        var style = { font: "25px Verdana", fill: "#FFFF00", align: "center" };
        var text = game.add.text(0, 0, "GAME OVER", style);
        game.battle.stop();
    }
}