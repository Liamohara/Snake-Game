const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let prevKey = 39;
let currentKey = null;

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
    this.prevXSpeed = 1;
    this.prevYSpeed = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
  }
  draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    c.draw();
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.x, this.y, 25, 25);
    ctx.closePath();
  };

  move = () => {
    //left
    console.log(currentKey);
    if (currentKey === 37 || currentKey === 65) {
      if (prevKey === 39 || prevKey === 68) {
        alert("You died!"); //!Create a better prompt that does not use alerts
        document.location.reload(true);
      }
      prevKey = currentKey;
      this.xSpeed = -1;
      this.ySpeed = 0;
    }
    //up
    if (currentKey === 38 || currentKey === 87) {
      console.log(prevKey);
      if (prevKey === 40 || prevKey === 83) {
        alert("You died!"); //!Create a better prompt that does not use alerts
        document.location.reload(true);
      }
      prevKey = currentKey;
      this.xSpeed = 0;
      this.ySpeed = -1;
    }
    //right
    if (currentKey === 39 || currentKey === 68) {
      if (prevKey === 37 || prevKey === 65) {
        alert("You died!"); //!Create a better prompt that does not use alerts
        document.location.reload(true);
      }
      prevKey = currentKey;
      this.xSpeed = 1;
      this.ySpeed = 0;
    }
    //down
    if (currentKey === 40 || currentKey === 83) {
      if (prevKey === 38 || prevKey === 87) {
        alert("You died!"); //!Create a better prompt that does not use alerts
        document.location.reload(true);
      }
      prevKey = currentKey;
      this.xSpeed = 0;
      this.ySpeed = 1;
    }
  };

  updateMovement = () => {
    if (this.prevXSpeed === this.xSpeed) {
      this.x = this.x + this.xSpeed;
      this.y = this.y + this.ySpeed;
      prevXSpeed = xSpeed;
    }
    if (this.x > 600 || this.x < 0 || this.y > 600 || this.y < 0) {
      alert("You died!"); //!Create a better prompt that does not use alerts
      document.location.reload(true);
    }
    this.draw();
  };

  updateDir = () => {
    if (this.prevXSpeed !== this.xSpeed) {
      this.x = this.x + this.xSpeed;
      this.y = this.y + this.ySpeed;
      prevXSpeed = xSpeed;
    }
    if (this.x > 600 || this.x < 0 || this.y > 600 || this.y < 0) {
      alert("You died!"); //!Create a better prompt that does not use alerts
      document.location.reload(true);
    }
    this.draw();
  };
}

addEventListener("keydown", e => {
  currentKey = e.keyCode;
  s.move();
});

const c = new Canvas();
const s = new Snake();

setInterval(s.updateMovement, 5);
setInterval(s.updateDir, 125);

//!Add highscore
//!Increase snake length
//!Add fruit
//!Stop snake exiting boundaries
//!Keep snake in "channels"
