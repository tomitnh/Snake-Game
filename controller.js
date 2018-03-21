/***********
 * Controller.js 
 *
 * Controls frame animation and drawing on the canvas
 *
 * 1) Create/spawn food 
 * 2) Create snake's tail
 * 3) Create losing condition. If the snake head touched its
 * 	body, the player lose. The game stopped running and the 
 *	snake becomes a Tan color
 */

var fps = 15; // Standard frames per second
var intervalID = window.setInterval(animate, 1000/fps);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var scl = 10;
var p = new Point(scl,scl);
var s = new Snake(p);
s.xspeed = 1;

var food = spawnFood();

// Keyboard controller
function steerSnake (e) {
	switch (e.key) {
		case 'ArrowLeft':
			s.dir(-1,0);
			break;
		case 'ArrowRight':
			s.dir(1,0);
			break;
		case 'ArrowUp':
			s.dir(0,-1);
			break;
		case 'ArrowDown':
			s.dir(0,1);
			break;
		default:
			// nothing
	}
}
document.addEventListener('keydown', steerSnake);

function spawnFood () {
	// Spawning food based on a grid with unit scl
	var rows = Math.floor(canvas.width/scl);
	var cols = Math.floor(canvas.height/scl);
	var f = new Point(Math.random() * rows,
		Math.random() * cols);

	f.x *= scl;
	f.y *= scl;

	return f;
}

function draw() {

	ctx.fillStyle = 'grey';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (s.eat(food))
		food = spawnFood();
	
	// Draw food
	ctx.fillStyle = 'red';
	ctx.fillRect(food.x, food.y, scl, scl);

	// check losing condition
	if (s.isDead()) {
		s.color = 'tan';
		s.show();
		window.clearInterval(intervalID);
	}

	s.update();
	s.show();
}

function animate() {

	// clear canvas and draw new frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw();
}

function dist(x1, y1, x2, y2) {
	// calculating distance with Pythagorean theorem
	var a = x2 - x1;
	var b = y2 - y1;
	return Math.sqrt(a*a + b*b);
}