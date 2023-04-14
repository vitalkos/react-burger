import { IngredientClient } from "../../core/clients/ingredient.client";
import { mapDataList } from "../../core/mappers/data.mapper";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredientsAll = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });
    IngredientClient.getAll()
        .then(data => dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            data: mapDataList(data)
        }))
        .catch(err => dispatch({
            type: GET_INGREDIENTS_FAILED
        }))
}