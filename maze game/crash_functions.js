var death = false;

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
    if (myGamePiece.crashLeft(myEnemy[number])) {
        death = true;
    }
    if (myGamePiece.crashRight(myEnemy[number])) {
        death = true;
    }
    if (myGamePiece.crashTop(myEnemy[number])) {
        death = true;
    }
    if (myGamePiece.crashBottom(myEnemy[number])) {
        death = true;
    }
}

function check_flame_death(number) {
    if ((fire_ball[number].x >= myGamePiece.x && fire_ball[number].x <= myGamePiece.x + myGamePiece.width) &&
        (fire_ball[number].y >= myGamePiece.y && fire_ball[number].y <= myGamePiece.y + myGamePiece.height)) {
        death = true;
    }
}

function check_spikes_crash(i, b) {
    var spikes_crash = false;
    if ((myGamePiece.x >= myObstacle[i][b].x - 20&& myGamePiece.x <= myObstacle[i][b].x + squareSurface - 10) &&
        (myGamePiece.y >= myObstacle[i][b].y - 15 && myGamePiece.y <= myObstacle[i][b].y + squareSurface - 20)) {
        spikes_crash = true;
    }
    return spikes_crash;
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