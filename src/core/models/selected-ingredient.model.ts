import { TIngredientBase } from "./ingredient-base.model";
import { IngredientType } from "./ingredient-type.model";

export type TSelectedIngredient = TIngredientBase & {
    rowKey?: number,
    type: IngredientType,
    price: number
};