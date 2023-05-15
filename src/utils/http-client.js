import { AUTH_ERROR_CODE, TOKEN_EXPIRED_ERROR_CODE, AuthError } from "../core/errors/auth-error";
import {
    getAccessToken
    , setAccessToken
    , deleteAccessToken
    , getRefreshToken,
    setRefreshToken
} from "./token";

export const BASE_URL = 'https://norma.nomoreparties.space';

export const request = async (endpoint, options) => {
    const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
        ...(options || {}),
        headers: {
            ...(options?.headers || {}),
            'Content-Type': options?.headers && options?.headers['Content-Type'] ?
                options.headers['Content-Type'] : 'application/json;charset=utf-8'
        }
    });
    return await validatePayload(response);
}

let refreshTokenRequestPromiseLock = null;
const refreshTokenRequestPromise = () => {
    if (refreshTokenRequestPromiseLock)
        return refreshTokenRequestPromiseLock;
    refreshTokenRequestPromiseLock = updateTokenRequest();
    refreshTokenRequestPromiseLock
        .then(t => refreshTokenRequestPromiseLock = null)
        .catch(err => refreshTokenRequestPromiseLock = null);
    return refreshTokenRequestPromiseLock;
}
export const secureRequest = async (endpoint, options) => {
    const authFetch = (token) => fetch(`${BASE_URL}/api/${endpoint}`, {
        ...(options || {}),
        headers: {
            ...(options?.headers || {}),
            'Content-Type': options?.headers && options?.headers['Content-Type'] ?
                options.headers['Content-Type'] : 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        }
    });

    let accessToken = getAccessToken();
    accessToken ??= await refreshTokenRequestPromise();

    let response = await authFetch(accessToken);
    if (response?.status === AUTH_ERROR_CODE || response?.status === TOKEN_EXPIRED_ERROR_CODE) {
        accessToken = await refreshTokenRequestPromise();
        response = await authFetch(accessToken);
        if (response?.status === AUTH_ERROR_CODE || response?.status === TOKEN_EXPIRED_ERROR_CODE)
            throw new AuthError();
    }

    return await validatePayload(response);
}

const updateTokenRequest = async () => {
    deleteAccessToken();
    const token = getRefreshToken();

    if (!token)
        throw new AuthError();

    const payload = await request('auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token })
    });

    if (!payload.accessToken || !payload.refreshToken)
        throw new AuthError();


    const accessToken = payload.accessToken.replace('Bearer ', '');

    setRefreshToken(payload.refreshToken);
    setAccessToken(accessToken);
    return accessToken;

}

const validatePayload = async (response) => {
    if (!response?.ok)
        throw new Error(`Ошибка ${response.status}`);
    const payload = await response.json();
    if (!payload.success)
        throw new Error(`Ответ не success: ${payload}`);
    return payload;
}