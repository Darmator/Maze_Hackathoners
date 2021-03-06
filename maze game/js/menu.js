var cursorOver = false;
var subMenu;
var creditsMenu;
var startGameVar
var backImage = new Image();
backImage.src = "img/menuBackground.png";
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
var creditsImage = new Image();
creditsImage.src = "img/credits-Image.png";
var nextButton = new Image();
nextButton.src = "img/Button-Next-512.png";
var BackNextButton = new Image();
BackNextButton.src = "img/Button-Back-512.png";
var volume3Image = new Image();
volume3Image.src = "img/Speaker_Icon.png";
var volume2Image = new Image();
volume2Image.src = "img/Speaker_Icon+vol2.png";
var volume1Image = new Image();
volume1Image.src = "img/Speaker_Icon+vol1.png";
var volume0Image = new Image();
volume0Image.src = "img/Speaker_Icon+vol0.png";
var title = new Image();
title.src = "img/The-Trudge.png";
var soundBack = new Image();
soundBack.src = "img/soundBack.png";
var menuSound = new Audio();
menuSound.src = "mp3/awesomeness.wav";
var slider;
var sliderClicked;
var sliderDifferencePos;
var sliderDifferencePosMax;
var volumePrecentage=1;
var onlyOnce=true;
var buttonHeight;
var buttonWidth;
var timesNextClicked;
var nextExists;
var nextBackExist;

