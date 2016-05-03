var map;
var layer;
var endDoor2;
var chest2A;
var chest2AOpened = false;
var chest2B;
var chest2BOpened = false;
var chest2C;
var chest2COpened = false;
var chest2D;
var chest2DOpened = false;
var chest2E;
var chest2EOpened = false;
var goblins;
var goblinsA;
var birds;
var wow;
var spears;
var fireRate = 1000;
var nextFire = 0;
var gobA1;
var gobA2;
var gobA3;
var gobA4;

//Music
var clouds;

level2 = {
  	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
        bg = this.game.add.tileSprite(0, 0, 4900, 1024, 'clouds');
        game.world.setBounds(0, 0, 4900, 1024);
        
        //Sounds and music
        game.clouds = game.add.audio('clouds');
        game.clouds.loop = true;
        game.clouds.play();
        game.jump = game.add.audio('jump');
        game.ouch = game.add.audio('ouch');
        game.ouch.volume = .30;
        game.swingsword = game.add.audio('swingsword');
        game.swordhit = game.add.audio('swordhit');
        game.treasure = game.add.audio('treasure');
        
        for (var i = 0; i < 20; i++) {
            var x = game.rnd.integerInRange(0, 4900)
            var y = game.rnd.integerInRange(0, 1024)
            game.add.image(x, y, 'cloud1');
        }
        for (var i = 0; i < 20; i++) {
            var x = game.rnd.integerInRange(0, 4900)
            var y = game.rnd.integerInRange(0, 1024)
            game.add.image(x, y, 'cloud2');
        }
        for (var i = 0; i < 20; i++) {
            var x = game.rnd.integerInRange(0, 4900)
            var y = game.rnd.integerInRange(0, 1024)
            game.add.image(x, y, 'cloud3');
        }
        for (var i = 0; i < 20; i++) {
            var x = game.rnd.integerInRange(0, 4900)
            var y = game.rnd.integerInRange(0, 1024)
            game.add.image(x, y, 'cloud4');
        }
        
        //Map and collisions
        map = game.add.tilemap('level2');
        map.addTilesetImage('ruinsSet', 'ruinsSet');
        layer = map.createLayer('Tile Layer 1');
        map.setCollisionBetween(1, 2000);
        
        endDoor2 = game.add.sprite(4610, 200, 'door');
        endDoor2.scale.setTo(.5, .5);
        game.physics.enable(endDoor2, Phaser.Physics.ARCADE);
        
        h1 = game.add.sprite(10, 450, 'heart');
        h1.scale.setTo(2, 2);
        healthBoard = this.game.add.text(21, 462, "", {font: "bold 24px Arial", fill: "#000"});
        
        h1.fixedToCamera = true;
        h1.cameraOffset.setTo(0, 0)
        healthBoard.fixedToCamera = true;
        healthBoard.cameraOffset.setTo(11, 12)
        
        //Adding player
        player = game.add.sprite(70, 100, "player");
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.scale.setTo(.15, .15);
        player.body.collideWorldBounds = false;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;
        player.anchor.setTo(.5, .5);
        game.camera.follow(player);
        player.body.setSize(100, 280, -8, 0);
        
        player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7], 6, true);
        player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15, 16], 11, true);
        
        //Enemies - Goblins
        goblins = game.add.group();
        goblins.enableBody = true;
        goblins.physicsBodyType = Phaser.Physics.ARCADE;
        var gob1 = goblins.create(500, 200, 'goblin');
        gob1.scale.setTo(.75)
        gob1.body.velocity.x = -50;
        gob1.anchor.setTo(.5, .5);
        var gob2 = goblins.create(800, 600, 'goblin');
        gob2.body.velocity.x = -50;
        gob2.anchor.setTo(.5, .5);
        gob2.scale.setTo(.75)
        var gob3 = goblins.create(1500, 300, 'goblin');
        gob3.body.velocity.x = -50;
        gob3.anchor.setTo(.5, .5);
        gob3.scale.setTo(.75)
        var gob4 = goblins.create(2710, 400, 'goblin');
        gob4.body.velocity.x = -50;
        gob4.anchor.setTo(.5, .5);
        gob4.scale.setTo(.75)
        
        goblins.setAll('body.gravity.y', 1000);
        goblins.setAll('body.maxVelocity.y', 500);
        goblins.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 3, 4, 5], 5, true);
        
        gob1.animations.play("walk");
        gob2.animations.play("walk");
        gob3.animations.play("walk");
        gob4.animations.play("walk");
       
        gobCol = game.add.group();
        gobCol.enableBody = true;
        gobCol.physicsBodyType = Phaser.Physics.ARCADE;
        
        var col = gobCol.create(390, 300, 'icon');
        col.scale.setTo(.5, .5);
        var col = gobCol.create(570, 300, 'icon');
        col.scale.setTo(.5, .5);
        var col = gobCol.create(700, 700, 'icon');
        col.scale.setTo(.5, .5);
        var col = gobCol.create(910, 700, 'icon');
        col.scale.setTo(.5, .5);
        var col = gobCol.create(1420, 380, 'icon');
        col.scale.setTo(.5, .5);
        var col = gobCol.create(1670, 380, 'icon');
        col.scale.setTo(.5, .5);
        var col = gobCol.create(2620, 480, 'icon');
        col.scale.setTo(.5, .5);
        var col = gobCol.create(2980, 480, 'icon');
        col.scale.setTo(.5, .5);
        
        gobCol.setAll('body.immovable', true);
        gobCol.setAll('body.moves', false);
        
        //Enemies - Armored Goblins
        goblinsA = game.add.group();
