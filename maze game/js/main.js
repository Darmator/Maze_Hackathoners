var startGameVar = false;
var subMenu;
var helpMenu;
var optionsMenu;
var helpImageWidth;
var helpImageLength;
var cursorOver = false;
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
var backButtonImage = new Image();
backButtonImage.src = "img/back.png";
var helpImage = new Image();
helpImage.src = "img/help-Image.png";
var volume3Image = new Image();
volume3Image.src = "img/Speaker_Icon.png";
var volume2Image = new Image();
volume2Image.src = "img/Speaker_Icon+vol2.png";
var volume1Image = new Image();
volume1Image.src = "img/Speaker_Icon+vol1.png";
var volume0Image = new Image();
volume0Image.src = "img/Speaker_Icon+vol0.png";
var gameOverSound = new Audio();
gameOverSound.src = "mp3/Mario Paint - Gnat Attack Game Over.mp3";
var buttonHeight;
var buttonWidth;
var slider;
var sliderClicked;
var sliderDifferencePos;
var sliderDifferencePosMax;
var volumePrecentage;
var onlyOnce=true;
var crashLeft = false;
var crashRight = false;
var crashTop = false;
var crashBottom = false;
var canvasHeight = window.innerHeight - 23;
var canvasWidth = window.innerWidth - 24;
var velocity = 2;


function menu(){
	optionsMenu=false;
	subMenu=false;
	helpMenu=false;
    myGameArea.start();
    if(onlyOnce){
    	slider = myGameArea.canvas.width/4+myGameArea.canvas.width/1.7-7.5;
    	onlyOnce=false;
	}
    buttonWidth=200;
	buttonHeight=myGameArea.canvas.height/8;
	helpImageWidth=myGameArea.canvas.width/2;
	helpImageLength=helpImageWidth/3*2;
	sliderClicked=false;
    ctx = myGameArea.context;
	ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    draw_menu();
    window.addEventListener('mouseup', function(e) {
    	if(subMenu==false){
			if (check_start(e.clientX, e.clientY)){
				startGameVar = true;
				myGameArea.canvas.style.cursor = "default";
				forestSound.play();
	        	startGame();
			}
			else if (check_options(e.clientX, e.clientY)){
				optionsMenu=true;
				subMenu = true;
				options();
			}
			else if (check_help(e.clientX, e.clientY)){
				helpMenu=true;
				subMenu = true;
				help();
			}
			else if (check_credits(e.clientX, e.clientY)){
				subMenu = true;
				credits();
			}
			else if (check_exit(e.clientX, e.clientY)){
				close();
			}
		}
		if (check_back(e.clientX,e.clientY)&&subMenu){
			menu();
		}
		if(optionsMenu&&sliderClicked){
			sliderClicked = false;
			sliderDifferencePos=slider-(myGameArea.canvas.width/4+1);
			sliderDifferencePosMax=(myGameArea.canvas.width/4+myGameArea.canvas.width/1.7-7.5-1)-(myGameArea.canvas.width/4+1);
			volumePrecentage=sliderDifferencePos/sliderDifferencePosMax;
			gameOverSound.volume = volumePrecentage;
			dungeonSound.volume = volumePrecentage;
			forestSound.volume = volumePrecentage;
			damageSound.volume = volumePrecentage;
		}
	});
	window.addEventListener('mousedown', function(e) {
		if(check_slider(e.clientX,e.clientY)&&optionsMenu){
			sliderClicked = true;
		}
	});
    window.addEventListener('mousemove', function inBox(e) {
		if(startGameVar == false){
				myGameArea.clear();
				ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
				if(subMenu==false){
					if (check_start(e.clientX, e.clientY)){
						for(i = 0;i<3;i++){
							ctx.drawImage(startGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/3,buttonWidth,buttonHeight); //start clicked
						}
					}
					else{
						ctx.drawImage(startGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/3,buttonWidth,buttonHeight); //start not clicked
					}
					if (check_options(e.clientX, e.clientY)){
						for(i = 0;i<3;i++){		
							ctx.drawImage(optionsGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/5,buttonWidth,buttonHeight); //scores clicked
						}
					}
					else{						
						ctx.drawImage(optionsGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/5,buttonWidth,buttonHeight); //options not clicked
					}
					if (check_help(e.clientX, e.clientY)){
						for(i = 0;i<3;i++){
							ctx.drawImage(helpGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/14.5,buttonWidth,buttonHeight); //help clicked
						}
					}
					else{
						ctx.drawImage(helpGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/14.5,buttonWidth,buttonHeight); //help non clicked
					}
					if (check_credits(e.clientX, e.clientY)){
						for(i = 0;i<3;i++){
							ctx.drawImage(creditGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/15.5,buttonWidth,buttonHeight); //credits clicked
						}
					}
					else{
						ctx.drawImage(creditGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/15.5,buttonWidth,buttonHeight); //credits not clicked
					}
					if (check_exit(e.clientX, e.clientY)){
						for(i = 0;i<3;i++){
							ctx.drawImage(exitGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/5,buttonWidth,buttonHeight); //exit clicked
						}						
					}
					else{
						ctx.drawImage(exitGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/5,buttonWidth,buttonHeight); //exit non clicked						
					}
					if(!check_start(e.clientX,e.clientY) && !check_options(e.clientX,e.clientY) && !check_help(e.clientX,e.clientY) && !check_credits(e.clientX,e.clientY) && !check_exit(e.clientX,e.clientY)){
						myGameArea.canvas.style.cursor = "default";
					}
					else{
						myGameArea.canvas.style.cursor = "pointer";
					}
				}
				else{
					if (check_back(e.clientX, e.clientY)){
						for(i = 0;i<3;i++){
							ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50); //exit clicked
						}
					}
					else{
						ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50); //exit non clicked
					}
					if(!check_back(e.clientX,e.clientY)){
						myGameArea.canvas.style.cursor = "default";
					}
					else{
						myGameArea.canvas.style.cursor = "pointer";
					}
					if(helpMenu){
						ctx.drawImage(helpImage, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
					}
					if (optionsMenu){
						ctx.fillStyle = "lightBlue";
						ctx.fillRect(myGameArea.canvas.width/4,myGameArea.canvas.height/4,myGameArea.canvas.width/1.7,myGameArea.canvas.height/50);
						ctx.fillStyle = "blue";
						ctx.fillRect(slider,myGameArea.canvas.height/4-7.5,15,30);
						if(sliderClicked&&slider>=myGameArea.canvas.width/4&&slider<=myGameArea.canvas.width/4+myGameArea.canvas.width/1.7-7.5){
							slider = e.clientX-15;
						}
						if(slider<=myGameArea.canvas.width/4){
							slider=myGameArea.canvas.width/4+1;
						}
						if(slider>=myGameArea.canvas.width/4+myGameArea.canvas.width/1.7-7.5){
							slider=myGameArea.canvas.width/4+myGameArea.canvas.width/1.7-7.5-1;
						}
					}
            	}
		}
    });  
}

