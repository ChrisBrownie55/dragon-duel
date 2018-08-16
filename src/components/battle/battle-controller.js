import BattleService from './battle-service.js';

const battleService = new BattleService();

const app = document.getElementById('app');
async function draw(gamePromise) {
  const { dragon, champion } = await gamePromise;
  const attackButtons = `
  <div class='attack-buttons'>
    ${Object.keys(champion.attacks)
      .map(
        attackName => `
        <button
          class='button red attack-button'
          onclick='app.controllers.battle.attack("${attackName}")'
        >
          ${attackName.split('-').join(' ')}
        </button>`
      )
      .join('')}
  </div>`;

  app.innerHTML = `
    <main id='game'>
      <h1 class='title'>Champions Vs. Dragons</h1>
      <section class='fight'>
        <article id='player' class='character fight-character player'>
          <h3 class='name'>${champion.name}</h3>
          <h3 class='hp fw-400' id='player-health'>
            ${champion.hp}
          </h3>
          <img
            class='portrait'
            src='${champion.imgUrl}'
            alt='picture of ${champion.name}'
          />
        </article>
        <article id='enemy' class='character fight-character opponent'>
          <h3 class='name'>${dragon.name}</h3>
          <h3 class='hp fw-400' id='enemy-health'>
            ${dragon.currentHP}
          </h3>
          <img
            class='portrait'
            src='${dragon.imgUrl}'
            alt='picture of ${dragon.name}'
          />
        </article>
      </section>
      ${attackButtons}
    </main>`;
}

function toggleDisableButtons() {
  document
    .querySelectorAll('.attack-buttons > .attack-button')
    .forEach(button => (button.disabled = !button.disabled));
}

async function updateHealth(gamePromise) {
  const {
    champion: { hp: championHP },
    dragon: { currentHP: dragonHP }
  } = await gamePromise;

  const playerHealth = document.getElementById('player-health');
  const enemyHealth = document.getElementById('enemy-health');

  const championCurrentHP = parseInt(playerHealth.textContent);
  playerHealth.setAttribute('data-subtract', championCurrentHP - championHP);

  const dragonCurrentHP = parseInt(enemyHealth.textContent);
  enemyHealth.setAttribute('data-subtract', dragonCurrentHP - dragonHP);

  const playerContainer = document.getElementById('player');
  const enemyContainer = document.getElementById('enemy');
  const animationOptions = {
    duration: 500,
    easing: 'ease'
  };
  const countUpOptions = {
    useEasing: false
  };

  // disable buttons
  toggleDisableButtons();

  // Attack shimmy animation
  playerContainer.animate(
    [
      { transform: 'translate(0)' },
      { transform: 'translate(-25%)' },
      { transform: 'translate(50%)' },
      { transform: 'translate(0)' }
    ],
    animationOptions
  ).onfinish = () => {
    // callback
    // animate enemy health down
    new CountUp(
      'enemy-health',
      dragonCurrentHP,
      dragonHP,
      0,
      (dragonCurrentHP - dragonCurrentHP) * 0.05,
      countUpOptions
    ).start(() => {
      // callback
      // enemy shimmy attack
      enemyContainer.animate(
        [
          { transform: 'translate(0)' },
          { transform: 'translate(25%)' },
          { transform: 'translate(-50%)' },
          { transform: 'translate(0)' }
        ],
        animationOptions
      ).onfinish = () => {
        // another callback
        // animate player health down
        new CountUp(
          'player-health',
          championCurrentHP,
          championHP,
          0,
          (championCurrentHP - championHP) * 0.05,
          countUpOptions
        ).start(toggleDisableButtons);
      };
    });
  };
}

export default class BattleController {
  constructor(championID, dragonID) {
    draw(battleService.newGame(championID, dragonID));
  }

  attack(attackName) {
    updateHealth(battleService.attack(attackName));
  }
}
