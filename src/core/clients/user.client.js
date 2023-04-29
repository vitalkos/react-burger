import { secureRequest } from "../../utils/http-client";

export const UserClient = {
    get: () => secureRequest('auth/user'),
    update: (data) => secureRequest('auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}