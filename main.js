import GameController from './Game.js';

var game = null;
var W = 'KeyW';
var A = 'KeyA';
var S = 'KeyS';
var D = 'KeyD';
var LS = 'ShiftLeft';
var RS = 'ShiftRight';
var AU = 'ArrowUp';
var AL = 'ArrowLeft';
var AD = 'ArrowDown';
var AR = 'ArrowRight';
var keys = {};
keys[W] = keys[A] = keys[S] = keys[D] = keys[LS] = keys[RS] = keys[AU] = keys[AL] = keys[AD] = keys[AR] = false;

window.onload = init();

function init() {
  game = new GameController();
  window.addEventListener('keydown', (e) => {
    keys = (keys || []);
    keys[e.code] = true;
  })
  window.addEventListener('keyup', (e) => {
    keys = (keys || []);
    keys[e.code] = false;
    stop();
  })
  window.addEventListener('keypress', (e) => {
    if (e.code == 'Space') {
      toggle();
    }
  })
  setInterval(processKey, 1000 / 90);
  new bootstrap.Modal(document.getElementById('instructionModal'), {}).show();
}

function toggle() {
  game.toggle();
}

function processKey() {
  // xDir = +(D || AR) - +(A || AL);
  // yDir = +(S || AD) - +(U || AU);
  // focus = +(LS || RS)
  game.playerMove(+(keys[D] || keys[AR]) - +(keys[A] || keys[AL]), +(keys[S] || keys[AD]) - +(keys[W] || keys[AU]), +(keys[LS] || keys[RS]));
}