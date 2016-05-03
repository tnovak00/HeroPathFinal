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
var swordhit;
var win;
var menu;
var olympus;

goodend = {
	create: function(){
        
        //Sounds and music
        
        game.menu = game.add.audio('menu');
        game.olympus = game.add.audio('olympus');
        game.olympus.loop = true;
        game.olympus.play();
        
        var style = { font: "25px Verdana", fill: "#FFFF00", align: "center" };
        var text = game.add.text(0, 0, "DEMO OVER", style);
        var bg = game.add.image(-500, -200, 'olympus')
        boss = game.add.image(-100, -20, 'zeus');
        boss.scale.setTo(2, 2);
        game.world.setBounds(-20, -20, game.width+20, game.height+2);
        
        dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("1b");}, this);
        dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
        dialogue = "Welcome Egiero\n to Mt. Olympus.";
        text = game.add.group();
        text.add(dialogueString);
	},
    
    update: function() {
        dialogueString.text  = dialogue;
    },
    
    handler: function(o) {
        if (o == "1b") {
            this.dialogue("1b");
        }
        if (o == "1c") {
            this.dialogue("1c");
        }
        if (o == "1d") {
            this.dialogue("1d");
        }
        if (o == "1e") {
            this.dialogue("1e");
        }
        if (o == "1f") {
            this.dialogue("1f");
        }
    },
    
    dialogue: function(option) {
        game.menu.play();
        if (option == "1b") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("1c");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "Your journey has been long\nand dangerous...";
        } else if (option == "1c") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("1d");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "...but you made it and\nhave become a TRUE HERO."
        } else if (option == "1d") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("1e");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "Because you spared the lives of\n the gods and monster you met..."
        } else if (option == "1e") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue2", function() { this.handler("1f");}, this);
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#000"});
            dialogue = "...You have a home here\nwith the heroes and gods."
        } else if (option == "1f") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(510, 220, "dialogue");
            dialogueString = this.game.add.text(525, 230, "", {font: "17px Arial", fill: "#FFFF00"})
            dialogue = "YOU BECAME A TRUE HERO.\nPlease refresh to try again!"
        }
    }
}     