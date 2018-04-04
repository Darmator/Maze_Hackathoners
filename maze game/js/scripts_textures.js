var grassImage = new Image();
grassImage.src = "img/grasstile.png";
var spikesImage = new Image();
spikesImage.src ="img/spike-animation_0.png";
var orcsImage = new Image();
orcsImage.src = "img/orc sprite.png";
var dragonImage = new Image();
dragonImage.src = "img/sf2-characters.png";
var questionImage = new Image ();
questionImage.src = "img/question.PNG";
var heroImage = new Image();
heroImage.src = "img/sprite.png";
var treeImage = new Image();
treeImage.src = "img/tree-variations_0.png";
var wallImage = new Image();
wallImage.src = "img/sf2-map.png";
var groundImage = new Image();
groundImage.src = "img/grndcobblestone.jpg";
var closedDoorImage = new Image();
closedDoorImage.src = "img/closedDoor2.PNG";
var openedDoorImage = new Image();
openedDoorImage.src = "img/openedDoor2.PNG";
var soilImage = new Image();
soilImage.src = "img/256x dry grass overlay.png";
var heartImage = new Image();
heartImage.src = "img/Heart.png";
var starImage = new Image();
starImage.src = "img/star.jpg";
var pickaxeImage = new Image();
pickaxeImage.src = "img/pickaxeDiamond.png";
var speedImage = new Image();
speedImage.src = "img/speed.png";
var goldenHeartImage = new Image();
goldenHeartImage.src = "img/goldenHeart.png";
var glassesImage = new Image();
glassesImage.src = "img/glasses pokemon.png"
var walkLeftSound = new Audio();
walkLeftSound.src = "mp3/OOT_Steps_Grass1.wav";
var walkRightSound = new Audio();
walkRightSound.src = "mp3/OOT_Steps_Grass7.wav";
var spikesSound = new Audio();
spikesSound.src = "mp3/spikes.wav";

var fire_ball = [];
var fire_timer = [];
var fire_direction = [];
var spikes_state = 0;
var spikes_deadly = false;
var enemy_foot = [];
var hero_foot = 0;
var hero_look = "down";

