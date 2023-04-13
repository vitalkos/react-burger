import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients.reducer';
import { orderDetailsReducer } from './order-details.reducer';
import { ingredientDetailsReducer } from './ingredient-details.reducer';
import { selectedIngredientsReducer } from './selected-ingredients.reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderDetails: orderDetailsReducer,
  ingredientDetails: ingredientDetailsReducer
});