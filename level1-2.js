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

// SOUNDS
var battle;
var dogbite;
var growl;
var growlbark;
var ouch;
var swordhit;
var win;
var woof;
var menu;

level12 = {
	create: function(){
        game.castle.stop();
        
        //Sounds and music
        
        game.battle = game.add.audio('battle');
        game.battle.volume = .15;
        game.battle.play();
        game.dogbite = game.add.audio('dogbite');
        game.ouch = game.add.audio('ouch');
        game.ouch.volume = .30;
        game.woof = game.add.audio('woof');
        game.swordhit = game.add.audio('swordhit');
        game.growlbark = game.add.audio('growlbark');
        game.growl = game.add.audio('growl')
        game.win = game.add.audio('win');
        game.menu = game.add.audio('menu');
        
        var style = { font: "25px Verdana", fill: "#FFFF00", align: "center" };
        var text = game.add.text(0, 0, "DEMO OVER", style);
        var bg = game.add.image(0, 0, 'battleBG')
        boss = game.add.image(100, 80, 'cerberus');
        boss.scale.setTo(.75, .75);
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
            back = this.game.add.button(400, 0, "back", this.killItemMenu, this)
            itemSprites = game.add.group();
            if (potions > 0) {
                potionSprite = game.add.button(740, 10, 'potion', this.usePotion, this);
                potionSprite.scale.setTo(.5)
                potionStyle = { font: "10px Verdana", fill: "#FFFFFF", align: "center" };
                potionNumber = game.add.text(740, 10, "", potionStyle);
                potionNumber.text = potions;
                itemSprites.add(potionNumber);
                itemSprites.add(potionSprite);
            }
            if (bone == true) {
                boneSprite = game.add.button(100, 5, 'bone', this.useBone, this);
                boneSprite.scale.setTo(.5, .5);
                itemSprites.add(boneSprite);
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
    
    specialMenu: function() {
        if (specialOpen == false) {
            specialOpen = true;
            game.menu.play();
            specialMenu = this.game.add.image(0, 0, 'specialMenu');
            back = this.game.add.button(400, 0, "back", this.killSpecialMenu, this)
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
                if (bone == true) {
                    this.dialogue("4a");
                } else {
                    this.dialogue("4b");
                }
            }
        }
        if (o == "1b") {
            this.dialogue("1b");
        }
        if (o == "2b") {
            this.dialogue("2b");
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
       if (enemyHealth >= 50) {
           this.dialogue("1a");
           game.menu.play();
       } else {
           this.dialogue("2a");
           this.killItemMenu();
           bone = false;
           game.menu.play();
       }
    },
    
    dialogue: function(option) {
        game.menu.play();
        if (option == "1a") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("1b");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            game.growl.play();
            dialogue = "*Cerberus growls and \nthrashes his head*";
        } else if (option == "1b") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "He probably needs to be\n weakened more...";
        } else if (option == "0") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            game.growl.play();
            dialogue = "*Cerberus growls at you*";
        } else if (option == "2a") {
            dialogueBox.kill();
            game.woof.play();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("2b");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "*Barks happily and takes the \n bone from your hand*";
        } else if (option == "2b") {
            dialogueBox.kill();
            game.win.play();
            dialogueBox = this.game.add.button(510, 220, "dialogue", function() {
            this.game.state.start("LevelSelect");}, this);
            level1beat = true;
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
            game.battle.stop();
            dialogue = "YOU WIN! Cerberus joins your\n team. Click here.";
        } else if (option == "3") {
            dialogueBox.kill();
            game.growl.play();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "*Cerberus growls at you softly*";
        } else if (option == "4a") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "*Cerberus is panting heavily and\n sniffing at your pocket*";
        } else if (option == "4b") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "Cerberus is panting heavily and whining*";
        }
    },
    
    attackEnemy: function() {
        if (enemyHealth > 0) {
        game.growlbark.play();
        game.swordhit.play();
        dialogueBox.kill();
        dialogueBox = this.game.add.button(510, 220, "dialogue");
        dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
        dialogueString.bringToFront;
        dialogue = "You swing your sword at \n Cerberus wildly";
        game.time.events.repeat(Phaser.Timer.SECOND * .2, 3, this.flashingBoss, this);
        enemyHealth -= 15;
        if (enemyHealth <= 0) {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue", function() {
            this.game.state.start("LevelSelect");}, this);
            level1beat = true;
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
            game.win.play();
            game.battle.stop();
            dialogue = "YOU KILLED CERBERUS. Click\n here to end demo.";
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
        var randomValue = game.rnd.integerInRange(0, 100);
        if (randomValue > 0 && randomValue < 33 && charging == false) {
            charging = true;
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial",  fill: "#000"});
            dialogueString.bringToFront;
            dialogue = "*Cerberus is glowing red and \n seems to be charging up*"
            return;
        }
        if (health > 0) {
            game.dogbite.play();
            game.ouch.play();
            if (defending == true && charging == false) {
                health -= 5
            } else if (defending == true && charging == true) {
                health -= 12;
            } else if (defending == false && charging == true) {
                health -= 20;
            } else {
                health -= 10
            }
            turn = true;
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial",  fill: "#000"});
            dialogueString.bringToFront;
            if (charging == true) {
              charging = false;
              dialogue = "*Cerberus blasts a fireball\n in your direction*"  
            } else {
              dialogue = "*Cerberus lashes out at you\n with his teeth bared*"
            }
        if (health <= 0) {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue", function() {
            this.game.state.start("PlayLevel");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
            game.battle.stop();
            dialogue = "YOU DIED. Click here to\n start over.";
        }
      }
       defending = false;
    },
}     