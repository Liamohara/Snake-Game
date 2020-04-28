"use strict";

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
let prevDir;
let key;
let touchStartX;
let touchStartY;
let touchEndX;
let touchEndY;

// Helper classes
class Canvas {
	draw() {
		for (var i = 0; i < 25; i++) {
			for (var j = 0; j < 25; j++) {
				checkerboard.beginPath();
				checkerboard.fillStyle = ["#aad751", "#a2d149"][(i + j) % 2];
				checkerboard.fillRect(
					j * squareSize,
					i * squareSize,
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
		this.prevXSpeed;
		this.prevYSpeed;
		this.xSpeed;
		this.ySpeed;
	}
	draw() {
		snake.clearRect(0, 0, canvas.height, canvas.width);
		snake.beginPath();
		snake.fillStyle = "#000000";
		snake.fillRect(this.body[0].x, this.body[0].y, squareSize, squareSize);
		snake.closePath();
	}

	keyMove() {
		//Left
		if (key === 37 || key === 65) {
			if (prevDir === "right") {
				return;
			}
			prevDir = "left";
			this.xSpeed = -1;
			this.ySpeed = 0;
		}
		//Up
		else if (key === 38 || key === 87) {
			if (prevDir === "down") {
				return;
			}
			prevDir = "up";
			this.xSpeed = 0;
			this.ySpeed = -1;
		}
		//Right
		else if (key === 39 || key === 68) {
			if (prevDir === "left") {
				return;
			}
			prevDir = "right";
			this.xSpeed = 1;
			this.ySpeed = 0;
		}
		//Down
		else if (key === 40 || key === 83) {
			if (prevDir === "up") {
				return;
			}
			prevDir = "down";
			this.xSpeed = 0;
			this.ySpeed = 1;
		}
	}

	touchMove() {
		if (Math.abs(touchEndX - touchStartX) > Math.abs(touchEndY - touchStartY)) {
			//Right
			if (touchEndX - touchStartX > 1) {
				if (prevDir === "left") {
					return;
				}
				prevDir = "right";
				this.xSpeed = 1;
				this.ySpeed = 0;
			} //Left
			else {
				if (prevDir === "right") {
					return;
				}
				prevDir = "left";
				this.xSpeed = -1;
				this.ySpeed = 0;
			}
		} else {
			//Down
			if (touchEndY - touchStartY > 1) {
				if (prevDir === "up") {
					return;
				}
				prevDir = "down";
				this.xSpeed = 0;
				this.ySpeed = 1;
			} //Up
			else {
				if (prevDir === "down") {
					return;
				}
				prevDir = "up";
				this.xSpeed = 0;
				this.ySpeed = -1;
			}
		}
	}

	update() {
		if (
			this.body[0].x % squareSize === 0 &&
			this.body[0].y % squareSize === 0
		) {
			this.body[0].x = this.body[0].x + this.xSpeed;
			this.body[0].y = this.body[0].y + this.ySpeed;
			this.prevXSpeed = this.xSpeed;
			this.prevYSpeed = this.ySpeed;
		} else {
			this.body[0].x = this.body[0].x + this.prevXSpeed;
			this.body[0].y = this.body[0].y + this.prevYSpeed;
		}
		if (
			this.body[0].x === f.coordinate.x &&
			this.body[0].y === f.coordinate.y
		) {
			f.draw();
			//Up
			if (this.ySpeed < 0) {
				this.body.push({
					x: this.body[0].x,
					y: this.body[0].y - squareSize,
				});
			} //Down
			else if (this.ySpeed > 0) {
				this.body.push({
					x: this.body[0].x,
					y: this.body[0].y + squareSize,
				});
			} //Right
			else if (this.xSpeed > 0) {
				this.body.push({
					x: this.body[0].x - squareSize,
					y: this.body[0].y,
				});
			} //Left
			else {
				this.body.push({
					x: this.body[0].x + squareSize,
					y: this.body[0].y,
				});
			}
		} else if (
			this.body[0].x > canvas.width - squareSize ||
			this.body[0].x < 0 ||
			this.body[0].y > canvas.height - squareSize ||
			this.body[0].y < 0
		) {
			alert("You died!");
			start();
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
	s.prevXSpeed = 0;
	s.prevYSpeed = 0;
	s.xSpeed = 0;
	s.ySpeed = 0;
	prevDir = null;
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
