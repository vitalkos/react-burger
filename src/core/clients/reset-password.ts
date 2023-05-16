import { request } from "../../utils/http-client";
import { TForgotPasswordRequest, TResetPasswordRequest } from "../models/http/request";
import { TForgotPasswordResponse, TResetPasswordResponse } from "../models/http/response";

export const ResetPasswordClient = {
    sendEmailCode: (email: string): Promise<TForgotPasswordResponse> =>
        request<TForgotPasswordResponse>('password-reset', {
            method: 'POST',
            body: JSON.stringify({ email } as TForgotPasswordRequest)
        }),
    reset: (password: string, token: string): Promise<TResetPasswordResponse> =>
        request<TResetPasswordResponse>('password-reset/reset', {
            method: 'POST',
            body: JSON.stringify({ password, token } as TResetPasswordRequest)
        })
}