var titleLength;
var titleWidth;
function menu(){
	resetEverything();
	menuSound.play();
	var nextExists=true;
	var nextBackExist=false;
	optionsMenu=false;
	subMenu=false;
	helpMenu=false;
	creditsMenu=false;
	startGameVar=false;
    myGameArea.start();
    if(onlyOnce){
    	slider = myGameArea.canvas.width/2.7+myGameArea.canvas.width/3-7.5;
    	onlyOnce=false;
	}
	titleLength=myGameArea.canvas.height/2;
	titleWidth=titleLength*1.7;
    buttonWidth=200;
	buttonHeight=myGameArea.canvas.height/8;
	helpImageWidth=myGameArea.canvas.width/2;
	helpImageLength=helpImageWidth/3*2;
	sliderClicked=false;
    ctx = myGameArea.context;
	ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    draw_menu();
    document.addEventListener('mouseup', function mouseUp(e) {
    	var X=e.clientX-myGameArea.canvas.getBoundingClientRect().left;
    	var Y=e.clientY-myGameArea.canvas.getBoundingClientRect().top;
    	myGameArea.canvas.style.cursor = "default";
    	if(subMenu==false){
			if (check_start(X, Y)){
				startGameVar = true;
				document.removeEventListener('mouseup', mouseUp);
				myGameArea.canvas.style.cursor = "default";
				menuSound.pause();
				playBackgroundMusic();
	        	startGame();
			}
			else if (check_options(X, Y)){
				optionsMenu=true;
				subMenu = true;
				options();
			}
			else if (check_help(X, Y)){
				helpMenu=true;
				subMenu = true;
				timesNextClicked=0;
				help();
			}
			else if (check_credits(X, Y)){
				subMenu = true;
				creditsMenu=true;
				credits();
			}
			else if (check_exit(X, Y)){
				close();
			}
		}
		if (check_back(X, Y)&&subMenu){
			document.removeEventListener('mouseup', mouseUp);
			menu();
		}
		if (timesNextClicked == 6){
			timesNextClicked = 5;
		}
		if (timesNextClicked == -1){
			timesNextClicked = 0;
		}
		if(check_next(X, Y)&&helpMenu&&nextExists){
			timesNextClicked++;
			ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
			ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50);
			setTimeout(function() {
			ctx.drawImage(helpImage, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
		},25);
			if(timesNextClicked==0){
				nextExists=true;
				nextBackExist=false;
				ctx.drawImage(nextButton, myGameArea.canvas.width/1.25, myGameArea.canvas.height/1.3,50,50);
			}
			else if(timesNextClicked==5){
				nextBackExist=true;
				nextExists=false;
				ctx.drawImage(BackNextButton, myGameArea.canvas.width/7, myGameArea.canvas.height/1.3,50,50);
			}
			else{
				nextExists=true;
				nextBackExist=true;
				ctx.drawImage(nextButton, myGameArea.canvas.width/1.25, myGameArea.canvas.height/1.3,50,50);
				ctx.drawImage(BackNextButton, myGameArea.canvas.width/7, myGameArea.canvas.height/1.3,50,50);
			}
		}
		if(check_backNext(X, Y)&&helpMenu&&nextBackExist){
			timesNextClicked--;	
			ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
			ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50);
			setTimeout(function() {
			ctx.drawImage(helpImage, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
		},75);
			if(timesNextClicked==0){
				nextExists=true;
				nextBackExist=false;
				ctx.drawImage(nextButton, myGameArea.canvas.width/1.25, myGameArea.canvas.height/1.3,50,50);
			}
			else if(timesNextClicked==5){
				nextBackExist=true;
				nextExists=false;
				ctx.drawImage(BackNextButton, myGameArea.canvas.width/7, myGameArea.canvas.height/1.3,50,50);
			}
			else{
				nextExists=true;
				nextBackExist=true;
				ctx.drawImage(nextButton, myGameArea.canvas.width/1.25, myGameArea.canvas.height/1.3,50,50);
				ctx.drawImage(BackNextButton, myGameArea.canvas.width/7, myGameArea.canvas.height/1.3,50,50);
			}		
		}

		switch (timesNextClicked){
			case 0:
				helpImage.src="img/help-Image.png";
				break;
			case 1:
				helpImage.src="img/help-Image3.png";
				break;
			case 2:
				helpImage.src="img/help-Image2.png";
				break;
			case 3:
				helpImage.src="img/help-Image4.png";
				break;
			case 4:
				helpImage.src="img/help-Image5.png";
				break;
			case 5:
				helpImage.src="img/help-Image6.png";
				break;
		}
		if(optionsMenu&&sliderClicked){
			sliderClicked = false;
			sliderDifferencePos=slider-(myGameArea.canvas.width/2.7+1);
			sliderDifferencePosMax=(myGameArea.canvas.width/2.7+myGameArea.canvas.width/3-7.5-1)-(myGameArea.canvas.width/2.7+1);
			volumePrecentage=sliderDifferencePos/sliderDifferencePosMax;
			console.log(volumePrecentage);
			gameOverSound.volume = volumePrecentage;
			dungeonSound.volume = volumePrecentage;
			forestSound.volume = volumePrecentage;
			damageSound.volume = volumePrecentage;
			walkLeftSound.volume = volumePrecentage;
			walkRightSound.volume = volumePrecentage;
			getHeartSound.volume = volumePrecentage;
			orcSound.volume = volumePrecentage;
			dragonSound.volume = volumePrecentage;
			doorSound.volume = volumePrecentage;
			correctSound.volume = volumePrecentage;
			wrongSound.volume = volumePrecentage;
			quizSound.volume = volumePrecentage;
			starSound.volume = volumePrecentage;
			menuSound.volume = volumePrecentage;
			mineSound.volume = volumePrecentage;
			poweUpSound.volume = volumePrecentage;
			spikesSound.volume = volumePrecentage;
			unlockSound.volume = volumePrecentage;
		}
	});
	document.addEventListener('mousedown', function mouseDown(e) {
		var X=e.clientX-myGameArea.canvas.getBoundingClientRect().left;
		var Y=e.clientY-myGameArea.canvas.getBoundingClientRect().top;
		if(check_slider(X,Y)&&optionsMenu){
			sliderClicked = true;
		}
	});
    document.addEventListener('mousemove', function inBox(e) {
		if (menuSound.ended ){
		menuSound.play();
		}
    	var X=e.clientX-myGameArea.canvas.getBoundingClientRect().left;
    	var Y=e.clientY-myGameArea.canvas.getBoundingClientRect().top;
		if(startGameVar == false){
				myGameArea.clear();
				ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);

				if(subMenu==false){
					ctx.drawImage(title, myGameArea.canvas.width/2-titleWidth/1.5,myGameArea.canvas.height/2-titleLength/2,titleWidth,titleLength);
					if (check_start(X, Y)){
						for(i = 0;i<3;i++){
							ctx.drawImage(startGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/3,buttonWidth,buttonHeight); //start clicked
						}
					}
					else{
						ctx.drawImage(startGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/3,buttonWidth,buttonHeight); //start not clicked
					}
					if (check_options(X, Y)){
						for(i = 0;i<3;i++){		
							ctx.drawImage(optionsGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/5,buttonWidth,buttonHeight); //scores clicked
						}
					}
					else{						
						ctx.drawImage(optionsGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/5,buttonWidth,buttonHeight); //options not clicked
					}
					if (check_help(X, Y)){
						for(i = 0;i<3;i++){
							ctx.drawImage(helpGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/14.5,buttonWidth,buttonHeight); //help clicked
						}
					}
					else{
						ctx.drawImage(helpGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/14.5,buttonWidth,buttonHeight); //help non clicked
					}
					if (check_credits(X, Y)){
						for(i = 0;i<3;i++){
							ctx.drawImage(creditGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/15.5,buttonWidth,buttonHeight); //credits clicked
						}
					}
					else{
						ctx.drawImage(creditGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/15.5,buttonWidth,buttonHeight); //credits not clicked
					}
					if (check_exit(X, Y)){
						for(i = 0;i<3;i++){
							ctx.drawImage(exitGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/5,buttonWidth,buttonHeight); //exit clicked
						}						
					}
					else{
						ctx.drawImage(exitGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/5,buttonWidth,buttonHeight); //exit non clicked						
					}
					if(!check_start(X, Y) && !check_options(X,Y) && !check_help(X,Y) && !check_credits(X,Y) && !check_exit(X,Y)){
						myGameArea.canvas.style.cursor = "default";
					}
					else{
						myGameArea.canvas.style.cursor = "pointer";
					}
				}
				else{
					if (check_back(X, Y)){
						for(i = 0;i<3;i++){
							ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50); //exit clicked
						}
					}
					else{
						ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50); //exit non clicked
					}
					if(!check_back(X, Y)){
						myGameArea.canvas.style.cursor = "default";
					}
					else{
						myGameArea.canvas.style.cursor = "pointer";
					}
					if(helpMenu){
						ctx.drawImage(helpImage, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
						if(timesNextClicked==0){
							ctx.drawImage(nextButton, myGameArea.canvas.width/1.25, myGameArea.canvas.height/1.3,50,50);
						}
						else if(timesNextClicked==5){
							ctx.drawImage(BackNextButton, myGameArea.canvas.width/7, myGameArea.canvas.height/1.3,50,50);
						}
						else{
							ctx.drawImage(nextButton, myGameArea.canvas.width/1.25, myGameArea.canvas.height/1.3,50,50);
							ctx.drawImage(BackNextButton, myGameArea.canvas.width/7, myGameArea.canvas.height/1.3,50,50);
						}
						if(check_next(X, Y)){
							if(timesNextClicked!=5){
								for(i=0;i<5;i++){
									ctx.drawImage(nextButton, myGameArea.canvas.width/1.25, myGameArea.canvas.height/1.3,50,50);
								}
							}	
						}
						if(check_backNext(X, Y)){
							if(timesNextClicked!=0){
								for(i=0;i<5;i++){
									ctx.drawImage(BackNextButton, myGameArea.canvas.width/7, myGameArea.canvas.height/1.3,50,50);
								}
							}
						}
						if(timesNextClicked!=0&&timesNextClicked!=5){
							if(!check_backNext(X, Y)&&!check_back(X, Y)&&!check_next(X, Y)){
								myGameArea.canvas.style.cursor = "default";
							}
							else{
								myGameArea.canvas.style.cursor = "pointer";
							}
						}
						else if(timesNextClicked!=0){
							if(!check_backNext(X, Y)&&!check_back(X, Y)){
								myGameArea.canvas.style.cursor = "default";
							}
							else{
								myGameArea.canvas.style.cursor = "pointer";
							}
						}
						else if(timesNextClicked!=5){
							if(!check_next(X, Y)&&!check_back(X, Y)){
								myGameArea.canvas.style.cursor = "default";
							}
							else{
								myGameArea.canvas.style.cursor = "pointer";
							}
						}
					}
					if(creditsMenu){
						ctx.drawImage(creditsImage, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
					}
					if (optionsMenu){
						ctx.drawImage(soundBack, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
						ctx.fillStyle = "lightBlue";
						ctx.fillRect(myGameArea.canvas.width/2.7,myGameArea.canvas.height/2-17,myGameArea.canvas.width/3,myGameArea.canvas.height/50);
						ctx.fillStyle = "blue";
						ctx.fillRect(slider,myGameArea.canvas.height/2-23,15,30);
						if(sliderClicked&&slider>=myGameArea.canvas.width/4&&slider<=myGameArea.canvas.width/4+myGameArea.canvas.width/1.7-7.5){
							slider = X-7.5;
						}
						if(slider<=myGameArea.canvas.width/2.7){
							slider=myGameArea.canvas.width/2.7+1;
						}
						if(slider>=myGameArea.canvas.width/2.7+myGameArea.canvas.width/3-7.5){
							slider=myGameArea.canvas.width/2.7+myGameArea.canvas.width/3-7.5-1;
						}
						if (volumePrecentage==1){
							ctx.drawImage(volume3Image, myGameArea.canvas.width/3, myGameArea.canvas.height/2-20,25,25);
						}
						else if(volumePrecentage<1 && volumePrecentage >= 0.5){
							ctx.drawImage(volume2Image, myGameArea.canvas.width/3, myGameArea.canvas.height/2-20,25,25);;
						}
						else if (volumePrecentage<0.5 && volumePrecentage >0){
							ctx.drawImage(volume1Image, myGameArea.canvas.width/3, myGameArea.canvas.height/2-20,25,25);
						}
						else if(volumePrecentage==0){
							ctx.drawImage(volume0Image, myGameArea.canvas.width/3, myGameArea.canvas.height/2-20,25,25);
						}
					}
            	}
		}
    });
	
}
function draw_menu(){
	ctx.drawImage(startGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/3,buttonWidth,buttonHeight); //start not clicked
	ctx.drawImage(optionsGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/5,buttonWidth,buttonHeight); //options not clicked
	ctx.drawImage(helpGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2-myGameArea.canvas.height/14.5,buttonWidth,buttonHeight);
	ctx.drawImage(creditGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/15.5,buttonWidth,buttonHeight); //credits not clicked
	ctx.drawImage(exitGameImage, myGameArea.canvas.width/1.3-buttonWidth/2,myGameArea.canvas.height/2+myGameArea.canvas.height/5,buttonWidth,buttonHeight); //exit non clicked
	ctx.drawImage(title, myGameArea.canvas.width/2-titleWidth/1.5,myGameArea.canvas.height/2-titleLength/2,titleWidth,titleLength);
}
function check_start(x,y){
	if ((x>= myGameArea.canvas.width/1.3-buttonWidth/2 && x<= myGameArea.canvas.width/1.3-buttonWidth/2+buttonWidth)&&(y >= myGameArea.canvas.height/2-myGameArea.canvas.height/3 && y <= myGameArea.canvas.height/2-myGameArea.canvas.height/3+buttonHeight)){
		return true;
	}
	return false;
}

