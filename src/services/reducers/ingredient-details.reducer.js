import { SET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from '../actions/ingredient-details.action';
  
  const initialState = {
    id: null,
    name: null,
    proteins: null,
    fat: null,
    carbohydrates: null,
    calories: null,
    image: null
  };
  
  export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_INGREDIENT_DETAILS: {
        return {
          ...state,
          ...action.item
        };
      }
      case CLEAR_INGREDIENT_DETAILS: {
        return {
          ...state,
          ...initialState
        };
      }
      default: {
        return state;
      }
    }
  };