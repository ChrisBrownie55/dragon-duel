import CharacterSelectService from './character-select-service.js';

const characterSelectService = new CharacterSelectService();

const app = document.getElementById('app');
async function draw() {
  const champions = await characterSelectService.getChampions();
  const dragons = await characterSelectService.getDragons();

  app.innerHTML = `
    <main id='character-select'>
      <header class='header'>
        <h1 class='title'>Dragon Duel</h1>
      </header>
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
            <h3 class='name'>
              ${champion.name}:
              <span class='race fw-400'>${champion.race}</span>
            </h3>
            <h3 class='hp'>
              Starting HP:
              <span class='fw-400'>${champion.hp}</span>
            </h3>
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
            <h3 class='name'>${dragon.name}</h3>
            <h3 class='hp'>
              Starting HP:
              <span class='fw-400'>${dragon.maxHP}</span>
            </h3>
            <img
              class='portait'
              src='${dragon.imgUrl}'
              alt='picture of ${dragon.name}'
            />
          </article>`
          )
          .join('')}
      </section>
    </main>
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
