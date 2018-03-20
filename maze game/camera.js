var visible = new Array();
var temp_visible = new Array();

function visibility (){
	var hero_vision = 3;
	var heroX;
	var heroY;
	for (v = 0; v < mazeHeight; v++){
		for (b = 0; b < mazeWidth; b++){
			temp_visible[v][b] = false;
			visible[v][b] = false;
			if ((myGamePiece.x >= myObstacle[v][b].x && myGamePiece.x <= myObstacle[v][b].x + squareSurface) &&
			(myGamePiece.y >= myObstacle[v][b].y && myGamePiece.y <= myObstacle[v][b].y + squareSurface)){
				heroX = b;
				heroY = v;
			}
		}
	}
	
	for (t = 0; t < mazeHeight; t++){
		for (u = 0; u < mazeWidth; u++){
			if (u === heroX && (t >= heroY - hero_vision && t <= heroY + hero_vision)){
				visible[t][u] = true;
			}
			else if (t === heroY && (u >= heroX - hero_vision && u <= heroX + hero_vision)){
			 visible[t][u] = true;
			}
		}
	}
	for (t = 0; t < mazeHeight; t++){
		for (u = 0; u < mazeWidth; u++){
			if (visible[t][u]){
				if (u > heroX + 1 &&(map[t][u - 1] === 1 || map[t][u - 2] === 1)){
					visible[t][u] = false;
				}
				else if (u < heroX - 1 &&(map[t][u + 1] === 1 || map[t][u + 2] === 1)){
					visible[t][u] = false;
				}
				else if (t > heroY + 1 &&(map[t - 1][u] === 1 || map[t - 2][u] === 1)){
					visible[t][u] = false;
				}
				else if (t < heroY - 1 &&(map[t + 1][u] === 1 || map[t + 2][u] === 1)){
					visible[t][u] = false;
				}
			}
		}
	}
	for (t = 0; t < mazeHeight; t++){
		for (u = 0; u < mazeWidth; u++){
			if (visible[t][u]){
				if (u === heroX){
					if (u + 1 < mazeWidth) {
						temp_visible[t][u + 1] = true;
					}
					if (u - 1 >= 0) {
						temp_visible[t][u - 1] = true;
					}
				}
				else if (t === heroY){
					if (t + 1 < mazeHeight) {
						temp_visible[t + 1][u] = true;
					}
					if (t - 1 >= 0) {
						temp_visible[t - 1][u] = true;
					}
				}
			}
		}
	}
}
function block_vision( x, y){
	var block = true;
	var coordinateX;
	var coordinateY;
	for (v = 0; v < mazeHeight; v++){
		for (b = 0; b < mazeWidth; b++){
			if ((x + 5 >= myObstacle[v][b].x && x + 5 <= myObstacle[v][b].x + squareSurface) && (y + 5 >= myObstacle[v][b].y && y + 5 <= myObstacle[v][b].y + squareSurface)){
				coordinateX = b;
				coordinateY = v;
				if (visible[coordinateY][coordinateX] || temp_visible[coordinateY][coordinateX]){
				block= false;
			}
			}
		}
	}
	return block;
}