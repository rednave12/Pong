var w = window.innerWidth;
var h = window.innerHeight;

var canvas = document.getElementById('myCanvas');
canvas.width = w * 0.7;
canvas.height = h * 0.5;
canvas.left = w * 0.15;
canvas.top = h * 0.1;

var line = document.getElementById('line');

var ctx = canvas.getContext("2d");

var paddle = document.getElementById('paddle'), // the paddle
    paddlePos = h * 0.35, // the paddle's position
    paddleVelocity = 0, // the paddle's velocity
    limit = h * 0.6; // how far the paddle can go before it stops moving

var paddle1 = document.getElementById('paddle1'), 
	paddlePos1 = h * 0.35,
	paddleVelocity1 = 0,
	limit1 = h * 0.6;
 
var ball = document.getElementById('ball'), 
	ballX = w * 0.5,
	ballY = h * 0.35,
	ballXVelocity = 10,
	ballYVelocity = 4,
	ballXLimit = w * 0.85,
	ballYLimit = h * 0.6;
	
var title = document.getElementById('title');
var subtitle = document.getElementById('subtitle');

var score = 0;
var score1 = 0;
var winner = "";

var start = false;

var bounced = false;
var bounced1 = false;

window.onresize = function(){ location.reload(); }

//Ball Selector
var ballPreview = document.getElementById('ballPreview');
var ballPreview1 = document.getElementById('ballPreview1');
var ballPreview2 = document.getElementById('ballPreview2');
var ballPreview3 = document.getElementById('ballPreview3');

ballPreview.onclick = function() {

	ball.style.backgroundImage = "url(ball.png)";
};

ballPreview1.onclick = function() {

	ball.style.backgroundImage = "url(basketball.png)";
};

ballPreview2.onclick = function() {

	ball.style.backgroundImage = "url(eyeball.png)";
};

ballPreview3.onclick = function() {

	ball.style.backgroundImage = "url(meatball.png)";
};

	
// Change paddle velocity based on keys pressed
document.addEventListener('keydown', function (e) {
     if (e.keyCode == 87 || e.which == 87) { // W key
      paddleVelocity = -5;
     }
     if (e.keyCode == 83 || e.which == 83) { // S Key
      paddleVelocity = 5;
     }
     if (e.keyCode == 38 || e.which == 38) { // up arrow
      paddleVelocity1 = -5;
     }
     if (e.keyCode == 40 || e.which == 40) { // down arrow
      paddleVelocity1 = 5;
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
	ballX = w * 0.5;
	ballY = h * 0.35;

	paddlePos = h * 0.35 - 75;
	paddlePos1 = h * 0.35 - 75;
	
	ctx.clearRect (0, 0, w, h);
	ctx.fillStyle = "#ffffff";
	ctx.font = "15px Arial";
	ctx.textAlign = "left";

	ctx.fillText("Press Enter to start", w * 0.315, h * 0.35);
}	

function draw() {
	line.style.display = "";
	// Show paddles and ball 
	document.getElementById('paddle').style.display = "";
	document.getElementById('paddle1').style.display = "";
	document.getElementById('ball').style.display = "";
	
	// Where to draw paddles
    paddle.style.top = paddlePos + 'px';
	paddle1.style.top = paddlePos1 + 'px';
	
	// Where to draw ball
	ball.style.top = ballY + 'px';
	ball.style.left = ballX + 'px';
	
	drawScore();
}

function drawScore() {
	ctx.backgroundColor = "#000000";
	ctx.font = "30px Courier New";
	ctx.clearRect (0, 0, w, h);
	ctx.fillStyle = '#ffffff';
	ctx.textAlign = "center";
	// NOT WORKING TO CENTER TEXT
	ctx.fillText(score + "    " + score1, w * 0.35, h * 0.05);
}	

function reset() {
	ballX = w * 0.5;
	ballY = h * 0.35;
	ballXVelocity = coef * 7.5;
	ballYVelocity = Math.floor(Math.random() * 4) + 1;
}	

function gameOver() {
	ctx.clearRect ( 0 , 0 , w, h);
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
	if (ballY + 25 >= ballYLimit || ballY <= h * 0.1) ballYVelocity = -ballYVelocity;
	
	// Check paddle collision with walls & scrolling
	// D O N E
	if (paddlePos + 150 >= h * 0.6) paddlePos = (paddlePos + 150) % (h * 0.6) + h * 0.1;
	if (paddlePos <= h * 0.1) paddlePos = h * 0.6 - 150;
	if (paddlePos1 + 150 >= h * 0.6) paddlePos1 = (paddlePos1 + 150) % (h * 0.6) + h * 0.1;
	if (paddlePos1 <= h * 0.1) paddlePos1 = h * 0.6 - 150;
	
	// Check ball collision with paddles
	if (ballX <= w * 0.2 + 30 && ballX >= w * 0.2 && ballY <= paddlePos + 160 && ballY >= paddlePos - 10 && !bounced) {ballXVelocity = -ballXVelocity; bounced = true;}
	if (ballX >= w * 0.8 - 30 - 25 && ballY <= w * 0.8 && ballY <= paddlePos1 + 160 && ballY >= paddlePos1 - 10 && !bounced1) {ballXVelocity = -ballXVelocity; bounced1 = true;}
	
	if(ballX <= w * 0.5) {bounced1 = false;}
	if(ballX >= w * 0.5) {bounced = false;}
	
	// Scoring
	if (ballX <= w * 0.15) { score1++; coef = -1; reset();}
	if (ballX + 25 >= w * 0.85) { score++; coef = 1; reset();}
	
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




//TO DO
//DRAW BORDER AROUND GAME - adjust sizing variables to make this much easier.
//MAKE IT SO WHEN WINDOW IS RESIZED THE PAGE RELOADS.