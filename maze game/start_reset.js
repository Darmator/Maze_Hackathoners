var first_level = true;
var myEnemy = [];
var enemy_amount = 0;
var spikes_counter = 1;
var mazeWidth = 19;//Width of the maze  WRITE IN THIS TWO VARIABLES ODD NUMBERS min 17
var mazeHeight = 7;//Heigth of the maze min 7
var squareSurface = 52;//length of one square WRITE IN THIS VARIABLE WITH EVEN NUMBERS
var locationX;
var locationY;
var enemy_locationX = [];
var enemy_locationY = [];
var level_counter = 0;

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
		myEnemy[t] = new component(squareSurface/2, squareSurface/2, "enemy", myObstacle[locationY][locationX].x  , myObstacle[locationY][locationX].y, t );
		move_to_x[t] = myObstacle[locationY][locationX].x ;
		move_to_y[t] = myObstacle[locationY][locationX].y ;
	}
}
    
//Start the game
function startGame() {
	myGameArea.start();//Load the canvas and all that stuff
    myGameArea.interval = setInterval(updateGameArea, 20);
	turn_to_2d();
	turn_to_3d();
	sketch_map();//Write 0, 1 and 2, inside the map array using an algorithm
    draw_map();//Translate the map array into objects and store it into my obstacle array
	get_location();
	myGamePiece = new component(squareSurface/2, squareSurface/2, "hero", myObstacle[locationY][locationX].x + 4 , myObstacle[locationY][locationX].y + 4 );
	create_enemies();
}
function reset_game(){
	mazeHeight += 2;
	mazeWidth += 2;
	level_counter++;
	enemy_amount++;
	spikes_counter++;
	if (level_counter === 3){
		spikes_counter = 2;
		enemy_amount = 1;
		mazeWidth = 19;
		mazeHeight = 7;
		first_level = false;
	}
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
		myEnemy[t].x = myObstacle[locationY][locationX].x;
		myEnemy[t].y = myObstacle[locationY][locationX].y;
		move_to_x[t] = myObstacle[locationY][locationX].x ;
		move_to_y[t] = myObstacle[locationY][locationX].y ;
	}
}
function get_location(){
	do {
	locationX = Math.floor(Math.random() * mazeWidth );
	locationY = Math.floor(Math.random() * mazeHeight );
	}
	while (map[locationY][locationX] !== 0);
}