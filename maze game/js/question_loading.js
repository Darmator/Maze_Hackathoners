var answer = new Array();
var question = new Array();
var correctAnswer = new Array();
var verticalText = canvasHeight/4;
var questionNumber;
var questionBackgroundImage = new Image();
questionBackgroundImage.src = "img/mario_blocks_wallpaper_by_jayjaxon.png";
var correctSound = new Audio();
correctSound.src = "mp3/correct.wav";
var wrongSound = new Audio();
wrongSound.src = "mp3/wrong.mp3";
var quizSound = new Audio();
quizSound.src = "mp3/quiz.mp3";
var unlockSound = new Audio();
unlockSound.src = "mp3/unlock.wav";
var boxY;
var boxX;
var answeredQuestions = 0;
loadQuestion();
loadAnswer();
function quiz(){
	var userAnswer;
	var answered = false;
	forestSound.pause();
	dungeonSound.pause();
	quizSound.play();
	if (quizSound.ended){
		quizSound.play();
	}
	ctx.drawImage(questionBackgroundImage,  0,  0,  canvasWidth,  canvasHeight);
	
	writeText(question[questionNumber]);
	for (c = 0; c < 3; c++){
		writeText(answer[questionNumber][c]);
	}
	questionExecuting = true;
	if (myGameArea.keys && myGameArea.keys[49]  ) {
				userAnswer = 0;
				questionExecuting = false;
				answered = true;
	}
	else if (myGameArea.keys && myGameArea.keys[50]  ) {
				userAnswer = 1;
				questionExecuting = false;
				answered = true;
	}
	else if (myGameArea.keys && myGameArea.keys[51]  ) {
				userAnswer = 2;
				questionExecuting = false;
				answered = true;
	}
	
	if (answered){
		quizSound.pause();
		playBackgroundMusic();
		myObstacle[boxY][boxX].color  = "ground";
		map[boxY][boxX] = 0;
		if (userAnswer != correctAnswer[questionNumber]){
			get_location();
			myObstacle[locationY][locationX].color  = "question";
			map[locationY][locationX] = 3;
			wrongSound.play();
		}
		else {
			answeredQuestions++;
			if (answeredQuestions == 3){
				unlockSound.play();
			}
			else {
				correctSound.play();
			}
		}
	}
	verticalText = canvasHeight/4;
}

function writeText(sentence){
	ctx.font = "20px Arial";
    ctx.fillStyle = 'white';
	var words = sentence.split(" ");
	var horizontalText = 0;
	ctx.fillText(words[0], horizontalText , verticalText); 
	for (counter = 1; counter <= words.length - 1; counter++){
		horizontalText += ctx.measureText(words[counter - 1]).width + 10;
		if (horizontalText + ctx.measureText(words[counter ]).width + 10 > canvasWidth){
			horizontalText = 0;
			verticalText += 20;
		}
		ctx.fillText(words[counter], horizontalText, verticalText); 
	}
	verticalText += 20;
}
function loadQuestion(){
	question[0] ="Residential Schools where a mandatory boarding school for all indigenous children. The schools were designed" +
" to commit cultural genocide on the indigenous people of canada or as Duncan Campbell Scott (Previous Deputy Superintendent of indian " +
"affairs now known as indigenous affairs) said: residential schools were designed to take the Indian out of the child.The first schools were operational " +
"in the 1870s, but when did the last residential "+
"schools close?";
}
function loadAnswer(){
	for (g = 0; g < question.length;g++){
		answer[g] = new Array();
		for (b = 0; b < 3; b++){
			answer[g][b] = "undefined";

		}
	}
	answer[0][0] ="1. 1955";
	answer[0][1] ="2. 1996";
	answer[0][2] ="3. 1920";
	correctAnswer[0] = 2;

}