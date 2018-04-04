var lives;
var maxLives;
var immunity = false;
var subsLive = false;
var damageSound = new Audio();
damageSound.src = "mp3/LTTP_Link_Hurt.wav";
var enemyDieSound = new Audio();
enemyDieSound.src = "mp3/enemy die.mp3";

function check_obstacle_crash(i, b, object) {
    var any_crash = false;
    if (object.crashLeft(myObstacle[i][b])) {
        crashLeft = true;
        any_crash = true;
    }
    if (object.crashRight(myObstacle[i][b])) {
        crashRight = true;
        any_crash = true;
    }
    if (object.crashTop(myObstacle[i][b])) {
        crashTop = true;
        any_crash = true;
    }
    if (object.crashBottom(myObstacle[i][b])) {
        crashBottom = true;
        any_crash = true;
    }
    return any_crash;
}

function check_enemy_crash(number) {
	var anyCrash = false;
    if (myGamePiece.crashLeft(myEnemy[number]) && !immunity) {
        anyCrash = true;
    }
    if (myGamePiece.crashRight(myEnemy[number])&& !immunity) {
        anyCrash = true;
    }
    if (myGamePiece.crashTop(myEnemy[number])&& !immunity) {
        anyCrash = true;
    }
    if (myGamePiece.crashBottom(myEnemy[number])&& !immunity) {
        anyCrash = true;
    }
	if (anyCrash){
		if (invencible){
			enemyDieSound.play();
			myEnemy[number] = "dead";
		}
		else {
			subsLive = true;
		}
	}
}

function check_flame_death(number) {
    if ((fire_ball[number].x >= myGamePiece.x && fire_ball[number].x <= myGamePiece.x + myGamePiece.width) &&
        (fire_ball[number].y >= myGamePiece.y && fire_ball[number].y <= myGamePiece.y + myGamePiece.height) && !immunity ) {
        subsLive = true;
    }
	if ((myGamePiece.x >= fire_ball[number].x && myGamePiece.x <= fire_ball[number].x + fire_ball[number].width) &&
		(myGamePiece.y >= fire_ball[number].y && myGamePiece.y <= fire_ball[number].y + fire_ball[number].height)&& !immunity  ){
		subsLive = true;
		}
}

function check_spikes_crash(i, b) {
    if ((myGamePiece.x >= myObstacle[i][b].x - 20&& myGamePiece.x <= myObstacle[i][b].x + squareSurface - 10) &&
        (myGamePiece.y >= myObstacle[i][b].y - 20 && myGamePiece.y <= myObstacle[i][b].y + squareSurface - 25) && !immunity && !invencible) {
        return true;
    }
    return false;
}

function check_flame_crash(number) {
    for (f = 0; f < mazeHeight; f++) {
        for (u = 0; u < mazeWidth; u++) {
            if ((fire_ball[number].x >= myObstacle[f][u].x && fire_ball[number].x <= myObstacle[f][u].x + squareSurface) &&
                (fire_ball[number].y >= myObstacle[f][u].y && fire_ball[number].y <= myObstacle[f][u].y + squareSurface) && map[f][u] === 1) {
                fire_ball[number] = 0;
            }
        }
    }
}
function erase(i, b){
	myObstacle[i][b].color  = "ground";
	map[i][b] = 0;
}
