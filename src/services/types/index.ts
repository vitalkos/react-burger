import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { TAuthActions } from '../actions/auth.action';
import { TIngredientsActions } from '../actions/ingredients.action';
import { TOrderDetailsActions } from '../actions/order-details.action';
import { TSelectedIngredientsActions } from '../actions/selected-ingredients.action';
import { TWSOrdersActions } from '../actions/ws-orders.action';
import { TWSOrdersAllActions } from '../actions/ws-orders-all.action';

export type TApplicationActions =
    TAuthActions
    | TIngredientsActions
    | TOrderDetailsActions
    | TSelectedIngredientsActions
    | TWSOrdersActions
    | TWSOrdersAllActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export * from './ws-store-actions';