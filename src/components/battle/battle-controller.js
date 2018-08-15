import BattleService from './battle-service.js';

const battleService = new BattleService();

async function draw() {}

export default class BattleController {
  constructor(championID, dragonID) {
    draw(battleService.newGame(championID, dragonID));
  }

  attack(attackName) {
    draw(battleService.attack(attackName));
  }
}
