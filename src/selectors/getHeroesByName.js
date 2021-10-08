import { heroes } from "../data/heroes";

export const getHeroByName = (name = '') => {
    if (name === '') {
        return [];
    }
    return heroes.filter(hero => hero.superhero.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
}