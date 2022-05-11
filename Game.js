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

const PURPLEBALLBULLET = document.getElementById('purple_bullet_ball');
const LIGHTBLUEARROWHEAD = document.getElementById('lightblue_arrowhead');
const YELLOWSTARSMALL = document.getElementById('yellow_star_small');
const REDOFUDA = document.getElementById('red_ofuda');
const PURPLEOFUDA = document.getElementById('purple_ofuda');
const BLACKOUTLINEDBALL = document.getElementById('black_outlined_ball');
const GREENBUTTERFLY = document.getElementById('green_butterfly');
const BACKGROUND = document.getElementById('background');
const PLAYERSPRITEFOCUSED = document.getElementById('player_sprite_focused');
const PLAYERSPRITEUNFOCUSED = document.getElementById('player_sprite_unfocused');
const PLAYERSPRITEBASE = document.getElementById('player_sprite_base');

let grazeSound = new Howl({
  src: ['sounds/graze.mp3'],
  html5: true,
});

let pauseSound = new Howl({
  src: ['sounds/pause.mp3'],
  html5: true,
});

let bombSound = new Howl({
  src: ['sounds/bomb.mp3'],
  html5: true,
});

let deathSound = new Howl({
  src: ['sounds/death.mp3'],
  html5: true,
});

