var first_level = true;
var myEnemy = [];
var enemy_amount = 1;
var spikes_counter = 2;
var squareSurface = 70;
var mazeWidth;
var mazeHeight;
var locationX;
var locationY;
var enemy_locationX = [];
var enemy_locationY = [];
var level_counter = 0;
var end =false;
var dungeonSound = new Audio();
dungeonSound.src= "mp3/06 - Underground.mp3";
var forestSound = new Audio();
forestSound.src= "mp3/06 - Kokiri Forest.mp3";
function turn_to_2d(){
	for (n=0;n<mazeHeight;n++) {
 myObstacle[n]=new Array();
  map[n]=new Array();
  visible[n] = new Array();
  temp_visible[n] = new Array();
 for (m=0;m<mazeWidth;m++) {
  myObstacle[n][m]=0;
  map[n][m]=0;
  visible[n][m] = false;
  temp_visible[n][m] = false;
 }
}
}
function turn_to_3d(){
	for (j = 0; j < enemy_amount; j++){
	visited[j] = new Array();
	for (n = 0; n < mazeHeight; n++){
		visited[j][n] = new Array();
		for (m = 0; m < mazeWidth; m++){
			visited[j][n][m];
		}
	}
}
}
function create_enemies(){
	for (t = 0; t < enemy_amount; t++){
	fire_ball[t] = 0;
	enemy_foot[t] = 0;
	fire_timer[t] = 0;
	enemy_look[t] = "down";
	enemy_direction[t] = new Array();
	for (v = 0; v < 4; v++){
		enemy_direction[t][v] = 0;
	}
	enemy_direction[t].length = 0;
}
	for (t = 0; t < enemy_amount; t++){
		get_location();
		enemy_locationX[t] = locationX
		enemy_locationY[t] = locationY
		myEnemy[t] = new component(squareSurface/2, squareSurface/2, "enemy", myObstacle[locationY][locationX].x + squareSurface/5  , myObstacle[locationY][locationX].y + squareSurface/5, t );
		move_to_x[t] = myObstacle[locationY][locationX].x + squareSurface/5;
		move_to_y[t] = myObstacle[locationY][locationX].y + squareSurface/5;
	}
}

function startGame() {
	 findMazeSize();
	myGameArea.start();
    myGameArea.interval = setInterval(updateGameArea, 25);
	turn_to_2d();
	turn_to_3d();
	sketch_map();
    draw_map();
	get_location();
	myGamePiece = new component(squareSurface/2, squareSurface/2, "hero", myObstacle[locationY][locationX].x + 4 , myObstacle[locationY][locationX].y + 4 );
	create_enemies();
}
function findMazeSize(){
	mazeWidth = Math.floor ((canvasWidth - squareSurface/2)  / squareSurface);
	 mazeHeight = Math.floor ((canvasHeight - squareSurface/2) / squareSurface);
	mazeWidth = Math.floor (canvasWidth / squareSurface);
	 mazeHeight = Math.floor ((canvasHeight - squareSurface) / squareSurface);
	 if (mazeHeight % 2 == 0){
		 mazeHeight--;
	 }
	 if (mazeWidth % 2 == 0){
		mazeWidth--;
	 }
}
function reset_game(){
	squareSurface -= 20;
	//velocity ++;
	level_counter++;
	enemy_amount+= 3;
	spikes_counter+= 4;
	if (level_counter === 2){
		velocity++;
	}
	if (level_counter === 3){
		forestSound.pause();
		dungeonSound.play();
		spikes_counter = 2;
		enemy_amount = 1;
		squareSurface = 70;
		velocity = 2;
		first_level = false;
	}
	findMazeSize();
	turn_to_2d();
	turn_to_3d();
	create_enemies();
	myGameArea.start();
	end = false;
	sketch_map();
	draw_map();
	get_location();
	myGamePiece = new component(squareSurface/2, squareSurface/2, "hero", myObstacle[locationY][locationX].x + 4 , myObstacle[locationY][locationX].y + 4 );
	for (t = 0; t < enemy_amount; t++){
		get_location();
		enemy_locationX[t] = locationX
		enemy_locationY[t] = locationY
		myEnemy[t].x = myObstacle[locationY][locationX].x + squareSurface/5;
		myEnemy[t].y = myObstacle[locationY][locationX].y + squareSurface/5;
		move_to_x[t] = myObstacle[locationY][locationX].x + squareSurface/5;
		move_to_y[t] = myObstacle[locationY][locationX].y + squareSurface/5;
	}
}
function get_location(){
	do {
	locationX = Math.floor(Math.random() * mazeWidth );
	locationY = Math.floor(Math.random() * mazeHeight );
	}
	while (map[locationY][locationX] !== 0);
}