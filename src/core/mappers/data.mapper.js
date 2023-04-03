import IngredientItem from '../models/ingredient-item.model';

export const mapMainDataItem = (rawDataItem, options = defaultOptions) => {
    const dtoItem = new IngredientItem();
    dtoItem.id = rawDataItem._id;
    dtoItem.name = rawDataItem.name;
    dtoItem.type = rawDataItem.type;
    dtoItem.price = rawDataItem.price;
    dtoItem.image = options.useLargeImage ? rawDataItem.image_large : rawDataItem.image;
    return dtoItem;
}

export const mapDetailsDataItem = (rawDataItem, options = defaultOptions) => {
    const dtoItem = {};
    dtoItem.id = rawDataItem._id;
    dtoItem.name = rawDataItem.name;
    dtoItem.proteins = rawDataItem.proteins;
    dtoItem.fat = rawDataItem.fat;
    dtoItem.carbohydrates = rawDataItem.carbohydrates;
    dtoItem.calories = rawDataItem.calories;
    dtoItem.image = options.useLargeImage ? rawDataItem.image_large : rawDataItem.image;
    return dtoItem;
}

export const mapFullDataItem = (rawDataItem, options = defaultOptions) =>
    ({ ...mapMainDataItem(rawDataItem, options), ...mapDetailsDataItem(rawDataItem) });


export const mapMainDataList = (rawDataItem, options = defaultOptions) =>
    rawDataItem.map(item => mapMainDataItem(item, options));
export const mapDetailsDataList = (rawDataItem, options = defaultOptions) =>
    rawDataItem.map(item => mapDetailsDataItem(item, options));
export const mapFullDataList = (rawDataItem, options = defaultOptions) =>
    rawDataItem.map(item => mapFullDataItem(item, options));


const defaultOptions = { useLargeImage: false }