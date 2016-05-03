var map;
var cursors;
var player;
var jumptimer = 0;
var attack;
var attacking = false;
var spikes;
var endDoor;
var riddleOne;
var riddleTwo;
var riddleThree;
var goblins;
var skelCol;
var goblinJumpForce = 600;
var goblinJumpCDMin = 0.5;
var goblingJUMPCDMax = 2;
var h1;
var healthMax = 100;
var health = healthMax;
var healthBoard;
var bats;
var chest1;
var chest1Opened = false;
var attackCD = 1;
var attackAnimationCD = 0.5;
var attackOnCD = false;
var wow;
var solvingRiddle = false;
var correctRiddles = 0;

// SOUNDS
var library;
var jump;
var ouch;
var swingsword;
var swordhit;
var treasure;

level3 = {
  	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 3168, 1024);
        
        //Sounds and music
        game.library = game.add.audio('libraryMusic');
        game.library.volume = .15;
        game.jump = game.add.audio('jump');
        game.ouch = game.add.audio('ouch');
        game.ouch.volume = .30;
        game.swingsword = game.add.audio('swingsword');
        game.swordhit = game.add.audio('swordhit');
        game.treasure = game.add.audio('treasure');
        
        game.library.play();
        
        //Map and collisions
        map = game.add.tilemap('level3', 32, 32);
        map.addTilesetImage('library_tileset');
        fillLayer = map.createLayer('background_fill');
        backgroundLayer = map.createLayer('background');
        decorLayer = map.createLayer('background_decor');
        platformLayer = map.createLayer('collision_ground');
        
        map.setCollisionBetween(1,19,true,platformLayer);
        
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
        player.body.gravity.y = 700;
        player.body.maxVelocity.y = 500;
        player.anchor.setTo(.5, .5);
        game.camera.follow(player);
        player.body.setSize(100, 280, -8, 0);
        
        player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15, 16], 11, true);
        
        //Enemies - Goblins
        enemyGoblins = [];
        goblinCoords = 
            [[2808, 834],
            [2925, 829],
            [2045, 816],
            [1949, 816],
            [1571, 904],
            [1323, 858],
            [1087, 858],
            [806, 784]];
        
        for(i = 0; i < goblinCoords.length; i++){
            enemyGoblins.push(new Goblin(i, game, player, goblinCoords[i][0], goblinCoords[i][1], this));
            game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(goblinJumpCDMin,goblingJUMPCDMax), this.goblinJump, this, enemyGoblins[i].goblin);
        }
        
        //Enemies - Flying Goblins
        enemyFlyingGoblins = [];
        flyingGoblinCoords = [[700, 700],[2769, 661]];
        
        for(i = 0; i < flyingGoblinCoords.length; i++){
            enemyGoblins.push(new FlyingGoblin(i, game, player, flyingGoblinCoords[i][0], flyingGoblinCoords[i][1], this));
        }
        
        //Boss Door
        //2222, 738
        endDoor = game.add.sprite(2984, 910, 'icon');
        endDoor.scale.setTo(1, 1);
        game.physics.enable(endDoor, Phaser.Physics.ARCADE);
        
        //Riddle Portals
        correctRiddles = 0;
        
        riddleOne = game.add.sprite(1440, 927, 'icon');
        riddleOne.scale.setTo(.5, .5);
        game.physics.enable(riddleOne, Phaser.Physics.ARCADE);
        
        riddleTwo = game.add.sprite(2208, 768, 'icon');
        riddleTwo.scale.setTo(.5, .5);
        game.physics.enable(riddleTwo, Phaser.Physics.ARCADE);
        
        riddleThree = game.add.sprite(2559, 831, 'icon');
        riddleThree.scale.setTo(.5, .5);
        game.physics.enable(riddleThree, Phaser.Physics.ARCADE);
        
        attackOnCD = false;
        attacking = false;
        
        cursors = game.input.keyboard.createCursorKeys();
        attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
    
    update: function(){
        
        game.physics.arcade.collide(player, platformLayer);
        game.physics.arcade.collide(goblins, platformLayer);
        
        if(solvingRiddle){
            player.body.velocity.x = 0;
            
            for(i = 0; i < enemyFlyingGoblins; i++){
                enemyFlyingGoblins[i].goblin.body.velocity.x = 0;
            }
            
            for(i = 0; i < enemyGoblins; i++){
                game.physics.arcade.collide(enemyGoblins[i].goblin, platformLayer);
                enemyGoblins[i].goblin.body.velocity = 0;
            }
            
            return;
        }
        
        game.camera.follow(player);
        
        game.physics.arcade.overlap(player, spikes, this.spikeHit, null, this);
        game.physics.arcade.overlap(player, chest1, this.openChest, null, this);
        game.physics.arcade.overlap(player, bats, this.batHit, null, this);
        game.physics.arcade.overlap(player, endDoor, this.bossFight, null, this);
        if(game.physics.arcade.overlap(player, riddleOne)) this.riddle("one");
        if(game.physics.arcade.overlap(player, riddleTwo)) this.riddle("two");
        if(game.physics.arcade.overlap(player, riddleThree)) this.riddle("three");
        
        for(i = 0; i < enemyGoblins.length; i++){
            enemyGoblins[i].update();
        }
        
        healthBoard.text = health;
        
        if (health <= 0) {
            health = 100;
            chest1Opened = false;
            game.library.stop();
            this.game.state.start(game.state.current);
        }
        
        if (attack.isDown && player.scale.x == .15) {
            player.body.setSize(100, 280, 18, 0);
        }
        if (attack.isDown && player.scale.x == -.15) {
            player.body.setSize(100, 280, -8, 0);
        }
        
        player.body.velocity.x = 0
        
        //Player Movement
        if(!attackOnCD && attack.isDown){
            game.time.events.add(Phaser.Timer.SECOND * attackCD, this.attackCooldown, this);
            game.time.events.add(Phaser.Timer.SECOND * attackAnimationCD, this.attackAnimationCooldown, this);
            attackOnCD = true;
            attacking = true;
            player.animations.play('attack');
            if (cursors.right.isDown) {
                player.scale.x = .15;
                player.body.velocity.x = 200;
            } else if (cursors.left.isDown){
                player.body.velocity.x = -200;
                player.scale.x = -.15;
            }
        }
        else {
            if (cursors.right.isDown){
                player.body.velocity.x = 200;
                player.scale.x = .15;
                if(!attacking){
                    player.animations.play('walk');
                    player.body.setSize(100, 280, -8, 0);
                    attacking = false;
                }
            } else if (cursors.left.isDown) {
                player.body.velocity.x = -200;
                player.scale.x = -.15;
                if(!attacking){
                    player.animations.play('walk');
                    player.body.setSize(100, 280, 7, 0);
                    attacking = false;
                }
            } else {
                
                player.body.setSize(100, 280, -8, 0);
                if(!attacking) {
                    player.frame = 0;
                    attacking = false;
                }
            }
        }
        
        if (cursors.up.isDown && player.body.onFloor()) {
            player.body.velocity.y = -400
            game.jump.play();
        }
    },
    
    bossFight: function() {
       this.game.state.start("Level3-2");
    },
    
    skelHit: function(player, skeleton) {
        if (attacking == false) {
            health -= 2;
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
    
    goblinJump: function(goblin){
        if(goblin.body.onFloor()) {
            goblin.body.velocity.y = -goblinJumpForce;
        }
        game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(goblinJumpCDMin,goblingJUMPCDMax), this.goblinJump, this, goblin);
    },
    
    openChest: function() {
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
    
    killWow: function() {
        wow.kill();
    },
        
    attackCooldown: function() {
        attackOnCD = false;
    },
    
    attackAnimationCooldown: function() {
        attacking = false;
    },
    
    blink: function(sprite) {
        sprite.tint = 0xffffff;
    },
    
    riddle: function(riddleNumber) {
        //Dialogue Boxes
        solvingRiddle = true;
        style = { font: "25px Verdana", fill: "#FFFF00", align: "center" };
        text = game.add.text(0, 0, "DEMO OVER", style);
        bg = game.add.image(0, 0, 'libraryBG')
        bg.width = game.width;
        game.camera.follow(bg);
        
        //dialogueBox = this.game.add.button(510, 220, "dialogue");
        dialogueString = this.game.add.text(100, 100, "", {font: "17px Arial", fill: "#FFF"});
        text = game.add.group();
        text.add(dialogueString);
        
        if(riddleNumber == "one"){
            dialogue = 
                "There are 30 white horses on a red hill:\n"+
                "first they champ, then they stamp, then they stand still. What are they?\n"+
                "1. Teeth\n"+
                "2. Soldiers\n"+
                "3. Chess Pieces\n"+
                "4. Grains of Rice";
            dialogueString.text  = dialogue;
            
            OptionOne = game.add.button(40, 470, 'OptionOne', this.riddleRight, this);
            OptionTwo = game.add.button(200, 470, 'OptionTwo', this.riddleWrong, this);
            OptionThree = game.add.button(360, 470, 'OptionThree', this.riddleWrong, this);
            OptionFour = game.add.button(520, 470, 'OptionFour', this.riddleWrong, this);
            
            riddleOne.kill();
            
        } else if(riddleNumber == "two") {
            dialogue = 
                "What goes on four legs at dawn, two legs at noon, and three legs in the evening?\n"+
                "1. A Crow\n"+
                "2. A Man\n"+
                "3. A Bear\n"+
                "4. A Cat";
            dialogueString.text  = dialogue;
            
            OptionOne = game.add.button(40, 470, 'OptionOne', this.riddleWrong, this);
            OptionTwo = game.add.button(200, 470, 'OptionTwo', this.riddleRight, this);
            OptionThree = game.add.button(360, 470, 'OptionThree', this.riddleWrong, this);
            OptionFour = game.add.button(520, 470, 'OptionFour', this.riddleWrong, this);
            
            riddleTwo.kill();
            
        } else if(riddleNumber == "three") {
            dialogue = 
                "What we caught, we threw away; what we didn’t catch, we kept. What did we keep?\n"+
                "1. Port\n"+
                "2. Fish\n"+
                "3. Lice\n"+
                "4. Boats";
            dialogueString.text  = dialogue;
            
            OptionOne = game.add.button(40, 470, 'OptionOne', this.riddleWrong, this);
            OptionTwo = game.add.button(200, 470, 'OptionTwo', this.riddleWrong, this);
            OptionThree = game.add.button(360, 470, 'OptionThree', this.riddleRight, this);
            OptionFour = game.add.button(520, 470, 'OptionFour', this.riddleWrong, this);
            
            riddleThree.kill();
            
        }
        
    },
    
    riddleWrong: function() {
        solvingRiddle = false;
        dialogue = "";
        dialogueString.text  = "";
        dialogueString.kill();
        bg.kill();
        OptionOne.kill();
        OptionTwo.kill();
        OptionThree.kill();
        OptionFour.kill();
        
        
    },
    
    riddleRight: function() {
        correctRiddles++;
        solvingRiddle = false;
        dialogue = "";
        dialogueString.text  = "";
        dialogueString.kill();
        bg.kill();
        OptionOne.kill();
        OptionTwo.kill();
        OptionThree.kill();
        OptionFour.kill();
    },
    
    render: function(){
        //game.debug.text('Pointer: ' + (game.camera.x + game.input.mousePointer.x) +', ' + (game.camera.y + game.input.mousePointer.y), 32, 32);
    }
    
}  

Goblin = function (index, game, player, x, y, level) {

    var x = x;
    var y = y;

    this.game = game;
    this.health = 1;
    this.player = player;
    this.alive = true;
    this.faceRight = false;
    this.level = level;
    this.playerRight = false;
    this.goblinSpeed = 100;
    
    this.goblin = game.add.sprite(x, y, 'goblin');
    game.physics.enable(this.goblin, Phaser.Physics.ARCADE);
    this.goblin.name = index.toString();
    this.goblin.body.gravity.y = 1000;
    this.goblin.enableBody = true;
    this.goblin.anchor.setTo(.5, .5);
    this.goblin.body.immovable = true;
    this.goblin.body.collideWorldBounds = true;
    this.goblin.body.allowGravity = true;
    this.goblin.animations.add('walk', [0, 1, 2], 5, true);
    this.goblin.animations.play('walk');
};

Goblin.prototype.update = function() {
    game.physics.arcade.collide(this.goblin, platformLayer);
    game.physics.arcade.overlap(this.player, this.goblin, this.level.skelHit, null, this);
    
    if(this.player.x - this.goblin.x > 0) {
        this.playerRight = true; 
    } else {
        this.playerRight = false; 
    }
    
    if(this.playerRight != this.faceRight && this.goblin.body.onFloor()) this.flip();
    
    this.goblin.body.velocity.x = this.goblinSpeed;
    if(!this.faceRight) this.goblin.body.velocity.x *= -1;

};

Goblin.prototype.flip = function() {
    this.goblin.scale.x *= -1;
    this.faceRight = !this.faceRight;
};

FlyingGoblin = function (index, game, player, x, y, level) {

    var x = x;
    var y = y;

    this.game = game;
    this.health = 1;
    this.player = player;
    this.alive = true;
    this.faceRight = true;
    this.level = level;
    this.playerRight = false;
    this.attackOnCD = false;
    this.attackCD = 1.0;
    this.flyingGoblinSpeed = 100;
    this.maxDistance = 200;
    this.minDistance = 1000;
    this.maxAttackDistance = 400;
    this.projectile;
    
    this.goblin = game.add.sprite(x, y, 'flyingGoblin');
    game.physics.enable(this.goblin, Phaser.Physics.ARCADE);
    this.goblin.name = index.toString();
    this.goblin.body.gravity.y = 0;
    this.goblin.enableBody = true;
    this.goblin.anchor.setTo(.5, .5);
    this.goblin.body.immovable = true;
    this.goblin.body.collideWorldBounds = true;
    this.goblin.body.allowGravity = true;
    this.goblin.animations.add('idle', [0, 1], 8, true);
    this.goblin.animations.add('move', [2, 3], 8, true);
    this.goblin.animations.add('attack', [4, 5, 6, 7], 8, false);
    this.goblin.animations.add('hurt', [8, 9], 8, false);
    this.goblin.animations.add('dead', [10], 8, true);
    this.goblin.animations.play('move');
};

FlyingGoblin.prototype.update = function() {
    if(!this.goblin.animations.getAnimation('attack').isPlaying){
        this.goblin.animations.play('move');
    }
    
    game.physics.arcade.collide(this.goblin, platformLayer);
    game.physics.arcade.overlap(this.player, this.goblin, this.level.skelHit, null, this);
    
    if(this.player.x - this.goblin.x > 0) {
        this.playerRight = true; 
    } else {
        this.playerRight = false; 
    }
    
    if(this.playerRight != this.faceRight) this.flip();
    
    this.goblin.body.velocity.x = this.flyingGoblinSpeed;
    if(Math.abs(this.goblin.x - this.player.x) < this.maxDistance || Math.abs(this.goblin.x - this.player.x) > this.minDistance){
        this.goblin.body.velocity.x = 0;
    }
    
    if(!this.faceRight) this.goblin.body.velocity.x *= -1;
    
    if(this.goblin.alive && Math.abs(this.goblin.x - this.player.x) < this.maxAttackDistance && !this.attackOnCD){
        this.projectile = new FlyingGoblinProjectile(this.game, this.goblin.x, this.goblin.y + 30, this.player);
        game.time.events.add(Phaser.Timer.SECOND * this.attackCD, this.resetCD, this);
        this.goblin.animations.play('attack');
        this.attackOnCD = true;
    }
    
    if(this.projectile != null) this.projectile.update();
};

FlyingGoblin.prototype.flip = function() {
    this.goblin.scale.x *= -1;
    this.faceRight = !this.faceRight;
};

FlyingGoblin.prototype.resetCD = function() {
    this.attackOnCD = false;
};

FlyingGoblinProjectile = function (game, x, y, target) {
    
    var x = x;
    var y = y;

    this.game = game;
    this.target = target;
    this.projectileSpeed = 300;
    this.maxLifetime = 1.5;
    
    this.projectile = game.add.sprite(x, y, 'flyingGoblinProjectile');
    game.physics.enable(this.projectile, Phaser.Physics.ARCADE);
    this.projectile.body.gravity.y = 0;
    this.projectile.enableBody = true;
    this.projectile.anchor.setTo(.5, .5);
    this.projectile.body.immovable = true;
    this.projectile.body.collideWorldBounds = true;
    this.projectile.body.allowGravity = false;
    
    this.projectile.rotation = this.game.physics.arcade.moveToObject(this.projectile, this.target, this.projectileSpeed);
    
    game.time.events.add(Phaser.Timer.SECOND * this.maxLifetime, this.kill, this);
};

FlyingGoblinProjectile.prototype.update = function() {
    game.physics.arcade.overlap(this.projectile, this.target, this.hit, null, this);
    game.physics.arcade.overlap(this.projectile, platformLayer, this.kill, null, this);
};

FlyingGoblinProjectile.prototype.hit = function() {
    game.ouch.play();
    health -= 10;
    this.projectile.kill();
};

FlyingGoblinProjectile.prototype.kill = function() {
    this.projectile.kill();
}