let sound = new Howl({
  src: ['sounds/main.mp3'],
  html5: true,
  loop: true,
});

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
    
    window.addEventListener('graze', function() {
      grazeSound.play();
    })
    window.addEventListener('die', function() {
      deathSound.play();
    })
    window.addEventListener('Halted', function() {
      pauseSound.play();
      (sound.playing && sound.pause());
    })
    window.addEventListener('', function() {
      pauseSound.play();
      (!sound.playing() && sound.play());
    })
    window.addEventListener('bomb', function() {
      bombSound.play();
    })
    this.startGame();
  }
  startGame = () => {
    this.interval = 0;
    this.score = 0;
    this.graze = 0;
    this.pause = true;
    this.gameover = false;
    this.gameObjects =  [];

    this.player = new Player(this.gameCanvas.width / 2, this.gameCanvas.height * 0.8);
    this.bombCount = 3;

    this.gameLoop = setInterval(this.update, 1000 / this.frameRate);
  }
  fireStarBarrage = () => {
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
    let velocity = 0.85;
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xV, yV, velocity + 0.2 * (Math.random() - 0.5)));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xVi30, yVi30, velocity + 0.2 * (Math.random() - 0.5)));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xV30, yV30, velocity + 0.2 * (Math.random() - 0.5)));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xVi60, yVi60, velocity + 0.2 * (Math.random() - 0.5)));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xV60, yV60, velocity + 0.2 * (Math.random() - 0.5)));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xVi90, yVi90, velocity + 0.2 * (Math.random() - 0.5)));
    this.gameObjects.push(new SmallYellowStar(xBase, yBase, xV90, yV90, velocity + 0.2 * (Math.random() - 0.5)));
    return 1;
  }
  firePurpleOfuda = () => {
    let xBase = this.gameCanvas.width / 2 + (this.gameCanvas.width * 0.2) * Math.random() + (this.gameCanvas.width * 0.15);
    let yBase = (this.gameCanvas.height * 0.15) * Math.random() * 0.8;
    let distance = Math.sqrt(Math.pow(this.player.x - xBase, 2) + Math.pow(this.player.y - yBase, 2));
    let xV = (this.player.x - xBase) / distance;
    let yV = (this.player.y - yBase) / distance;
    let randomAngle = Math.PI / 20 * (Math.random() - 0.5);
    let randomXV = xV * Math.cos(randomAngle) - yV * Math.sin(randomAngle);
    let randomYV = xV * Math.sin(randomAngle) + yV * Math.cos(randomAngle);
    xV = randomXV;
    yV = randomYV;
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
    // let xV60 = xV * Math.cos(DEG60) - yV * Math.sin(DEG60);
    // let yV60 = xV * Math.sin(DEG60) + yV * Math.cos(DEG60);
    // let xVi60 = xV * Math.cos(-DEG60) - yV * Math.sin(-DEG60);
    // let yVi60 = xV * Math.sin(-DEG60) + yV * Math.cos(-DEG60);
    // let xV70 = xV * Math.cos(DEG70) - yV * Math.sin(DEG70);
    // let yV70 = xV * Math.sin(DEG70) + yV * Math.cos(DEG70);
    // let xVi70 = xV * Math.cos(-DEG70) - yV * Math.sin(-DEG70);
    // let yVi70 = xV * Math.sin(-DEG70) + yV * Math.cos(-DEG70);
    // let xV80 = xV * Math.cos(DEG80) - yV * Math.sin(DEG80);
    // let yV80 = xV * Math.sin(DEG80) + yV * Math.cos(DEG80);
    // let xVi80 = xV * Math.cos(-DEG80) - yV * Math.sin(-DEG80);
    // let yVi80 = xV * Math.sin(-DEG80) + yV * Math.cos(-DEG80);
    // let xV90 = xV * Math.cos(DEG90) - yV * Math.sin(DEG90);
    // let yV90 = xV * Math.sin(DEG90) + yV * Math.cos(DEG90);
    // let xVi90 = xV * Math.cos(-DEG90) - yV * Math.sin(-DEG90);
    // let yVi90 = xV * Math.sin(-DEG90) + yV * Math.cos(-DEG90);
    let velocity = 0.8 + 0.12 * (Math.random() - 0.5);
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
    // this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi60, yVi60, velocity, angle - DEG60));
    // this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV60, yV60, velocity, angle + DEG60));
    // this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi70, yVi70, velocity, angle - DEG70));
    // this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV70, yV70, velocity, angle + DEG70));
    // this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi80, yVi80, velocity, angle - DEG80));
    // this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV80, yV80, velocity, angle + DEG80));
    // this.gameObjects.push(new PurpleOfuda(xBase, yBase, xVi90, yVi90, velocity, angle - DEG90));
    // this.gameObjects.push(new PurpleOfuda(xBase, yBase, xV90, yV90, velocity, angle + DEG90));
    return 1;
  }
  fireRedOfuda = () => {
    let xBase = this.gameCanvas.width / 2 - (this.gameCanvas.width * 0.2) * Math.random() - (this.gameCanvas.width * 0.15);
    let yBase = (this.gameCanvas.height * 0.15) * Math.random();
    let distance = Math.sqrt(Math.pow(this.player.x - xBase, 2) + Math.pow(this.player.y - yBase, 2));
    let xV = (this.player.x - xBase) / distance;
    let yV = (this.player.y - yBase) / distance;
    let randomAngle = Math.PI / 20 * (Math.random() - 0.5);
    let randomXV = xV * Math.cos(randomAngle) - yV * Math.sin(randomAngle);
    let randomYV = xV * Math.sin(randomAngle) + yV * Math.cos(randomAngle);
    xV = randomXV;
    yV = randomYV;
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
    // let xV60 = xV * Math.cos(DEG60) - yV * Math.sin(DEG60);
    // let yV60 = xV * Math.sin(DEG60) + yV * Math.cos(DEG60);
    // let xVi60 = xV * Math.cos(-DEG60) - yV * Math.sin(-DEG60);
    // let yVi60 = xV * Math.sin(-DEG60) + yV * Math.cos(-DEG60);
    // let xV70 = xV * Math.cos(DEG70) - yV * Math.sin(DEG70);
    // let yV70 = xV * Math.sin(DEG70) + yV * Math.cos(DEG70);
    // let xVi70 = xV * Math.cos(-DEG70) - yV * Math.sin(-DEG70);
    // let yVi70 = xV * Math.sin(-DEG70) + yV * Math.cos(-DEG70);
    // let xV80 = xV * Math.cos(DEG80) - yV * Math.sin(DEG80);
    // let yV80 = xV * Math.sin(DEG80) + yV * Math.cos(DEG80);
    // let xVi80 = xV * Math.cos(-DEG80) - yV * Math.sin(-DEG80);
    // let yVi80 = xV * Math.sin(-DEG80) + yV * Math.cos(-DEG80);
    // let xV90 = xV * Math.cos(DEG90) - yV * Math.sin(DEG90);
    // let yV90 = xV * Math.sin(DEG90) + yV * Math.cos(DEG90);
    // let xVi90 = xV * Math.cos(-DEG90) - yV * Math.sin(-DEG90);
    // let yVi90 = xV * Math.sin(-DEG90) + yV * Math.cos(-DEG90);
    let velocity = 0.8 + 0.12 * (Math.random() - 0.5);
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
    // this.gameObjects.push(new RedOfuda(xBase, yBase, xVi60, yVi60, velocity, angle - DEG60));
    // this.gameObjects.push(new RedOfuda(xBase, yBase, xV60, yV60, velocity, angle + DEG60));
    // this.gameObjects.push(new RedOfuda(xBase, yBase, xVi70, yVi70, velocity, angle - DEG70));
    // this.gameObjects.push(new RedOfuda(xBase, yBase, xV70, yV70, velocity, angle + DEG70));
    // this.gameObjects.push(new RedOfuda(xBase, yBase, xVi80, yVi80, velocity, angle - DEG80));
    // this.gameObjects.push(new RedOfuda(xBase, yBase, xV80, yV80, velocity, angle + DEG80));
    // this.gameObjects.push(new RedOfuda(xBase, yBase, xVi90, yVi90, velocity, angle - DEG90));
    // this.gameObjects.push(new RedOfuda(xBase, yBase, xV90, yV90, velocity, angle + DEG90));
    return 1;
  }
  fireStraightBarrageV1 = () => {
    let xBase = this.gameCanvas.width / 2;
    let yBase = this.gameCanvas.height;
    let velocity = 2;
    let xV = 0;
    let yV = -1;
    this.gameObjects.push(new BlackOutlinedBall(xBase + this.gameCanvas.width * 0.05, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase - this.gameCanvas.width * 0.05, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase + this.gameCanvas.width * 0.25, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase - this.gameCanvas.width * 0.25, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase + this.gameCanvas.width * 0.45, yBase, xV, yV, velocity));
    this.gameObjects.push(new BlackOutlinedBall(xBase - this.gameCanvas.width * 0.45, yBase, xV, yV, velocity));
    return 1;
  }
  fireConvergingButterflyBarrage = () => {
    let leftXBase = 0;
    let rightXBase = this.gameCanvas.width;
    let yBase = this.gameCanvas.height;
    let velocity = 1.5;
    const DIAGX = Math.cos(DEG20);
    const DIAGY = Math.sin(DEG20);
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.65, DIAGX, DIAGY, velocity, -DEG90 - DEG20));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.72, 1, 0, velocity, -DEG90));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.79, DIAGX, -DIAGY, velocity, -DEG90 + DEG20));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.35, DIAGX, -DIAGY, velocity, -DEG90 + DEG20));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.28, 1, 0, velocity, -DEG90));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.21, DIAGX, DIAGY, velocity, -DEG90 - DEG20));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.65, -DIAGX, DIAGY, velocity, DEG90 - DEG20));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.72, -1, 0, velocity, DEG90));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.79, -DIAGX, -DIAGY, velocity, DEG90 + DEG20));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.35, -DIAGX, -DIAGY, velocity, DEG90 + DEG20));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.28, -1, 0, velocity, DEG90));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.21, -DIAGX, DIAGY, velocity, DEG90 - DEG20));
    return 1;
  }
  fireDivergingButterflyBarrage = () => {
    let leftXBase = 0;
    let rightXBase = this.gameCanvas.width;
    let yBase = this.gameCanvas.height;
    let velocity = 1.5;
    const DIAGX = Math.cos(DEG20);
    const DIAGY = Math.sin(DEG20);
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.65, DIAGX, -DIAGY, velocity, -DEG90 + DEG20));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.72, 1, 0, velocity, -DEG90));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.79, DIAGX, DIAGY, velocity, -DEG90 - DEG20));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.35, DIAGX, DIAGY, velocity, -DEG90 - DEG20));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.28, 1, 0, velocity, -DEG90));
    this.gameObjects.push(new GreenButterfly(leftXBase, yBase * 0.21, DIAGX, -DIAGY, velocity, -DEG90 + DEG20));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.65, -DIAGX, -DIAGY, velocity, DEG90 + DEG20));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.72, -1, 0, velocity, DEG90));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.79, -DIAGX, DIAGY, velocity, DEG90 - DEG20));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.35, -DIAGX, DIAGY, velocity, DEG90 - DEG20));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.28, -1, 0, velocity, DEG90));
    this.gameObjects.push(new GreenButterfly(rightXBase, yBase * 0.21, -DIAGX, -DIAGY, velocity, DEG90 + DEG20));
    return 1;
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
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV, yV, velocity * 0.85));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV, yV, velocity * 0.7));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV, yV, velocity * 0.55));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV5, yV5, velocity));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV5, yV5, velocity * 0.85));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV5, yV5, velocity * 0.7));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xV5, yV5, velocity * 0.55));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xVi5, yVi5, velocity));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xVi5, yVi5, velocity * 0.85));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xVi5, yVi5, velocity * 0.7));
    this.gameObjects.push(new PurpleBallBullet(xBase, yBase, xVi5, yVi5, velocity * 0.55));
    return 1;
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
    return 1;
  }
  fireAimedBarrageV3 = () => {
    let xBase = this.gameCanvas.width / 2;
    let yBase = this.gameCanvas.height / 2;
    let distance = Math.sqrt(Math.pow(this.player.x - xBase, 2) + Math.pow(this.player.y - yBase, 2));
    let xV = (this.player.x - xBase) / distance;
    let yV = (this.player.y - yBase) / distance;
    let xV45 = xV * Math.cos(DEG45) - yV * Math.sin(DEG45);
    let yV45 = xV * Math.sin(DEG45) + yV * Math.cos(DEG45);
    let xVi45 = xV * Math.cos(-DEG45) - yV * Math.sin(-DEG45);
    let yVi45 = xV * Math.sin(-DEG45) + yV * Math.cos(-DEG45);
    let angle = Math.atan2(yV, xV) - DEG90;
    let velocity = 2;
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xV, yV, velocity, angle));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xV45, yV45, velocity, angle + DEG45));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xVi45, yVi45, velocity, angle - DEG45));
    return 1;
  }
  fireAimedBarrageV4 = () => {
    let xBase = this.gameCanvas.width / 2;
    let yBase = this.gameCanvas.height / 2;
    let distance = Math.sqrt(Math.pow(this.player.x - xBase, 2) + Math.pow(this.player.y - yBase, 2));
    let xV = (this.player.x - xBase) / distance;
    let yV = (this.player.y - yBase) / distance;
    let xV60 = xV * Math.cos(DEG60) - yV * Math.sin(DEG60);
    let yV60 = xV * Math.sin(DEG60) + yV * Math.cos(DEG60);
    let xVi60 = xV * Math.cos(-DEG60) - yV * Math.sin(-DEG60);
    let yVi60 = xV * Math.sin(-DEG60) + yV * Math.cos(-DEG60);
    let angle = Math.atan2(yV, xV) - DEG90;
    let velocity = 3;
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xV, yV, velocity, angle));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xV60, yV60, velocity, angle + DEG60));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xVi60, yVi60, velocity, angle - DEG60));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xV, yV, velocity * 0.85, angle));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xV60, yV60, velocity * 0.85, angle + DEG60));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xVi60, yVi60, velocity * 0.85, angle - DEG60));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xV, yV, velocity * 0.7, angle));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xV60, yV60, velocity * 0.7, angle + DEG60));
    this.gameObjects.push(new LightblueArrowhead(xBase, yBase, xVi60, yVi60, velocity * 0.7, angle - DEG60));
    return 1;
  }
  update = () => {
    if (this.pause) return;
    // barrages
    (this.interval < (25 * this.frameRate) && this.interval % (0.5 * this.frameRate) == 0 && this.interval % (10 * this.frameRate) != 0 && this.fireStarBarrage());
    (this.interval >= (13 * this.frameRate) && this.interval < (41 * this.frameRate)&& this.interval % (2 * this.frameRate) == 0 && this.firePurpleOfuda());
    (this.interval >= (13 * this.frameRate) && this.interval < (41 * this.frameRate)&& this.interval % (2 * this.frameRate) == (1 * this.frameRate) && this.fireRedOfuda());
    (this.interval >= (26 * this.frameRate) && this.interval < (41 * this.frameRate) && this.interval % (2 * this.frameRate) == (1 * this.frameRate) && this.firePurpleOfuda());
    (this.interval >= (26 * this.frameRate) && this.interval < (41 * this.frameRate) && this.interval % (2 * this.frameRate) == 0 && this.fireRedOfuda());
    (this.interval > (38 * this.frameRate) && this.interval % (3 * this.frameRate) == 0 && this.fireStraightBarrageV1());
    (this.interval > (47 * this.frameRate) && this.interval % (3 * this.frameRate) == (0 * this.frameRate) && this.fireConvergingButterflyBarrage());
    (this.interval > (47 * this.frameRate) && this.interval % (3 * this.frameRate) == (1.5 * this.frameRate) && this.fireDivergingButterflyBarrage());
    (this.interval >= (2 * this.frameRate) && this.interval < (30 * this.frameRate) && this.interval % (2 * this.frameRate) < (0.5 * this.frameRate) && this.interval % (0.05 * this.frameRate) == 0 && this.fireAimedBarrageV2());
    (this.interval >= (10 * this.frameRate) && this.interval < (28 * this.frameRate) && this.interval % (3 * this.frameRate) == 0 && this.fireAimedBarrageV1());
    // (this.interval >= (53 * this.frameRate) && this.interval % (1 * this.frameRate) < (0.7 * this.frameRate) && this.interval % (0.1 * this.frameRate) == 0 && this.fireAimedBarrageV2());
    (this.interval >= (42 * this.frameRate) && this.interval < (46 * this.frameRate) && this.interval % (0.5 * this.frameRate) == 0 && this.fireAimedBarrageV3());
    (this.interval >= (46 * this.frameRate) && this.interval % (0.2 * this.frameRate) == 0 && this.fireAimedBarrageV4());
    // normal game tick stuff
    this.interval += 1;
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.gameCtx.drawImage(BACKGROUND, 0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.scoreCtx.clearRect(0, 0, this.scoreCanvas.width, this.scoreCanvas.height);
    this.scoreCtx.fillText(`Score: ${this.interval * 10 + this.score + this.graze * 500}`, 40, 100, this.scoreCanvas.width);
    this.scoreCtx.fillText(`Grazes: ${this.graze}`, 40, 140, this.scoreCanvas.width);
    this.scoreCtx.fillText(`Bombs: ${this.bombCount}`, 40, 180, this.scoreCanvas.width);
    this.scoreCtx.fillText(`Time left: ${this.timeLimit - Math.floor(this.interval / this.frameRate)}`, 40, 220, this.scoreCanvas.width);
    // update everything, main logic, move and collision
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
    (((this.timeLimit * this.frameRate) <= this.interval) && this.stopGameWin());
  }
  stopGameLose = () => {
    clearInterval(this.gameLoop);
    this.gameCtx.fillStyle = 'red';
    this.gameCtx.fillText(`Game over`, 15, 260, this.gameCanvas.width);
    this.gameover = true;
    this.pause = true;
    window.dispatchEvent(new Event('die'));
    return 1;
  }
  stopGameWin = () => {
    clearInterval(this.gameLoop);
    this.clearScreen();
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.gameCtx.drawImage(BACKGROUND, 0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.gameCtx.fillStyle = 'green';
    this.gameCtx.fillText(`You win`, 75, 260, this.gameCanvas.width);
    this.gameover = true;
    this.score += 1000000 * this.bombCount + 1000 * this.graze;
    this.scoreCtx.clearRect(0, 0, this.scoreCanvas.width, this.scoreCanvas.height);
    this.scoreCtx.fillText(`Score: ${this.interval * 10 + this.score + this.graze * 500}`, 40, 100, this.scoreCanvas.width);
    this.scoreCtx.fillText(`Grazes: ${this.graze}`, 40, 140, this.scoreCanvas.width);
    this.scoreCtx.fillText(`Bombs: ${this.bombCount}`, 40, 180, this.scoreCanvas.width);
    this.scoreCtx.fillText(`Time left: ${this.timeLimit - Math.floor(this.interval / this.frameRate)}`, 40, 220, this.scoreCanvas.width);
    return 1;
  }
  intersects = (o1, o2) => {
    let distance = Math.sqrt(Math.pow(o1.x - o2.x, 2) + Math.pow(o1.y - o2.y, 2));
    let deathDistance = o1.r + o2.r;
    let grazeDistance = o1.r * 6 + o2.r * 2;
    (distance < deathDistance && this.stopGameLose());
    // true if grazed, false if not
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
  playerBomb = () => {
    (this.pause == false && this.bombCount > 0 && this.bombCount-- && this.clearScreen() && window.dispatchEvent(new Event('bomb')));
    return 1;
  }
  clearScreen = () => {
    this.score += this.gameObjects.length * (200 + 11 * this.graze);
    this.gameObjects = [];
    return 1;
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
    this.radius = 2;
    this.velocity = 2;
    this.focusedSlowdown = 0.65;
    this.spriteTable = {};
    this.spriteTable[0] = PLAYERSPRITEUNFOCUSED;
    this.spriteTable[1] = PLAYERSPRITEFOCUSED;
    this.currentSprite = this.spriteTable[0];
    this.rotateCurrent = 0;
    this.rotateAngle = DEG5 / 5 * 2;
    this.realHitbox = 1;
  }
  draw = () => {
    // (this.currentSprite == PLAYERSPRITEUNFOCUSED && this.gameCtx.drawImage(PLAYERSPRITEBASE, this.x - 32, this.y - 32, 64, 64));
    if (this.currentSprite == PLAYERSPRITEUNFOCUSED) {
      this.gameCtx.translate(this.x, this.y);
      this.gameCtx.rotate(this.rotateCurrent);
      this.gameCtx.translate(-this.x, -this.y);
      this.gameCtx.drawImage(PLAYERSPRITEBASE, this.x - 32, this.y - 32, 64, 64);
    }
    this.gameCtx.translate(this.x, this.y);
    this.gameCtx.rotate(this.rotateCurrent);
    this.gameCtx.translate(-this.x, -this.y);
    this.gameCtx.drawImage(this.currentSprite, this.x - 32, this.y - 32, 64, 64);
    this.rotateCurrent += this.rotateAngle;
    this.gameCtx.setTransform(1, 0, 0, 1, 0, 0);
  }
  move = (x, y, focus) => {
    let xLeftBound = 0 + this.radius;
    let xRightBound = this.gameCanvas.width - this.radius;
    let yUpperBound = 0 + this.radius;
    let yLowerBound = this.gameCanvas.height - this.radius;
    this.currentSprite = this.spriteTable[focus];
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
    this.timeToLive = (24 - (this.velocity / 2) * 10) * this.frameRate;
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
    this.gameCtx.drawImage(PURPLEBALLBULLET, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
}

class BlackOutlinedBall extends Bullet {
  constructor(x, y, xV, yV, vel) {
    super(x, y, xV, yV, vel);
    this.radius = 8;
    this.realHitbox = 0.4;
  }
  draw = () => {
    this.gameCtx.drawImage(BLACKOUTLINEDBALL, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
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
    this.gameCtx.drawImage(PURPLEOFUDA, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
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
    this.gameCtx.drawImage(REDOFUDA, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
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
    this.gameCtx.drawImage(YELLOWSTARSMALL, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
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
    this.gameCtx.drawImage(LIGHTBLUEARROWHEAD, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    // this.gameCtx.translate(this.x, this.y);
    // this.gameCtx.rotate(-this.rotateCurrent);
    // this.gameCtx.translate(-this.x, -this.y);
    this.gameCtx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

class GreenButterfly extends Bullet {
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
    this.gameCtx.drawImage(GREENBUTTERFLY, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    // this.gameCtx.translate(this.x, this.y);
    // this.gameCtx.rotate(-this.rotateCurrent);
    // this.gameCtx.translate(-this.x, -this.y);
    this.gameCtx.setTransform(1, 0, 0, 1, 0, 0);
  }
}