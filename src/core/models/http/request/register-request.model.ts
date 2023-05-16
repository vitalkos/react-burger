import { TLoginRequest } from "./login-request.model";

export type TRegisterRequest = { name: string } & TLoginRequest;