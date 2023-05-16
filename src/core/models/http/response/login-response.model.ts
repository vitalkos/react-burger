import { TUser } from "../../user.model"
import { TTokenResponse } from "./token-response.model"

export type TLoginResponse = { user: TUser } & TTokenResponse;