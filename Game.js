const DEG5 = Math.PI / 36;
const DEG10 = DEG5 * 2;
const DEG15 = DEG5 * 3;
const DEG20 = DEG10 * 2;
const DEG30 = DEG10 * 3;
const DEG40 = DEG20 * 2;
const DEG45 = DEG15 * 3;
const DEG50 = DEG10 * 5;
const DEG60 = DEG30 * 2;
const DEG70 = DEG10 * 7;
const DEG80 = DEG40 * 2;
const DEG90 = DEG45 * 2;
const DEG180 = DEG90 * 2;

const audioElement = document.getElementById('gameBGM');

class GameObject {
  constructor() {
    this.frameRate = 60;
    this.gameCanvas = document.getElementById('gameCanvas');
    this.gameCtx = this.gameCanvas.getContext('2d');
    this.gameCtx.font = '80px Arial';
    this.gameCtx.fillStyle = 'red';
    this.scoreCanvas = document.getElementById('scoreCanvas');
    this.scoreCtx = this.scoreCanvas.getContext('2d');
    this.scoreCtx.font = '25px serif';
    this.scoreCtx.fillStyle = 'white';
  }
}

export default class GameController extends GameObject {
  constructor() {
    super();
    this.gameCtx.fillStyle = "black";
    this.gameCtx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.gameCtx.fillStyle = 'red';
    this.timeLimit = 60;
    window.addEventListener('graze', () => {
      let sound = new Audio('sounds/graze.mp3');
      sound.play();
    })
    window.addEventListener('die', () => {
      let sound = new Audio('sounds/death.mp3');
      sound.play();
    })
    window.addEventListener('Halted', () => {
      let sound = new Audio('sounds/pause.mp3');
      sound.play();
      gameBGM.pause();
    })
    window.addEventListener('', () => {
      let sound = new Audio('sounds/pause.mp3');
      sound.play();
      gameBGM.play();
    })
    audioElement.addEventListener('ended', () => {
      this.currentTime = 0;
      this.play();
    }, false);
    this.startGame();
  }
  fireSpreadBarrageV1 = () => {
    let xBase = this.gameCanvas.width / 2;
    let yBase = 0;
    let distance = Math.sqrt(Math.pow(this.player.x - xBase, 2) + Math.pow(this.player.y - yBase, 2));
    let xV = (this.player.x - xBase) / distance;
    let yV = (this.player.y - yBase) / distance;
    let xV30 = xV * Math.cos(DEG30) - yV * Math.sin(DEG30);
    let yV30 = xV * Math.sin(DEG30) + yV * Math.cos(DEG30);
    let xVi30 = xV * Math.cos(-DEG30) - yV * Math.sin(-DEG30);
    let yVi30 = xV * Math.sin(-DEG30) + yV * Math.cos(-DEG30);
    let xV60 = xV * Math.cos(DEG60) - yV * Math.sin(DEG60);
    let yV60 = xV * Math.sin(DEG60) + yV * Math.cos(DEG60);
    let xVi60 = xV * Math.cos(-DEG60) - yV * Math.sin(-DEG60);
    let yVi60 = xV * Math.sin(-DEG60) + yV * Math.cos(-DEG60);
    let xV90 = xV * Math.cos(DEG90) - yV * Math.sin(DEG90);
    let yV90 = xV * Math.sin(DEG90) + yV * Math.cos(DEG90);
    let xVi90 = xV * Math.cos(-DEG90) - yV * Math.sin(-DEG90);
    let yVi90 = xV * Math.sin(-DEG90) + yV * Math.cos(-DEG90);
    let velocity = 1;
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xV, yV, velocity));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xVi30, yVi30, velocity));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xV30, yV30, velocity));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xVi60, yVi60, velocity));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xV60, yV60, velocity));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xVi90, yVi90, velocity));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xV90, yV90, velocity));
  }
  fireSpreadBarrageV2 = () => {
    let xBase = this.gameCanvas.width / 2 + this.gameCanvas.width * 0.3;
    let yBase = 0;
    let distance = Math.sqrt(Math.pow(this.player.x - xBase, 2) + Math.pow(this.player.y - yBase, 2));
    let xV = (this.player.x - xBase) / distance;
    let yV = (this.player.y - yBase) / distance;
    let xV10 = xV * Math.cos(DEG10) - yV * Math.sin(DEG10);
    let yV10 = xV * Math.sin(DEG10) + yV * Math.cos(DEG10);
    let xVi10 = xV * Math.cos(-DEG10) - yV * Math.sin(-DEG10);
    let yVi10 = xV * Math.sin(-DEG10) + yV * Math.cos(-DEG10);
    let xV20 = xV * Math.cos(DEG20) - yV * Math.sin(DEG20);
    let yV20 = xV * Math.sin(DEG20) + yV * Math.cos(DEG20);
    let xVi20 = xV * Math.cos(-DEG20) - yV * Math.sin(-DEG20);
    let yVi20 = xV * Math.sin(-DEG20) + yV * Math.cos(-DEG20);
    let xV30 = xV * Math.cos(DEG30) - yV * Math.sin(DEG30);
    let yV30 = xV * Math.sin(DEG30) + yV * Math.cos(DEG30);
    let xVi30 = xV * Math.cos(-DEG30) - yV * Math.sin(-DEG30);
    let yVi30 = xV * Math.sin(-DEG30) + yV * Math.cos(-DEG30);
    let xV40 = xV * Math.cos(DEG40) - yV * Math.sin(DEG40);
    let yV40 = xV * Math.sin(DEG40) + yV * Math.cos(DEG40);
    let xVi40 = xV * Math.cos(-DEG40) - yV * Math.sin(-DEG40);
    let yVi40 = xV * Math.sin(-DEG40) + yV * Math.cos(-DEG40);
    let xV50 = xV * Math.cos(DEG50) - yV * Math.sin(DEG50);
    let yV50 = xV * Math.sin(DEG50) + yV * Math.cos(DEG50);
    let xVi50 = xV * Math.cos(-DEG50) - yV * Math.sin(-DEG50);
    let yVi50 = xV * Math.sin(-DEG50) + yV * Math.cos(-DEG50);
    let xV60 = xV * Math.cos(DEG60) - yV * Math.sin(DEG60);
    let yV60 = xV * Math.sin(DEG60) + yV * Math.cos(DEG60);
    let xVi60 = xV * Math.cos(-DEG60) - yV * Math.sin(-DEG60);
    let yVi60 = xV * Math.sin(-DEG60) + yV * Math.cos(-DEG60);
    let xV70 = xV * Math.cos(DEG70) - yV * Math.sin(DEG70);
    let yV70 = xV * Math.sin(DEG70) + yV * Math.cos(DEG70);
    let xVi70 = xV * Math.cos(-DEG70) - yV * Math.sin(-DEG70);
    let yVi70 = xV * Math.sin(-DEG70) + yV * Math.cos(-DEG70);
    let xV80 = xV * Math.cos(DEG80) - yV * Math.sin(DEG80);
    let yV80 = xV * Math.sin(DEG80) + yV * Math.cos(DEG80);
    let xVi80 = xV * Math.cos(-DEG80) - yV * Math.sin(-DEG80);
    let yVi80 = xV * Math.sin(-DEG80) + yV * Math.cos(-DEG80);
    let xV90 = xV * Math.cos(DEG90) - yV * Math.sin(DEG90);
    let yV90 = xV * Math.sin(DEG90) + yV * Math.cos(DEG90);
    let xVi90 = xV * Math.cos(-DEG90) - yV * Math.sin(-DEG90);
    let yVi90 = xV * Math.sin(-DEG90) + yV * Math.cos(-DEG90);
    let velocity = 0.8;
    let angle = Math.atan2(yV, xV) - DEG90;
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV, yV, velocity, angle));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi10, yVi10, velocity, angle - DEG10));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV10, yV10, velocity, angle + DEG10));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi20, yVi20, velocity, angle - DEG20));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV20, yV20, velocity, angle + DEG20));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi30, yVi30, velocity, angle - DEG30));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV30, yV30, velocity, angle + DEG30));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi40, yVi40, velocity, angle - DEG40));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV40, yV40, velocity, angle + DEG40));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi50, yVi50, velocity, angle - DEG50));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV50, yV50, velocity, angle + DEG50));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi60, yVi60, velocity, angle - DEG60));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV60, yV60, velocity, angle + DEG60));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi70, yVi70, velocity, angle - DEG70));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV70, yV70, velocity, angle + DEG70));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi80, yVi80, velocity, angle - DEG80));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV80, yV80, velocity, angle + DEG80));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi90, yVi90, velocity, angle - DEG90));
    this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV90, yV90, velocity, angle + DEG90));
  }
  fireSpreadBarrageV3 = () => {
    let xBase = this.gameCanvas.width / 2 - this.gameCanvas.width * 0.3;
    let yBase = 0;
    let distance = Math.sqrt(Math.pow(this.player.x - xBase, 2) + Math.pow(this.player.y - yBase, 2));
    let xV = (this.player.x - xBase) / distance;
    let yV = (this.player.y - yBase) / distance;
    let xV10 = xV * Math.cos(DEG10) - yV * Math.sin(DEG10);
    let yV10 = xV * Math.sin(DEG10) + yV * Math.cos(DEG10);
    let xVi10 = xV * Math.cos(-DEG10) - yV * Math.sin(-DEG10);
    let yVi10 = xV * Math.sin(-DEG10) + yV * Math.cos(-DEG10);
    let xV20 = xV * Math.cos(DEG20) - yV * Math.sin(DEG20);
    let yV20 = xV * Math.sin(DEG20) + yV * Math.cos(DEG20);
    let xVi20 = xV * Math.cos(-DEG20) - yV * Math.sin(-DEG20);
    let yVi20 = xV * Math.sin(-DEG20) + yV * Math.cos(-DEG20);
    let xV30 = xV * Math.cos(DEG30) - yV * Math.sin(DEG30);
    let yV30 = xV * Math.sin(DEG30) + yV * Math.cos(DEG30);
    let xVi30 = xV * Math.cos(-DEG30) - yV * Math.sin(-DEG30);
    let yVi30 = xV * Math.sin(-DEG30) + yV * Math.cos(-DEG30);
    let xV40 = xV * Math.cos(DEG40) - yV * Math.sin(DEG40);
    let yV40 = xV * Math.sin(DEG40) + yV * Math.cos(DEG40);
    let xVi40 = xV * Math.cos(-DEG40) - yV * Math.sin(-DEG40);
    let yVi40 = xV * Math.sin(-DEG40) + yV * Math.cos(-DEG40);
    let xV50 = xV * Math.cos(DEG50) - yV * Math.sin(DEG50);
    let yV50 = xV * Math.sin(DEG50) + yV * Math.cos(DEG50);
    let xVi50 = xV * Math.cos(-DEG50) - yV * Math.sin(-DEG50);
    let yVi50 = xV * Math.sin(-DEG50) + yV * Math.cos(-DEG50);
    let xV60 = xV * Math.cos(DEG60) - yV * Math.sin(DEG60);
    let yV60 = xV * Math.sin(DEG60) + yV * Math.cos(DEG60);
    let xVi60 = xV * Math.cos(-DEG60) - yV * Math.sin(-DEG60);
    let yVi60 = xV * Math.sin(-DEG60) + yV * Math.cos(-DEG60);
    let xV70 = xV * Math.cos(DEG70) - yV * Math.sin(DEG70);
    let yV70 = xV * Math.sin(DEG70) + yV * Math.cos(DEG70);
    let xVi70 = xV * Math.cos(-DEG70) - yV * Math.sin(-DEG70);
    let yVi70 = xV * Math.sin(-DEG70) + yV * Math.cos(-DEG70);
    let xV80 = xV * Math.cos(DEG80) - yV * Math.sin(DEG80);
    let yV80 = xV * Math.sin(DEG80) + yV * Math.cos(DEG80);
    let xVi80 = xV * Math.cos(-DEG80) - yV * Math.sin(-DEG80);
    let yVi80 = xV * Math.sin(-DEG80) + yV * Math.cos(-DEG80);
    let xV90 = xV * Math.cos(DEG90) - yV * Math.sin(DEG90);
    let yV90 = xV * Math.sin(DEG90) + yV * Math.cos(DEG90);
    let xVi90 = xV * Math.cos(-DEG90) - yV * Math.sin(-DEG90);
    let yVi90 = xV * Math.sin(-DEG90) + yV * Math.cos(-DEG90);
    let velocity = 0.8;
    let angle = Math.atan2(yV, xV) - DEG90;
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV, yV, velocity, angle));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xVi10, yVi10, velocity, angle - DEG10));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV10, yV10, velocity, angle + DEG10));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xVi20, yVi20, velocity, angle - DEG20));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV20, yV20, velocity, angle + DEG20));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xVi30, yVi30, velocity, angle - DEG30));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV30, yV30, velocity, angle + DEG30));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xVi40, yVi40, velocity, angle - DEG40));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV40, yV40, velocity, angle + DEG40));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xVi50, yVi50, velocity, angle - DEG50));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV50, yV50, velocity, angle + DEG50));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xVi60, yVi60, velocity, angle - DEG60));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV60, yV60, velocity, angle + DEG60));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xVi70, yVi70, velocity, angle - DEG70));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV70, yV70, velocity, angle + DEG70));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xVi80, yVi80, velocity, angle - DEG80));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV80, yV80, velocity, angle + DEG80));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xVi90, yVi90, velocity, angle - DEG90));
    this.gameObjects.push(new RedOfuda(xBase, yBase, xV90, yV90, velocity, angle + DEG90));
  }
  fireStraightBarrageV1 = () => {
    let xBase = this.gameCanvas.width / 2;
    let yBase = 0;
    let velocity = 2;
    let xV = 0;
    let yV = 1;
    this.gameObjects.push(new BlackOutlinedBall(xBase + this.gameCanvas.width * 0.05, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase - this.gameCanvas.width * 0.05, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase + this.gameCanvas.width * 0.25, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase - this.gameCanvas.width * 0.25, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase + this.gameCanvas.width * 0.45, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase - this.gameCanvas.width * 0.45, yBase, xV, yV, velocity));
  }
  fireAimedBarrageV1 = () => {
    let xBase = this.gameCanvas.width / 2;
    let yBase = 0;
    let distance = Math.sqrt(Math.pow(this.player.x - xBase, 2) + Math.pow(this.player.y - yBase, 2));
    let xV = (this.player.x - xBase) / distance;
    let yV = (this.player.y - yBase) / distance;
    let xV5 = xV * Math.cos(DEG5) - yV * Math.sin(DEG5);
    let yV5 = xV * Math.sin(DEG5) + yV * Math.cos(DEG5)
    let xVi5 = xV * Math.cos(-DEG5) - yV * Math.sin(-DEG5);
    let yVi5 = xV * Math.sin(-DEG5) + yV * Math.cos(-DEG5);
    let velocity = 3;
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV, yV, velocity));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV, yV, velocity * 0.8));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV, yV, velocity * 0.6));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV, yV, velocity * 0.4));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV5, yV5, velocity));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV5, yV5, velocity * 0.8));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV5, yV5, velocity * 0.6));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV5, yV5, velocity * 0.4));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xVi5, yVi5, velocity));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xVi5, yVi5, velocity * 0.8));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xVi5, yVi5, velocity * 0.6));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xVi5, yVi5, velocity * 0.4));
  }
  fireAimedBarrageV2 = () => {
    let xBase = this.gameCanvas.width / 2;
    let yBase = 0;
    let distance = Math.sqrt(Math.pow(this.player.x - xBase, 2) + Math.pow(this.player.y - yBase, 2));
    let xV = (this.player.x - xBase) / distance;
    let yV = (this.player.y - yBase) / distance;
    let angle = Math.atan2(yV, xV) - DEG90;
    let velocity = 2.5;
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xV, yV, velocity, angle));
  }
  update = () => {
    if (this.pause) return;
    if (this.interval % 30 == 0 && this.interval % 120 != 0) {
      this.fireSpreadBarrageV1();
    }
    if (this.interval % 120 == 0) {
      this.fireSpreadBarrageV2();
    }
    if (this.interval % 120 == 45) {
      this.fireSpreadBarrageV3();
    }
    if (this.interval % 240 == 0) {
      this.fireStraightBarrageV1();
    }
    if (this.interval % 120 < 30 && this.interval % 3 == 0) {
      this.fireAimedBarrageV2();
    }
    if (this.interval % 180 == 0) {
      this.fireAimedBarrageV1();
    }
    this.interval += 1;
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.scoreCtx.clearRect(0, 0, this.scoreCanvas.width, this.scoreCanvas.height);
    this.gameCtx.drawImage(document.getElementById('background'), 0, 0, this.gameCanvas.width, this.gameCanvas.height);

    this.scoreCtx.fillText(`Score: ${this.interval * 10 + this.score + this.graze * 100}`, 40, 100, this.scoreCanvas.width);
    this.scoreCtx.fillText(`Graze: ${this.graze}`, 40, 140, this.scoreCanvas.width);
    this.scoreCtx.fillText(`Time left: ${this.timeLimit - Math.floor(this.interval / this.frameRate)}`, 40, 180, this.scoreCanvas.width);
    // this.scoreCtx.fillText(`Bullets: ${this.gameObjects.length}`, 40, 180, this.scoreCanvas.width);

    this.player.update();
    for (let index = 0; index < this.gameObjects.length; index++) {
      let obj = this.gameObjects[index];
      obj.update(this.gameCtx);
      let res = this.intersects(this.player.getBounds(), obj.getBounds());
      if (res && !obj.grazed) {
        window.dispatchEvent(new Event('graze'));
      }
      this.graze += +(res && !obj.grazed);
      obj.grazed = obj.grazed || res;
      if (!obj.keepAlive) {
        this.gameObjects.splice(index, 1);
      }
    }
    if (this.timeLimit * this.frameRate <= this.interval) {
      this.stopGameWin();
    }
  }
  stopGameLose = () => {
    clearInterval(this.gameLoop);
    this.gameCtx.fillStyle = 'red';
    this.gameCtx.fillText(`Game over`, 15, 260, this.gameCanvas.width);
    this.gameover = true;
    window.dispatchEvent(new Event('die'));
  }
  stopGameWin = () => {
    clearInterval(this.gameLoop);
    this.gameCtx.fillStyle = 'green';
    this.gameCtx.fillText(`You win`, 75, 260, this.gameCanvas.width);
    this.gameover = true;
  }
  intersects = (o1, o2) => {
    let distance = Math.sqrt(Math.pow(o1.x - o2.x, 2) + Math.pow(o1.y - o2.y, 2));
    let deathDistance = o1.r + o2.r;
    let grazeDistance = o1.r * 4 + o2.r;
    if (distance < deathDistance) {
      this.stopGameLose();
    }
    // true if graze, false if not
    return (distance < grazeDistance);
  }
  toggle = () => {
    if (this.gameover) {
      this.startGame();
      this.toggle();
      return;
    }
    this.pause = !this.pause;
    let text = {};
    text[0] = '';
    text[1] = 'Halted';
    window.dispatchEvent(new Event(text[+this.pause]));
    this.gameCtx.fillStyle = 'red';
    this.gameCtx.fillText(`${text[+this.pause]}`, 100, 260, this.gameCanvas.width);
  }
  playerMove = (x, y, focus) => {
    this.player.move(+(this.pause == false) * x + 0, +(this.pause == false) * y + 0, +(this.pause == false) * focus + 0);
  }
  startGame = () => {
    this.interval = 0;
    this.score = 0;
    this.graze = 0;
    this.pause = true;
    this.gameover = false;
    this.gameObjects = new Array(0);

    this.player = new Player(this.gameCanvas.width / 2, this.gameCanvas.height * 0.8);

    this.gameLoop = setInterval(this.update, 1000 / this.frameRate);
  }
}

