var map;
var cursors;
var player;
var jumptimer = 0;
var attack;
var attacking = false;
var spikes;
var endDoor;
var skeletons;
var skelCol;
var h1;
var healthBoard;
var bats;
var chest1;
var chest1Opened = false;
var wow;
var layer;
var lavas;
var fireballups;
var fireballcount=0;

// SOUNDS
var castle;
var jump;
var ouch;
var swingsword;
var swordhit;
var treasure;
var volcanic

playLevel4 = {
  	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
      //  bg = this.game.add.tileSprite(0, 0, 3168, 1024, 'bg');
        game.world.setBounds(0, 0, 3168, 1024);
        
        //Sounds and music
       
        game.jump = game.add.audio('jump');
        game.ouch = game.add.audio('ouch');
		game.volcanic=game.add.audio('volcanic');
        game.ouch.volume = .30;

        
        game.volcanic.play();
        
        //Map and collisions
		bg=game.add.tileSprite(0,0,3168,1024,'lavawaterfall');
          	
        map = game.add.tilemap('level4',32,32);
        map.addTilesetImage('castle');
		map.addTilesetImage('volcano2');
        layer = map.createLayer('Tile Layer 1');
		map.setCollisionBetween(1,2000,true,layer);
		
		layer.resizeWorld();
		endDoor = game.add.sprite(2590, 290, 'icon');
        endDoor.scale.setTo(.5, 1);
        game.physics.enable(endDoor, Phaser.Physics.ARCADE);
			
		lavas = game.add.group();
        lavas.enableBody = true;
        lavas.physicsBodyType = Phaser.Physics.ARCADE;
        
        var lava = lavas.create(704,600, 'icon');
		 var lava = lavas.create(736,600, 'icon');
		 var lava = lavas.create(768,600, 'icon');
		 var lava = lavas.create(800,600, 'icon');
         var lava = lavas.create(832,600, 'icon');
		 var lava = lavas.create(864,600, 'icon');
		for(var i=0; i<49; i++)
			{
			var x =i*32 +1376;
			lava = lavas.create(x,600, 'icon');
			}
		
		h1 = game.add.sprite(10, 450, 'heart');
        h1.scale.setTo(2, 2);
        healthBoard = this.game.add.text(21, 462, "", {font: "bold 24px Arial", fill: "#000"});
        
        h1.fixedToCamera = true;
        h1.cameraOffset.setTo(0, 0)
        healthBoard.fixedToCamera = true;
        healthBoard.cameraOffset.setTo(11, 12);
		player = game.add.sprite(70, 100, "player");
        game.physics.arcade.enable(player);
        player.scale.setTo(.15, .15);
        player.body.collideWorldBounds = false;
        player.body.gravity.y = 700;
        player.body.maxVelocity.y = 500;
        player.anchor.setTo(.5, .5);
        game.camera.follow(player);
        player.body.setSize(100, 280, -8, 0);
        
        player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7], 6, true);
        player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15, 16], 11, true);
		
	//	fireballup.animation.add('fire',[0,1,2,3,4,5,6,7],4,true);
		
		fireballups = game.add.group();
        fireballups.enableBody = true;
        fireballups.physicsBodyType = Phaser.Physics.ARCADE;
//        var fireball1 = fireballups.create(1568, 610, 'fireballup');
//        fireball1.body.velocity.y = -50;
//        fireball1.anchor.setTo(.5, .5);
//		fireballups.callAll('animations.add', 'animations', 'fire', [0, 1, 2,3,4,5,6,7], 5, true);
//		fireball1.animations.play("fire");
		
		
			game.time.events.loop(Phaser.Timer.SECOND * 4, this.spawnFire, this);
			game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnFire2, this);
		game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnFire3, this);
		game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnFire4, this);
        cursors = game.input.keyboard.createCursorKeys();
        attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function(){
        
        game.physics.arcade.collide(layer, player);
		 game.physics.arcade.overlap(player, endDoor, this.bossFight, null, this);
		game.physics.arcade.overlap(player, lavas, this.lavaHit, null, this);
		game.physics.arcade.overlap(player,fireballups,this.killfire,null,this);
		  healthBoard.text = health;
        
        if (health <= 0) {
            this.game.state.start("LevelSelect");
            health = 100;
        }
        
        if (attack.isDown && player.scale.x == .15) {
            player.body.setSize(100, 280, 18, 0);
        }
        if (attack.isDown && player.scale.x == -.15) {
            player.body.setSize(100, 280, -8, 0);
        }
        
        player.body.velocity.x = 0
        //Player movement
        if (attack.isDown && cursors.right.isDown) {
            player.animations.play('attack');
            player.scale.x = .15;
            player.body.velocity.x = 200;
            attacking = true;
        } else if (attack.isDown && cursors.left.isDown){
            player.body.velocity.x = -200;
            player.scale.x = -.15;
            player.animations.play('attack');
            attacking = true;
        } else if (cursors.right.isDown){
            player.body.velocity.x = 200;
            player.scale.x = .15;
            player.animations.play('walk');
            player.body.setSize(100, 280, -8, 0);
            attacking = false;
        } else if (cursors.left.isDown){
            player.body.velocity.x = -200;
            player.scale.x = -.15;
            player.animations.play('walk');
            player.body.setSize(100, 280, 7, 0);
            attacking = false;
        } else if (attack.isDown) {
            attacking = true;
            player.animations.play('attack');
        } else {
            player.frame = 0;
            player.body.setSize(100, 280, -8, 0);
            attacking = false;
        }
        
        if (cursors.up.isDown && game.time.now > jumptimer) {
            player.body.velocity.y = -400
            game.jump.play();
            jumptimer = game.time.now + 1000;
        }
		
	},
	bossFight: function() {
       level4beat = true;
       game.volcanic.stop();
       this.game.state.start("LevelSelect");
    },
	  lavaHit: function() {
       health=health-1;
        game.ouch.play();
    },
	killfire: function(layer,fireball){
		health=health-2;
		 game.ouch.play();
	},
	spawnFire: function(){
	 var fireball1 = fireballups.create(1568, 610, 'fireballup');
        fireball1.body.velocity.y = -150;
        fireball1.anchor.setTo(.5, .5);
		fireballups.callAll('animations.add', 'animations', 'fire', [0, 1, 2,3,4,5,6,7], 5, true);
		fireball1.animations.play("fire");	
	    fireballcount=fireballcount+1;
	},
	spawnFire2: function(){
	 var fireball1 = fireballups.create(1730, 610, 'fireballup');
        fireball1.body.velocity.y = -150;
        fireball1.anchor.setTo(.5, .5);
		fireballups.callAll('animations.add', 'animations', 'fire', [0, 1, 2,3,4,5,6,7], 5, true);
		fireball1.animations.play("fire");	
	    fireballcount=fireballcount+1;
	},
	spawnFire3: function(){
	 var fireball1 = fireballups.create(1900, 610, 'fireballup');
        fireball1.body.velocity.y = -180;
        fireball1.anchor.setTo(.5, .5);
		fireballups.callAll('animations.add', 'animations', 'fire', [0, 1, 2,3,4,5,6,7], 5, true);
		fireball1.animations.play("fire");	
	    fireballcount=fireballcount+1;
	},
	spawnFire4: function(){
	 var fireball1 = fireballups.create(2020, 610, 'fireballup');
        fireball1.body.velocity.y = -200;
        fireball1.anchor.setTo(.5, .5);
		fireballups.callAll('animations.add', 'animations', 'fire', [0, 1, 2,3,4,5,6,7], 5, true);
		fireball1.animations.play("fire");	
	    fireballcount=fireballcount+1;
	},
	
}