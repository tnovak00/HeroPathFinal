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

level32 = {
	create: function(){
        
        //Sounds and music
        
       // game.library.stop();
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
        var bg = game.add.image(0, 0, 'athenaBG')
        boss = game.add.image(0, 10, 'athena');
        boss.scale.setTo(.75, .75);
      //  game.world.setBounds(-20, -20, game.width+20, game.height+2);
        
        attack = game.add.button(40, 470, 'attackButton', this.attackEnemy, this);
        talk = game.add.button(200, 470, 'talkButton', function() { this.handler("0");}, this);
        special = game.add.button(520, 470, 'specialButton', this.specialMenu, this);
        items = game.add.button(360, 470, 'itemButton', this.itemMenu, this);
        
        h1 = game.add.sprite(687, 470, 'heart');
        h1.scale.setTo(3, 3);
        healthBoard = this.game.add.text(706, 490, "", {font: "bold 32px Arial", fill: "#000"});
        
        dialogueBox = this.game.add.button(510, 220, "dialogue");
        dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
        dialogueString.text = dialogue;
        text = game.add.group();
        text.add(dialogueString);
        
        bg.scale.setTo(.25, .25);
        bg.width = game.width;
        bg.height = game.height;
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
            if(correctRiddles > 2){
                this.dialogue("2a");
                this.peacefulEnd();
            } else {
               this.dialogue("1a"); 
            }
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
    
    dialogue: function(option) {
        game.menu.play();
        if (option == "1a") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("1b");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            //game.growl.play();
            dialogue = "*Athena eyes you carefully*";
        } else if (option == "2a") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "You have solved my riddles!";
        }
    },
    
    attackEnemy: function() {
        if (enemyHealth > 0) {
        game.swordhit.play();
        dialogueBox.kill();
        dialogueBox = this.game.add.button(510, 220, "dialogue");
        dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
        dialogueString.bringToFront;
        dialogue = "You swing your sword at \n Athena";
        game.time.events.repeat(Phaser.Timer.SECOND * .2, 3, this.flashingBoss, this);
        enemyHealth -= 15;
        if (enemyHealth <= 0) {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue", function() {
            this.game.state.start("LevelSelect");}, this);
            level3beat = true;
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
            game.win.play();
            game.battle.stop();
            dialogue = "YOU KILLED ATHENA.\n Click Here to Continue.";
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
              dialogue = "*Athena stabs\n in your direction*"  
            } else {
              dialogue = "*Athena lashes out at you*"
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
    
    peacefulEnd: function() {
        dialogueBox.kill();
        dialogueBox = this.game.add.button(510, 220, "dialogue", function() {
        this.game.state.start("LevelSelect");}, this);
        visibleBossHealth = true;
        level3beat = true;
        dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"});
        game.battle.stop();
        dialogue = "You solved my three riddle!\nI will join you!\nClick Here to Continue";
    }
}     