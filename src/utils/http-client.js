import { AUTH_ERROR_CODE, AuthError } from "../core/errors/auth-error";
import {
    getAccessToken
    , setAccessToken
    , deleteAccessToken
    , getRefreshToken
} from "./token";

export const BASE_URL = 'https://norma.nomoreparties.space';

export const request = async (endpoint, options) => {
    const response = await fetch(`${BASE_URL}/api/${endpoint}`, options);
    return await validatePayload(response);
}

export const secureRequest = async (endpoint, options) => {
    const authFetch = (token) => fetch(`${BASE_URL}/api/${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    });

    let accessToken = getAccessToken();
    accessToken ??= await updateTokenRequest();

    let response = await authFetch(accessToken);
    if (response?.status === AUTH_ERROR_CODE) {
        accessToken = await updateTokenRequest();
        response = await authFetch(accessToken);
        if (response?.status === AUTH_ERROR_CODE)
            throw new AuthError();
    }

    return await validatePayload(response);
}

const updateTokenRequest = async () => {
    deleteAccessToken();
    const token = getRefreshToken();

    if (!token)
        throw new AuthError();

    const response = await request('auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token })
    });

    const payload = await validatePayload(response);

    if (!payload.accessToken)
        throw new AuthError();

    const accessToken = payload.accessToken.replace('Bearer ', '');

    setAccessToken(accessToken);
    return accessToken;

}

const validatePayload = async (response) => {
    if (!response?.ok)
        throw new Error(`Ошибка ${response.status}`);
    const payload = await res.json();
    if (!payload.success)
        throw new Error(`Ответ не success: ${payload}`);
    return payload;
}