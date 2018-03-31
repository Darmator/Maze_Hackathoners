var chosenPowerUp;
var extraVelocity = 0;
var activePowerUp = false;
var powerUpMove = 0;
var invencibleCounter = 0;
var invencible = false;
var pickaxeCounter = 0;
var ultravision = false;
var starSound = new Audio();
starSound.src = "mp3/star.mp3";
var mineSound = new Audio();
mineSound.src = "mp3/mine.mp3";
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
		getHeartSound.play();
		maxLives += 2;
		lives += 2;
		powerUpMove+=2
		break;
	case 4:
		ultravision = true;
		break;
	}
	activePowerUp = true;
}
function usePowerUp(number){
	switch (number){
		case 0:
			invencibleCounter++;
			if (invencibleCounter > 500){
				starSound.pause();
				playBackgroundMusic();
				invencible = false;
				extraVelocity = 0;
				invencibleCounter = 0;
				activePowerUp = false;
			}
			break;
		case 1:
			var tempXLoc;
			var tempYLoc;
			if (myGameArea.keys && myGameArea.keys[32]){
				for (f = 0; f < mazeHeight; f++){
					for( g = 0; g < mazeWidth; g++){
						if (myGamePiece.x >= myObstacle[f][g].x && myGamePiece.x <= myObstacle[f][g].x + squareSurface &&
						myGamePiece.y >= myObstacle[f][g].y && myGamePiece.y <= myObstacle[f][g].y + squareSurface){
							tempYLoc = f;
							tempXLoc = g;
						}
					}
				}
				console.log(tempYLoc);
				console.log(tempXLoc);
				console.log(map[tempYLoc + 1][tempXLoc]);
				switch (hero_look){
				case "down":
					if (map[tempYLoc + 1][tempXLoc] == 1 && tempYLoc + 1 < mazeHeight - 1){
						erase(tempYLoc+1, tempXLoc);
						mineSound.play();
						pickaxeCounter++;
					}
					break;
				case "up":
					if (map[tempYLoc - 1][tempXLoc] == 1 && tempYLoc - 1 > 0){
						erase(tempYLoc-1, tempXLoc);
						mineSound.play();
						pickaxeCounter++;
					}
					break;
				case "right":
					if (map[tempYLoc][tempXLoc + 1] == 1 && tempXLoc + 1 < mazeWidth - 1){
						erase(tempYLoc, tempXLoc + 1);
						mineSound.play();
						pickaxeCounter++;
					}
					break;
				case "left":
					if (map[tempYLoc][tempXLoc - 1] == 1 && tempXLoc - 1 > 0){
						erase(tempYLoc, tempXLoc - 1);
						mineSound.play();
						pickaxeCounter++;
					}
					break;
				}
			}
			if (pickaxeCounter >= 3){
				activePowerUp = false;
				pickaxeCounter = 0;
				
			}
			break;
	}
}