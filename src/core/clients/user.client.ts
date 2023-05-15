import { secureRequest } from "../../utils/http-client";
import { TUpdateUserRequest } from "../models/http/request";
import { TUser } from "../models/user.model";

export const UserClient = {
    get: (): Promise<TUser> => secureRequest<TUser>('auth/user'),
    update: (data: TUpdateUserRequest): Promise<TUser> =>
        secureRequest<TUser>('auth/user', {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
}