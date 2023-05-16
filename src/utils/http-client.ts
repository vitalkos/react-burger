import { AUTH_ERROR_CODE, TOKEN_EXPIRED_ERROR_CODE, AuthError } from "../core/errors/auth-error";
import { THttpResponse } from "../core/models/http/http-response.model";
import { TRefreshTokenRequest } from "../core/models/http/request";
import { TRefrestTokenResponse } from "../core/models/http/response";
import {
    getAccessToken
    , setAccessToken
    , deleteAccessToken
    , getRefreshToken,
    setRefreshToken
} from "./token";

export const BASE_URL = 'https://norma.nomoreparties.space';

export const request = async <TResponsePayload>(
    endpoint: string,
    options?: RequestInit): Promise<THttpResponse<TResponsePayload>> => {
    const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
        ...(options || {}),
        headers: {
            ...(options?.headers || {}),
            'Content-Type': (options?.headers as Headers)?.get('Content-Type') || 'application/json;charset=utf-8'
        }
    });
    return await validatePayload<TResponsePayload>(response);
}

let refreshTokenRequestPromiseLock: Promise<string> | null = null;
const refreshTokenRequestPromise = (): Promise<string> => {
    if (refreshTokenRequestPromiseLock)
        return refreshTokenRequestPromiseLock;
    refreshTokenRequestPromiseLock = updateTokenRequest();
    refreshTokenRequestPromiseLock
        .then(t => refreshTokenRequestPromiseLock = null)
        .catch(err => refreshTokenRequestPromiseLock = null);
    return refreshTokenRequestPromiseLock;
}
export const secureRequest = async <TResponsePayload>(
    endpoint: string,
    options?: RequestInit): Promise<THttpResponse<TResponsePayload>> => {
    const authFetch = (token: string) => fetch(`${BASE_URL}/api/${endpoint}`, {
        ...(options || {}),
        headers: {
            ...(options?.headers || {}),
            'Content-Type': (options?.headers as Headers)?.get('Content-Type') || 'application/json;charset=utf-8',
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

    return await validatePayload<TResponsePayload>(response);
}

const updateTokenRequest = async (): Promise<string> => {
    deleteAccessToken();
    const token = getRefreshToken();

    if (!token)
        throw new AuthError();

    const payload = await request<TRefrestTokenResponse>('auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token } as TRefreshTokenRequest)
    });

    if (!payload.accessToken || !payload.refreshToken)
        throw new AuthError();


    const accessToken = payload.accessToken.replace('Bearer ', '');

    setRefreshToken(payload.refreshToken);
    setAccessToken(accessToken);
    return accessToken;

}

const validatePayload = async <TResponsePayload>(response: Response): Promise<THttpResponse<TResponsePayload>> => {
    if (!response?.ok)
        throw new Error(`Ошибка ${response.status}`);
    const payload = await response.json() as THttpResponse<TResponsePayload>;
    if (!payload.success)
        throw new Error(`Ответ не success: ${payload}`);
    return payload;
}