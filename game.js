var canvas = document.getElementById('myCanvas');

var line = document.getElementById('line');
line.style.display = "none";

var ctx = canvas.getContext("2d");

var paddle = document.getElementById('paddle'), // the paddle
    paddlePos = 150, // the paddle's position
    paddleVelocity = 0, // the paddle's velocity
    limit = 300; // how far the paddle can go before it stops moving
	
var paddle1 = document.getElementById('paddle1'), 
	paddlePos1 = 150,
	paddleVelocity1 = 0,
	limit1 = 300;
 
var ball = document.getElementById('ball'), 
	ballX = 1000,
	ballY = 200,
	ballXVelocity = 10,
	ballYVelocity = 4,
	ballXLimit = 1600,
	ballYLimit = 450;
	
var title = document.getElementById('title');
title.style.display = "none";
var subtitle = document.getElementById('subtitle');
subtitle.style.display = "none";

var score = 0;
var score1 = 0;
var winner = "";

var start = false;

var bounced = false;
var bounced1 = false;
	
// Change paddle velocity based on keys pressed
document.addEventListener('keydown', function (e) {
     if (e.keyCode == 87 || e.which == 87) { // W key
      paddleVelocity = -3;
     }
     if (e.keyCode == 83 || e.which == 83) { // S Key
      paddleVelocity = 3;
     }
     if (e.keyCode == 38 || e.which == 38) { // up arrow
      paddleVelocity1 = -3;
     }
     if (e.keyCode == 40 || e.which == 40) { // down arrow
      paddleVelocity1 = 3;
     }
	 if (e.keyCode == 13 || e.which == 13) {
		ballXVelocity = 7.5;
		ballYVelocity = 2;
		start = true;
	 }	 
}, false);

// Change paddle velocity back to zero after key is no longer pressed
document.addEventListener('keyup', function (e) {
 if (e.keyCode == 87 || e.which == 87) {
 paddleVelocity = 0;
 }
 if (e.keyCode == 83 || e.which == 83) {
 paddleVelocity = 0;
 }
 if (e.keyCode == 38 || e.which == 38) {
 paddleVelocity1 = 0;
 }
 if (e.keyCode == 40 || e.which == 40) {
 paddleVelocity1 = 0;
 }
}, false);

function setup() {
	paddle.style.display = "none";
	paddle1.style.display = "none";
	ball.style.display = "none";
	line.style.display = "none";
	// Show title
	title.style.display = "";
	subtitle.style.display = "";
	
	ballXVelocity = 0;
	ballYVelocity = 0;
	ballX = 1000;
	ballY = 200;
	paddlePos = 150;
	paddlePos1 = 150;
	
	ctx.clearRect ( 0 , 0 , 1200, 300 );
	ctx.fillStyle = "#ffffff";
	ctx.font = "15px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Press Enter to start", 600, 300);
}	

function draw() {
	drawScore();
	// Show paddles and ball 
	document.getElementById('paddle').style.display = "";
	document.getElementById('paddle1').style.display = "";
	line.style.display = "";
	document.getElementById('ball').style.display = "";
	
	
	// Where to draw paddles
    paddle.style.top = paddlePos + 'px';
	paddle1.style.top = paddlePos1 + 'px';
	
	// Where to draw ball
	ball.style.top = ballY + 'px';
	ball.style.left = ballX + 'px';
}

function drawScore() {
	ctx.backgroundColor = "#000000";
	ctx.font = "20px Arial";
	ctx.clearRect ( 0 , 0 , 1200, 300 );
	ctx.fillStyle = '#ffffff';
	ctx.fillText(score + " - " + score1, 600, 75);
}	

function reset() {
	ballX = 1000;
	ballY = 200;
	ballXVelocity = coef * 7.5;
	ballYVelocity = Math.floor(Math.random() * 4) + 1;
}	

function gameOver() {
	ctx.clearRect ( 0 , 0 , 1200, 300 );
	ballXVelocity = 0;
	ballYVelocity = 0;
	if(alert("Game Over! " + winner + " wins!", 600, 75)) {
	}	else window.location.reload();
}	

function update() {
	// Update paddle and ball positions
    paddlePos += paddleVelocity;
	paddlePos1 += paddleVelocity1;
	ballX += ballXVelocity;
	ballY += ballYVelocity;
	
    // Check ball collision with walls
	if (ballY >= ballYLimit || ballY <= 0) ballYVelocity = -ballYVelocity;
	
	// Check paddle collision with walls & scrolling
	if (paddlePos >= 300) paddlePos = paddlePos % 300;
	if (paddlePos <= 0) paddlePos = paddlePos + 300;
	if (paddlePos1 >= 300) paddlePos1 = paddlePos1 % 300;
	if (paddlePos1 <= 0) paddlePos1 = paddlePos1 + 300;
	
	// Check ball collision with paddles
	if (ballX <= 530 && ballX >= 520 && ballY <= paddlePos + 160 && ballY >= paddlePos - 10 && !bounced) {ballXVelocity = -ballXVelocity; bounced = true;}
	if (ballX >= 1480 && ballY <= 1490 && ballY <= paddlePos1 + 160 && ballY >= paddlePos1 - 10 && !bounced1) {ballXVelocity = -ballXVelocity; bounced1 = true;}
	
	if(ballX <= 1000) {bounced1 = false;}
	if(ballX >= 1000) {bounced = false;}
	
	// Scoring
	if (ballX <= 400) { score1++; coef = -1; reset();}
	if (ballX >= 1600) { score++; coef = 1; reset();}
	
	// Ending the game
	if (score == 10) { winner = "Leopard"; gameOver();}
	else if (score1 == 10) { winner = "Zebra"; gameOver();}
}

function mainLoop() {
	if (!start) { setup(); }
    if (start) {title.style.display = "none"; subtitle.style.display = "none"; update();
    draw(); }
    requestAnimationFrame(mainLoop);
}
 
// Start things off
requestAnimationFrame(mainLoop);
