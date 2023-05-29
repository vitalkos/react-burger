import { OrderClient } from "../../core/clients/order.client";
import { TOrderResponse } from "../../core/models/http/response";
import { AppDispatch, AppThunkAction } from "../types";

import {
    CLEAR_ORDER_DETAILS

    , SET_ORDER_DETAILS_REQUEST
    , SET_ORDER_DETAILS_SUCCESS
    , SET_ORDER_DETAILS_FAILED
} from "../constants";

export interface IClearOrderDetailsAction {
    readonly type: typeof CLEAR_ORDER_DETAILS;
}

export interface ISetOrderDetailsRequestAction {
    readonly type: typeof SET_ORDER_DETAILS_REQUEST;
}
export interface ISetOrderDetailsSuccessAction {
    readonly type: typeof SET_ORDER_DETAILS_SUCCESS;
    readonly data: TOrderResponse;
}
export interface ISetOrderDetailsFailedAction {
    readonly type: typeof SET_ORDER_DETAILS_FAILED;
}

export type TOrderDetailsActions =
    IClearOrderDetailsAction

    | ISetOrderDetailsRequestAction
    | ISetOrderDetailsSuccessAction
    | ISetOrderDetailsFailedAction;

export const clearOrderDetails = (): IClearOrderDetailsAction => ({
    type: CLEAR_ORDER_DETAILS
});


export const setOrderDetails = (ids: string[]): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_ORDER_DETAILS_REQUEST
    } as ISetOrderDetailsRequestAction);
    OrderClient.create(ids)
        .then(orderInfo => dispatch({
            type: SET_ORDER_DETAILS_SUCCESS,
            data: orderInfo
        } as ISetOrderDetailsSuccessAction))
        .catch(err => dispatch({
            type: SET_ORDER_DETAILS_FAILED
        } as ISetOrderDetailsFailedAction))
}