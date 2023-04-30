import { request } from "../../utils/http-client";
import { getRefreshToken } from "../../utils/token";

export const AuthClient = {
    register: (name, email, password) =>
        request('auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name, email, password})
        }),
    login: (email, password) =>
        request('auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ email, password })
        }),
    logout: () =>
        request('auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token: getRefreshToken() })
        })
}