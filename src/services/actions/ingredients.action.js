import { IngredientRepository } from "../../core/repositories/ingredient.repository";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredientsAll = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });
    IngredientRepository.getAll({ useLargeImage: true })
        .then(data => dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            data
        }))
        .catch(err => dispatch({
            type: GET_INGREDIENTS_FAILED
        }))
}