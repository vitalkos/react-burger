import { wsOrdersAllReducer } from './ws-orders-all.reducer';
import {
    WS_ORDERS_ALL_CONNECTION_SUCCESS
    , WS_ORDERS_ALL_CONNECTION_ERROR
    , WS_ORDERS_ALL_CONNECTION_CLOSED
    , WS_ORDERS_ALL_GET_MESSAGE
} from "../constants";


const initialStateMock = {
    wsConnected: false,
    data: null
};

describe('Ws orders all reducer', () => {
    it('should return the initial state', () => {
        expect(wsOrdersAllReducer(undefined, {}))
            .toEqual(initialStateMock)
    })

    it('should handle WS_ORDERS_ALL_CONNECTION_SUCCESS', () => {
        expect(wsOrdersAllReducer(undefined, { type: WS_ORDERS_ALL_CONNECTION_SUCCESS }))
            .toEqual({ ...initialStateMock, error: undefined, wsConnected: true })
    })

    it('should handle SET_ORDER_DETAILS_SUCCESS', () => {
        expect(wsOrdersAllReducer(undefined, {
            type: WS_ORDERS_ALL_CONNECTION_ERROR,
            payload: 'error_message'
        }))
            .toEqual({
                ...initialStateMock
                , error: 'error_message'
                , wsConnected: false
            })
    })

    it('should handle WS_ORDERS_ALL_CONNECTION_CLOSED', () => {
        expect(wsOrdersAllReducer(undefined, { type: WS_ORDERS_ALL_CONNECTION_CLOSED }))
            .toEqual({ ...initialStateMock, error: undefined, wsConnected: false })
    })


    it('should handle WS_ORDERS_ALL_GET_MESSAGE', () => {
        expect(wsOrdersAllReducer(undefined, {
            type: WS_ORDERS_ALL_GET_MESSAGE,
            payload: 'message'
        }))
            .toEqual({
                ...initialStateMock
                , error: undefined
                , wsConnected: false
                , data: 'message'
            })
    })
})