function check_options(x,y){
	if ((x>= myGameArea.canvas.width/1.3-buttonWidth/2 && x<= myGameArea.canvas.width/1.3-buttonWidth/2+buttonWidth)&&(y >= myGameArea.canvas.height/2-myGameArea.canvas.height/5 && y <= myGameArea.canvas.height/2-myGameArea.canvas.height/5+buttonHeight)){
		return true;
	}
	return false;
}

function check_help(x,y){
	if ((x>= myGameArea.canvas.width/1.3-buttonWidth/2 && x<= myGameArea.canvas.width/1.3-buttonWidth/2+buttonWidth)&&(y>= myGameArea.canvas.height/2-myGameArea.canvas.height/14.5 && y<= myGameArea.canvas.height/2-myGameArea.canvas.height/14.5+buttonHeight)){
		return true;
	}
	return false;
}

function check_credits(x,y){
	if ((x>= myGameArea.canvas.width/1.3-buttonWidth/2 && x<= myGameArea.canvas.width/1.3-buttonWidth/2+buttonWidth)&&(y>= myGameArea.canvas.height/2+myGameArea.canvas.height/15.5 && y<= myGameArea.canvas.height/2+myGameArea.canvas.height/15.5+buttonHeight)){
		return true;
	}
	return false;
}

