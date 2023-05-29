import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { TAuthActions } from '../actions/auth.action';
import { TIngredientsActions } from '../actions/ingredients.action';
import { TOrderDetailsActions } from '../actions/order-details.action';
import { TSelectedIngredientsActions } from '../actions/selected-ingredients.action';

type TApplicationActions = TAuthActions | TIngredientsActions | TOrderDetailsActions | TSelectedIngredientsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;