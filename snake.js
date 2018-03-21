class Snake {
	constructor () {
		this.loc = null; // x,y coord of the snake
		this.xspeed = 0;
		this.yspeed = 0;
	}

	show () {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = 'white';
		ctx.fillRect(this.loc.x, 
			this.loc.y, 
			10, 
			10);
	}

	update () {
		this.loc.x += this.xspeed;
		this.loc.y += this.yspeed;
	}
}