export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';


export const setIngredientDetails = (item) => ({
    type: SET_INGREDIENT_DETAILS,
    item
}) 


export const clearIngredientDetails = () => ({
    type: CLEAR_INGREDIENT_DETAILS
}); 