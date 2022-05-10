class GameObject {
  constructor() {
    this.gameCanvas = document.getElementById('gameCanvas');
    this.gameCtx = this.gameCanvas.getContext('2d');
    this.scoreCanvas = document.getElementById('scoreCanvas');
    this.scoreCtx = this.scoreCanvas.getContext('2d');
    this.scoreCtx.font = '35px serif';
  }
}

export default class GameController extends GameObject {
  constructor() {
    super();
    this.score = 0;
    this.graze = 0;
    this.pause = true;
    this.gameObjects = new Array(0);

    this.player = new Player(this.gameCanvas.width / 2, this.gameCanvas.height * 0.8);
    this.gameObjects.push(this.player);
    this.gameObjects.push(new Bullet(this.gameCanvas.width / 2, this.gameCanvas.height * 0.4));
    this.gameCtx.fillStyle = "black";
    this.gameCtx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

    this.gameLoop = null;
    this.startGame();
  }
  update = () => {
    if (this.pause) return;
    this.score += 1;
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.scoreCtx.clearRect(0, 0, this.scoreCanvas.width, this.scoreCanvas.height);
    this.gameCtx.drawImage(document.getElementById('background'), 0, 0, this.gameCanvas.width, this.gameCanvas.height);

    this.scoreCtx.strokeText(`Graze: ${this.graze}`, 40, 100, this.scoreCanvas.width);

    this.gameObjects.map(x => x.update(this.gameCtx));
    this.checkCollision();
  }
  clearGameCanvas = () => {
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }
  checkCollision = () => {
    let nonPlayers = this.gameObjects.slice(1);
    nonPlayers.map((obj) => {
      let res = this.intersects(this.player.getBounds(), obj.getBounds());
      this.graze += +(res && !obj.grazed);
      obj.grazed = obj.grazed || res;
    })
  }
  stopGame = () => {
    clearInterval(this.gameLoop);
    this.scoreCtx.strokeText(`Gameover`, 40, 160, this.scoreCanvas.width);
  }
  intersects = (o1, o2) => {
    let distance = Math.sqrt(Math.pow(o1.x - o2.x, 2) + Math.pow(o1.y - o2.y, 2));
    let deathDistance = o1.r + o2.r ;
    let grazeDistance = o1.r * 2.8 + o2.r;
    if (distance < deathDistance) {
      this.stopGame();
    }
    // true if graze, false if not
    return (distance < grazeDistance);
  }
  drawGameBackground = () => {
    this.gameCtx.drawImage(document.getElementById('background'), 0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }
  toggle = () => {
    this.pause = !this.pause;
    let text = {};
    text[0] = 'Pause';
    text[1] = 'Resume';
    document.getElementById('pauseButton').innerHTML = text[+this.pause];
  }
  startGame = () => {
    this.gameLoop = setInterval(this.update, 1000 / 60);
  }
  playerMove = (x, y, focus) => {
    this.player.move(+(this.pause == false) * x + 0, +(this.pause == false) * y + 0, +(this.pause == false) * focus + 0);
  }
}

class Entity extends GameObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.color = "white";
    this.velocity = 0;
  }
  draw = () => {};
  update = () => {
    this.draw();
  }
  getBounds = () => {
    return {
      x: this.x,
      y: this.y,
      r: this.radius
    }
  }
}

class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.velocity = 3;
    this.colorTable = {};
    this.colorTable[0] = "white";
    this.colorTable[1] = "red";
  }
  draw = () => {
    this.gameCtx.fillStyle = this.color;
    this.gameCtx.beginPath();
    this.gameCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.gameCtx.fill();
  }
  move = (x, y, focus) => {
    let xLeftBound = 0 + this.radius;
    let xRightBound = this.gameCanvas.width - this.radius;
    let yUpperBound = 0 + this.radius;
    let yLowerBound = this.gameCanvas.height - this.radius;
    this.color = this.colorTable[focus];
    this.x += x * this.velocity * (1 - focus * 0.6);
    this.y += y * this.velocity * (1 - focus * 0.6);
    this.x = (this.x < xLeftBound) * xLeftBound + (this.x > xRightBound) * xRightBound + (this.x >= xLeftBound && this.x <= xRightBound) * this.x;
    this.y = (this.y < yUpperBound) * yUpperBound + (this.y > yLowerBound) * yLowerBound + (this.y >= yUpperBound && this.y <= yLowerBound) * this.y;
  }
}

class Bullet extends Entity {
  constructor(x, y) {
    super(x, y);
    this.grazed = false;
  }
  draw = () => {
    this.gameCtx.fillStyle = "blue";
    this.gameCtx.beginPath();
    this.gameCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.gameCtx.fill();
  }
}