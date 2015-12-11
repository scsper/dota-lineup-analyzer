export default class HeroCollection {
    constructor(heroes) {
        this.heroes = {};

        heroes.forEach(hero => {
            this.heroes[hero.id] = hero.localized_name;
        });
    }

    get(id) {
        return this.heroes[id];
    }
}
