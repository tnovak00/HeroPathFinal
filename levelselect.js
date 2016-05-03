var test;
var overworld;

levelSelect = {
  	create: function(){
        game.add.image(0, 0, "map");
        game.world.setBounds(0, 0, 4900, 1024);
        
        var icon1 = this.game.add.button(250, 310, "icon", this.playLevel1, this);
        icon1.anchor.setTo(0.5,0.5);
        
        var icon2 = this.game.add.button(540, 270, "icon", this.playLevel2, this);
        icon2.anchor.setTo(0.5,0.5);
        
        var icon3 = this.game.add.button(730, 70, "icon", this.playLevel3, this);
        icon3.anchor.setTo(0.5,0.5);
        
        var icon4 = this.game.add.button(970, 205, "icon", this.playLevel4, this);
        icon4.anchor.setTo(0.5,0.5);
        
        var icon5 = this.game.add.button(1400, 550, "icon", this.playEnding, this);
        icon5.anchor.setTo(0.5,0.5);
        icon5.scale.setTo(2);
        
        //Creating player character
        player = game.add.sprite(70, 400, "player");
        player.scale.setTo(.5, .5);
        game.camera.follow(player);
        
        if (level1beat == true) {
            player.position.x = 210;
            player.position.y = 240;
        } 
        
        if (level2beat == true) {
            player.position.x = 520;
            player.position.y = 200;
        }
        
        if (level3beat == true) {
            player.position.x = 700;
            player.position.y = 0;
        }
        
        if (level4beat == true) {
            player.position.x = 1120;
            player.position.y = 300;
        }
        
        player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15, 16], 11, true);
           
    },
    
    playLevel1: function() {
        //going to Level 1: Spooky Castle
        this.game.state.start("PlayLevel");
    },
    
    playLevel2: function() {
        //going to Level2: Ruins in the Sky
        if (level1beat == true) {
            this.game.state.start("Level2");
        }
    },
    
    playLevel3: function() {
        //going to Level 3: Library
        if (level2beat == true) {
            this.game.state.start("Level3");
        }
    },
    
    playLevel4: function() {
        //going to Level 4: Volcano
        if (level3beat == true) {
            this.game.state.start("Level4");
        }
    },
    
    playEnding: function() {
        //going to ending
        if (level3beat == true) {
            this.game.state.start("GoodEnd");
        }
    }
} 