function scripts_textures (x, y, width, height, number, color){
				switch (color) {
			case "wall":
			if (firstLevel){
				ctx.drawImage(grassImage,  x,  y,  width,  height);
				ctx.drawImage(soilImage,  x,  y,  width,  height);
				ctx.drawImage(treeImage, 0, 78, 67, 70,  x,  y, squareSurface, squareSurface);
			}
			else{
				ctx.drawImage(wallImage, 55, 300, 30, 30,  x,  y, squareSurface, squareSurface);
			}
				break;
			case "ground":
				drawGround(x,  y,  width,  height);
				break;
			case "door":
				if (correctQuestions < 3){
					ctx.drawImage(closedDoorImage,  x,  y,  width ,  height);
				}
				else{
					ctx.drawImage(openedDoorImage,  x,  y,  width ,  height );
				}
				break;
			case "question":
				drawGround(x,  y,  width,  height);
				ctx.drawImage(questionImage, x + squareSurface/5,y + squareSurface/5, width/2, height/2);
				break;
			case "hero":
				hero_sprites(  x,  y,  width,  height);
				break;
			case "enemy":
				if (firstLevel){
					orcs_sprites(  x,  y,  width,  height, number);
				}
				else {
					dragon_sprites( x,  y,  width,  height, number);
				}
				break;
			case "spikes":
				drawGround(x,  y,  width,  height);
				spikes_sprites(  x,  y,  width,  height);
				break;
			case "fire":
				flame_sprites(  x,  y,  width,  height, number);
				break;
			case "heart":
				drawGround(x,  y,  width,  height);
				ctx.drawImage(heartImage, 0, 0, 120, 150, x + squareSurface/5,y + squareSurface/5, width/2, height/2);
				break;
			case "powerUp":
				drawGround(x,  y,  width,  height);
				drawPowerUp(x,  y,  width,  height, number);
			}
}
function drawGround(x,  y,  width,  height){
	if (!firstLevel){
		ctx.drawImage(groundImage,  x,  y,  width,  height);
	}
	else {
		ctx.drawImage(grassImage,  x,  y,  width,  height);
	}
}
function hero_sprites(  x,  y,  width,  height){
			switch (hero_look){
			case "down":
				if ( myGamePiece.speedY > 0 && hero_foot <= 10/velocity){
					walkLeftSound.play();
					ctx.drawImage(heroImage, 205, 638, 50, 60,  x,  y,  width,  height);//down 1
				}
				else if ( myGamePiece.speedY > 0  && hero_foot > 10/velocity){
					walkRightSound.play();
					ctx.drawImage(heroImage, 459, 638, 50, 60,  x,  y,  width,  height);// down 2
				}
				else {
					ctx.drawImage(heroImage, 76, 638, 50, 60,  x,  y,  width,  height);// down 
				}
				break;
			case "up":
				if ( myGamePiece.speedY < 0 && hero_foot <= 10/velocity){
					walkLeftSound.play();
					ctx.drawImage(heroImage, 198, 519, 50, 60,  x,  y,  width,  height);//up 1
				}
				else if ( myGamePiece.speedY < 0 && hero_foot > 10/velocity){
					walkRightSound.play();
					ctx.drawImage(heroImage,453, 519, 50, 60,  x,  y,  width,  height);//up 2
				}
				else {
					ctx.drawImage(heroImage, 70, 519, 50, 60,  x,  y,  width,  height);//up
				}
				break;
			case "right":
				if ( myGamePiece.speedX > 0 && hero_foot <= 10/velocity){
					walkLeftSound.play();
					ctx.drawImage(heroImage, 137, 707, 40, 60,  x,  y,  width,  height);//right 1
				}
				else if (myGamePiece.speedX > 0 && hero_foot > 10/velocity){
					walkRightSound.play();
					ctx.drawImage(heroImage, 390, 707, 40, 60,  x,  y,  width,  height);//right 2
				}
				else {
					ctx.drawImage(heroImage, 9, 707, 40, 60,  x,  y,  width,  height);//right
				}
				break;
			case "left":
				if ( myGamePiece.speedX < 0 && hero_foot <= 10/velocity){
					walkLeftSound.play();
					ctx.drawImage(heroImage, 139, 580, 40, 60,  x,  y,  width,  height);//left 1
				}
				else if ( myGamePiece.speedX < 0 && hero_foot > 10/velocity){
					walkRightSound.play();
					ctx.drawImage(heroImage, 394, 580, 40, 60,  x,  y,  width,  height);//left 2
				}
				else {
					ctx.drawImage(heroImage, 12, 580, 40, 60,  x,  y,  width,  height);//left
				}
				break;
			}
			hero_foot++;
			if (hero_foot  >= 20/ velocity ){
			hero_foot = 0;
			}
}
function orcs_sprites( x,  y,  width,  height, number){
				switch (enemyLook[number]){
			case "down":
				if ( myEnemy[number].speedY === enemyVelocity  && enemy_foot[number] <= 10/velocity){
					ctx.drawImage(orcsImage, 207, 638, 50, 70,  x,  y,  width,  height);//down 1
				}
				else if ( myEnemy[number].speedY === enemyVelocity  && enemy_foot[number] > 10/velocity){
					ctx.drawImage(orcsImage, 461, 638, 50, 70,  x,  y,  width,  height);// down 2
				}
				break;
			case "up":
				if ( myEnemy[number].speedY === -enemyVelocity && enemy_foot[number] <= 10/velocity){
					ctx.drawImage(orcsImage, 204, 519, 50, 69,  x,  y,  width,  height);//up 1
				}
				else if ( myEnemy[number].speedY === -enemyVelocity && enemy_foot[number] > 10/velocity){
					ctx.drawImage(orcsImage, 459, 519, 50, 69,  x,  y,  width,  height);//up 2
				}
				break;
			case "right":
				if ( myEnemy[number].speedX === enemyVelocity && enemy_foot[number] <= 10/velocity){
					ctx.drawImage(orcsImage, 128, 707, 50, 70,  x,  y,  width,  height);//right 1
				}
				else if (myEnemy[number].speedX === enemyVelocity && enemy_foot[number] > 10/velocity){
					ctx.drawImage(orcsImage, 381, 707, 50, 70,  x,  y,  width,  height);//right 2
				}
				break;
			case "left":
				if ( myEnemy[number].speedX === -enemyVelocity && enemy_foot[number] <= 10/velocity){
					ctx.drawImage(orcsImage, 147, 580, 50, 70,  x,  y,  width,  height);//left 1
				}
				else if ( myEnemy[number].speedX === -enemyVelocity && enemy_foot[number] > 10/velocity){
					ctx.drawImage(orcsImage, 402, 580, 50, 70,  x,  y,  width,  height);//left 2
				}
				break;
			}
			enemy_foot[number]++;
			if (enemy_foot[number]  >= 20/velocity ){
			enemy_foot[number] = 0;
			}
}

