import { IngredientClient } from "../clients/ingredient.client";
import { mapFullDataList, mapFullDataItem, mapDetailsDataItem } from "../mappers/data.mapper";
import { mapMainDataList, mapMainDataItem } from "../mappers/data.mapper";

export class IngredientRepository {
    static #rawData = {
        cache: null,
        promiseLock: null
    };

    static getAll = async (options = { useLargeImage: false, fillDetailFields: false }) => {
        const data = await this.#getRawData();
        if (!data) return [];

        return !options.fillDetailFields ?
            mapMainDataList(data, { useLargeImage: options.useLargeImage }) :
            mapFullDataList(data, { useLargeImage: options.useLargeImage })

    }
    static get = async (id, options = { useLargeImage: false, fillDetailFields: false }) => {
        const item = await this.#getRawItemById(id);
        if (!item) return null;
        return !options.fillDetailFields ?
            mapMainDataItem(item, { useLargeImage: options.useLargeImage }) :
            mapFullDataItem(item, { useLargeImage: options.useLargeImage })
    }

    static getDetails = async (id, options = { useLargeImage: false }) => {
        const item = await this.#getRawItemById(id);
        if (!item) return null;
        return mapDetailsDataItem(item, options);
    }

    static #getRawItemById = async (id) => {
        const data = await this.#getRawData();
        if (!data) return null;
        return data.find(t => t._id === id);
    }

    static #getRawData = async () => {
        if (this.#rawData.cache)
            return this.#rawData.cache;
        if (this.#rawData.promiseLock)
            return this.#rawData.promiseLock;
        const client = new IngredientClient();
        this.#rawData.promiseLock = client.getAll();
        this.#rawData.promiseLock.then(data => {
            this.#rawData.cache = data;
            this.#rawData.promiseLock = null;
        });
        return this.#rawData.promiseLock;
    }
}