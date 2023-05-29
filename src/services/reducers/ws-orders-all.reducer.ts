import {
    WS_ORDERS_ALL_CONNECTION_SUCCESS
    , WS_ORDERS_ALL_CONNECTION_ERROR
    , WS_ORDERS_ALL_CONNECTION_CLOSED
    , WS_ORDERS_ALL_GET_MESSAGE
} from "../constants";
import { TWSOrdersAllActions } from '../actions/ws-orders-all.action';
import { TWSOrderMessage } from "../../core/models/ws/ws-order-message.model";
  
  type TWSOrdersAllState = {
    wsConnected: boolean;
    data: TWSOrderMessage | null;
  
    error?: Event;
  }
  
  const initialState: TWSOrdersAllState = {
    wsConnected: false,
    data: null
  };
  
  export const wsOrdersAllReducer = (state = initialState, action: TWSOrdersAllActions): TWSOrdersAllState => {
    switch (action.type) {
      case WS_ORDERS_ALL_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true
        };
  
      case WS_ORDERS_ALL_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false
        };
  
      case WS_ORDERS_ALL_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
  
      case WS_ORDERS_ALL_GET_MESSAGE:
        return {
          ...state,
          error: undefined,
          data: action.payload
        };
  
      default:
        return state;
    }
  };