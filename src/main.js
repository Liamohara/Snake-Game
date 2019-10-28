const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let key = 39;

class Canvas {
  draw = () => {
    for (var i = 0; i < 25; i++) {
      for (var j = 0; j < 25; j++) {
        ctx.beginPath();
        ctx.fillStyle = ["#aad751", "#a2d149"][(i + j) % 2];
        ctx.fillRect(j * 25, i * 25, 25, 25);
        ctx.closePath();
      }
    }
  };
}

class Snake {
  constructor() {
    // this.snake = [this.draw(), this.draw()];
    this.x = 300;
    this.y = 300;
    this.xspeed = 1;
    this.yspeed = 0;
  }
  draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    c.draw()
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.x, this.y, 25, 25);
    ctx.closePath();
  };

  move = () => {
    if (key === 37) {
      // Left
      this.xspeed = -1;
      this.yspeed = 0;
    } else if (key === 38) {
      // Up
      this.xspeed = 0;
      this.yspeed = -1;
    } else if (key === 39) {
      // Right;
      this.xspeed = 1;
      this.yspeed = 0;
    } else if (key === 40) {
      // Down
      this.xspeed = 0;
      this.yspeed = 1;
    } else {
      return;
    }
  };

  update = () => {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
    this.draw();
  };
}

addEventListener("keydown", e => {
  if (e.keyCode !== key) {
    key = e.keyCode;
    console.log("Recognised!");
    s.move();
  }
});

const c = new Canvas();
const s = new Snake();

c.draw();

setInterval(s.update, 5);
