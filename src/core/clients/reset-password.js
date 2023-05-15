import { request } from "../../utils/http-client";

export const ResetPasswordClient = {
    sendEmailCode: (email) =>
        request('password-reset', {
            method: 'POST',
            body: JSON.stringify({ email })
        }),
    reset: (password, token) =>
        request('password-reset/reset', {
            method: 'POST',
            body: JSON.stringify({ password, token })
        })
}