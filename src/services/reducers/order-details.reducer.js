import {
    SET_ORDER_DETAILS_REQUEST
    , SET_ORDER_DETAILS_SUCCESS
    , SET_ORDER_DETAILS_FAILED
    , CLEAR_ORDER_DETAILS
} from '../actions/order-details.action';

const initialState = {
    id: null,
    orderRequest: false,
    orderFailed: false
};

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case SET_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                orderRequest: false,
                id: action.data.order.number
            };
        }
        case SET_ORDER_DETAILS_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        case CLEAR_ORDER_DETAILS: {
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