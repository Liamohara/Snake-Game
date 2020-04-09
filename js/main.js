const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let prevKey = 39;
let currentKey = null;

class Canvas {
    draw() {
        for (var i = 0; i < 25; i++) {
            for (var j = 0; j < 25; j++) {
                ctx.beginPath();
                ctx.fillStyle = ["#aad751", "#a2d149"][(i + j) % 2];
                ctx.fillRect(j * 25, i * 25, 25, 25);
                ctx.closePath();
            }
        }
    }
}

class Snake {
    constructor() {
        // this.snake = [this.draw(), this.draw()];
        this.x = 300;
        this.y = 300;
        this.prevXSpeed = 1;
        this.prevYSpeed = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        c.draw();
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, 25, 25);
        ctx.closePath();
    }

    move() {
        //left
        if (currentKey === 37 || currentKey === 65) {
            if (prevKey === 39 || prevKey === 68) {
                return;
            }
            prevKey = currentKey;
            this.xSpeed = -1;
            this.ySpeed = 0;
        }
        //up
        if (currentKey === 38 || currentKey === 87) {
            if (prevKey === 40 || prevKey === 83) {
                return;
            }
            prevKey = currentKey;
            this.xSpeed = 0;
            this.ySpeed = -1;
        }
        //right
        if (currentKey === 39 || currentKey === 68) {
            if (prevKey === 37 || prevKey === 65) {
                return;
            }
            prevKey = currentKey;
            this.xSpeed = 1;
            this.ySpeed = 0;
        }
        //down
        if (currentKey === 40 || currentKey === 83) {
            if (prevKey === 38 || prevKey === 87) {
                return;
            }
            prevKey = currentKey;
            this.xSpeed = 0;
            this.ySpeed = 1;
        }
    }

    update() {
        if (this.x % 25 === 0 && this.y % 25 === 0) {
            this.x = this.x + this.xSpeed;
            this.y = this.y + this.ySpeed;
            this.prevXSpeed = this.xSpeed;
            this.prevYSpeed = this.ySpeed;
        } else {
            this.x = this.x + this.prevXSpeed;
            this.y = this.y + this.prevYSpeed;
        }
        if (this.x > 600 || this.x < 0 || this.y > 600 || this.y < 0) {
            alert("You died!"); //!Create a better prompt that does not use alerts
            document.location.reload(true);
        }
        this.draw();
    }
}

addEventListener("keydown", (e) => {
    currentKey = e.keyCode;
    s.move();
});

const c = new Canvas();
const s = new Snake();

setInterval(s.update.bind(s), 5);

//!Add highscore
//!Increase snake length
//!Add fruit
//!Move snake on first key press
