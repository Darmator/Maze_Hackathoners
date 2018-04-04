var firstLevel;
var myEnemy = [];
var enemyAmount;
var spikesCounter;
var squareSurface;
var mazeWidth;
var mazeHeight;
var locationX;
var locationY;
var enemyLocationX = [];
var enemyLocationY = [];
var levelCounter;
var end =false;
var winImage = new Image();
winImage.src = "img/win.jpg";
var dungeonSound = new Audio();
dungeonSound.src= "mp3/06 - Underground.mp3";
var forestSound = new Audio();
forestSound.src= "mp3/06 - Kokiri Forest.mp3";
var winSound = new Audio();
winSound.src = "mp3/win.mp3";
function turn_to_2d(){
	for (n=0;n<mazeHeight;n++) {
 myObstacle[n]=new Array();
  map[n]=new Array();
  visible[n] = new Array();
  tempVisible[n] = new Array();
 for (m=0;m<mazeWidth;m++) {
  myObstacle[n][m]=0;
  map[n][m]=0;
  visible[n][m] = false;
  tempVisible[n][m] = false;
 }
}
}
function turn_to_3d(){
	for (j = 0; j < enemyAmount; j++){
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
	for (t = 0; t < enemyAmount; t++){
	fire_ball[t] = 0;
	enemy_foot[t] = 0;
	fire_timer[t] = 0;
	enemyLook[t] = "down";
	enemyDirection[t] = new Array();
	for (v = 0; v < 4; v++){
		enemyDirection[t][v] = 0;
	}
	enemyDirection[t].length = 0;
}
	for (t = 0; t < enemyAmount; t++){
		get_location();
		enemyLocationX[t] = locationX
		enemyLocationY[t] = locationY
		myEnemy[t] = new component(squareSurface/2, squareSurface/2, "enemy", myObstacle[locationY][locationX].x + squareSurface/5  , myObstacle[locationY][locationX].y + squareSurface/5, t );
		moveToX[t] = myObstacle[locationY][locationX].x + squareSurface/5;
		moveToY[t] = myObstacle[locationY][locationX].y + squareSurface/5;
	}
}

function startGame() {
	findMazeSize();
	myGameArea.start();
    myGameArea.interval = setInterval(updateGameArea, 20);
	turn_to_2d();
	turn_to_3d();
	sketch_map();
    draw_map();
	get_location();
	myGamePiece = new component(squareSurface/2, squareSurface/2, "hero", myObstacle[locationY][locationX].x + 4 , myObstacle[locationY][locationX].y + 4 );
	create_enemies();
}
function findMazeSize(){
	mazeWidth = Math.floor (canvasWidth / squareSurface);
	 mazeHeight = Math.floor (canvasHeight / squareSurface);
	 if (mazeHeight % 2 == 0){
		 mazeHeight--;
	 }
	 if (mazeWidth % 2 == 0){
		mazeWidth--;
	 }
}
function reset_game(){
	resetValues();
	squareSurface -= 20;
	levelCounter++;
	enemyAmount+= 3;
	spikesCounter+= 4;
	starOff();
	if (levelCounter === 3){
		forestSound.pause();
		dungeonSound.play();
		spikesCounter = 2;
		enemyAmount = 1;
		squareSurface = 80;
		velocity = 3;
		firstLevel = false;
	}
	findMazeSize();
	turn_to_2d();
	turn_to_3d();
	create_enemies();
	myGameArea.start();
	
	sketch_map();
	draw_map();
	get_location();
	myGamePiece = new component(squareSurface/2, squareSurface/2, "hero", myObstacle[locationY][locationX].x + 4 , myObstacle[locationY][locationX].y + 4 );
	for (t = 0; t < enemyAmount; t++){
		get_location();
		enemyLocationX[t] = locationX
		enemyLocationY[t] = locationY
		myEnemy[t].x = myObstacle[locationY][locationX].x + squareSurface/5;
		myEnemy[t].y = myObstacle[locationY][locationX].y + squareSurface/5;
		moveToX[t] = myObstacle[locationY][locationX].x + squareSurface/5;
		moveToY[t] = myObstacle[locationY][locationX].y + squareSurface/5;
	}
	if (levelCounter >= 6){
		ctx.drawImage(winImage,  0,  0,  canvasWidth,  canvasHeight);
		dungeonSound.pause();
		winSound.play();
		myGameArea.stop();
	}
}
function resetValues(){
	ultravision = false;
	activePowerUp = false;
	extraVelocity = 0;
	correctQuestions = 0
	extraPickaxe = true;
	end = false;
}
function resetEverything(){
	if (shortcut){
		firstLevel = false;
	}
	else {
		firstLevel = true;
	}
	extraPickaxe = true;
	if (cameraPresentation){
		enemyAmount = 0;
	}
	else if (shortcut){
		enemyAmount = 2;
	}
	else {
		enemyAmount = 1;
	}
	if (cameraPresentation){
		spikesCounter = 0;
	}
	else {
		spikesCounter = 2;
	}
	squareSurface = 80;
	levelCounter =0;
	velocity = 3;
	correctQuestions = 0;
	lives = 5;
	maxLives = 6;
	powerUpMove = 0;
}
function get_location(){
	do {
	locationX = Math.floor(Math.random() * mazeWidth );
	locationY = Math.floor(Math.random() * mazeHeight );
	}
	while (map[locationY][locationX] !== 0);
}