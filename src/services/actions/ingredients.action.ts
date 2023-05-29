import { IngredientClient } from "../../core/clients/ingredient.client";
import { mapDataList } from "../../core/mappers/data.mapper";
import { TIngredient } from "../../core/models/ingredient.model";
import { AppDispatch, AppThunkAction } from "../types";
import {
    GET_INGREDIENTS_REQUEST
    , GET_INGREDIENTS_SUCCESS
    , GET_INGREDIENTS_FAILED
} from "../constants";

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly data: TIngredient[];
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
    IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction;

export const getIngredientsAll = (): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    } as IGetIngredientsRequestAction);
    IngredientClient.getAll()
        .then(data => dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            data: mapDataList(data)
        } as IGetIngredientsSuccessAction))
        .catch(err => dispatch({
            type: GET_INGREDIENTS_FAILED
        } as IGetIngredientsFailedAction))
}