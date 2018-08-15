import Game from '../../models/Game.js';

const battleAPI = axios.create({
  baseURL: 'https://dragon-duel.herokuapp.com/api/games',
  timeout: 3000
});

let currentBattle;

export default class BattleService {
  constructor() {}

  newGame(championID, dragonID) {
    return battleAPI
      .post('/', {
        championId: championID,
        dragonId: dragonID
      })
      .then(res => new Game(res.data))
      .catch(error => console.error(error));
  }

  deleteGame(gameID) {}
}
