class HeroCache {
    constructor() {
        this.heroes = {};
        this.initialized = false;
    }

    initialize(heroes) {
        this.initialized = true;

        heroes.forEach(hero => {
            this.heroes[hero.id] = hero.localized_name;
        });
    }

    get(id) {
        if (!this.initialized) {
            throw new Error('The hero cache has not been initialized yet.');
        }

        return this.heroes[id];
    }
}

export default new HeroCache();
