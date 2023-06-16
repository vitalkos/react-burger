import { ingredientsReducer } from './ingredients.reducer';
import {
    GET_INGREDIENTS_REQUEST
    , GET_INGREDIENTS_SUCCESS
    , GET_INGREDIENTS_FAILED
} from '../constants';

const initialStateMock = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
};

describe('Ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {}))
            .toEqual(initialStateMock)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_REQUEST }))
            .toEqual({ ...initialStateMock, itemsRequest: true })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(ingredientsReducer(undefined, {
            type: GET_INGREDIENTS_SUCCESS,
            data: ['bun_1', 'bun_2', 'bun_3']
        }))
            .toEqual({
                ...initialStateMock
                , items: ['bun_1', 'bun_2', 'bun_3']
                , itemsFailed: false
                , itemsRequest: false
            })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_FAILED }))
            .toEqual(initialStateMock)
    })
})
