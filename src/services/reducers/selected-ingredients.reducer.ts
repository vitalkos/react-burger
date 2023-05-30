import { IngredientType } from '../../core/models/ingredient-type.model';
import { TSelectedIngredient } from '../../core/models/selected-ingredient.model';
import { TSelectedIngredientsActions } from '../actions/selected-ingredients.action';
import {
    ADD_SELECTED_INGREDIENT
    , DELETE_SELECTED_INGREDIENT
    , MOVE_SELECTED_INGREDIENT
} from '../constants';


export type TSelectedIngredientsState = {
    items: ReadonlyArray<TSelectedIngredient>;
    totalCost: number | null;
};

const initialState: TSelectedIngredientsState = {
    items: [],
    totalCost: null
};

export const selectedIngredientsReducer = (state = initialState, action: TSelectedIngredientsActions): TSelectedIngredientsState => {
    switch (action.type) {
        case ADD_SELECTED_INGREDIENT: {
            const addedItem = action.item;
            if (!addedItem)
                return { ...state };

            const items = addedItem.type === IngredientType.bun ?
                addBun([...state.items], addedItem) : addItem([...state.items], addedItem);

            return { ...state, items: items, totalCost: calcTotalCost(items) };
        }
        case DELETE_SELECTED_INGREDIENT: {
            if (!action.key) return { ...state };
            const items = [...state.items].filter(t => t.rowKey !== action.key)
            return { ...state, items: items, totalCost: calcTotalCost(items) };
        }
        case MOVE_SELECTED_INGREDIENT: {
            const item = state.items.find(t => t.rowKey === action.key);
            if (!item) return { ...state };
            const newIndex = state.items.findIndex(t => t.rowKey === action.newPositionKey);
            const items = [...state.items].filter(t => t.rowKey !== action.key);
            items.splice(newIndex, 0, item);
            return { ...state, items: items };
        }
        default: {
            return state;
        }
    }
};

const calcTotalCost = (ingredients: TSelectedIngredient[]): number => ingredients.map(t => t.price).reduce((p, c) => p + c, 0);

const addBun = (items: TSelectedIngredient[], addedItem: TSelectedIngredient): TSelectedIngredient[] => {
    const existedBun = items.find(t => t.type === IngredientType.bun);
    if (existedBun && existedBun.id === addedItem.id) return items;
    items = existedBun ? items.filter(t => t.id !== existedBun.id) : items;
    items = addItem(items, addedItem);
    items = addItem(items, addedItem);
    return items;
}

const addItem = (items: TSelectedIngredient[], addedItem: TSelectedIngredient): TSelectedIngredient[] => {
    const key = items.length > 0 ? Math.max(...items.map(t => t.rowKey ?? 1)) : 1;
    const newItem = { ...addedItem, rowKey: key >= 0 ? (key + 1) : 0 };
    items.push(newItem);
    const buns = items.filter(t=>t.type === IngredientType.bun);
    if (buns.length === 2) {
        items = items.filter(t=>t.type !== IngredientType.bun);
        items.unshift(buns[0]);
        items.push(buns[1]);
    }
    return items;
}