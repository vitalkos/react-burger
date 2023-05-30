import { TWSOrderMessage } from "../../core/models/ws/ws-order-message.model";
import {
    WS_ORDERS_ALL_CONNECTION_START
    , WS_ORDERS_ALL_CONNECTION_SUCCESS
    , WS_ORDERS_ALL_CONNECTION_ERROR
    , WS_ORDERS_ALL_CONNECTION_CLOSED
    , WS_ORDERS_ALL_CONNECTION_DESTROY
    , WS_ORDERS_ALL_GET_MESSAGE
    , WS_ORDERS_ALL_SEND_MESSAGE
} from "../constants";

export interface IWSOrdersAllConnectionStart {
    readonly type: typeof WS_ORDERS_ALL_CONNECTION_START;
}

export interface IWSOrdersAllConnectionSuccessAction {
    readonly type: typeof WS_ORDERS_ALL_CONNECTION_SUCCESS;
}

export interface IWSOrdersAllConnectionErrorAction {
    readonly type: typeof WS_ORDERS_ALL_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWSOrdersAllConnectionClosedAction {
    readonly type: typeof WS_ORDERS_ALL_CONNECTION_CLOSED;
}

export interface IWSOrdersAllConnectionDestroy {
    readonly type: typeof WS_ORDERS_ALL_CONNECTION_DESTROY;
}

export interface IWSOrdersAllGetMessageAction {
    readonly type: typeof WS_ORDERS_ALL_GET_MESSAGE;
    readonly payload: TWSOrderMessage;
}

export interface IWSOrdersAllSendMessageAction {
    readonly type: typeof WS_ORDERS_ALL_SEND_MESSAGE;
    readonly payload: { message: string };
}

export type TWSOrdersAllActions =
    IWSOrdersAllConnectionStart
    | IWSOrdersAllConnectionDestroy
    | IWSOrdersAllConnectionSuccessAction
    | IWSOrdersAllConnectionErrorAction
    | IWSOrdersAllConnectionClosedAction
    | IWSOrdersAllGetMessageAction
    | IWSOrdersAllSendMessageAction;


export const wsOrdersAllConnect = (): IWSOrdersAllConnectionStart => ({
    type: WS_ORDERS_ALL_CONNECTION_START
});
export const wsOrdersAllDisconnect = (): IWSOrdersAllConnectionDestroy => ({
    type: WS_ORDERS_ALL_CONNECTION_DESTROY
});