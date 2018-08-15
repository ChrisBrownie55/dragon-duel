import Dragon from './Dragon.js';
import Champion from './Champion.js';

export default class Game {
  constructor(data) {
    this.id = data._id;
    this.dragon = new Dragon(data._dragon);
    this.champion = new Champion(data._champion);
    this.history = data.history;
  }
}
