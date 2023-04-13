import { OrderRepository } from "../../core/repositories/order.repository";

export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';

export const SET_ORDER_DETAILS_REQUEST = 'SET_ORDER_DETAILS_REQUEST';
export const SET_ORDER_DETAILS_SUCCESS = 'SET_ORDER_DETAILS_SUCCESS';
export const SET_ORDER_DETAILS_FAILED = 'SET_ORDER_DETAILS_FAILED';

export const clearOrderDetails = () => ({
    type: CLEAR_ORDER_DETAILS
});

export const setOrderDetails = (ids) => (dispatch) => {
    dispatch({
        type: SET_ORDER_DETAILS_REQUEST
    });
    OrderRepository.create(ids)
        .then(orderInfo => dispatch({
            type: SET_ORDER_DETAILS_SUCCESS,
            data: orderInfo
        }))
        .catch(err => dispatch({
            type: SET_ORDER_DETAILS_FAILED
        }))
}