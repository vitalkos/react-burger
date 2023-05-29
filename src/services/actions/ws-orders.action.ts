import { TWSOrderMessage } from "../../core/models/ws/ws-order-message.model";
import {
    WS_ORDERS_CONNECTION_START
    , WS_ORDERS_CONNECTION_SUCCESS
    , WS_ORDERS_CONNECTION_ERROR
    , WS_ORDERS_CONNECTION_CLOSED
    , WS_ORDERS_GET_MESSAGE
    , WS_ORDERS_SEND_MESSAGE
} from "../constants";

export interface IWSOrdersConnectionStart {
    readonly type: typeof WS_ORDERS_CONNECTION_START;
}

export interface IWSOrdersConnectionSuccessAction {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

export interface IWSOrdersConnectionErrorAction {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWSOrdersConnectionClosedAction {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}

export interface IWSOrdersGetMessageAction {
    readonly type: typeof WS_ORDERS_GET_MESSAGE;
    readonly payload: TWSOrderMessage;
}

export interface IWSOrdersSendMessageAction {
    readonly type: typeof WS_ORDERS_SEND_MESSAGE;
    readonly payload: { message: string };
}

export type TWSOrdersActions =
    | IWSOrdersConnectionStart
    | IWSOrdersConnectionSuccessAction
    | IWSOrdersConnectionErrorAction
    | IWSOrdersConnectionClosedAction
    | IWSOrdersGetMessageAction
    | IWSOrdersSendMessageAction;


export const wsOrdersConnect = (): IWSOrdersConnectionStart => ({
    type: WS_ORDERS_CONNECTION_START
});