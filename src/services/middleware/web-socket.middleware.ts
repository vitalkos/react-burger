import type { Middleware, MiddlewareAPI } from 'redux';

import type {
    TApplicationActions,
    TWSStoreActions,
    AppDispatch,
    RootState,
} from '../types';
import { getAccessToken } from '../../utils/token';

const WS_BASE_URL = 'wss://norma.nomoreparties.space';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions, authRequired: boolean = false): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsInit, wsDestroy, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                if (authRequired) {
                    const isAuthorized = !!getState().auth.user;
                    const token = getAccessToken();

                    if (isAuthorized && token)
                        socket = new WebSocket(`${WS_BASE_URL}/${wsUrl}?token=${token}`);
                }
                else
                    socket = new WebSocket(`${WS_BASE_URL}/${wsUrl}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: onMessage, payload: parsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage)
                    socket.send(JSON.stringify(action.payload));

                if (type === wsDestroy){
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    });
};