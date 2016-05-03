var player;

loading = {
	preload: function(){
		// preloading various assets
        game.load.image("bg", "assets/bg.jpg");
        game.load.image("title", "assets/title.png")
        game.load.image("spikes", "assets/spikes.png");
        game.load.image("map", "assets/map_bg.png");
        game.load.image("icon", "assets/icon.png");
        game.load.image("menuBG", "assets/cloudy_bg.jpg");
        game.load.image("libraryBG", "assets/libraryBG.jpg")
        game.load.image("athenaBG", "assets/athenaBG.jpg")
        game.load.image("controlsBG", "assets/cloudy_controls.jpg");
        game.load.image('heart', 'assets/heart.png');
        
        //MAPS
        game.load.tilemap('level1', 'assets/Maps/level1.csv', null, Phaser.Tilemap.TILED_CSV);
        game.load.image('castle', 'assets/Maps/castle.png');
        game.load.tilemap('level2', 'assets/Maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('ruinsSet', 'assets/Maps/ruinsSet.png');
        game.load.tilemap('level3', 'assets/Maps/level3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('library_tileset', 'assets/Maps/library_tileset.png');
        
        game.load.image('cloud1', 'assets/Maps/cloud1.png');
        game.load.image('cloud2', 'assets/Maps/cloud2.png');
        game.load.image('cloud3', 'assets/Maps/cloud3.png');
        game.load.image('cloud4', 'assets/Maps/cloud4.png');
        game.load.image('door', 'assets/door.png');
        game.load.image('potion', 'assets/Items/potion.png')
        game.load.image('spear', 'assets/spear.png')
        game.load.spritesheet('potionGet', 'assets/Items/potionGet.png', 421, 355)
        game.load.image('p1', 'assets/Items/p1.png')
        game.load.image('p2', 'assets/Items/p2.png')
        game.load.image('message', 'assets/Items/paper.png')
        game.load.spritesheet('p1Get', 'assets/Items/p1Get.png', 421, 355)
        game.load.spritesheet('p2Get', 'assets/Items/p2Get.png', 421, 355)
        game.load.image("play", "assets/play.jpg");
        game.load.image("clouds", "assets/clouds.jpg")
        game.load.image("backMenu", "assets/backMenu.jpg");
        game.load.image("controls", "assets/controls.jpg");
        game.load.image("itemButton", "assets/itemButton.jpg");
        game.load.image("attackButton", "assets/attackButton.jpg");
        game.load.image("talkButton", "assets/talkButton.jpg");
        game.load.image("specialButton", "assets/specialButton.jpg");
        game.load.image("defendButton", "assets/defendButton.png");
        game.load.image("OptionOne", "assets/optionOne.png");
        game.load.image("OptionTwo", "assets/optionTwo.png");
        game.load.image("OptionThree", "assets/optionThree.png");
        game.load.image("OptionFour", "assets/optionFour.png");
        game.load.image("bone", "assets/bone.png");
        game.load.image("cerberus", "assets/cerberus.png");
        game.load.image("hermes", "assets/hermes.png");
        game.load.image("athena", "assets/athena.png");
        game.load.image("sky", "assets/sky.png");
        game.load.image("itemMenu", "assets/itemPopup.jpg");
        game.load.image("specialMenu", "assets/specialPopup.jpg");
        game.load.image("back", "assets/back.png");
        game.load.image('battleBG', 'assets/battleBG.jpg');
        game.load.image('dialogue', 'assets/dialogue.png');
        game.load.image('dialogue2', 'assets/dialogue2.png');
        game.load.image('zeus', 'assets/zeus.png');
        game.load.image('olympus', 'assets/olympus.jpg');
        game.load.spritesheet("wow", "assets/wow.png", 421, 355);
        game.load.spritesheet("player", "assets/rolloED.png", 171, 243);
        game.load.spritesheet("skeleton", "assets/skeleton.png", 34, 46);
        game.load.spritesheet("bat", "assets/bat.png", 32, 32);
        game.load.spritesheet("bird", "assets/bird.png", 40, 48);
        game.load.spritesheet("goblin", "assets/goblin.png", 56, 64);
        game.load.spritesheet("goblinA", "assets/armoredgoblin.png", 56, 67);
        game.load.spritesheet("flyingGoblin", "assets/flying_goblin.png", 114, 83);
        game.load.spritesheet("flyingGoblinProjectile", "assets/flying_goblin_projectile.png", 19, 39);
        game.load.spritesheet("chest", "assets/chest.png", 46, 36);
        
        //LEVEL 4
        game.load.tilemap('level4', 'assets/Maps/level4.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image("lavawaterfall", "assets/lavawaterfall.png");
        game.load.image('volcano2', 'assets/Maps/volcano2.png');
        game.load.spritesheet("fireballup","assets/fireballup.png",63,52);
        game.load.audio('volcanic', "assets/Sound/volcano.mp3");
        
        // MUSIC
        
        game.load.audio("battle", "assets/Sound/battle.mp3");
        game.load.audio("olympus", "assets/Sound/olympus.mp3");
        game.load.audio("hermesOw", "assets/Sound/hermesOw.wav");
        game.load.audio("cerberusAttack", "assets/Sound/cerberusAttack.mp3");
        game.load.audio("clouds", "assets/Sound/clouds.mp3");
        game.load.audio("hermesBattle", "assets/Sound/boss.mp3");
        game.load.audio("castle", "assets/Sound/castle.mp3");
        game.load.audio("libraryMusic", "assets/Sound/library_music.mp3");
        game.load.audio("dogbite", "assets/Sound/dogbite.mp3");
        game.load.audio("growl", "assets/Sound/growl.mp3");
        game.load.audio("growlbark", "assets/Sound/growlbark.mp3");
        game.load.audio("jump", "assets/Sound/jump.mp3");
        game.load.audio("ouch", "assets/Sound/ouch.mp3");
        game.load.audio("overworld", "assets/Sound/overworld.mp3");
        game.load.audio("swingsword", "assets/Sound/swingsword.mp3");
        game.load.audio("swordhit", "assets/Sound/swordhit.mp3");
        game.load.audio("treasure", "assets/Sound/treasure.wav");
        game.load.audio("win", "assets/Sound/win.mp3");
        game.load.audio("woof", "assets/Sound/woof.mp3");
        game.load.audio("menu", "assets/Sound/menu.wav");
	},
  	create: function(){
  		// going to menu state
		game.state.start("GameMenu");
	}
}     