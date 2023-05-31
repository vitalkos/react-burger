import { secureRequest } from "../../utils/http-client";
import { TUpdateUserRequest } from "../models/http/request";
import { TUserResponse } from "../models/http/response";

export const UserClient = {
    get: (): Promise<TUserResponse> => secureRequest<TUserResponse>('auth/user'),
    update: (data: TUpdateUserRequest): Promise<TUserResponse> =>
        secureRequest<TUserResponse>('auth/user', {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
}