"use strict";

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

const canvas = document.getElementById("canvas");
const checkerboard = canvas.getContext("2d");
const snake = document.getElementById("snake").getContext("2d");
const food = document.getElementById("food").getContext("2d");
const squareSize = canvas.height / 25;
const fps = (5 * 600) / canvas.height;
let prevKey;
let currentKey;

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

	move() {
		//Left
		if (currentKey === 37 || currentKey === 65) {
			if (prevKey === 39 || prevKey === 68) {
				return;
			}
			prevKey = currentKey;
			this.xSpeed = -1;
			this.ySpeed = 0;
		}
		//Up
		else if (currentKey === 38 || currentKey === 87) {
			if (prevKey === 40 || prevKey === 83) {
				return;
			}
			prevKey = currentKey;
			this.xSpeed = 0;
			this.ySpeed = -1;
		}
		//Right
		else if (currentKey === 39 || currentKey === 68) {
			if (prevKey === 37 || prevKey === 65) {
				return;
			}
			prevKey = currentKey;
			this.xSpeed = 1;
			this.ySpeed = 0;
		}
		//Down
		else if (currentKey === 40 || currentKey === 83) {
			if (prevKey === 38 || prevKey === 87) {
				return;
			}
			prevKey = currentKey;
			this.xSpeed = 0;
			this.ySpeed = 1;
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
	prevKey = null;
};

const c = new Canvas();
const s = new Snake();
const f = new Food();

addEventListener("keydown", (e) => {
	currentKey = e.keyCode;
	s.move();
});

setInterval(s.update.bind(s), fps);

start();
