var chosenPowerUp;
var extraVelocity = 0;
var activePowerUp = false;
var powerUpMove = 0;
var invencibleCounter = 0;
var invencible = false;
var pickaxeCounter = 0;
var ultravision = false;
var extraPickaxe = true;
var starSound = new Audio();
starSound.src = "mp3/star.mp3";
var mineSound = new Audio();
mineSound.src = "mp3/mine.mp3";
var poweUpSound = new Audio();
poweUpSound.src = "mp3/powerUp.wav";
function activatePower(number){
	switch (number){
	case 0:
		forestSound.pause();
		dungeonSound.pause();
		starSound.play();
		extraVelocity = 1;
		invencible = true;
		break;
	case 1:
		pickaxeImage.src = "img/pickaxeDiamond.png";
		pickaxeCounter = 0;
		break;
	case 2:
		extraVelocity = 2;
		break;
	case 3:
		maxLives += 2;
		lives += 2;
		powerUpMove+=2
		break;
	case 4:
		ultravision = true;
		break;
	}
	activePowerUp = true;
	poweUpSound.play();
}
function usePowerUp(number){
	switch (number){
		case 0:
			invencibleCounter++;
			if (invencibleCounter > 500){
				starOff();
			}
			break;
		case 1:
			if (myGameArea.keys && myGameArea.keys[32]){
				if (mine()){
					pickaxeCounter++;
				}
			}
			if (pickaxeCounter >= 3){
				activePowerUp = false;
				pickaxeCounter = 0;
				
			}
			break;
	}
}
function starOff(){
	starSound.pause();
	playBackgroundMusic();
	invencible = false;
	extraVelocity = 0;
	invencibleCounter = 0;
	activePowerUp = false;
}
function mine(){
	var tempXLoc;
	var tempYLoc;
			
				for (f = 0; f < mazeHeight; f++){
					for( g = 0; g < mazeWidth; g++){
						if (myGamePiece.x >= myObstacle[f][g].x && myGamePiece.x <= myObstacle[f][g].x + squareSurface &&
						myGamePiece.y >= myObstacle[f][g].y && myGamePiece.y <= myObstacle[f][g].y + squareSurface){
							tempYLoc = f;
							tempXLoc = g;
						}
					}
				}
				switch (hero_look){
				case "down":
					if (map[tempYLoc + 1][tempXLoc] == 1 && tempYLoc + 1 < mazeHeight - 1){
						erase(tempYLoc+1, tempXLoc);
						mineSound.play();
						return true;
					}
					break;
				case "up":
					if (map[tempYLoc - 1][tempXLoc] == 1 && tempYLoc - 1 > 0){
						erase(tempYLoc-1, tempXLoc);
						mineSound.play();
						return true;
					}
					break;
				case "right":
					if (map[tempYLoc][tempXLoc + 1] == 1 && tempXLoc + 1 < mazeWidth - 1){
						erase(tempYLoc, tempXLoc + 1);
						mineSound.play();
						return true;
					}
					break;
				case "left":
					if (map[tempYLoc][tempXLoc - 1] == 1 && tempXLoc - 1 > 0){
						erase(tempYLoc, tempXLoc - 1);
						mineSound.play();
						return true;
					}
					break;
				}
				return false;
}