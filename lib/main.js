import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game;
  document.getElementById('Start/Restart').onclick = () =>
    game.start('clicked'
  );
  document.getElementById('Start/Restart').focus();
});
