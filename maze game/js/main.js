var questionExecuting = false;
var woodPickaxeImage = new Image();
woodPickaxeImage.src = "img/pickaxeWood.png";
var doorSound = new Audio();
doorSound.src = "mp3/door.wav";
var orcSound = new Audio();
orcSound.src = "mp3/ogre1.mp3";
var dragonSound = new Audio();
dragonSound.src = "mp3/burp.wav";
var fireSound = new Audio();
fireSound.src = "mp3/foom_0.wav";
var gameOverSound = new Audio();
gameOverSound.src = "mp3/Mario Paint - Gnat Attack Game Over.mp3";
var getHeartSound = new Audio();
getHeartSound.src="mp3/OOT_Get_Heart.wav";
var immunityCounter = 0;
var crashLeft = false;
var crashRight = false;
var crashTop = false;
var crashBottom = false;
var canvasHeight = window.innerHeight - window.innerHeight/33;
var canvasWidth = window.innerWidth - window.innerHeight/64;
var velocity = 3;
var soundSpikeCounter = false;

var myGameArea = {  
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });

        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        });
    }, 

    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

	stop : function() {
        clearInterval(this.interval);
    }
};
function component(width, height, color, x, y, number) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; 
	this.color = color;
    this.x = x;
    this.y = y; 
	this.number = number;
    this.update = function() {
        ctx = myGameArea.context;
		scripts_textures(this.x, this.y, this.width, this.height, number, this.color);
		if (!block_vision(this.x, this.y)){
			switch (this.color){
			case "enemy":
				if (first_level){
					orcSound.play();
				}
				else if (!first_level){
					dragonSound.play();
				}
				break;
			case "fire":
				fireSound.play();
				break;
			case "spikes":
				if (spikes_deadly && !soundSpikeCounter){
					spikesSound.play();
					soundSpikeCounter = true;
				}
				else if (!spikes_deadly){
					soundSpikeCounter = false;
				}
				break;
			}
		}
		if (block_vision(this.x, this.y) && !first_level && !ultravision){ 
			ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
		}
    };
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    };
        this.crashLeft = function(otherobj){
            var myLeft = this.x;
            var otherRight = otherobj.x + (otherobj.width);
            var myTop = this.y;
            var otherBottom = otherobj.y + (otherobj.height);
            var myBottom = this.y + (this.height);
            var otherTop = otherobj.y;
            var crashLeft = false;
            if ((myLeft === otherRight|| (myLeft >= otherRight && myLeft<= otherRight + 4)) &&(myTop < otherBottom ) && (myBottom > otherTop  ))  {
                crashLeft = true;
            }
            return crashLeft;
        };
         this.crashRight = function(otherobj){
            var myRight = this.x + (this.width);
            var otherLeft = otherobj.x;
            var myTop = this.y;
            var otherBottom = otherobj.y + (otherobj.height);
            var myBottom = this.y + (this.height);
            var otherTop = otherobj.y;
            var crashRight = false;
            if ((myRight === otherLeft || (myRight <= otherLeft && myRight>= otherLeft - 4)) &&(myTop < otherBottom  ) && (myBottom > otherTop  )){
                crashRight = true;
            }
            return crashRight;
        };
        this.crashBottom = function(otherobj){
            var myTop = this.y;
            var otherBottom = otherobj.y + (otherobj.height);
            var myLeft = this.x;
            var otherRight = otherobj.x + (otherobj.width);
            var myRight = this.x + (this.width);
            var otherLeft = otherobj.x;
            var crashBottom = false;
            if ((myTop === otherBottom ||(myTop >= otherBottom && myTop<= otherBottom + 4) ) && (myLeft < otherRight )&&(myRight > otherLeft )){
                crashBottom = true;
            }
            return crashBottom;
        };
       this.crashTop = function(otherobj){
            var myBottom = this.y + (this.height);
            var otherTop = otherobj.y;
            var myLeft = this.x;
            var otherRight = otherobj.x + (otherobj.width);
            var myRight = this.x + (this.width) - 5;
            var otherLeft = otherobj.x;
            var crashTop = false;
            if (( myBottom === otherTop ||(myBottom <= otherTop && myBottom>= otherTop - 4)) && (myLeft  < otherRight )&& (myRight > otherLeft )){
                crashTop = true;
            }
            return crashTop;
        };
    
}

