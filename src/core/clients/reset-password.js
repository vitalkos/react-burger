import { request } from "../../utils/http-client";

export const ResetPasswordClient = {
    sendEmailCode: (email) =>
        request('password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ email })
        }),
    reset: (password, token) =>
        request('password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ password, token })
        })
}