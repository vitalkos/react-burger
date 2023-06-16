import { orderDetailsReducer } from './order-details.reducer';
import {
    SET_ORDER_DETAILS_REQUEST
    , SET_ORDER_DETAILS_SUCCESS
    , SET_ORDER_DETAILS_FAILED
    , CLEAR_ORDER_DETAILS
} from '../constants';


const initialStateMock = {
    id: null,
    orderRequest: false,
    orderFailed: false
};

describe('Order details reducer', () => {
    it('should return the initial state', () => {
        expect(orderDetailsReducer(undefined, {}))
            .toEqual(initialStateMock)
    })

    it('should handle SET_ORDER_DETAILS_REQUEST', () => {
        expect(orderDetailsReducer(undefined, { type: SET_ORDER_DETAILS_REQUEST }))
            .toEqual({ ...initialStateMock, orderRequest: true })
    })

    it('should handle SET_ORDER_DETAILS_SUCCESS', () => {
        expect(orderDetailsReducer(undefined, {
            type: SET_ORDER_DETAILS_SUCCESS,
            data: { order: { number: 1234567890 } }
        }))
            .toEqual({
                ...initialStateMock
                , id: 1234567890
                , orderFailed: false
                , orderRequest: false
            })
    })

    it('should handle SET_ORDER_DETAILS_FAILED', () => {
        expect(orderDetailsReducer(undefined, { type: SET_ORDER_DETAILS_FAILED }))
            .toEqual({
                ...initialStateMock,
                orderFailed: true
                , orderRequest: false
            })
    })

    it('should handle CLEAR_ORDER_DETAILS', () => {
        expect(orderDetailsReducer(undefined, { type: CLEAR_ORDER_DETAILS }))
            .toEqual(initialStateMock)
    })
})
