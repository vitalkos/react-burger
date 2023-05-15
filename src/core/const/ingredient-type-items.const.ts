import { IngredientType } from "../models/ingredient-type.model";

export const ingredientTypeItems: { key: IngredientType, name: string}[] = [{
    key: IngredientType.bun,
    name: 'Булки'
}, {
    key: IngredientType.sauce,
    name: 'Соусы'
}, {
    key: IngredientType.main,
    name: 'Начинки'
}];