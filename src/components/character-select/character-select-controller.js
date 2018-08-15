import CharacterSelectService from './character-select-service.js';

const characterSelectService = new CharacterSelectService();

const app = document.getElementById('app');
async function draw() {}

export default class CharacterSelectController {
  constructor() {
    this.show();
  }

  show() {
    draw();
  }
}
