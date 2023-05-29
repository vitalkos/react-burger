import { TOrderDetailsActions } from '../actions/order-details.action';
import {
    SET_ORDER_DETAILS_REQUEST
    , SET_ORDER_DETAILS_SUCCESS
    , SET_ORDER_DETAILS_FAILED
    , CLEAR_ORDER_DETAILS
} from '../constants';

export type TOrderDetailsState = {
    id: number | null;
    orderRequest: boolean;
    orderFailed: boolean;
};

const initialState: TOrderDetailsState = {
    id: null,
    orderRequest: false,
    orderFailed: false
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions): TOrderDetailsState => {
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