import { AuthClient } from "../../core/clients/auth.client";
import { UserClient } from "../../core/clients/user.client";
import { TUpdateUserRequest } from "../../core/models/http/request";
import { TLoginResponse, TUserResponse } from "../../core/models/http/response";
import { AppDispatch, AppThunkAction } from "../types";
import {
    AUTH_LOGOUT_REQUEST
    , AUTH_LOGOUT_SUCCESS
    , AUTH_LOGOUT_FAILED

    , AUTH_REGISTER_REQUEST
    , AUTH_REGISTER_SUCCESS
    , AUTH_REGISTER_FAILED

    , AUTH_LOGIN_REQUEST
    , AUTH_LOGIN_SUCCESS
    , AUTH_LOGIN_FAILED

    , AUTH_GET_USER_REQUEST
    , AUTH_GET_USER_SUCCESS
    , AUTH_GET_USER_FAILED

    , AUTH_EDIT_USER_REQUEST
    , AUTH_EDIT_USER_SUCCESS
    , AUTH_EDIT_USER_FAILED
} from "../constants";

export interface IAuthLogoutRequestAction {
    readonly type: typeof AUTH_LOGOUT_REQUEST;
}
export interface IAuthLogoutSuccessAction {
    readonly type: typeof AUTH_LOGOUT_SUCCESS;
}
export interface IAuthLogoutFailedAction {
    readonly type: typeof AUTH_LOGOUT_FAILED;
}


export interface IAuthRegisterRequestAction {
    readonly type: typeof AUTH_REGISTER_REQUEST;
}
export interface IAuthRegisterSuccessAction {
    readonly type: typeof AUTH_REGISTER_SUCCESS;
    readonly data: TLoginResponse;
}
export interface IAuthRegisterFailedAction {
    readonly type: typeof AUTH_REGISTER_FAILED;
}


export interface IAuthLoginRequestAction {
    readonly type: typeof AUTH_LOGIN_REQUEST;
}
export interface IAuthLoginSuccessAction {
    readonly type: typeof AUTH_LOGIN_SUCCESS;
    readonly data: TLoginResponse;
}
export interface IAuthLoginFailedAction {
    readonly type: typeof AUTH_LOGIN_FAILED;
}


export interface IAuthGetUserRequestAction {
    readonly type: typeof AUTH_GET_USER_REQUEST;
}
export interface IAuthGetUserSuccessAction {
    readonly type: typeof AUTH_GET_USER_SUCCESS;
    readonly data: TUserResponse;
}
export interface IAuthGetUserFailedAction {
    readonly type: typeof AUTH_GET_USER_FAILED;
}


export interface IAuthEditUserRequestAction {
    readonly type: typeof AUTH_EDIT_USER_REQUEST;
}
export interface IAuthEditUserSuccessAction {
    readonly type: typeof AUTH_EDIT_USER_SUCCESS;
    readonly data: TUserResponse;
}
export interface IAuthEditUserFailedAction {
    readonly type: typeof AUTH_EDIT_USER_FAILED;
}

export type TAuthActions =
    IAuthLogoutRequestAction
    | IAuthLogoutSuccessAction
    | IAuthLogoutFailedAction

    | IAuthRegisterRequestAction
    | IAuthRegisterSuccessAction
    | IAuthRegisterFailedAction

    | IAuthLoginRequestAction
    | IAuthLoginSuccessAction
    | IAuthLoginFailedAction

    | IAuthGetUserRequestAction
    | IAuthGetUserSuccessAction
    | IAuthGetUserFailedAction

    | IAuthEditUserRequestAction
    | IAuthEditUserSuccessAction
    | IAuthEditUserFailedAction;


export const logout = (): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: AUTH_LOGOUT_REQUEST
    });
    AuthClient.logout()
        .then(data => dispatch({
            type: AUTH_LOGOUT_SUCCESS
        }))
        .catch(err => dispatch({
            type: AUTH_LOGOUT_FAILED
        }))
};

export const register = (name: string, email: string, password: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: AUTH_REGISTER_REQUEST
    });
    AuthClient.register(name, email, password)
        .then(data => dispatch({
            type: AUTH_REGISTER_SUCCESS,
            data
        }))
        .catch(err => dispatch({
            type: AUTH_REGISTER_FAILED
        }))
};


export const login = (email: string, password: string): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: AUTH_LOGIN_REQUEST
    });
    AuthClient.login(email, password)
        .then(data => dispatch({
            type: AUTH_LOGIN_SUCCESS,
            data
        }))
        .catch(err => dispatch({
            type: AUTH_LOGIN_FAILED
        }))
};

export const getUser = (): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: AUTH_GET_USER_REQUEST
    });
    UserClient.get()
        .then(data => dispatch({
            type: AUTH_GET_USER_SUCCESS,
            data
        }))
        .catch(err => dispatch({
            type: AUTH_GET_USER_FAILED
        }))
};

export const editUser = (fields: TUpdateUserRequest): AppThunkAction => (dispatch: AppDispatch) => {
    dispatch({
        type: AUTH_EDIT_USER_REQUEST
    });
    UserClient.update(fields)
        .then(data => dispatch({
            type: AUTH_EDIT_USER_SUCCESS,
            data
        }))
        .catch(err => dispatch({
            type: AUTH_EDIT_USER_FAILED
        }))
};