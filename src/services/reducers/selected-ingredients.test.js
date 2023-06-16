import { selectedIngredientsReducer } from './selected-ingredients.reducer';
import {
    ADD_SELECTED_INGREDIENT
    , DELETE_SELECTED_INGREDIENT
    , MOVE_SELECTED_INGREDIENT
    , CLEAR_SELECTED_INGREDIENTS
} from '../constants';

const initialStateMock = {
    items: [],
    totalCost: null
};

describe('Selected ingredients reducer', () => {
    const mockBunItem = {
        id: 'id'
        , name: 'name'
        , image: 'image'
        , type: 'bun'
        , price: 123
    };

    const mockMainItem = {
        id: 'id'
        , name: 'name'
        , image: 'image'
        , type: 'main'
        , price: 123
    };

    it('should return the initial state', () => {
        expect(selectedIngredientsReducer(undefined, {}))
            .toEqual(initialStateMock)
    })


    it('should handle ADD_SELECTED_INGREDIENT', () => {
        expect(selectedIngredientsReducer(undefined, {
            type: ADD_SELECTED_INGREDIENT,
            item: mockBunItem
        }))
            .toEqual({
                ...initialStateMock
                , items: [{ ...mockBunItem, rowKey: 2 }, { ...mockBunItem, rowKey: 3 }]
                , totalCost: mockBunItem.price * 2
            })
    })

    it('should handle DELETE_SELECTED_INGREDIENT', () => {
        expect(selectedIngredientsReducer({ items: [{ ...mockBunItem, rowKey: 3 }] }, { type: DELETE_SELECTED_INGREDIENT, key: 3 }))
            .toEqual({ ...initialStateMock, items: [], totalCost: 0 })
    })

    it('should handle MOVE_SELECTED_INGREDIENT', () => {
        expect(selectedIngredientsReducer({
            items: [
                { ...mockBunItem, rowKey: 2 },
                { ...mockMainItem, rowKey: 3 },
                { ...mockMainItem, rowKey: 4, id: 'id_2' },
                { ...mockMainItem, rowKey: 5 },
                { ...mockBunItem, rowKey: 6 }
            ], totalCost: null
        }, { type: MOVE_SELECTED_INGREDIENT, key: 4, newPositionKey: 3 }))
            .toEqual({
                ...initialStateMock, items: [
                    { ...mockBunItem, rowKey: 2 },
                    { ...mockMainItem, rowKey: 4, id: 'id_2' },
                    { ...mockMainItem, rowKey: 3 },
                    { ...mockMainItem, rowKey: 5 },
                    { ...mockBunItem, rowKey: 6 }
                ], totalCost: null
            })
    })

    it('should handle CLEAR_SELECTED_INGREDIENTS', () => {
        expect(selectedIngredientsReducer(undefined, { type: CLEAR_SELECTED_INGREDIENTS }))
            .toEqual(initialStateMock)
    })
})
