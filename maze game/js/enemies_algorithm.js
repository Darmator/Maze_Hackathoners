
var visited = new Array();
var move_to_x = [];
var move_to_y = [];
var enemy_look = [];
var enemy_direction = [];

function check_enemy_direction(number){
	visited[number][enemy_locationY[number]][enemy_locationX[number]] = true;
	var walk = false;
	if (map[enemy_locationY[number] - 1][enemy_locationX[number]] === 0 && !visited[number][enemy_locationY[number] - 1][enemy_locationX[number]]){
		enemy_direction[number].push("N");
		walk = true;
	}
	if (map[enemy_locationY[number] + 1][enemy_locationX[number]] === 0 && !visited[number][enemy_locationY[number] + 1][enemy_locationX[number]]){
		enemy_direction[number].push("S");
		walk = true
	}
	if (map[enemy_locationY[number]][enemy_locationX[number] - 1] === 0 && !visited[number][enemy_locationY[number]][enemy_locationX[number] - 1]){
		enemy_direction[number].push("W");
		walk = true;
	}
	if (map[enemy_locationY[number]][enemy_locationX[number] + 1] === 0 && !visited[number][enemy_locationY[number]][enemy_locationX[number] + 1]){
		enemy_direction[number].push("E");
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
	myEnemy[number].speedX = 0;
	myEnemy[number].speedY = 0;
	var choose_direction = Math.floor(Math.random() * enemy_direction[number].length );
	switch (enemy_direction[number][choose_direction]){
	case "N":
		enemy_look[number] = "up";
		myEnemy[number].speedY = -1;
		enemy_locationY[number]--;
		move_to_y[number] = myObstacle[enemy_locationY[number]][enemy_locationX[number]].y + squareSurface/5;
		break;
	case "S":
		enemy_look[number] = "down";
		myEnemy[number].speedY = 1;
		enemy_locationY[number]++;
		move_to_y[number] = myObstacle[enemy_locationY[number]][enemy_locationX[number]].y + squareSurface/5;
		break;
	case "W":
		enemy_look[number] = "left";
		myEnemy[number].speedX = -1;
		enemy_locationX[number]--;
		move_to_x[number] = myObstacle[enemy_locationY[number]][enemy_locationX[number]].x + squareSurface/5;
		break;
	case "E":
		enemy_look[number] = "right";
		myEnemy[number].speedX = 1;
		enemy_locationX[number]++;
		move_to_x[number] = myObstacle[enemy_locationY[number]][enemy_locationX[number]].x + squareSurface/5;
		break;
	}
	enemy_direction[number].length = 0;
}