function updateGameArea() {
	if (questionExecuting){
		quiz();
	}
	else{
	if (first_level){
		if(forestSound.ended){
			forestSound.play()
		}
	}
	else{
		if(dungeonSound.ended){
			dungeonSound.play();
		}
	}
    myGameArea.clear();
	visibility();
    crashLeft = false;
    crashRight = false;
    crashTop = false;
    crashBottom = false;
	
	if (immunity){
		immunityCounter++
	}
	if (immunityCounter >= 70){
			immunity = false;
	}
	
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
		    for (i= 0; i< mazeHeight;i++){
		for (var b = 0; b <mazeWidth; b++){
			switch (map[i][b]){
			case 0:
				break;
			case 1:
				check_obstacle_crash(i,b, myGamePiece);
				break;
			case 2:
				if (check_obstacle_crash(i,b, myGamePiece) && correctQuestions >= 3){
					doorSound.play();
					end = true;
				}
				break;
			case 3:
				if (check_obstacle_crash(i,b, myGamePiece)){
					boxY= i;
					boxX = b;
					if (!chechAnswersAvailable()){
						console.log("repited");
						resetAnsweredQuestions();
					}
					do {
					questionNumber = Math.floor(Math.random() * (question.length + 1) );
					} while (answeredQuestions[questionNumber] == true);
					quiz();
				}
				break;
			case 4:
				if (check_spikes_crash(i,b) && spikes_deadly ){
					subsLive = true;
				}
				break;
			case 5:
				if (check_obstacle_crash(i,b, myGamePiece)){ 
					if (lives < maxLives){
						getHeartSound.play();
						lives++;
					}
					erase(i,b);
				}
				break;
			case 6:
				if (check_obstacle_crash(i,b,myGamePiece)){
					activatePower(myObstacle[i][b].number);
					erase(i,b);
				}
			}
        }
	}
	    if (myGameArea.keys && (myGameArea.keys[65] || myGameArea.keys[37]) && !crashLeft ) {
				myGamePiece.speedX = -velocity - extraVelocity;
				hero_look = "left";
	}
     else if (myGameArea.keys && (myGameArea.keys[68] || myGameArea.keys[39]) && !crashRight ) {
				myGamePiece.speedX = velocity + extraVelocity;
				hero_look = "right";
	}
     else if (myGameArea.keys && (myGameArea.keys[87] || myGameArea.keys[38]) && !crashBottom ) {
				myGamePiece.speedY = -velocity - extraVelocity;
				hero_look = "up";
	}
     else if (myGameArea.keys && (myGameArea.keys[83] || myGameArea.keys[40]) && !crashTop ){
				myGamePiece.speedY = velocity + extraVelocity;
				hero_look = "down";
	}
    for (i = 0; i < mazeHeight; i++){
		for (var c=0; c <mazeWidth; c++){
    myObstacle[i][c].update();
	}
    } 	
	myGamePiece.newPos();
    myGamePiece.update();
	for ( t = 0; t < enemy_amount; t++){
		if (myEnemy[t] != "dead"){
		if (myEnemy[t].x === move_to_x[t] && myEnemy[t].y === move_to_y[t]){
			check_enemy_direction(t);
			enemy_move(t);
		}
		myEnemy[t].newPos();
		myEnemy[t].update();
		check_enemy_crash(t);
	}
		check_flame_death(t);
		if (fire_ball[t] !== 0){
			fire_ball[t].newPos();
			fire_ball[t].update();
			check_flame_crash(t);
		}
	}
	drawHeartOut();
	if (activePowerUp){
		drawPowerUpOut(chosenPowerUp);
		usePowerUp(chosenPowerUp);
	}
	if (subsLive && !immunity && !invencible){
		lives--;
		damageSound.play();
		subsLive = false;
		immunity = true;
		immunityCounter = 0;
	}
	if (extraPickaxe){
		ctx.drawImage(woodPickaxeImage, myObstacle[mazeHeight-1][mazeWidth - 1].x ,myObstacle[mazeHeight-1][mazeWidth - 1].y ,  squareSurface, squareSurface);
		if (myGameArea.keys && myGameArea.keys[32]){
			if (mine()){
				extraPickaxe = false;
			}
		}
	}
	if (end){
		reset_game();
	}
	if (lives < 0){
		forestSound.pause();
		dungeonSound.pause();
		lives = 5;
		fisrt_level = true;
		level_counter = 0;
		myGameArea.stop();
		menu();
	}
	}
}

function playBackgroundMusic(){
	if (first_level){
		forestSound.play();
	}
	else{
		dungeonSound.play();
	}
}