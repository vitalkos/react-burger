import { secureRequest } from "../../utils/http-client";

export const UserClient = {
    get: () => secureRequest('auth/user'),
    update: (data) => secureRequest('auth/user', {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}