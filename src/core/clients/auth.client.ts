import { request } from "../../utils/http-client";
import { getRefreshToken } from "../../utils/token";
import { TLoginRequest, TLogoutRequest, TRegisterRequest } from "../models/http/request";
import { TLoginResponse, TLogoutResponse, TRegisterResponse } from "../models/http/response";

export const AuthClient = {
    register: (name: string, email: string, password: string): Promise<TRegisterResponse> =>
        request<TRegisterResponse>('auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password } as TRegisterRequest)
        }),
    login: (email: string, password: string): Promise<TLoginResponse> =>
        request<TLoginResponse>('auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password } as TLoginRequest)
        }),
    logout: (): Promise<TLogoutResponse> =>
        request<TLogoutResponse>('auth/logout', {
            method: 'POST',
            body: JSON.stringify({ token: getRefreshToken() } as TLogoutRequest)
        })
}