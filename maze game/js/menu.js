
var cursorOver = false;
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
var slider;
var sliderClicked;
var sliderDifferencePos;
var sliderDifferencePosMax;
var volumePrecentage;
var onlyOnce=true;
var buttonHeight;
var buttonWidth;
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
			walkLeftSound.volume = volumePrecentage;
			walkRightSound.volume = volumePrecentage;
			getHeartSound.volume = volumePrecentage;
			
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