class Entity extends GameObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.radius;
    this.realHitbox = 1;
  }
  draw = () => {};
  update = () => {};
  move = () => {};
  getBounds = () => {
    return {
      x: this.x,
      y: this.y,
      r: this.radius * this.realHitbox
    }
  }
}

class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.radius = 5;
    this.velocity = 1.8;
    this.focusedSlowdown = 0.65;
    this.colorTable = {};
    this.color = "white";
    this.colorTable[0] = "white";
    this.colorTable[1] = "red";
    this.realHitbox = 0.8;
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
    this.x += x * this.velocity * (1 - focus * this.focusedSlowdown);
    this.y += y * this.velocity * (1 - focus * this.focusedSlowdown);
    this.x = (this.x < xLeftBound) * xLeftBound + (this.x > xRightBound) * xRightBound + (this.x >= xLeftBound && this.x <= xRightBound) * this.x;
    this.y = (this.y < yUpperBound) * yUpperBound + (this.y > yLowerBound) * yLowerBound + (this.y >= yUpperBound && this.y <= yLowerBound) * this.y;
  }
  update = () => {
    this.draw();
  }
}

class Bullet extends Entity {
  constructor(x, y, xV, yV, vel) {
    super(x, y);
    this.grazed = false;
    this.velocity = vel;
    this.timeToLive = (20 - (this.velocity / 5) * 16) * this.frameRate;
    this.keepAlive = true;
    this.xVector = xV;
    this.yVector = yV;
    this.realHitbox = 0.7;
  }
  draw = () => {
  }
  move = () => {
    this.x += this.xVector * this.velocity;
    this.y += this.yVector * this.velocity;
  }
  update = () => {
    this.move();
    this.draw();
    this.timeToLive -= 1;
    this.keepAlive = this.timeToLive > 0;
  }
}

