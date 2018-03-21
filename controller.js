/***********
 * Controller.js 
 *
 * Controls frame animation and drawing on the canvas
 */

var fps = 5; // Standard frames per second
window.setInterval(animate, 1000/fps);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var angle = Math.PI / 10;

var a = new Point(canvas.width / 2, canvas.height);
var b = new Point(canvas.width / 2, canvas.height - 100);
var root = new Branch(a, b, 0);

// Generating tree 
var tips = [];
var counter = 0;
tips.push(root);

while (counter < 10) {
	var alttips = [];

	for (var i in tips) {
		branch = tips[i];
		branch.branchRight(angle);
		branch.branchLeft(angle);
		alttips.push(branch.rightNode);
		alttips.push(branch.leftNode);
	}

	tips = alttips;
	counter++;
}

function draw() {

	ctx.fillStyle = 'grey';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	drawTree(root);
	// root.show();
	// root.branchLeft();
	// root = root.leftNode;
	// root.show();
	// root.branchLeft();
	// root = root.leftNode;
	// root.show();
}

function drawTree(root) {
	if (root != null) {
		root.show()
		drawTree(root.rightNode);
		drawTree(root.leftNode);
	}
}
function animate() {

	// clear canvas and draw new frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw();
}