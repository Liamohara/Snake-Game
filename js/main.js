// Calculating and storing height and width of canvas elements to ctx.height and ctx.width
for (let tag = 0; tag < 3; tag++) {
	ctx = document.getElementsByTagName("canvas")[tag];
	if (
		document.documentElement.clientHeight <=
		document.documentElement.clientWidth
	) {
		ctx.height = Math.floor(document.documentElement.clientHeight / 25) * 25;
		ctx.width = Math.floor(document.documentElement.clientHeight / 25) * 25;
	} else {
		ctx.height = Math.floor(document.documentElement.clientWidth / 25) * 25;
		ctx.width = Math.floor(document.documentElement.clientWidth / 25) * 25;
	}
}

// Declaring Variables
const canvas = document.getElementById("canvas");
const checkerboard = canvas.getContext("2d");
const snake = document.getElementById("snake").getContext("2d");
const food = document.getElementById("food").getContext("2d");
const squareSize = canvas.height / 25;
const fps = (5 * 600) / canvas.height;
let key;
let touchStartX;
let touchStartY;
let touchEndX;
let touchEndY;

// Helper classes
class Canvas {
	draw() {
		for (let x = 0; x < 25; x++) {
			for (let y = 0; y < 25; y++) {
				checkerboard.beginPath();
				checkerboard.fillStyle = ["#aad751", "#a2d149"][(x + y) % 2];
				checkerboard.fillRect(
					x * squareSize,
					y * squareSize,
					squareSize,
					squareSize
				);
				checkerboard.closePath();
			}
		}
	}
}

class Snake {
	constructor() {
		this.body;
		this.delay;
		this.updateLength;
	}
	draw() {
		snake.clearRect(0, 0, canvas.height, canvas.width);
		snake.beginPath();
		snake.fillStyle = "#000000";
		for (let bodyPart = 0; bodyPart < this.body.length; bodyPart++) {
			snake.fillRect(
				this.body[bodyPart].x,
				this.body[bodyPart].y,
				squareSize,
				squareSize
			);
		}
		snake.closePath();
	}

	keyMove() {
		//Left
		if (key === 37 || key === 65) {
			if (this.body[0].xSpeed === 1) {
				return;
			}
			this.body[0].nextXSpeed = -1;
			this.body[0].nextYSpeed = 0;
		}
		//Up
		else if (key === 38 || key === 87) {
			if (this.body[0].ySpeed === 1) {
				return;
			}
			this.body[0].nextXSpeed = 0;
			this.body[0].nextYSpeed = -1;
		}
		//Right
		else if (key === 39 || key === 68) {
			if (this.body[0].xSpeed === -1) {
				return;
			}
			this.body[0].nextXSpeed = 1;
			this.body[0].nextYSpeed = 0;
		}
		//Down
		else if (key === 40 || key === 83) {
			if (this.body[0].ySpeed === -1) {
				return;
			}
			this.body[0].nextXSpeed = 0;
			this.body[0].nextYSpeed = 1;
		}
	}

	touchMove() {
		if (Math.abs(touchEndX - touchStartX) > Math.abs(touchEndY - touchStartY)) {
			//Right
			if (touchEndX - touchStartX > 1) {
				if (this.body[0].xSpeed === -1) {
					return;
				}
				this.body[0].nextXSpeed = 1;
				this.body[0].nextYSpeed = 0;
			} //Left
			else {
				if (this.body[0].xSpeed === 1) {
					return;
				}
				this.body[0].nextXSpeed = -1;
				this.body[0].nextYSpeed = 0;
			}
		} else {
			//Down
			if (touchEndY - touchStartY > 1) {
				if (this.body[0].ySpeed === -1) {
					return;
				}
				this.body[0].nextXSpeed = 0;
				this.body[0].nextYSpeed = 1;
			} //Up
			else {
				if (this.body[0].ySpeed === 1) {
					return;
				}
				this.body[0].nextXSpeed = 0;
				this.body[0].nextYSpeed = -1;
			}
		}
	}

	update() {
		if (
			this.body[0].x % squareSize === 0 &&
			this.body[0].y % squareSize === 0
		) {
			if (
				this.body[0].x === f.coordinate.x &&
				this.body[0].y === f.coordinate.y
			) {
				f.draw();
				this.body.push({
					x: this.body[this.body.length - 1].x,
					y: this.body[this.body.length - 1].y,
					xSpeed: 0,
					ySpeed: 0,
				});
				this.delay = 1;
			}
			for (let bodyPart = this.body.length - 1; bodyPart > 0; bodyPart--) {
				if (bodyPart === this.body.length - 1 && this.delay > 0) {
					this.delay--;
				} else {
					if (
						this.body[bodyPart].xSpeed != this.body[bodyPart - 1].xSpeed ||
						this.body[bodyPart].ySpeed != this.body[bodyPart - 1].ySpeed
					) {
						this.body[bodyPart].xSpeed = this.body[bodyPart - 1].xSpeed;
						this.body[bodyPart].ySpeed = this.body[bodyPart - 1].ySpeed;
					}
					this.body[bodyPart].x += this.body[bodyPart].xSpeed;
					this.body[bodyPart].y += this.body[bodyPart].ySpeed;
				}
			}
			this.body[0].xSpeed = this.body[0].nextXSpeed;
			this.body[0].ySpeed = this.body[0].nextYSpeed;
			this.body[0].x += this.body[0].xSpeed;
			this.body[0].y += this.body[0].ySpeed;
		} else {
			for (let bodyPart = this.body.length - 1; bodyPart >= 0; bodyPart--) {
				this.body[bodyPart].x += this.body[bodyPart].xSpeed;
				this.body[bodyPart].y += this.body[bodyPart].ySpeed;
			}
			if (
				this.body[0].x > canvas.width - squareSize ||
				this.body[0].x < 0 ||
				this.body[0].y > canvas.height - squareSize ||
				this.body[0].y < 0
			) {
				alert("You died!");
				start();
			}
		}
		this.draw();
	}
}

class Food {
	constructor() {
		this.coordinate = {};
	}
	draw() {
		this.coordinate = {
			x:
				Math.round(
					(Math.random() * (canvas.width - squareSize / 2)) / squareSize
				) * squareSize,
			y:
				Math.round(
					(Math.random() * (canvas.height - squareSize / 2)) / squareSize
				) * squareSize,
		};
		food.clearRect(0, 0, canvas.height, canvas.width);
		food.beginPath();
		food.fillStyle = "#ff0066";
		food.fillRect(this.coordinate.x, this.coordinate.y, squareSize, squareSize);
		food.closePath();
	}
}

start = () => {
	c.draw();
	f.draw();
	s.body = [
		{ x: (canvas.width - squareSize) / 2, y: (canvas.height - squareSize) / 2 },
	];
	s.body[0].xSpeed = 0;
	s.body[0].ySpeed = 0;
	s.body[0].nextXSpeed = 0;
	s.body[0].nextYSpeed = 0;
};

// Create objects
const c = new Canvas();
const s = new Snake();
const f = new Food();

// Event listners
addEventListener("keydown", (e) => {
	key = e.keyCode;
	s.keyMove();
});

addEventListener("touchstart", (event) => {
	touchStartX = event.changedTouches[0].screenX;
	touchStartY = event.changedTouches[0].screenY;
});

addEventListener("touchend", (event) => {
	touchEndX = event.changedTouches[0].screenX;
	touchEndY = event.changedTouches[0].screenY;
	s.touchMove();
});

// Update Snake position
setInterval(s.update.bind(s), fps);

// Trigger
start();
