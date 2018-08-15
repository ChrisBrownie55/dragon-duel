import CharacterSelectService from './character-select-service.js';

const characterSelectService = new CharacterSelectService();

const app = document.getElementById('app');
async function draw() {
  const champions = await characterSelectService.getChampions();
  const dragons = await characterSelectService.getDragons();
}

export default class CharacterSelectController {
  constructor() {
    this.show();
  }

  show() {
    draw();
  }
}
