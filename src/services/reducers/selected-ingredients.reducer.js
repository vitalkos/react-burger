import { ingredientItemTypeKeys } from '../../core/types/ingredient-item.type';
import {
    ADD_SELECTED_INGREDIENT
    , DELETE_SELECTED_INGREDIENT
    , MOVE_SELECTED_INGREDIENT
} from '../actions/selected-ingredients.action';


const initialState = {
    items: [],
    totalCost: null
};

export const selectedIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SELECTED_INGREDIENT: {
            const addedItem = action.item;
            if (!addedItem)
                return { ...state };

            const items = addedItem.type === ingredientItemTypeKeys.bun ?
                addBun([...state.items], addedItem) : addItem([...state.items], addedItem);

            return { ...state, items: items, totalCost: calcTotalCost(items) };
        }
        case DELETE_SELECTED_INGREDIENT: {
            if (!action.key) return { ...state };
            const items = [...state.items].filter(t => t.rowKey !== action.key)
            return { ...state, items: items, totalCost: calcTotalCost(items) };
        }
        case MOVE_SELECTED_INGREDIENT: {
            return state;
        }
        default: {
            return state;
        }
    }
};

const calcTotalCost = (ingredients) => ingredients.map(t => t.price).reduce((p, c) => p + c, 0);

const addBun = (items, addedItem) => {
    const existedBun = items.find(t => t.type === ingredientItemTypeKeys.bun);
    if (existedBun && existedBun.id === addedItem.id) return;
    items = existedBun ? items.filter(t => t.id !== existedBun.id) : items;
    items = addItem(items, addedItem);
    items = addItem(items, addedItem);
    return items;
}

const addItem = (items, addedItem) => {
    const key = items.length > 0 ? Math.max(...items.map(t => t.rowKey)) : 1;
    const newItem = { ...addedItem, rowKey: key >= 0 ? (key + 1) : 0 };
    items.push(newItem);
    return items;
}