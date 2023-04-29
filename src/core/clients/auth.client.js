import { request } from "../../utils/http-client";
import { getRefreshToken } from "../../utils/token";

export const AuthClient = {
    register: (data) =>
        request('auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
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