function dragon_sprites( x,  y,  width,  height, number){
				switch (enemyLook[number]){
			case "down":
				if ( myEnemy[number].speedY === enemyVelocity  && enemy_foot[number] <= 10/velocity){
					ctx.drawImage(dragonImage, 0, 121, 25, 25, x, y, width, height); //down 1
				}
				else if ( myEnemy[number].speedY === enemyVelocity  && enemy_foot[number] > 10/velocity){
					ctx.drawImage(dragonImage, 24, 121, 25, 25, x, y, width, height); //down 2
				}
				break;
			case "up":
				if ( myEnemy[number].speedY === -enemyVelocity && enemy_foot[number] <= 10/velocity){
					ctx.drawImage(dragonImage, 96, 121, 25, 25, x, y, width, height); //up 1
				}
				else if ( myEnemy[number].speedY === -enemyVelocity && enemy_foot[number] > 10/velocity){
					ctx.drawImage(dragonImage, 120, 121, 25, 25, x, y, width, height); //up 2
				}
				break;
			case "right":
				if ( myEnemy[number].speedX === enemyVelocity && enemy_foot[number] <= 10/velocity){
					ctx.drawImage(dragonImage, 144, 121, 25, 25, x, y, width, height); //right 1
				}
				else if (myEnemy[number].speedX === enemyVelocity && enemy_foot[number] > 10/velocity){
					ctx.drawImage(dragonImage, 168, 121, 25, 25, x, y, width, height); //right 2
				}
				break;
			case "left":
				if ( myEnemy[number].speedX === -enemyVelocity && enemy_foot[number] <= 10/velocity){
					ctx.drawImage(dragonImage, 48, 121, 25, 25, x, y, width, height); //left 1
				}
				else if ( myEnemy[number].speedX === -enemyVelocity && enemy_foot[number] > 10/velocity){
					ctx.drawImage(dragonImage, 72, 121, 25, 25, x, y, width, height); //left 2
				}
				break;
			}
			fire_timer[number]++;
			if (fire_timer[number] >= 200){
				fire_ball[number] = new component(width, height, "fire", x + 5 , y + 5, number );
				fire_direction[number] = enemyLook[number];
				fire_timer[number] = 0;
			}
			enemy_foot[number]++;
			if (enemy_foot[number]  >= 20 ){
				enemy_foot[number] = 0;
			}
}
function flame_sprites (x, y, width, height, number){
	switch(fire_direction[number]){
	case "down":
		fire_ball[number].speedY = velocity + 2;
		ctx.drawImage(dragonImage, 0, 144, 25, 25,x, y, width, height); //down fire
		break;
	case "up":
		fire_ball[number].speedY = -(velocity + 2);
		ctx.drawImage(dragonImage, 96, 145, 25, 22,x, y, width, height); //up fire
		break;
	case "left":
		fire_ball[number].speedX = -(velocity + 2);
		ctx.drawImage(dragonImage, 48, 144, 25, 25,x, y, width, height); //left fire
		break;
	case "right":
		fire_ball[number].speedX = velocity + 2;
		ctx.drawImage(dragonImage, 144, 144, 25, 25,x, y, width, height); //right fire
		break;
	}
}
function spikes_sprites(x, y, width, height){
	if (spikes_state * velocity<= 150 * spikesCounter){
		ctx.drawImage(spikesImage, 5, 0, 23, 30, x, y, width, height + 10);
		spikes_deadly = false;
	}
	if ( spikes_state * velocity >= 150 * spikesCounter){
		ctx.drawImage(spikesImage, 93, 0, 23, 30, x, y, width, height + 10);
		spikes_deadly = true;
	}
	if (spikes_state * velocity >= 300 * spikesCounter) {
		spikes_state = 0;
	}
	spikes_state++;
}
function drawHeartOut(){
	horizontal = 0;
	for (t = 0; t< lives; t++){
		ctx.drawImage(heartImage, 0, 0, 120, 150, horizontal,myObstacle[mazeHeight-1][0].y + 5, squareSurface, squareSurface); //full heart
		horizontal += squareSurface;
	}
	for (v= 0; v < maxLives - lives; v++){
		ctx.drawImage(heartImage,250,0, 120, 150, horizontal,myObstacle[mazeHeight-1][0].y + 5, squareSurface, squareSurface); //empty heart
		horizontal += squareSurface;
	}
}
function drawPowerUp(x, y, width, height, number){
	switch (number){
	case 0:
		ctx.drawImage(starImage,  x + squareSurface/5,  y + squareSurface/5,  width/2,  height/2);
		break;
	case 1:
		ctx.drawImage(pickaxeImage,  x + squareSurface/5,  y + squareSurface/5,  width/2,  height/2);
		break;
	case 2:
		ctx.drawImage(speedImage,  x + squareSurface/5,  y + squareSurface/5,  width/2,  height/2);
		break;
	case 3:
		ctx.drawImage(goldenHeartImage, 0, 0, 120, 150, x + squareSurface/5,y + squareSurface/5, width/2, height/2);
		break;
	case 4:
		ctx.drawImage(glassesImage,  x + squareSurface/5,  y + squareSurface/5,  width/2,  height/2);
		break;
	}
}
function drawPowerUpOut(number){
	switch (number){
	case 0:
		ctx.drawImage(starImage, myObstacle[mazeHeight-1][6 + powerUpMove].x ,myObstacle[mazeHeight-1][6].y ,  squareSurface, squareSurface);
		break;
	case 1:
		switch (pickaxeCounter){
		case 1:
			pickaxeImage.src = "img/pickaxeSilver.png";
			break;
		case 2:
			pickaxeImage.src = "img/pickaxeWood.png";
			break;
		}
		ctx.drawImage(pickaxeImage, myObstacle[mazeHeight-1][6 + powerUpMove].x ,myObstacle[mazeHeight-1][6].y ,  squareSurface, squareSurface);
		break;
	case 2:
		ctx.drawImage(speedImage, myObstacle[mazeHeight-1][6 + powerUpMove].x ,myObstacle[mazeHeight-1][6].y ,  squareSurface, squareSurface);
		break;
	case 4:
		ctx.drawImage(glassesImage, myObstacle[mazeHeight-1][6 + powerUpMove].x ,myObstacle[mazeHeight-1][6].y ,  squareSurface, squareSurface);
		break;
	}
}
