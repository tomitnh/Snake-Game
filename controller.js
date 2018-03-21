/***********
 * Controller.js 
 *
 * Controls frame animation and drawing on the canvas
 */

var fps = 5; // Standard frames per second
window.setInterval(animate, 1000/fps);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var s = new Snake();
s.loc = new Point(20,20);
s.xspeed = 1;

function draw() {

	ctx.fillStyle = 'grey';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	s.update();
	s.show();
}

function animate() {

	// clear canvas and draw new frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw();
}