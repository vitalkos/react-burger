import { TIngredientDetails } from "../models/ingredient-details.model";
import { TIngredientDto } from "../models/ingredient-dto.model";
import { TIngredient } from "../models/ingredient.model";
import { TSelectedIngredient } from "../models/selected-ingredient.model";

export const mapDataItem = (rawDataItem: TIngredientDto): TIngredient => {
    const { _id, image, image_mobile, image_large, ...otherProperties } = rawDataItem;
    return { 
        ...otherProperties,
        id: _id,
        image: image_large,
        smallImage: image
     };
}

export const mapDetailsDataItem = (dataItem: TIngredient): TIngredientDetails => ({
    name: dataItem.name,
    id: dataItem.id,
    proteins: dataItem.proteins,
    fat: dataItem.fat,
    carbohydrates: dataItem.carbohydrates,
    calories: dataItem.calories,
    image: dataItem.image
})

export const mapSelectedDataItem = (dataItem: TIngredient): TSelectedIngredient => ({
    id: dataItem.id,
    type: dataItem.type,
    name: dataItem.name,
    price: dataItem.price,
    image: dataItem.smallImage
})

export const mapDataList = (rawData: TIngredientDto[]): TIngredient[] =>
    rawData.map(item => mapDataItem(item));