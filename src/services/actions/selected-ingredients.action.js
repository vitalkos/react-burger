export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';
export const MOVE_SELECTED_INGREDIENT = 'MOVE_SELECTED_INGREDIENT';


export const addSelectedIngredient = (item) => ({
    type: ADD_SELECTED_INGREDIENT,
    item
});

export const deleteSelectedIngredient = (key) => ({
    type: DELETE_SELECTED_INGREDIENT,
    key
}); 

export const moveSelectedIngredient = (key, newPosition) => ({
    type: MOVE_SELECTED_INGREDIENT,
    key, 
    newPosition
}); 