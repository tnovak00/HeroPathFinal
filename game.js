var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
// game states

game.state.add("Loading", loading);
game.state.add("LevelSelect", levelSelect);
game.state.add("PlayLevel", playLevel);
game.state.add("GameMenu", gameMenu);
game.state.add("Level1-2", level12);
game.state.add("Level2", level2);
game.state.add("Level2-2", level22);
game.state.add("Level3", level3);
game.state.add("Level3-2", level32);
game.state.add("Level4", playLevel4);
game.state.add("GoodEnd", goodend);
game.state.add("Controls", controls);
game.state.add("GameOver", gameover);

// we'll start loading
game.state.start("Loading");