import { TIngredientBase } from "./ingredient-base.model";
import { IngredientType } from "./ingredient-type.model";

export type TIngredient = TIngredientBase & {
    type: IngredientType,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    smallImage: string
};