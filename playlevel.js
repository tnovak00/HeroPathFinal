var map;
var cursors;
var player;
var jumptimer = 0;
var attacktimer = 0;
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
var chest2;
var chest2Opened = false;
var chest3;
var chest3Opened = false;
var wow;
var facing;

// SOUNDS
var castle;
var jump;
var ouch;
var swingsword;
var swordhit;
var treasure;

playLevel = {
  	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
        bg = this.game.add.tileSprite(0, 0, 3168, 1024, 'bg');
        game.world.setBounds(0, 0, 3168, 1024);
        
        //Sounds and music
        game.castle = game.add.audio('castle');
        game.castle.volume = .15;
        game.jump = game.add.audio('jump');
        game.ouch = game.add.audio('ouch');
        game.ouch.volume = .30;
        game.swingsword = game.add.audio('swingsword');
        game.swordhit = game.add.audio('swordhit');
        game.treasure = game.add.audio('treasure');
        
        game.castle.play();
        
        //Map and collisions
        map = game.add.tilemap('level1', 33, 33);
        map.addTilesetImage('castle');
        layer = map.createLayer(0);
        
        map.setCollisionBetween(38, 39);
        map.setCollision(48)
        map.setCollision(59)
        map.setCollisionBetween(63, 65)
        map.setCollision(60)
        map.setCollision(91)
        map.setCollision(106)
        map.setCollision(75)
        map.setCollisionBetween(53, 54);
        map.setCollisionBetween(44, 46);
        map.setCollisionBetween(32, 34);
        map.setCollisionBetween(56, 57);
        map.setCollisionBetween(94, 95);
        map.setCollisionBetween(311, 313);
        map.setCollisionBetween(342, 344);
        map.setCollision(342);
        map.setCollision(334);
        map.setCollision(319);
        map.setCollision(349);
        map.setCollision(320);
        map.setCollision(346);
        
        endDoor = game.add.sprite(2680, 580, 'icon');
        endDoor.scale.setTo(.5, 1);
        game.physics.enable(endDoor, Phaser.Physics.ARCADE);
        
        h1 = game.add.sprite(10, 450, 'heart');
        h1.scale.setTo(2, 2);
        healthBoard = this.game.add.text(21, 462, "", {font: "bold 24px Arial", fill: "#000"});
        
        h1.fixedToCamera = true;
        h1.cameraOffset.setTo(0, 0)
        healthBoard.fixedToCamera = true;
        healthBoard.cameraOffset.setTo(11, 12)
        
        //Adding player
        player = game.add.sprite(70, 800, "player");
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.scale.setTo(.15, .15);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;
        player.anchor.setTo(.5, .5);
        game.camera.follow(player);
        player.body.setSize(100, 280, -8, 0);
        
        player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15, 16], 11, true);
        
        //Spikes
        spikes = game.add.group();
        spikes.enableBody = true;
        spikes.physicsBodyType = Phaser.Physics.ARCADE;
        
        var spike = spikes.create(730, 1000, 'spikes');
        spike = spikes.create(755, 1000, 'spikes');
        spike = spikes.create(855, 1000, 'spikes');
        spike = spikes.create(880, 1000, 'spikes');
        spike = spikes.create(985, 1000, 'spikes');
        spike = spikes.create(1010, 1000, 'spikes');
        
        //Enemies - Skeletons
        skeletons = game.add.group();
        skeletons.enableBody = true;
        skeletons.physicsBodyType = Phaser.Physics.ARCADE;
        var skel1 = skeletons.create(500, 700, 'skeleton');
        skel1.body.velocity.x = -50;
        skel1.anchor.setTo(.5, .5);
        var skel2 = skeletons.create(500, 400, 'skeleton');
        skel2.body.velocity.x = -50;
        skel2.anchor.setTo(.5, .5);
        var skel3 = skeletons.create(1500, 400, 'skeleton');
        skel3.body.velocity.x = -50;
        skel3.anchor.setTo(.5, .5);
        var skel4 = skeletons.create(2100, 600, 'skeleton');
        skel4.body.velocity.x = -50;
        skel4.anchor.setTo(.5, .5);
        var skel5 = skeletons.create(2400, 800, 'skeleton');
        skel5.body.velocity.x = -50;
        skel5.anchor.setTo(.5, .5);
        
        skeletons.setAll('body.gravity.y', 1000);
        skeletons.setAll('body.maxVelocity.y', 500);
        skeletons.callAll('animations.add', 'animations', 'walk', [0, 1, 2], 5, true);
        
        skel1.animations.play("walk");
        skel2.animations.play("walk");
        skel3.animations.play("walk");
        skel4.animations.play("walk");
        skel5.animations.play("walk");
       
        skelCol = game.add.group();
        skelCol.enableBody = true;
        skelCol.physicsBodyType = Phaser.Physics.ARCADE;
        
        var col = skelCol.create(380, 780, 'icon');
        col.scale.setTo(.5, .5);
        col = skelCol.create(580, 780, 'icon');
        col.scale.setTo(.5, .5);
        col = skelCol.create(580, 540, 'icon');
        col.scale.setTo(.5, .5);
        col = skelCol.create(340, 540, 'icon');
        col.scale.setTo(.5, .5);
        col = skelCol.create(1300, 760, 'icon');
        col.scale.setTo(.5, .5);
        col = skelCol.create(1500, 760, 'icon');
        col.scale.setTo(.5, .5);
        col = skelCol.create(2000, 615, 'icon');
        col.scale.setTo(.5, .5);
        col = skelCol.create(2300, 615, 'icon');
        col.scale.setTo(.5, .5);
        col = skelCol.create(2300, 850, 'icon');
        col.scale.setTo(.5, .5);
        col = skelCol.create(2550, 850, 'icon');
        col.scale.setTo(.5, .5);
        
        skelCol.setAll('body.immovable', true);
        skelCol.setAll('body.moves', false);
        
        //Enemies - Bats
        bats = game.add.group();
        bats.enableBody = true;
        bats.physicsBodyType = Phaser.Physics.ARCADE;
        
        cursors = game.input.keyboard.createCursorKeys();
        attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        chest1 = game.add.sprite(100, 525, 'chest');
        game.physics.enable(chest1, Phaser.Physics.ARCADE);
        chest1.animations.add('open', [0, 1, 2, 3], 10, true);
        
        chest2 = game.add.sprite(1100, 825, 'chest');
        game.physics.enable(chest2, Phaser.Physics.ARCADE);
        chest2.animations.add('open', [0, 1, 2, 3], 10, true);
        
        chest3 = game.add.sprite(1450, 985, 'chest');
        game.physics.enable(chest3, Phaser.Physics.ARCADE);
        chest3.animations.add('open', [0, 1, 2, 3], 10, true);
        
        game.time.events.repeat(Phaser.Timer.SECOND * 1, 100, this.generateBat,this);
	},
    
    update: function(){
        
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(skeletons, layer);
        game.physics.arcade.overlap(player, spikes, this.spikeHit, null, this);
        game.physics.arcade.overlap(player, chest1, this.openChest1, null, this);
        game.physics.arcade.overlap(player, chest2, this.openChest2, null, this);
        game.physics.arcade.overlap(player, chest3, this.openChest3, null, this);
        game.physics.arcade.overlap(skeletons, skelCol, this.skeletonPath, null, this);
        game.physics.arcade.overlap(player, skeletons, this.skelHit, null, this);
        game.physics.arcade.overlap(player, bats, this.batHit, null, this);
        game.physics.arcade.overlap(player, endDoor, this.bossFight, null, this);
        
        healthBoard.text = health;
        
        if (health <= 0) {
            health = 100;
            chest1Opened = false;
            game.castle.stop();
            this.game.state.start(game.state.current);
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
    
    attack: function() {
        if (game.time.now > attacktimer) {
            player.animations.play('attack');
            attacking = true;
            attacktimer = game.time.now + 300;
        }
    },
    
    spikeHit: function() {
        player.position.x = 70;
        player.position.y = 800;
        game.ouch.play();
    },
    
    bossFight: function() {
       this.game.state.start("Level1-2");
    },
    
    skelHit: function(player, skeleton) {
        if (attacking == false) {
            health = health - 2
            game.ouch.play();
        } else {
            game.swordhit.play();
            skeleton.kill();
        }
    },
    
    batHit: function(player, bat) {
        if (attacking == false) {
            health = health - 2
            game.ouch.play();
        } else {
            game.swordhit.play();
            bat.kill();
        }
    },
    
    skeletonPath: function(skeleton, c) {
        skeleton.body.velocity.x *= -1;
        skeleton.scale.x *= -1
    },
    
    generateBat: function() {
        var x = game.rnd.integerInRange(0, 600);
        var y = game.rnd.integerInRange(1, 100);
        
        if (y % 2 == 0) {
            var x1 = this.game.rnd.integerInRange(player.position.x - 500, player.position.x + 600);
            var x2 = this.game.rnd.integerInRange(player.position.x - 500, player.position.x + 600);
             
            var y1 = this.game.rnd.integerInRange(player.position.y - 500, player.position.y + 500);
            var y2 = this.game.rnd.integerInRange(player.position.y - 500, player.position.y + 500);
            bat = bats.create(player.position.x + 800, 800, 'bat'); 
            bat.animations.add('fly', [0, 1, 2], 13, true);
            
            var w = this.game.width - bat.width;
            var h = this.game.height - bat.height;
            
            batTween = this.game.add.tween(bat).to ({ x: [900, x1, x2, -100], y: [x, y1, y2, x]}, 9000, Phaser.Easing.Quadratic.Out, true).interpolation(function(v, k) { return Phaser.Math.bezierInterpolation(v, k);})
            
            bat.animations.play('fly');
            bat.lifespan = 10000;
        }
    },
    
    openChest1: function() {
        if (chest1Opened == false) {
            game.treasure.play();
            chest1.animations.play('open', 7, false);
            chest1Opened = true;
            bone = true;
            
            wow = game.add.sprite(100, 600, 'wow');
            wow.fixedToCamera = true;
            wow.cameraOffset.setTo(200, 200)
            wow.animations.add('spin', [0, 1, 2], 10, true);
            wow.animations.play('spin');
            
            game.time.events.add(Phaser.Timer.SECOND * 4, this.killWow, this);
        }
    },
    
     openChest2: function() {
        if (chest2Opened == false) {
            game.treasure.play();
            chest2.animations.play('open', 7, false);
            chest2Opened = true;
            potions++;
            
            wow = game.add.sprite(100, 600, 'potionGet');
            wow.fixedToCamera = true;
            wow.cameraOffset.setTo(200, 200)
            wow.animations.add('spin', [0, 1, 2], 10, true);
            wow.animations.play('spin');
            
            game.time.events.add(Phaser.Timer.SECOND * 4, this.killWow, this);
        }
    },
    
     openChest3: function() {
        if (chest3Opened == false) {
            game.treasure.play();
            chest3.animations.play('open', 7, false);
            chest3Opened = true;
            potions++;
            
            wow = game.add.sprite(100, 600, 'potionGet');
            wow.fixedToCamera = true;
            wow.cameraOffset.setTo(200, 200)
            wow.animations.add('spin', [0, 1, 2], 10, true);
            wow.animations.play('spin');
            
            game.time.events.add(Phaser.Timer.SECOND * 4, this.killWow, this);
        }
    },
    
    killWow: function() {
        wow.kill();
    }
}  