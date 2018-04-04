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
var correctQuestions = 0;
var answeredQuestions = [];
var countDown=1200;
answered=true;
loadQuestion();
loadAnswer();
function quiz(){
	var userAnswer;
	var answered = false;
	countDown--;
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
					answered = true;
		}
		else if (myGameArea.keys && myGameArea.keys[50]  ) {
					userAnswer = 1;
					answered = true;
		}
		else if (myGameArea.keys && myGameArea.keys[51]  ) {
					userAnswer = 2;
					answered = true;
		}
		if(countDown==0){
			userAnswer = 4;
			answered = true;
		}
		
		ctx.fillText(Math.floor(countDown*25/1000),canvasWidth-canvasWidth/13 ,canvasHeight/25);
		if (answered){
			quizSound.pause();
			playBackgroundMusic();
			myObstacle[boxY][boxX].color  = "ground";
			map[boxY][boxX] = 0;
			questionExecuting = false;
			if (userAnswer != correctAnswer[questionNumber]){
				get_location();
				myObstacle[locationY][locationX].color  = "question";
				map[locationY][locationX] = 3;
				wrongSound.play();
				countDown=1200;
			}
			else if(userAnswer == correctAnswer[questionNumber]){
				answeredQuestions[questionNumber] = true;
				correctQuestions++;
				if (correctQuestions == 3){
					unlockSound.play();
				}
				else {
					correctSound.play();
				}
			}
		}
	verticalText = canvasHeight/4;
}
function resetAnsweredQuestions() {
	for (t = 0; t < question.length; t++){
		answeredQuestions[t] = false;
	}
}
function chechAnswersAvailable() {
	var repited = false;
	for (g = 0; g < answeredQuestions.length; g++){
		if (answeredQuestions[g] == false){
			repited = true;
		}
	}
	return repited;
}
function writeText(sentence){
	ctx.font = "40px Arial";
    ctx.fillStyle = 'white';
	var words = sentence.split(" ");
	var horizontalText = 0;
	ctx.fillText(words[0], horizontalText , verticalText); 
	for (counter = 1; counter <= words.length - 1; counter++){
		horizontalText += ctx.measureText(words[counter - 1]).width + 10;
		if (horizontalText + ctx.measureText(words[counter ]).width + 10 > canvasWidth){
			horizontalText = 0;
			verticalText += 40;
		}
		ctx.fillText(words[counter], horizontalText, verticalText); 
	}
	verticalText += 40;
}
function loadQuestion(){
	resetAnsweredQuestions();
	question[0] ="Residential Schools where a mandatory boarding school for all indigenous children. The schools were designed " +
"to commit cultural genocide on the indigenous people of canada or as Duncan Campbell Scott (Previous Deputy Superintendent of indian " +
"affairs now known as indigenous affairs) said: residential schools were designed to take the Indian out of the child.The first schools were operational " +
"in the 1870s, but when did the last residential "+
"schools close?";
    
    question[1] = "Viola Desmond is now on our $10 bill for refusing to sit in the black part of a segregated theatre. What year Did Viola" 
	+"Desmond refuse to be discriminated against by seating in the white part of the movie theatre?"; 
    question[2] = "How much has the world average temperature in celsius risen since 1880 to 2012?";
    
    question[3] = "Who won the FIFA world cup in 2014?";
    
    question[4] = "What country is hosting the FIFA world cup in 2018?";
    
    question[5] = "How many kilometres are there in one mile?";
    
    question[6] = "What year did Barack Obama first get elected for President?";
    
    question[7] = "What band has sold the most albums?";
    
    question[8] = "What is it called when you score a point in rugby?";
    
    question[9] = "How many players are on the field in a regular soccer game for one team?";
    
    question[10] = "What company did the famous video game character mario belong to?";
    
     question[11] = "Who is Batmans most famous sidekick?";
    
     question[12] = "Who on this list has never been an avenger?";
    
     question[13] = "Who is the king of the fictional city of Wakanda?";
    
     question[14] = "What is the god of thunders(thor) hammer namned?";
    
     question[15] = "What underdog team won the english premier league in 2015-2016 season";
    
     question[16] = "How many players are on the ice for one team in hockey";
    
     question[17] = "who was boston most famous defenseman";
    
     question[18] = "What OHL team did wayne gretzky play for"; //the sue saint marry //greyhounds
    
     question[19] = "What was the Montreal Canadiens original stadium named" //The forum
    
     question[20] = "What does chu replace in the french language"; //je suis
    
     question[21] = "What system was the first Mortal Combat video game released on"; //not a system the arcade
    
     question[22] = "What part of the body deals with toxins your body ingests"; //the liver
    
     question[23] = "What was the first video game system to be released for the home"; //atari
    
     question[24] = "How old do you have to be to vote in canada";
    
     question[25] = "What system does the United States use to elect their president";
    
     question[26] = "When did world war 2 start";
    
     question[27] = "How is the Prime minister put in power in canada";
    
     question[28] = "What country did canada adopt its parliamentary from";
    
     question[29] = "What person is at the top of the list of precedence in canada"; // the queen
    
     question[30] = "On the average piano how many keys are there"; //88 



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
	correctAnswer[0] = 1;
    
    answer[1][0] = "1. 1946";
    answer[1][1] = "2. 1998";
    answer[1][2] = "3. 1940";
    correctAnswer[1] = 0; 
    
    answer[2][0] = "1. 0.34";
    answer[2][1] = "1. 0.85";
    answer[2][2] = "1. 2";
    correctAnswer[2] = 1;
    
    answer[3][0] = "1. Brasil";
    answer[3][1] = "2. Germany";
    answer[3][2] = "3. Spain";
    correctAnswer[3] = 1; 
    
    answer[4][0] = "1. Canada";
    answer[4][1] = "2. Germany";
    answer[4][2] = "3. Russia";
    correctAnswer[4] = 2; 
    
    answer[5][0] = "1. 1.6";
    answer[5][1] = "2. 2.4";
    answer[5][2] = "3. 1.2";
    correctAnswer[5] = 0;
    
    answer[6][0] = "1. 1991";
    answer[6][1] = "2. 2008";
    answer[6][2] = "3. 2009";
    correctAnswer[6] = 1;
    
    answer[7][0] = "1. Fleetwood Mac";
    answer[7][1] = "2. Nirvana";
    answer[7][2] = "3. The Beatles";
    correctAnswer[7] = 2;
    
    answer[8][0] = "1. a try";
    answer[8][1] = "2. nothing its just called scoring a point";
    answer[8][2] = "3. a 42";
    correctAnswer[8] = 0;
    
    answer[9][0] = "1. 11";
    answer[9][1] = "2. 15";
    answer[9][2] = "3. 8";
    correctAnswer[9] = 0; 
    
    answer[10][0] = "1. nintendo";
    answer[10][1] = "2. X-Box";
    answer[10][2] = "3. Sony";
    correctAnswer[10] = 0; 

    answer[11][0] = "1. Wolverine";
    answer[11][1] = "2. Robin";
    answer[11][2] = "3. Superman";
    correctAnswer[11] = 1; 
    
    answer[12][0] = "1. Cyclops";
    answer[12][1] = "2. Wolverine";
    answer[12][2] = "3. Thor";
    correctAnswer[12] = 2; 
    
    answer[13][0] = "1. The Black Panther";
    answer[13][1] = "2. Shuri";
    answer[13][2] = "3. Adam Warlock";
    correctAnswer[13] = 0; 
    
    answer[14][0] = "1. mjolnir";
    answer[14][1] = "2. Storm Breaker";
    answer[14][2] = "3. Storm Toucher";
    correctAnswer[14] = 0; 
    
    answer[15][0] = "1. Leicister City";
    answer[15][1] = "2. Vancover Whitecaps";
    answer[15][2] = "3. Toronto FC";
    correctAnswer[15] = 2; 
    
    answer[16][0] = "1. 6";
    answer[16][1] = "2. 11";
    answer[16][2] = "3. 2";
    correctAnswer[16] = 0; 
    
    answer[17][0] = "1. Bobby Ore";
    answer[17][1] = "2. Waynce Gretzeka";
    answer[17][2] = "3. Erik Carleson";
    correctAnswer[17] = 0; 
    
    answer[18][0] = "1. 11";
    answer[18][1] = "2. 15";
    answer[18][2] = "3. The Sue Saint Marie Greyhounds";
    correctAnswer[18] = 2; 
    
    answer[19][0] = "1. The Forum";
    answer[19][1] = "2. The Canadian Tire Centre ";
    answer[19][2] = "3. The Great Stadium";
    correctAnswer[19] = 0; 
    
    answer[20][0] = "1. Bonjour";
    answer[20][1] = "2. Je Suis";
    answer[20][2] = "3. Avoir";
    correctAnswer[20] = 1; 
    
    answer[21][0] = "1. Nintendo Switch";
    answer[21][1] = "2. Atari";
    answer[21][2] = "3. It wasnt released in a  system it was released in the arcade";
    correctAnswer[21] = 2; 
    
    answer[22][0] = "1. The Liver";
    answer[22][1] = "2. The heart";
    answer[22][2] = "3. The Stomach";
    correctAnswer[22] = 0; 
    
    answer[23][0] = "1. Atari 900";
    answer[23][1] = "2. Magnavox Odyssey";
    answer[23][2] = "3. Nintendo";
    correctAnswer[23] = 1; 
    
    answer[24][0] = "1. 16";
    answer[24][1] = "2. 28";
    answer[24][2] = "3. 18";
    correctAnswer[24] = 2; 
    
    answer[25][0] = "1. The base System";
    answer[25][1] = "2. The Electoral College";
    answer[25][2] = "3. They have no specific name for it only nicknames";
    correctAnswer[25] = 1; 
    
    answer[26][0] = "1. 1939";
    answer[26][1] = "2. 1945";
    answer[26][2] = "3. 2019";
    correctAnswer[26] = 0; 
    
    answer[27][0] = "1. There is a special Election";
    answer[27][1] = "2. There is a magic turtle that decides";
    answer[27][2] = "3. There Party has to have the most MP's Elected";
    correctAnswer[27] = 2; 
    
    answer[28][0] = "1. The British";
    answer[28][1] = "2. Spanish";
    answer[28][2] = "3. The Indigenous People Of Canada";
    correctAnswer[28] = 0; 
    
    answer[29][0] = "1. The Prime Minister";
    answer[29][1] = "2. The Queen";
    answer[29][2] = "3. The Governor General";
    correctAnswer[29] = 1; 
    
    answer[30][0] = "1. 44";
    answer[30][1] = "2. 188";
    answer[30][2] = "3. 88";
    correctAnswer[30] = 2

}