class Snake {
	constructor (point) {
		this.xspeed = 0;
		this.yspeed = 0;
		this.body = [];
		this.body[0] = point;
		this.color = 'white';
	}

	show () {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = this.color;

		for (var i = 0; i < this.body.length; i++) {
			ctx.fillRect(this.body[i].x, 
				this.body[i].y, 
				scl, 
				scl);			
		}
	}

	dir (vx,vy) {
		this.xspeed = vx;
		this.yspeed = vy;
	}

	isDead () {
		var head = this.body[0];

		for (var i = 1; i < this.body.length; i++) {
			var b = this.body[i];
			if (dist(head.x, head.y, b.x, b.y) < 1) {
				return true;
			}
		}

		return false;
	}

	eat (food) {
		var head = this.body[0];
		var d = dist(head.x, head.y, food.x, food.y);

		var eaten = d < 10 ? true : false;

		if (eaten) {
			// grow the snake
			var head = this.body[0];
			var tail = new Point(0,0);

			if (this.xspeed == 0) {
				//snake was moving vertically
				tail.x = head.x;
				tail.y = head.y - this.yspeed * scl;
			} else {
				tail.y = head.y;
				tail.x = head.x - this.xspeed * scl;
			}

			this.body[this.body.length] = tail;
			
		}

		return eaten;
	}

	update () {
		for (var i = this.body.length-1; i > 0; i--) {
			var p = this.body[i-1];
			this.body[i] = new Point(p.x,p.y);
		}

		var head = this.body[0];

		head.x += this.xspeed * scl;
		head.y += this.yspeed * scl;

		// constrain x,y within the canvas border
		var canvas = document.getElementById('canvas');
		if (head.x < 0)
			head.x = 0;
		else if (head.x > canvas.width)
			head.x = canvas.width;

		if (head.y < 0)
			head.y = 0;
		else if (head.y > canvas.height)
			head.y = canvas.height;
	}
}