//        goblinsA.enableBody = true;
//        goblinsA.physicsBodyType = Phaser.Physics.ARCADE;
//        gobA1 = goblinsA.create(200, 410, 'goblinA');
//        gobA1.scale.x = -1;
//        gobA2 = goblinsA.create(1000, 300, 'goblinA');
//        gobA2.scale.x = -1;
//        gobA3 = goblinsA.create(2370, 100, 'goblinA');
//        gobA4 = goblinsA.create(3350, 100, 'goblinA');
//        
//        goblinsA.setAll('body.gravity.y', 1000);
//        
//        spears = game.add.group();
//        spears.enableBody = true;
//        spears.physicsBodyType = Phaser.Physics.ARCADE;
//        
//        for (var i = 0; i < 20; i++) {
//        var b = spears.create(0, 0, 'spear');
//        b.name = 'bullet' + i;
//        b.exists = false;
//        b.visible = false;
//        b.checkWorldBounds = true;
//        b.events.onOutOfBounds.add(this.resetSpear, this);
//        }
        
        //Enemies - Birds
        birds = game.add.group();
        birds.enableBody = true;
        birds.physicsBodyType = Phaser.Physics.ARCADE;
        
        cursors = game.input.keyboard.createCursorKeys();
        attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        chest2A = game.add.sprite(74, 507, 'chest');
        chest2B = game.add.sprite(780, 383, 'chest');
        chest2C = game.add.sprite(1930, 62, 'chest');
        chest2D = game.add.sprite(1985, 315, 'chest');
        chest2E = game.add.sprite(3515, 315, 'chest');
        game.physics.enable(chest2A, Phaser.Physics.ARCADE);
        chest2A.animations.add('open', [0, 1, 2, 3], 10, true);
        game.physics.enable(chest2B, Phaser.Physics.ARCADE);
        chest2B.animations.add('open', [0, 1, 2, 3], 10, true);
        game.physics.enable(chest2C, Phaser.Physics.ARCADE);
        chest2C.animations.add('open', [0, 1, 2, 3], 10, true);
        game.physics.enable(chest2D, Phaser.Physics.ARCADE);
        chest2D.animations.add('open', [0, 1, 2, 3], 10, true);
        game.physics.enable(chest2E, Phaser.Physics.ARCADE);
        chest2E.animations.add('open', [0, 1, 2, 3], 10, true);
        
        game.time.events.repeat(Phaser.Timer.SECOND * 4, 100, this.generateBirds, this);
        
        
	},
    
    update: function(){
        
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(goblins, layer);
        game.physics.arcade.collide(goblinsA, layer);
        
        //Chests
        game.physics.arcade.overlap(player, chest2A, this.openChestA, null, this);
        game.physics.arcade.overlap(player, chest2B, this.openChestB, null, this);
        game.physics.arcade.overlap(player, chest2C, this.openChestC, null, this);
        game.physics.arcade.overlap(player, chest2D, this.openChestD, null, this);
        game.physics.arcade.overlap(player, chest2E, this.openChestE, null, this);
        
        game.physics.arcade.overlap(goblins, gobCol, this.enemyPath, null, this);
        game.physics.arcade.overlap(player, goblins, this.enemyHit, null, this);
        game.physics.arcade.overlap(player, birds, this.birdHit, null, this);
        game.physics.arcade.overlap(player, endDoor2, this.bossFight, null, this);
        
        healthBoard.text = health;
        
        if (player.position.y > 1024) {
            player.position.x = 70;
            player.position.y = 100;
        }
        
        
        if (health <= 0) {
            health = 100;
            game.clouds.stop();
            chest2AOpened = false;
            chest2BOpened = false;
            chest2COpened = false;
            chest2DOpened = false;
            chest2EOpened = false;
            game.state.start(game.state.current);
        }
        
        if (attack.isDown && player.scale.x == .15) {
            player.body.setSize(100, 280, 18, 0);
        }
        if (attack.isDown && player.scale.x == -.15) {
            player.body.setSize(100, 280, -8, 0);
        }
        
        player.body.velocity.x = 0
        
        //Armored goblins
//        if (game.physics.arcade.distanceBetween(gobA1, player) < 100) {
//            this.fireSpear(gobA1.position.x, gobA1.position.y, 'right');
//        }
//        if (game.physics.arcade.distanceBetween(gobA2, player) < 300) {
//            this.fireSpear(gobA2.position.x, gobA2.position.y, 'right');
//        }
//        if (game.physics.arcade.distanceBetween(gobA3, player) < 300) {
//            this.fireSpear(gobA3.position.x, gobA3.position.y, 'left');
//        }
//        if (game.physics.arcade.distanceBetween(gobA4, player) < 300) {
//            this.fireSpear(gobA4.position.x, gobA4.position.y, 'left');
//        }
        
       // Player movement
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
       this.game.state.start("Level2-2");
    },
    
    fireSpear: function(x, y, facing) {
        if (game.time.now > nextFire) {
            spear = spears.getFirstExists(false);
        
            if (spear) {
            spear.reset(x, y + 30);
            if (facing == 'right') {
               spear.body.velocity.x = 200; 
            } else {
               spear.body.velocity.x = -200;
            }
         nextFire = game.time.now + 1800;
            }
        }
    },
    
    enemyHit: function(player, enemy) {
        if (attacking == false) {
            health = health - 2
            game.ouch.play();
        } else {
            game.swordhit.play();
            enemy.kill();
        }
    },
    
    birdHit: function(player, bird) {
        if (attacking == false) {
            health = health - 2
            game.ouch.play();
        } else {
            game.swordhit.play();
            bird.kill();
        }
    },
    
    enemyPath: function(enemy, c) {
        enemy.body.velocity.x *= -1;
        enemy.scale.x *= -1
    },
    
    
    openChestA: function() {
         if (chest2AOpened == false) {
            game.treasure.play();
            chest2A.animations.play('open', 7, false);
            chest2AOpened = true;
            potions++;
            
            wow = game.add.sprite(100, 600, 'potionGet');
            wow.fixedToCamera = true;
            wow.cameraOffset.setTo(200, 200)
            wow.animations.add('spin', [0, 1, 2], 10, true);
            wow.animations.play('spin');
            
            game.time.events.add(Phaser.Timer.SECOND * 4, this.killWow, this);
        }
    },
    
    openChestB: function() {
        if (chest2BOpened == false) {
            game.treasure.play();
            chest2B.animations.play('open', 7, false);
            chest2BOpened = true;
            p1 = true;
            
            if (p2 == true) {
                p1 = false;
                p2 = false;
                message = true;
            }
            
            wow = game.add.sprite(100, 600, 'p1Get');
            wow.fixedToCamera = true;
            wow.cameraOffset.setTo(200, 200)
            wow.animations.add('spin', [0, 1, 2], 10, true);
            wow.animations.play('spin');
            
            game.time.events.add(Phaser.Timer.SECOND * 4, this.killWow, this);
        }
    },
    
    openChestC: function() {
        if (chest2COpened == false) {
            game.treasure.play();
            chest2C.animations.play('open', 7, false);
            chest2COpened = true;
            potions++;
            
            wow = game.add.sprite(100, 600, 'potionGet');
            wow.fixedToCamera = true;
            wow.cameraOffset.setTo(200, 200)
            wow.animations.add('spin', [0, 1, 2], 10, true);
            wow.animations.play('spin');
            
            game.time.events.add(Phaser.Timer.SECOND * 4, this.killWow, this);
        }
    },
    
    openChestD: function() {
        if (chest2DOpened == false) {
            game.treasure.play();
            chest2D.animations.play('open', 7, false);
            chest2DOpened = true;
            p2 = true;
            
            if (p1 == true) {
                p1 = false;
                p2 = false;
                message = true;
            }
            
            wow = game.add.sprite(100, 600, 'p2Get');
            wow.fixedToCamera = true;
            wow.cameraOffset.setTo(200, 200)
            wow.animations.add('spin', [0, 1, 2], 10, true);
            wow.animations.play('spin');
            
            game.time.events.add(Phaser.Timer.SECOND * 4, this.killWow, this);
        }
    },
    
    openChestE: function() {
        if (chest2EOpened == false) {
            game.treasure.play();
            chest2EOpened = true;
            chest2E.animations.play('open', 7, false);
            potions++;
            
            wow = game.add.sprite(100, 600, 'potionGet');
            wow.fixedToCamera = true;
            wow.cameraOffset.setTo(200, 200)
            wow.animations.add('spin', [0, 1, 2], 10, true);
            wow.animations.play('spin');
            
            game.time.events.add(Phaser.Timer.SECOND * 4, this.killWow, this);
        }
    },
    
    generateBirds: function() {
    
        var y = this.game.rnd.integerInRange(150, 800);
        
        var b = birds.create(player.position.x + 500, y, 'bird');
        b.animations.add('fly', [0, 1, 2], 10, true);
        b.animations.play('fly');
        b.lifespan = 10000
        b.body.velocity.x = -300;
        b.body.immovable = true;
        b.anchor.setTo(.5, .5);
    },
    
    killWow: function() {
        wow.kill();
    },
    
    resetSpear: function(spear) {

        spear.kill();
    }

}  