import { mapSelectedDataItem } from "../../core/mappers/data.mapper";
import { TIngredient } from "../../core/models/ingredient.model";
import { TSelectedIngredient } from "../../core/models/selected-ingredient.model";

import {
    ADD_SELECTED_INGREDIENT
    , DELETE_SELECTED_INGREDIENT
    , MOVE_SELECTED_INGREDIENT
} from "../constants";

export interface IAddSelectedIngredientAction {
    readonly type: typeof ADD_SELECTED_INGREDIENT;
    readonly item: TSelectedIngredient;
}
export interface IDeleteSelectedIngredientAction {
    readonly type: typeof DELETE_SELECTED_INGREDIENT;
    readonly key: number;
}
export interface IMoveSelectedIngredientAction {
    readonly type: typeof MOVE_SELECTED_INGREDIENT;
    readonly key: number;
    readonly newPositionKey: number;
}

export type TSelectedIngredientsActions =
    IAddSelectedIngredientAction
    | IDeleteSelectedIngredientAction
    | IMoveSelectedIngredientAction;

export const addSelectedIngredient = (item: TIngredient): IAddSelectedIngredientAction => ({
    type: ADD_SELECTED_INGREDIENT,
    item: mapSelectedDataItem(item)
});

export const deleteSelectedIngredient = (key: number): IDeleteSelectedIngredientAction => ({
    type: DELETE_SELECTED_INGREDIENT,
    key
});

export const moveSelectedIngredient = (key: number, newPositionKey: number): IMoveSelectedIngredientAction => ({
    type: MOVE_SELECTED_INGREDIENT,
    key,
    newPositionKey
}); 