import { TTokenResponse } from "./token-response.model"
import { TUserResponse } from "./user-response.model";

export type TLoginResponse = TUserResponse & TTokenResponse;