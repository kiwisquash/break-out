/*Canvas*/
var canvas = document.getElementById("myCanvas"); // Grab the canvas element
var ctx = canvas.getContext("2d"); // The 2D renndering context is the actual tool for painting on the canvas
/*Ball data*/
var x = canvas.width/2;
var y = canvas.height/4;
var dx = -1;
var dy = 2;
var ballRadius = 10;
var ballColor = "#0095DD";

/*Brick data*/
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];

for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r ++) {
        bricks[c][r] = {x: 0, y: 0, hit: 0};
    }
}

/*Paddle*/
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth)/2;

var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var col = 0; col < brickColumnCount; col++) {
        for (var row = 0; row < brickRowCount; row++) {
            if (bricks[col][row].hit == 0) {
                var brickX = brickOffsetLeft + col*(brickWidth + brickPadding);
                var brickY = brickOffsetTop + row*(brickHeight + brickPadding);
                bricks[col][row].x = brickX;
                bricks[col][row].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisonDetection () {
    for (var col = 0; col < brickColumnCount; col++) {
        for (var row = 0; row < brickRowCount; row++) {
            var b = bricks[col][row];
            if (b.hit == 0) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy ;
                    b.hit = 1;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisonDetection();

    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }

    if ( x + ballRadius >  paddleX && x - ballRadius < paddleX + paddleWidth && y + ballRadius > canvas.height - paddleHeight) { 
        dy = -1.5*dy;
        dx = 1.5*dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y > canvas.height - ballRadius) {
        alert("Game over");
        document.location.reload();
    } 

    if (x + dx < ballRadius || x + ballRadius + dx > canvas.width) {
        dx = -dx;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();

