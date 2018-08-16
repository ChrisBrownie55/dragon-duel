import Game from '../../models/Game.js';

const battleAPI = axios.create({
  baseURL: 'https://dragon-duel.herokuapp.com/api/games',
  timeout: 3000
});

let currentBattle;
let game;

export default class BattleService {
  constructor() {}

  newGame(championID, dragonID) {
    return battleAPI
      .post('/', {
        championId: championID.toString(),
        dragonId: dragonID.toString()
      })
      .then(res => {
        game = new Game(res.data.game);
        return game;
      })
      .catch(error => console.error(error));
  }

  deleteGame() {
    battleAPI.delete(`/${game.id}`);
  }

  attack(attackName) {
    if (!game.champion.attacks[attackName]) return;
    return battleAPI
      .put(`/${game.id}`, {
        attack: attackName
      })
      .then(res => new Game(res.data));
  }
}