function draw_menu(){
	ctx.drawImage(startGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/3,buttonWidth,buttonHeight); //start not clicked
	ctx.drawImage(optionsGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/5,buttonWidth,buttonHeight); //options not clicked
	ctx.drawImage(helpGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/14.5,buttonWidth,buttonHeight);
	ctx.drawImage(creditGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/15.5,buttonWidth,buttonHeight); //credits not clicked
	ctx.drawImage(exitGameImage, myGameArea.canvas.width/2-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/5,buttonWidth,buttonHeight); //exit non clicked
}
function check_start(x,y){
	if ((x>= myGameArea.canvas.width/2-buttonWidth/2 && x<= myGameArea.canvas.width/2-buttonWidth/2+buttonWidth)&&(y >= myGameArea.canvas.height/2-myGameArea.canvas.height/3 && y <= myGameArea.canvas.height/2-myGameArea.canvas.height/3+buttonHeight)){
		return true;
	}
	return false;
}

function check_options(x,y){
	if ((x>= myGameArea.canvas.width/2-buttonWidth/2 && x<= myGameArea.canvas.width/2-buttonWidth/2+buttonWidth)&&(y >= myGameArea.canvas.height/2-myGameArea.canvas.height/5 && y <= myGameArea.canvas.height/2-myGameArea.canvas.height/5+buttonHeight)){
		return true;
	}
	return false;
}

function check_help(x,y){
	if ((x>= myGameArea.canvas.width/2-buttonWidth/2 && x<= myGameArea.canvas.width/2-buttonWidth/2+buttonWidth)&&(y>= myGameArea.canvas.height/2-myGameArea.canvas.height/14.5 && y<= myGameArea.canvas.height/2-myGameArea.canvas.height/14.5+buttonHeight)){
		return true;
	}
	return false;
}

function check_credits(x,y){
	if ((x>= myGameArea.canvas.width/2-buttonWidth/2 && x<= myGameArea.canvas.width/2-buttonWidth/2+buttonWidth)&&(y>= myGameArea.canvas.height/2+myGameArea.canvas.height/15.5 && y<= myGameArea.canvas.height/2+myGameArea.canvas.height/15.5+buttonHeight)){
		return true;
	}
	return false;
}

function check_exit(x,y){
	if ((x>= myGameArea.canvas.width/2-buttonWidth/2 && x<= myGameArea.canvas.width/2-buttonWidth/2+buttonWidth)&&(y>= myGameArea.canvas.height/2+myGameArea.canvas.height/5 && y<= myGameArea.canvas.height/2+myGameArea.canvas.height/5+buttonHeight)){
		return true;
	}
	return false;
}

function check_back(x,y){
	if ((x>= myGameArea.canvas.width/7.5 && x<= myGameArea.canvas.width/7.5+50)&&(y>=myGameArea.canvas.height/5.5 && y<= myGameArea.canvas.height/5.5+50)){
		return true;
	}
	return false;
}
function check_slider(x,y){
	if ((x>= slider+7.5 && x<= slider+22.5)&&(y>=myGameArea.canvas.height/4 && y<= myGameArea.canvas.height/4+30)){
		return true;
	}
	return false;
}
function help(){
	ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
	ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50);
	ctx.drawImage(helpImage, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
}
function options(){
	ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
	ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50);
	ctx.fillStyle = "lightBlue";
	ctx.fillRect(myGameArea.canvas.width/4,myGameArea.canvas.height/4,myGameArea.canvas.width/1.7,myGameArea.canvas.height/50);
	ctx.fillStyle = "blue";
	ctx.fillRect(slider-1,myGameArea.canvas.height/4-7.5,15,30);
}
function credits(){
	ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
	ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50);
}
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
	if (immunityCounter >= 100){
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
	    if (myGameArea.keys && myGameArea.keys[37] && !crashLeft ) {
				myGamePiece.speedX = -velocity;
				hero_look = "left";
	}
     else if (myGameArea.keys && myGameArea.keys[39] && !crashRight ) {
				myGamePiece.speedX = velocity;
				hero_look = "right";
	}
     else if (myGameArea.keys && myGameArea.keys[38] && !crashBottom ) {
				myGamePiece.speedY = -velocity;
				hero_look = "up";
	}
     else if (myGameArea.keys && myGameArea.keys[40] && !crashTop ){
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