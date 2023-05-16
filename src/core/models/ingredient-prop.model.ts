import { TIngredientBase } from "./ingredient-base.model";

export type TIngredientProp = TIngredientBase & {
    price: number;
}