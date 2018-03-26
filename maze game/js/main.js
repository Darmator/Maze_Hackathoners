var startGameVar = false;
var subMenu;

var loose_image = new Image();
loose_image.src ="img/game_over_wallpaper_by_3971450-d66kbai.png";

var gameOverSound = new Audio();
gameOverSound.src = "mp3/Mario Paint - Gnat Attack Game Over.mp3";
var getHeartSound = new Audio();
getHeartSound.src="mp3/OOT_Get_Heart.wav";

var crashLeft = false;
var crashRight = false;
var crashTop = false;
var crashBottom = false;
var canvasHeight = window.innerHeight - window.innerHeight/33;
var canvasWidth = window.innerWidth - window.innerHeight/64;
var velocity = 2;

var myGameArea = {  
    canvas : document.createElement("canvas"),//Load the canvas
    start : function() {
        this.canvas.width = canvasWidth;//The canvas width will be equal to the number of squares times their width
        this.canvas.height = canvasHeight;//The canvas height will be equal to the number of squares times their heigth
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
		//Check if no keys are pressed
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });
		//Check if any keys are pressed
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        });
    }, 
	//Clear the canvas
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	//Stop the game
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
    this.update = function() {
        ctx = myGameArea.context;
		scripts_textures(this.x, this.y, this.width, this.height, number, this.color);
		
		if (block_vision(this.x, this.y) && !first_level){ 
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

//Start loading things


function updateGameArea() {
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
	drawHeart();
	if (immunity){
		immunityCounter++
	}
	else {
		 immunityCounter = 0;
	}
	if (immunityCounter >= 70){
			immunity = false;
	}
	
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
	//Check for collisions, and, if there's a collision with a blue block, set end value to true
    for (i= 0; i< mazeHeight;i++){
		for (var b = 0; b <mazeWidth; b++){
			switch (map[i][b]){
			case 0:
				break;
			case 1:
				check_obstacle_crash(i,b, myGamePiece);
				break;
			case 2:
				if (check_obstacle_crash(i,b, myGamePiece)){
					end = true;
				}
				break;
			case 3:
				/*if (check_obstacle_crash(i,b, myGamePiece)){
					console.log("question");
				}*/
				break;
			case 4:
				if (check_spikes_crash(i,b) && spikes_deadly && !immunity){
					lives--;
					damageSound.play();
					immunity = true;
				}
				break;
			case 5:
				if (check_obstacle_crash(i,b, myGamePiece)){ 
					if (lives < maxLives){
						getHeartSound.play();
						lives++;
					}
					myObstacle[i][b].color  = "ground";
					map[i][b] = 0;
				}
				
				break;
			}
        }
	}
	
	
	//move the red square
	    if (myGameArea.keys && (myGameArea.keys[65] || myGameArea.keys[37]) && !crashLeft ) {
				myGamePiece.speedX = -velocity;
				hero_look = "left";
	}
     else if (myGameArea.keys && (myGameArea.keys[68] || myGameArea.keys[39]) && !crashRight ) {
				myGamePiece.speedX = velocity;
				hero_look = "right";
	}
     else if (myGameArea.keys && (myGameArea.keys[87] || myGameArea.keys[38]) && !crashBottom ) {
				myGamePiece.speedY = -velocity;
				hero_look = "up";
	}
     else if (myGameArea.keys && (myGameArea.keys[83] || myGameArea.keys[40]) && !crashTop ){
				myGamePiece.speedY = velocity;
				hero_look = "down";
	}
	//Update myObtacle position
    for (i = 0; i < mazeHeight; i++){
		for (var c=0; c <mazeWidth; c++){
    myObstacle[i][c].update();
	}
    } 
//Update the red square position	
	myGamePiece.newPos();
    myGamePiece.update();
	for ( t = 0; t < enemy_amount; t++){
		check_enemy_crash(t);
		check_flame_death(t);
		if (myEnemy[t].x === move_to_x[t] && myEnemy[t].y === move_to_y[t]){
			check_enemy_direction(t);
			enemy_move(t);
		}
		if (fire_ball[t] !== 0){
			fire_ball[t].newPos();
			fire_ball[t].update();
			check_flame_crash(t);
		}
		myEnemy[t].newPos();
		myEnemy[t].update();
	}
	if (end){//if end is true stop the game and write Game Over!!!
	reset_game();
	}
	if (lives < 0){
		forestSound.pause();
		dungeonSound.pause();
		gameOverSound.play();
		ctx.drawImage(loose_image, 0, 0, mazeWidth * squareSurface, mazeHeight * squareSurface);
		myGameArea.stop();
	}
}