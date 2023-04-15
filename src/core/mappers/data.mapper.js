export const mapDataItem = (rawDataItem) => {
    const { _id, image, image_mobile, image_large, ...otherProperties } = rawDataItem;
    const dtoItem = { ...otherProperties };
    dtoItem.id = _id;
    dtoItem.image = image_large;
    dtoItem.smallImage = image;
    return dtoItem;
}

export const mapDetailsDataItem = (dataItem) => {
    const dtoItem = {};
    dtoItem.id = dataItem.id;
    dtoItem.name = dataItem.name;
    dtoItem.proteins = dataItem.proteins;
    dtoItem.fat = dataItem.fat;
    dtoItem.carbohydrates = dataItem.carbohydrates;
    dtoItem.calories = dataItem.calories;
    dtoItem.image = dataItem.image;
    return dtoItem;
}

export const mapSelectedDataItem = (dataItem) => {
    const dtoItem = {};
    dtoItem.id = dataItem.id;
    dtoItem.type = dataItem.type;
    dtoItem.name = dataItem.name;
    dtoItem.price = dataItem.price;
    dtoItem.image = dataItem.smallImage;
    return dtoItem;
}

export const mapDataList = (rawData) =>
    rawData.map(item => mapDataItem(item));