function check_exit(x,y){
	if ((x>= myGameArea.canvas.width/1.3-buttonWidth/2 && x<= myGameArea.canvas.width/1.3-buttonWidth/2+buttonWidth)&&(y>= myGameArea.canvas.height/2+myGameArea.canvas.height/5 && y<= myGameArea.canvas.height/2+myGameArea.canvas.height/5+buttonHeight)){
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
	if ((x>= slider-1 && x<= slider+15)&&(y>=myGameArea.canvas.height/2-23 && y<= myGameArea.canvas.height/2-23+30)){
		return true;
	}
	return false;
}

function check_next(x,y){
	if ((x>= myGameArea.canvas.width/1.25 && x<= myGameArea.canvas.width/1.25+50)&&(y>=myGameArea.canvas.height/1.3 && y<= myGameArea.canvas.height/1.3+50)){
		return true;
	}
	return false;
}

function check_backNext(x,y){
	if ((x>= myGameArea.canvas.width/7 && x<= myGameArea.canvas.width/7+50)&&(y>=myGameArea.canvas.height/1.3 && y<= myGameArea.canvas.height/1.3+50)){
		return true;
	}
	return false;
}
function help(){
	ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
	ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50);
	ctx.drawImage(helpImage, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
	ctx.drawImage(nextButton, myGameArea.canvas.width/1.25, myGameArea.canvas.height/1.3,50,50);
}
function options(){
	ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
	ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50);
	ctx.drawImage(soundBack, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
	ctx.drawImage(volume3Image, myGameArea.canvas.width/3, myGameArea.canvas.height/2-20,25,25);
	ctx.fillStyle = "lightBlue";
	ctx.fillRect(myGameArea.canvas.width/2.7,myGameArea.canvas.height/2-17,myGameArea.canvas.width/3,myGameArea.canvas.height/50);
	ctx.fillStyle = "blue";
	ctx.fillRect(slider-1,myGameArea.canvas.height/2-23,15,30);
}
function credits(){
	ctx.drawImage(backImage, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
	ctx.drawImage(backButtonImage, myGameArea.canvas.width/7.5, myGameArea.canvas.height/5.5,50,50);
	ctx.drawImage(creditsImage, myGameArea.canvas.width/2-helpImageWidth/2, myGameArea.canvas.height/2-helpImageLength/2,helpImageWidth,helpImageLength);
}