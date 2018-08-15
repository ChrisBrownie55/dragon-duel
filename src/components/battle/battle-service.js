import Game from '../../models/Game.js';

const battleAPI = axios.create({
  baseURL: 'https://dragon-duel.herokuapp.com/api/games',
  timeout: 3000
});

let currentBattle;

export default class BattleService {
  constructor() {}

  newGame(championId, dragonId) {
    return battleAPI
      .post('/', {
        championId,
        dragonId
      })
      .then(res => new Game(res.data))
      .catch(error => console.error(error));
  }
}
