import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients.reducer';
import { orderDetailsReducer } from './order-details.reducer';
import { selectedIngredientsReducer } from './selected-ingredients.reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  orderDetails: orderDetailsReducer
});