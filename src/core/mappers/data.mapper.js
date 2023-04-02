import IngredientItem from '../models/ingredient-item.model';

export const mapMainDataItem = (rawDataItem, options = { useLargeImage: false }) => {
    const dtoItem = new IngredientItem();
    dtoItem.id = rawDataItem._id;
    dtoItem.name = rawDataItem.name;
    dtoItem.type = rawDataItem.type;
    dtoItem.price = rawDataItem.price;
    dtoItem.image = options.useLargeImage ? rawDataItem.image_large : rawDataItem.image;
    return dtoItem;
}

export const mapDetailsDataItem = (rawDataItem) => {
    const dtoItem = {};
    dtoItem.id = rawDataItem._id;
    dtoItem.proteins = rawDataItem.proteins;
    dtoItem.fat = rawDataItem.fat;
    dtoItem.carbohydrates = rawDataItem.carbohydrates;
    dtoItem.calories = rawDataItem.calories;
    return dtoItem;
}

export const mapFullDataItem = (rawDataItem, options = { useLargeImage: false }) =>
    ({ ...mapMainDataItem(rawDataItem, options), ...mapDetailsDataItem(rawDataItem) });


export const mapMainDataList = (rawDataItem, options = { useLargeImage: false }) =>
    rawDataItem.map(item => mapMainDataItem(item, options));
export const mapDetailsDataList = (rawDataItem) =>
    rawDataItem.map(item => mapDetailsDataItem(item));
export const mapFullDataList = (rawDataItem, options = { useLargeImage: false }) =>
    rawDataItem.map(item => mapFullDataItem(item, options));
