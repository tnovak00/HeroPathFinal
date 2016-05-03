var attack;
var talk;
var special;
var items;
var enemyHealth = 100;
var h1;
var healthBoard;
var boss;
var itemMenu;
var back;
var itemSprites;
var itemsOpen = false;
var specialOpen = false;
var specialMenu;
var defend;
var defending = false;
var dialogueBox;
var dialogueString;
var dialogue = "";
var text;
var turn = true;
var charging = false;
var potionNumber;
var cerberusAttack = false;

// SOUNDS
var battle;
var ouch;
var swordHit;
var win;
var menu;
var bossMusic;
var hermesOw;
var cerberusAttack;

level22 = {
	create: function(){
        
        //Sounds and music
        
        dialouge = "";
        game.clouds.stop();
        game.bossMusic = game.add.audio('hermesBattle');
        game.bossMusic.loop = true;
        game.bossMusic.play();
        
        game.hermesOw = game.add.audio("hermesOw");
        game.cerberusAttack = game.add.audio("cerberusAttack");
        game.swordHit = game.add.audio('swordhit');
        game.win = game.add.audio('win');
        game.menu = game.add.audio('menu');
        
        var style = { font: "25px Verdana", fill: "#FFFF00", align: "center" };
        var text = game.add.text(0, 0, "DEMO OVER", style);
        var bg = game.add.image(0, -200, 'sky')
        boss = game.add.image(130, 30, 'hermes');
        boss.scale.setTo(.50, .50);
        game.world.setBounds(-20, -20, game.width+20, game.height+2);
        
        attack = game.add.button(40, 470, 'attackButton', this.attackEnemy, this);
        talk = game.add.button(200, 470, 'talkButton', function() { this.handler("0");}, this);
        special = game.add.button(520, 470, 'specialButton', this.specialMenu, this);
        items = game.add.button(360, 470, 'itemButton', this.itemMenu, this);
        
        h1 = game.add.sprite(687, 470, 'heart');
        h1.scale.setTo(3, 3);
        healthBoard = this.game.add.text(706, 490, "", {font: "bold 32px Arial", fill: "#000"});
        
        dialogueBox = this.game.add.button(510, 220, "dialogue");
        dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
        text = game.add.group();
        text.add(dialogueString);
        
        bg.width = game.width;
	},
    
    update: function() {
        healthBoard.text = health;
        dialogueString.text  = dialogue;
        if (turn == false) {
            this.bossAttack;
        }
    },
    
    itemMenu: function() {
        if (itemsOpen == false) {
            itemsOpen = true;
            game.menu.play();
            itemMenu = game.add.image(0, 0, 'itemMenu');
            back = this.game.add.button(760, 10, "back", this.killItemMenu, this)
            back.scale.setTo(.5);
            itemSprites = game.add.group();
            if (bone == true) {
                boneSprite = game.add.button(100, 5, 'bone', this.useBone, this);
                boneSprite.scale.setTo(.5, .5);
                itemSprites.add(boneSprite);
            }
            if (potions > 0) {
                potionSprite = game.add.button(740, 10, 'potion', this.usePotion, this);
                potionSprite.scale.setTo(.5)
                potionStyle = { font: "10px Verdana", fill: "#FFFFFF", align: "center" };
                potionNumber = game.add.text(740, 10, "", potionStyle);
                potionNumber.text = potions;
                itemSprites.add(potionNumber);
                itemSprites.add(potionSprite);
            }
            if (message == true) {
                messageSprite = game.add.button(150, 5, 'message', this.useMessage, this)
                messageSprite.scale.setTo(1.5);
                itemSprites.add(messageSprite);
            }
        }
    },
    
    specialMenu: function() {
        if (specialOpen == false) {
            specialOpen = true;
            game.menu.play();
            specialMenu = this.game.add.image(0, 0, 'specialMenu');
            back = this.game.add.button(760, 10, "back", this.killSpecialMenu, this)
            back.scale.setTo(.5);
            defend = this.game.add.button(20, 350, "defendButton", this.defend, this);
        }
    },
    
    handler: function(o) {
        if (o == "0") {
            if (enemyHealth > 80) {
                this.dialogue("0");
            } else if (enemyHealth < 80 && enemyHealth > 50) {
                this.dialogue("3");
            } else if (enemyHealth < 50 && enemyHealth > 20) {
                this.dialogue("4");
            }
        }
        if (o == "1b") {
            this.dialogue("1b");
        }
        if (o == "2b") {
            this.dialogue("2b");
        }
        if (o == "0b") {
            this.dialogue("0b");
        }
    },
    
    killItemMenu: function() {
        itemsOpen = false;
        itemMenu.kill();
        game.menu.play();
        back.kill();
        itemSprites.callAll('kill');
        potionNumber.text = "";
    },
    
    killSpecialMenu: function() {
        specialOpen = false;
        specialMenu.kill();
        back.kill();
        game.menu.play();
        defend.kill();
    },
    
    defend: function() {
        defending = true;
        dialogueBox.kill();
        dialogueBox = this.game.add.button(510, 220, "dialogue");
        dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
        dialogue = "You hold your shield up \nand prepare for an attack";
        game.time.events.add(Phaser.Timer.SECOND * 2.5, this.bossAttack, this);
    },
    
    useBone: function() {
       this.dialogue("1a");
    },
    
    useMessage: function() {
       this.dialogue("2a");
    },
    
    cerberusAttack: function() {
        if (cerberusAttack == false) {
            cerberusAttack = true;
            if (enemyHealth > 0) {
            game.cerberusAttack.play();
            game.hermesOw.play();
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial",  fill: "#000"});
            dialogueString.bringToFront;
            dialogue = "A fireball erupts from your\nsword in an explosion";
            game.time.events.repeat(Phaser.Timer.SECOND * .2, 3, this.flashingBoss, this);
            enemyHealth -= 35;
        if (enemyHealth <= 0) {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue", function() {
            this.game.state.start("LevelSelect");}, this);
            level2 = true;
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
            game.win.play();
            game.bossMusic.stop();
            level2beat = true;
            dialogue = "YOU KILLED HERMES. Click\n here.";
        } else {
        game.time.events.add(Phaser.Timer.SECOND * 1, this.bossAttack, this);
        }
      }
        }
    },
    
    usePotion: function() {
        if (health >= 80) {
            health = 100;
            potions--;
            potionNumber.text = potions;
            this.killItemMenu();
            this.bossAttack();
        } else if (health == 100) {
            return;
        } else {
            health += 20;
            potions--;
            this.killItemMenu();
            this.bossAttack();
            potionNumber.text = potions;
        }
    },
    
    dialogue: function(option) {
        game.menu.play();
        if (option == "1a") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("1b");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "'What is that gross thing?\n Get it away from me.";
        } else if (option == "1b") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "I don't think Hermes wants\n the bone...";
        } else if (option == "0") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("0b");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "'Who are you human?\n You should probably leave.'";
        } else if (option == "0b") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "'Unless...have you seen the \nmessage I'm supposed \nto deliver?'";
        } else if (option == "2a") {
            dialogueBox.kill();
            game.win.play();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("2b");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
            dialogue = "'Whoa, that's my message!\nYou found it!'";
        } else if (option == "2b") {
            dialogueBox.kill();
            game.win.play();
            dialogueBox = this.game.add.button(510, 220, "dialogue", function() {
            this.game.state.start("LevelSelect");}, this);
            level2beat = true;
            hermes = true;
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
            game.bossMusic.stop();
            dialogue = "YOU WIN! Hermes gives you his\n winged sandals. Click here.";
            level2 = true;
        } else if (option == "3") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "'Ugh, can you just leave\n me alone? I'm busy.'";
        } else if (option == "4") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "*Hermes is clutching a\n heavily bleeding wound*";
        }
    },
    
    attackEnemy: function() {
        if (enemyHealth > 0) {
        game.swordHit.play();
        game.hermesOw.play();
        dialogueBox.kill();
        dialogueBox = this.game.add.button(510, 220, "dialogue");
        dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
        dialogueString.bringToFront;
        dialogue = "You swing your sword at \n Hermes wildly";
        game.time.events.repeat(Phaser.Timer.SECOND * .2, 3, this.flashingBoss, this);
        enemyHealth -= 15;
        if (enemyHealth <= 0) {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue", function() {
            this.game.state.start("LevelSelect");}, this);
            level2 = true;
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
            game.win.play();
            game.bossMusic.stop();
            level2beat = true;
            dialogue = "YOU KILLED HERMES. Click\n here.";
        } else {
        game.time.events.add(Phaser.Timer.SECOND * 1, this.bossAttack, this);
        }
      }
    },
    
    flashingBoss: function() {
        boss.tint = 0xff0000
        game.time.events.add(Phaser.Timer.SECOND * .1, this.flashOff, this);
    },
    
    flashOff: function() {
        boss.tint = 0xffffff;
    },
    
    bossAttack: function() {
        if (health > 0) {
            game.hermesOw.play();
            if (defending == true) {
                health -= 8
            } else {
                health -= 12
            }
            turn = true;
            dialogueBox.kill();
            game.swordHit.play();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial",  fill: "#000"});
            dialogueString.bringToFront;
            dialogue = "*Hermes swings his staff\n at you"
        if (health <= 0) {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue", function() {
            this.game.state.start("Level2");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
            health = 100;
            game.bossMusic.stop();
            dialogue = "YOU DIED. Click here to\n start over.";
        }
      }
       defending = false;
    },
}     