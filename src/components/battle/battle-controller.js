import BattleService from './battle-service.js';

const battleService = new BattleService();

const app = document.getElementById('app');
async function draw(gamePromise) {
  const game = await gamePromise;
}

export default class BattleController {
  constructor(championID, dragonID) {
    draw(battleService.newGame(championID, dragonID));
  }

  attack(attackName) {
    draw(battleService.attack(attackName));
  }
}
