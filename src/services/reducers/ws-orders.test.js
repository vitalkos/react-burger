import { wsOrdersReducer } from './ws-orders.reducer';
import {
    WS_ORDERS_CONNECTION_SUCCESS
    , WS_ORDERS_CONNECTION_ERROR
    , WS_ORDERS_CONNECTION_CLOSED
    , WS_ORDERS_GET_MESSAGE
} from "../constants";


const initialStateMock = {
    wsConnected: false,
    data: null
};

describe('Ws orders all reducer', () => {
    it('should return the initial state', () => {
        expect(wsOrdersReducer(undefined, {}))
            .toEqual(initialStateMock)
    })

    it('should handle WS_ORDERS_CONNECTION_SUCCESS', () => {
        expect(wsOrdersReducer(undefined, { type: WS_ORDERS_CONNECTION_SUCCESS }))
            .toEqual({ ...initialStateMock, error: undefined, wsConnected: true })
    })

    it('should handle WS_ORDERS_CONNECTION_ERROR', () => {
        expect(wsOrdersReducer(undefined, {
            type: WS_ORDERS_CONNECTION_ERROR,
            payload: 'error_message'
        }))
            .toEqual({
                ...initialStateMock
                , error: 'error_message'
                , wsConnected: false
            })
    })

    it('should handle WS_ORDERS_CONNECTION_CLOSED', () => {
        expect(wsOrdersReducer(undefined, { type: WS_ORDERS_CONNECTION_CLOSED }))
            .toEqual({ ...initialStateMock, error: undefined, wsConnected: false })
    })


    it('should handle WS_ORDERS_GET_MESSAGE', () => {
        expect(wsOrdersReducer(undefined, {
            type: WS_ORDERS_GET_MESSAGE,
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
