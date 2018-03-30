var chosenPowerUp;
var extraVelocity = 0;
var activePowerUp = false;
var powerUpMove = 0;
var invencibleCounter = 0;
var invencible = false;
var starSound = new Audio();
starSound.src = "mp3/star.mp3";
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
		break;
	case 2:
		extraVelocity = 2;
		break;
	case 3:
		maxLives += 2;
		lives += 2;
		powerUpMove+=2
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
			break;
	}
}