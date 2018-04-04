var visible = new Array();
var tempVisible = new Array();
var first = false;
var second = false;
var third = false;

function visibility (){
	var heroVision = 3;
	var heroX;
	var heroY;
	for (v = 0; v < mazeHeight; v++){
		for (b = 0; b < mazeWidth; b++){
			tempVisible[v][b] = false;
			visible[v][b] = false;
			if ((myGamePiece.x >= myObstacle[v][b].x && myGamePiece.x <= myObstacle[v][b].x + squareSurface) &&
			(myGamePiece.y >= myObstacle[v][b].y && myGamePiece.y <= myObstacle[v][b].y + squareSurface)){
				heroX = b;
				heroY = v;
			}
		}
	}
	if (((myGameArea.keys && myGameArea.keys[90]) || first) || !cameraPresentation){
		first = true;
	for (t = 0; t < mazeHeight; t++){
		for (u = 0; u < mazeWidth; u++){
			if (u === heroX && (t >= heroY - heroVision && t <= heroY + heroVision)){
				visible[t][u] = true;
			}
			else if (t === heroY && (u >= heroX - heroVision && u <= heroX + heroVision)){
			 visible[t][u] = true;
			}
		}
	}
	if (((myGameArea.keys && myGameArea.keys[88]) || second) ||!cameraPresentation ){
		second = true;
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
	if (((myGameArea.keys && myGameArea.keys[67]) || third) || !cameraPresentation){
		third = true;
	for (t = 0; t < mazeHeight; t++){
		for (u = 0; u < mazeWidth; u++){
			if (visible[t][u]){
				if (u === heroX){
					if (u + 1 < mazeWidth) {
						tempVisible[t][u + 1] = true;
					}
					if (u - 1 >= 0) {
						tempVisible[t][u - 1] = true;
					}
				}
				else if (t === heroY){
					if (t + 1 < mazeHeight) {
						tempVisible[t + 1][u] = true;
					}
					if (t - 1 >= 0) {
						tempVisible[t - 1][u] = true;
					}
				}
			}
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
				if (visible[coordinateY][coordinateX] || tempVisible[coordinateY][coordinateX]){
				block= false;
			}
			}
		}
	}
	return block;
}