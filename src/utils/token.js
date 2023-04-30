import { deleteCookie, getCookie, setCookie } from "./cookies";

const ACCESS_TOKEN_NAME = 'access_token';
const REFRESH_TOKEN_NAME = 'refresh_token';

export const getAccessToken = () =>
    getCookie(ACCESS_TOKEN_NAME);

export const setAccessToken = (token) =>
    setCookie(ACCESS_TOKEN_NAME, token.replace('Bearer ', ''));

export const deleteAccessToken = () =>
    deleteCookie(ACCESS_TOKEN_NAME);


export const getRefreshToken = () =>
    getCookie(REFRESH_TOKEN_NAME);

export const setRefreshToken = (token) =>
    setCookie(REFRESH_TOKEN_NAME, token);

export const deleteRefreshToken = () =>
    deleteCookie(REFRESH_TOKEN_NAME);