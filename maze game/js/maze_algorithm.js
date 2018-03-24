var myObstacle =new Array();//This are going to be the obstacles
var map = new Array();//This is going to be the maze written with, 0, 1 and 2, then the program will translate it into squares
var posX;//x position of the square that the program is going to modify in order to create the map
var posY;//y position of the square that the program is going to modify in order to create the map
//This function will manage the algorithm that will write ones, or zeroes to the screen
var direction = [];//This array will be used to generate random mazes,
// it will tell the program what paths can it follow
var last_px = [];//This two arrays will let the program remember where are the squares that it has already
var last_py = [];//modify in order to make more than just one path
move = 0;//This variable will make the last_p arrays work
function sketch_map(){
	//This for loop will set all the elements of map to 1,
//	basically how this algorithm works is that you start from a canvas fll of squares and the algorithm "carves" the maze
	for (v = 0; v < mazeHeight; v++){
		for(n = 0; n < mazeWidth; n++){
		map[v][n] = 1;
		}
	}
	//Set he beggining position of the algorithm at map[1][1]
	posX = 1;
	posY = 1;
	map[posX][posY] = 0;
	/*How this algorithm works is like this:
	1. State a beginning position
	2. Check what directions can you choose to go from that direction
	3. If there are directions available choose one randomly
	4. Continue till there are not directions available
	5. When there aren't any new directions available follow your path backwards till you find new directions
	6. Continue from step 2
	7. If there aren´t any new directions in the maze you have finished*/
	do {
	while(check_carve()){
		carve();
		direction.length = 0;
	} 
	} while (!ultimate_check());
	
  }
  //Check if there's any direction that you can choose
  function check_carve (){
	var direction_carve = false;
	//Check if you can go north
	if (posY - 2 > 0 && map[posY - 2][posX] == 1 && map[posY-1][posX] == 1){
		direction.push("N");
		direction_carve = true;
	}
	//Check if you can go south
	if (posY + 2 < mazeHeight && map[posY + 2][posX] == 1 && map[posY +1][posX] == 1){
		direction.push("S");
		direction_carve = true;
	}
	//Check if you can go west
	if (posX - 2 > 0 && map[posY][posX - 2] == 1 && map[posY][posX - 1] == 1){
		direction.push("W");
		direction_carve = true;
	}
	//Check if you can go east
	if (posX + 2 < mazeWidth && map[posY][posX + 2] && map[posY][posX + 1] == 1){ 
		direction.push("E");
		direction_carve = true;
	}
	//Output there are any directions available
	return direction_carve;
}
//Follow your path backwards
function ultimate_check(){
	var end_sketching = true;
	move--;
	//If you can keep following backwards the path
	if (move !== 0){
	posY = last_py[move];//Go to the last square that you carved
	posX = last_px[move];
	end_sketching = false;
	}
	//Output if there's still path for you to follow
	return end_sketching;
	
}
//Carve the maze, carving is done by changing the values of map from 1 to 0
function carve(){
//	Pick your available directions and choose one randomly
	var choose= Math.floor(Math.random() * direction.length);
	last_py[move] = posY;//Record your square
	last_px[move] = posX;
	switch (direction[choose]){
	//	carve the squares at your left
		case "W":
		map[posY][posX-1] = 0;
		map[posY][posX-2] = 0;
		posX -= 2;
		break;
		// carve the squares at your right
	case "E":
		map[posY][posX+1] = 0;
		map[posY][posX+2] = 0;
		posX +=2;
		break;
		//carve the squares over you
	case "N":
		map[posY-1][posX] = 0;
		map[posY-2][posX] = 0;
		last_py[move] = posY;
		posY -= 2;
		break;
		//carve the squares under you
	case "S":
		map[posY+1][posX] = 0;
		map[posY+2][posX] = 0;
		posY += 2;
		break;
	}
	move++;
}
//This fuction will translate the 1 and 0, of the map array into objects inside the myObstacle array
function draw_map(){
	var counter = 0;
	var horizontal = 0;//horizontal coordinates
	var vertical = 0;//vertical coordinates
	//Look all the values of the map array
	var finish_line_location = Math.floor(Math.random() * 3 );
	switch  (finish_line_location){
	case 0:
		map[0][1] = 2;
		break;
	case 1:
		map[0][mazeWidth - 2] = 2;
		break;
	case 2:
		map[mazeHeight - 2][0] = 2;
		break;
	case 3:
		map[mazeHeight - 2][mazeWidth - 1] = 2;
		break;
	}
	for (var y = 0;  y < mazeHeight; y++){
		for (var x = 0; x < mazeWidth; x++){
			if (counter < spikes_counter){
			get_location();
			map[locationY][locationX] = 4;
			counter++;
			}
			switch (map[y][x]){
			case 0:
				myObstacle[y][x] = new component (squareSurface, squareSurface, "ground", horizontal, vertical);
				break;
			case 1:
				myObstacle[y][x] = new component (squareSurface, squareSurface, "wall", horizontal, vertical);
				break;
			case 2:
				myObstacle[y][x] = new component (squareSurface, squareSurface, "sign", horizontal, vertical);
				break;
			case 3:
				myObstacle[y][x] = new component (squareSurface, squareSurface, "question", horizontal, vertical);
				break;
			case 4:
				myObstacle[y][x] = new component (squareSurface, squareSurface, "spikes", horizontal, vertical);
				break;
			}
			horizontal += squareSurface;
			}
		horizontal = 0;
		vertical += squareSurface;
		}
}