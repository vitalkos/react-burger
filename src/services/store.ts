import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

import { compose } from 'redux';
import { socketMiddleware } from './middleware';
import { TWSStoreActions } from './types';
import {
    WS_ORDERS_CONNECTION_START
    , WS_ORDERS_CONNECTION_SUCCESS
    , WS_ORDERS_CONNECTION_ERROR
    , WS_ORDERS_CONNECTION_CLOSED
    , WS_ORDERS_CONNECTION_DESTROY
    , WS_ORDERS_GET_MESSAGE
    , WS_ORDERS_SEND_MESSAGE

    , WS_ORDERS_ALL_CONNECTION_START
    , WS_ORDERS_ALL_CONNECTION_SUCCESS
    , WS_ORDERS_ALL_CONNECTION_ERROR
    , WS_ORDERS_ALL_CONNECTION_CLOSED
    , WS_ORDERS_ALL_CONNECTION_DESTROY
    , WS_ORDERS_ALL_GET_MESSAGE
    , WS_ORDERS_ALL_SEND_MESSAGE
} from "./constants";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsOrdersAllActions: TWSStoreActions = {
    wsInit: WS_ORDERS_ALL_CONNECTION_START,
    wsDestroy: WS_ORDERS_ALL_CONNECTION_DESTROY,
    wsSendMessage: WS_ORDERS_ALL_SEND_MESSAGE,
    onOpen: WS_ORDERS_ALL_CONNECTION_SUCCESS,
    onClose: WS_ORDERS_ALL_CONNECTION_CLOSED,
    onError: WS_ORDERS_ALL_CONNECTION_ERROR,
    onMessage: WS_ORDERS_ALL_GET_MESSAGE
  };

  const wsOrdersActions: TWSStoreActions = {
    wsInit: WS_ORDERS_CONNECTION_START,
    wsDestroy: WS_ORDERS_CONNECTION_DESTROY,
    wsSendMessage: WS_ORDERS_SEND_MESSAGE,
    onOpen: WS_ORDERS_CONNECTION_SUCCESS,
    onClose: WS_ORDERS_CONNECTION_CLOSED,
    onError: WS_ORDERS_CONNECTION_ERROR,
    onMessage: WS_ORDERS_GET_MESSAGE
  };

const enhancer = composeEnhancers(
    applyMiddleware(
        thunk
        , socketMiddleware('orders/all', wsOrdersAllActions)
        , socketMiddleware('orders', wsOrdersActions, true))
        );
export const store = createStore(rootReducer, enhancer);