import Dragon from '../../models/Dragon.js';
import Champion from '../../models/Champion.js';

const championsAPI = axios.create({
  baseURL: 'https://dragon-duel.herokuapp.com/api/champions',
  timeout: 3000
});

const dragonsAPI = axios.create({
  baseURL: 'https://dragon-duel.herokuapp.com/api/dragons',
  timeout: 3000
});

let selectedDragon;
let selectedChampion;

const champions = [];
const dragons = [];

export default class CharacterSelectService {
  async getChampions() {
    if (!champions.length) {
      champions.push(
        ...(await championsAPI
          .get('/')
          .then(res => res.data.map(data => new Champion(data))))
      );
    }
    return champions;
  }

  async getDragons() {
    if (!dragons.length) {
      dragons.push(
        ...(await dragonsAPI
          .get('/')
          .then(res => res.data.map(data => new Dragon(data))))
      );
    }
    return dragons;
  }

  get champion() {
    return selectedChampion;
  }
  set champion(id) {
    if (selectedChampion === id) {
      selectedChampion = undefined;
    } else {
      selectedChampion = id;
    }
  }

  get dragon() {
    return selectedDragon;
  }
  set dragon(id) {
    if (selectedDragon === id) {
      selectedDragon = undefined;
    } else {
      selectedDragon = id;
    }
  }
}
