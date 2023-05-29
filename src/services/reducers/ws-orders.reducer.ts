import {
    WS_ORDERS_CONNECTION_SUCCESS
    , WS_ORDERS_CONNECTION_ERROR
    , WS_ORDERS_CONNECTION_CLOSED
    , WS_ORDERS_GET_MESSAGE
} from "../constants";
import { TWSOrdersActions } from '../actions/ws-orders.action';
import { TWSOrderMessage } from "../../core/models/ws/ws-order-message.model";
  
  type TWSOrdersState = {
    wsConnected: boolean;
    data: TWSOrderMessage | null;
  
    error?: Event;
  }
  
  const initialState: TWSOrdersState = {
    wsConnected: false,
    data: null
  };
  
  export const wsOrdersReducer = (state = initialState, action: TWSOrdersActions): TWSOrdersState => {
    switch (action.type) {
      case WS_ORDERS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true
        };
  
      case WS_ORDERS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false
        };
  
      case WS_ORDERS_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
  
      case WS_ORDERS_GET_MESSAGE:
        return {
          ...state,
          error: undefined,
          data: action.payload
        };
  
      default:
        return state;
    }
  };