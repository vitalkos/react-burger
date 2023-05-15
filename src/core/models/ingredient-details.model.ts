import { TIngredientBase } from "./ingredient-base.model";

export type TIngredientDetails = TIngredientBase & {
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number
};