class PurpleBallBullet extends Bullet {
  constructor(x, y, xV, yV, vel) {
    super(x, y, xV, yV, vel);
    this.radius = 8;
    this.realHitbox = 0.6;
  }
  draw = () => {
    this.gameCtx.drawImage(document.getElementById('purple_bullet_ball'), this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
}

class BlackOutlinedBall extends Bullet {
  constructor(x, y, xV, yV, vel) {
    super(x, y, xV, yV, vel);
    this.radius = 8;
    this.realHitbox = 0.4;
  }
  draw = () => {
    this.gameCtx.drawImage(document.getElementById('black_outlined_ball'), this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
}

class PurpleOfuda extends Bullet {
  constructor(x, y, xV, yV, vel, angle) {
    super(x, y, xV, yV, vel);
    this.radius = 7;
    this.realHitbox = 0.4;
    this.angle = angle;
  }
  draw = () => {
    this.gameCtx.translate(this.x, this.y);
    this.gameCtx.rotate(this.angle);
    this.gameCtx.translate(-this.x, -this.y);
    this.gameCtx.drawImage(document.getElementById('purple_ofuda'), this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    this.gameCtx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

class RedOfuda extends Bullet {
  constructor(x, y, xV, yV, vel, angle) {
    super(x, y, xV, yV, vel);
    this.radius = 7;
    this.realHitbox = 0.4;
    this.angle = angle;
  }
  draw = () => {
    this.gameCtx.translate(this.x, this.y);
    this.gameCtx.rotate(this.angle);
    this.gameCtx.translate(-this.x, -this.y);
    this.gameCtx.drawImage(document.getElementById('red_ofuda'), this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    this.gameCtx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

class SmallYellowStar extends Bullet {
  constructor(x, y, xV, yV, vel) {
    super(x, y, xV, yV, vel);
    this.radius = 8;
    this.realHitbox = 0.4;
    this.rotateAngle = (Math.random() + 0.34) * 0.06;
    this.rotateCurrent = Math.random() * Math.PI;
  }
  draw = () => {
    this.gameCtx.translate(this.x, this.y);
    this.gameCtx.rotate(this.rotateCurrent);
    this.gameCtx.translate(-this.x, -this.y);
    this.rotateCurrent += this.rotateAngle;
    this.gameCtx.drawImage(document.getElementById('yellow_star_small'), this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    // this.gameCtx.translate(this.x, this.y);
    // this.gameCtx.rotate(-this.rotateCurrent);
    // this.gameCtx.translate(-this.x, -this.y);
    this.gameCtx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

class LightblueArrowhead extends Bullet {
  constructor(x, y, xV, yV, vel, angle) {
    super(x, y, xV, yV, vel);
    this.radius = 8;
    this.realHitbox = 0.4;
    this.rotateAngle = (Math.random() + 0.002) * 0.05;
    this.rotateCurrent = Math.random() * Math.PI;
    this.angle = angle;
  }
  draw = () => {
    this.gameCtx.translate(this.x, this.y);
    this.gameCtx.rotate(DEG180 + this.angle);
    this.gameCtx.translate(-this.x, -this.y);
    this.gameCtx.drawImage(document.getElementById('lightblue_arrowhead'), this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    // this.gameCtx.translate(this.x, this.y);
    // this.gameCtx.rotate(-this.rotateCurrent);
    // this.gameCtx.translate(-this.x, -this.y);
    this.gameCtx.setTransform(1, 0, 0, 1, 0, 0);
  }
}