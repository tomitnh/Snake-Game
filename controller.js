/***********
 * Controller.js 
 *
 * Controls frame animation and drawing on the canvas
 *
 * 1) Create/spawn food 
 * 2) Create snake's tail
 * 3) Create losing condition
 */

var fps = 60; // Standard frames per second
window.setInterval(animate, 1000/fps);

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
	var f = new Point(Math.random() * canvas.width,
	Math.random() * canvas.height);

	return f;
}

function draw() {

	ctx.fillStyle = 'grey';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (s.eat(food))
		food = spawnFood();
	

	ctx.fillStyle = 'red';
	ctx.fillRect(food.x, food.y, scl, scl);

	s.update();
	s.show();
}

function animate() {

	// clear canvas and draw new frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw();
}