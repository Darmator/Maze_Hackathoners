
var visited = new Array();
var moveToX = [];
var moveToY = [];
var enemyLook = [];
var enemyDirection = [];
var enemyVelocity;

function check_enemyDirection(number){
	visited[number][enemyLocationY[number]][enemyLocationX[number]] = true;
	var walk = false;
	if ((map[enemyLocationY[number] - 1][enemyLocationX[number]] == 0)&&
		/*(map[enemyLocationY[number] - 1][enemyLocationX[number]] != 2)&&*/ !visited[number][enemyLocationY[number] - 1][enemyLocationX[number]]){
		enemyDirection[number].push("N");
		walk = true;
	}
	if ((map[enemyLocationY[number] + 1][enemyLocationX[number]] == 0) &&
	/*(map[enemyLocationY[number] + 1][enemyLocationX[number]] != 2)&&*/	!visited[number][enemyLocationY[number] + 1][enemyLocationX[number]]){
		enemyDirection[number].push("S");
		walk = true
	}
	if ((map[enemyLocationY[number]][enemyLocationX[number] - 1] == 0) &&
		/*(map[enemyLocationY[number]][enemyLocationX[number] - 1] != 2)&&*/!visited[number][enemyLocationY[number]][enemyLocationX[number] - 1]){
		enemyDirection[number].push("W");
		walk = true;
	}
	if ((map[enemyLocationY[number]][enemyLocationX[number] + 1] == 0) &&
		/*(map[enemyLocationY[number]][enemyLocationX[number] + 1] != 2)&&*/ !visited[number][enemyLocationY[number]][enemyLocationX[number] + 1]){
		enemyDirection[number].push("E");
		walk = true;
	}
	if (!walk) {
		for (n = 0; n < mazeHeight; n++){
			for (m = 0; m < mazeWidth; m++){
				visited[number][n][m] = false;
			}
		}
	}
}
function enemy_move(number){
	if (velocity >1){
		enemyVelocity = velocity - 1;
	}
	myEnemy[number].speedX = 0;
	myEnemy[number].speedY = 0;
	var choose_direction = Math.floor(Math.random() * enemyDirection[number].length );
	switch (enemyDirection[number][choose_direction]){
	case "N":
		enemyLook[number] = "up";
		myEnemy[number].speedY = -enemyVelocity;
		enemyLocationY[number]--;
		moveToY[number] = myObstacle[enemyLocationY[number]][enemyLocationX[number]].y + squareSurface/5;
		break;
	case "S":
		enemyLook[number] = "down";
		myEnemy[number].speedY = enemyVelocity;
		enemyLocationY[number]++;
		moveToY[number] = myObstacle[enemyLocationY[number]][enemyLocationX[number]].y + squareSurface/5;
		break;
	case "W":
		enemyLook[number] = "left";
		myEnemy[number].speedX = -enemyVelocity;
		enemyLocationX[number]--;
		moveToX[number] = myObstacle[enemyLocationY[number]][enemyLocationX[number]].x + squareSurface/5;
		break;
	case "E":
		enemyLook[number] = "right";
		myEnemy[number].speedX = enemyVelocity;
		enemyLocationX[number]++;
		moveToX[number] = myObstacle[enemyLocationY[number]][enemyLocationX[number]].x + squareSurface/5;
		break;
	}
	enemyDirection[number].length = 0;
}