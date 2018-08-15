import CharacterSelectController from './components/character-select/character-select-controller.js';
import BattleController from './components/battle/battle-controller.js';

class App {
  constructor() {
    this.controllers = {
      characterSelect: new CharacterSelectController(),
      battle: null
    };
  }

  createBattle(championID, dragonID) {
    this.controllers.battle = new BattleController(championID, dragonID);
  }
  endBattle() {
    this.controllers.battle = null;
    this.controllers.characterSelect.show();
  }
}

window.app = new App();
