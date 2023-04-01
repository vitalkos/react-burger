import IngredientItem from '../models/ingredient-item.model';

export const mapJsonDataItem = (jsonDataItem, options = { useLargeImage: false }) => {
    const dtoItem = new IngredientItem();
    dtoItem.id = jsonDataItem._id;
    dtoItem.name = jsonDataItem.name;
    dtoItem.type = jsonDataItem.type;
    dtoItem.price = jsonDataItem.price;
    dtoItem.image = options.useLargeImage ? jsonDataItem.image_large : jsonDataItem.image;
    return dtoItem;
}

export const mapJsonDataList = (jsonDataList, options = { useLargeImage: false }) =>
    jsonDataList.map(item => mapJsonDataItem(item, options));