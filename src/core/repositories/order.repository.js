export class OrderRepository {

    static create = async (ingredientIdList) => {
        /* Placeholder */
        return this.#getRandNumber();

    }
    static #getRandNumber = (min = 300000, max = 600000) =>
        Math.round(Math.random() * (max - min)) + min;

}