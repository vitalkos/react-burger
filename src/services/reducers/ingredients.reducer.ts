import { TIngredient } from '../../core/models/ingredient.model';
import { TIngredientsActions } from '../actions/ingredients.action';
import {
    GET_INGREDIENTS_REQUEST
    , GET_INGREDIENTS_SUCCESS
    , GET_INGREDIENTS_FAILED
} from '../constants';

export type TIngredientsState = {
    items: ReadonlyArray<TIngredient>;
    itemsRequest: boolean;
    itemsFailed: boolean;
};

const initialState: TIngredientsState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                itemsFailed: false,
                itemsRequest: false,
                items: action.data || []
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ...initialState
            };
        }
        default: {
            return state;
        }
    }
};