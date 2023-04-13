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
            debugger;
            const addedItem = action.item;
            if (!addedItem)
                return { ...state };

            let items = [...state.items];
            if (addedItem.type === ingredientItemTypeKeys.bun) {
                items = filterBun(items, addedItem.id);
                addBun(items, addedItem);
            }
            else
                addItem(items, addedItem);

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

const filterBun = (items, addedItemId) => {
    const existedBun = items.find(t => t.type === ingredientItemTypeKeys.bun);
    return existedBun && existedBun.id !== addedItemId ? items.filter(t => t.id !== existedBun.id) : items;
}

const addBun = (items, addedItem) => {
    addItem(items, addedItem);
    addItem(items, addedItem);
}

const addItem = (items, addedItem) => {
    const key = Math.max(...items.map(t => t.rowKey));
    const newItem = { ...addedItem, rowKey: key >= 0 ? (key + 1) : 0 };
    items.push(newItem);
}