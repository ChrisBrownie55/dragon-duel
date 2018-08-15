import CharacterSelectService from './character-select-service.js';

const characterSelectService = new CharacterSelectService();

const app = document.getElementById('app');
async function draw() {
  const champions = await characterSelectService.getChampions();
  const dragons = await characterSelectService.getDragons();

  app.innerHTML = `
    <section class='champions characters'>
      <h2>Choose your Champion</h2>
      ${champions
        .map(
          champion => `
        <article
          onclick='app.controllers.characterSelect.selectChampion(${
            champion.id
          })'
          data-id='${champion.id}'
          class='character champion'
        >
          <h4 class='name'>
            ${champion.name}:
            <span class='race'>${champion.race}</span>
          </h4>
          <h5 class='hp'>Starting HP: ${champion.hp}</h5>
          <img
            class='portrait'
            src='${champion.imgUrl}'
            alt='picture of ${champion.name}'
          />
        </article>`
        )
        .join('')}
    </section>
    <section class='dragons characters'>
      <h2>Choose your Opponent</h2>
      ${dragons
        .map(
          dragon => `
        <article
          onclick='app.controllers.characterSelect.selectDragon(${dragon.id})'
          data-id='${dragon.id}'
          class='character dragon'
        >
          <h4 class='name'>${dragon.name}</h4>
          <h5 class='hp'>${dragon.maxHP}</h5>
          <img
            class='portait'
            src='${dragon.imgUrl}'
            alt='picture of ${dragon.name}'
          />
        </article>`
        )
        .join('')}
    </section>
  `;
}

export default class CharacterSelectController {
  constructor() {
    this.show();
  }

  selectChampion(id) {
    characterSelectService.champion = id;
    document
      .querySelectorAll('.champion.active')
      .forEach(el => el.classList.remove('active'));

    if (characterSelectService.champion !== undefined) {
      document
        .querySelector(`.champion[data-id='${id}']`)
        .classList.add('active');
    }
  }

  selectDragon(id) {
    characterSelectService.dragon = id;
  }

  show() {
    draw();
  }
}
