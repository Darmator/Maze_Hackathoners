
var startGameVar = false;
var loose_image = new Image();
loose_image.src ="img/game_over_wallpaper_by_3971450-d66kbai.png";
var backImage = new Image();
backImage.src = "img/pexels-photo-416346.jpeg";
var startGameImage = new Image();
startGameImage.src = "img/start-game-button.png";
var optionsGameImage = new Image();
optionsGameImage.src = "img/option-game-button.png";
var helpGameImage = new Image();
helpGameImage.src = "img/help-game-button.png"
var creditGameImage = new Image();
creditGameImage.src = "img/credit-game-button.png";
var exitGameImage = new Image();
exitGameImage.src = "img/exit-game-button.png";
var crashLeft = false;
var crashRight = false;
var crashTop = false;
var crashBottom = false;

function menu(){
	
	mazeHeight = 12;
	mazeWidth =  19;
	enemy_amount = 0;
	spikes_counter = 1;
	squareSurface = 52;
	level_counter = 0;
    myGameArea.start();
    ctx = myGameArea.context;
	ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    draw_menu();
    window.addEventListener('mouseup', function(e) {
	if (check_start(e.clientX, e.clientY)){
		startGameVar = true;
			mazeHeight = 7;
			mazeWidth =  19;
			myGameArea.start();
            startGame();
	}
	else if (check_options(e.clientX, e.clientY)){
		console.log("score");
	}
	else if (check_help(e.clientX, e.clientY)){
		console.log("help");
	}
	else if (check_credits(e.clientX, e.clientY)){
		console.log("credits");
	}
	else if (check_exit(e.clientX, e.clientY)){
		close();
	}
	});
    window.addEventListener('mousemove', function inBox(e) {
		if(startGameVar == false){
				myGameArea.clear();
				ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
				if (check_start(e.clientX, e.clientY)){
					for(i = 0;i<3;i++){
						ctx.drawImage(startGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2-225,200,100); //start clicked
					}
				}
				else{
					ctx.drawImage(startGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2-225,200,100); //start not clicked
				}
				if (check_options(e.clientX, e.clientY)){
					for(i = 0;i<3;i++){
						ctx.drawImage(optionsGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2-140,200,100); //scores clicked
					}
				}
				else{
					ctx.drawImage(optionsGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2-140,200,100); //options not clicked
				}
				if (check_help(e.clientX, e.clientY)){
					for(i = 0;i<3;i++){
						ctx.drawImage(helpGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2-50,200,100); //help clicked
					}
				}
				else{
					ctx.drawImage(helpGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2-50,200,100); //help non clicked
				}
				if (check_credits(e.clientX, e.clientY)){
					for(i = 0;i<3;i++){
						ctx.drawImage(creditGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2+40,200,100); //credits clicked
					}
				}
				else{
					ctx.drawImage(creditGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2+40,200,100); //credits not clicked
				}
				if (check_exit(e.clientX, e.clientY)){
					for(i = 0;i<3;i++){
						ctx.drawImage(exitGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2+130,200,100); //exit clicked
					}
				}
				else{
					ctx.drawImage(exitGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2+130,200,100); //exit non clicked
				}
            	
		}
    });  
}

function draw_menu(){
	ctx.drawImage(startGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2-225,200,100); //start not clicked
	ctx.drawImage(optionsGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2-140,200,100); //options not clicked
	ctx.drawImage(helpGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2-50,200,100);
	ctx.drawImage(creditGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2+40,200,100); //credits not clicked
	ctx.drawImage(exitGameImage, myGameArea.canvas.width/2-100,myGameArea.canvas.height/2+130,200,100); //exit non clicked
}
function check_start(x,y){
	if ((x>= myGameArea.canvas.width/2-100 && x<= myGameArea.canvas.width/2+100)&&(y >= myGameArea.canvas.height/2-225 && y <= myGameArea.canvas.height/2-125)){
		return true;
	}
	return false;
}

function check_options(x,y){
	if ((x>= myGameArea.canvas.width/2-100 && x<= myGameArea.canvas.width/2+100)&&(y >= myGameArea.canvas.height/2-140 && y <= myGameArea.canvas.height/2-40)){
		return true;
	}
	return false;
}

function check_help(x,y){
	if ((x>= myGameArea.canvas.width/2-100 && x<= myGameArea.canvas.width/2+100)&&(y>= myGameArea.canvas.height/2-50 && y<= myGameArea.canvas.height/2+50)){
		return true;
	}
	return false;
}

function check_credits(x,y){
	if ((x>= myGameArea.canvas.width/2-100 && x<= myGameArea.canvas.width/2+100)&&(y>= myGameArea.canvas.height/2+40 && y<= myGameArea.canvas.height/2+140)){
		return true;
	}
	return false;
}

function check_exit(x,y){
	if ((x>= myGameArea.canvas.width/2-100 && x<= myGameArea.canvas.width/2+100)&&(y>= myGameArea.canvas.height/2+130 && y<= myGameArea.canvas.height/2+230)){
		return true;
	}
	return false;
}

//Start loading things
var myGameArea = {  
    canvas : document.createElement("canvas"),//Load the canvas
    start : function() {
        this.canvas.width = mazeWidth * squareSurface;//The canvas width will be equal to the number of squares times their width
        this.canvas.height = mazeHeight * squareSurface;//The canvas height will be equal to the number of squares times their heigth
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
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
		scripts_textures(this.x, this.y, this.width, this.height, number, color);
		
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
            if ((myLeft === otherRight) &&(myTop < otherBottom ) && (myBottom > otherTop  ))  {
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
            if ((myRight === otherLeft) &&(myTop < otherBottom  ) && (myBottom > otherTop  )){
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
            if ((myTop === otherBottom  ) && (myLeft < otherRight )&&(myRight > otherLeft )){
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
            if (( myBottom === otherTop) && (myLeft  < otherRight )&& (myRight > otherLeft )){
                crashTop = true;
            }
            return crashTop;
        };
    
}

//Start loading things
var myGameArea = {  
    canvas : document.createElement("canvas"),//Load the canvas
    start : function() {
        this.canvas.width = mazeWidth * squareSurface;//The canvas width will be equal to the number of squares times their width
        this.canvas.height = mazeHeight * squareSurface;//The canvas height will be equal to the number of squares times their heigth
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

function updateGameArea() {
    myGameArea.clear();
	visibility();
    crashLeft = false;
    crashRight = false;
    crashTop = false;
    crashBottom = false;
	
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
				break;
			case 4:
				if (check_spikes_crash(i,b) && spikes_deadly){
					death = true;
				}
				break;
			}
        }
	}
	
	
	//move the red square
	    if (myGameArea.keys && myGameArea.keys[37] && !crashLeft ) {
				myGamePiece.speedX = -2;
				hero_look = "left";
	}
     else if (myGameArea.keys && myGameArea.keys[39] && !crashRight ) {
				myGamePiece.speedX =2;
				hero_look = "right";
	}
     else if (myGameArea.keys && myGameArea.keys[38] && !crashBottom ) {
				myGamePiece.speedY = -2;
				hero_look = "up";
	}
     else if (myGameArea.keys && myGameArea.keys[40] && !crashTop ){
				myGamePiece.speedY = 2;
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
	if (death){
		ctx.drawImage(loose_image, 0, 0, mazeWidth * squareSurface, mazeHeight * squareSurface);
		myGameArea.stop();
	}
}