import {
    GET_INGREDIENTS_REQUEST
    , GET_INGREDIENTS_SUCCESS
    , GET_INGREDIENTS_FAILED
} from '../actions/ingredients.action';

const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
};

export const ingredientsReducer = (state = initialState, action) => {
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