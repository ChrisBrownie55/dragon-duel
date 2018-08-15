export default class Champion {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.imgUrl = data.imgUrl;
    this.race = data.race;
    this.class = data.class;
    this.hp = data.hp;
    this.attacks = data.attacks;
  }
}
