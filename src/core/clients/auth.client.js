import { request } from "../../utils/http-client";
import { getRefreshToken } from "../../utils/token";

export const AuthClient = {
    register: (name, email, password) =>
        request('auth/register', {
            method: 'POST',
            body: JSON.stringify({name, email, password})
        }),
    login: (email, password) =>
        request('auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),
    logout: () =>
        request('auth/logout', {
            method: 'POST',
            body: JSON.stringify({ token: getRefreshToken() })
        })
}