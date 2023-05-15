import { deleteCookie, getCookie, setCookie } from "./cookies";

const ACCESS_TOKEN_NAME = 'access_token';
const REFRESH_TOKEN_NAME = 'refresh_token';

export const getAccessToken = (): string | undefined =>
    getCookie(ACCESS_TOKEN_NAME);

export const setAccessToken = (token: string): void =>
    setCookie(ACCESS_TOKEN_NAME, token.replace('Bearer ', ''));

export const deleteAccessToken = (): void =>
    deleteCookie(ACCESS_TOKEN_NAME);


export const getRefreshToken = (): string | undefined =>
    getCookie(REFRESH_TOKEN_NAME);

export const setRefreshToken = (token: string): void =>
    setCookie(REFRESH_TOKEN_NAME, token);

export const deleteRefreshToken = (): void =>
    deleteCookie(REFRESH_TOKEN_NAME);