import { TUser } from '../../core/models/user.model';
import { deleteAccessToken, deleteRefreshToken, setAccessToken, setRefreshToken } from '../../utils/token';
import { TAuthActions } from '../actions/auth.action';
import {
    AUTH_GET_USER_FAILED
    , AUTH_GET_USER_REQUEST
    , AUTH_GET_USER_SUCCESS
    , AUTH_LOGIN_FAILED
    , AUTH_LOGIN_REQUEST
    , AUTH_LOGIN_SUCCESS
    , AUTH_LOGOUT_FAILED
    , AUTH_LOGOUT_REQUEST
    , AUTH_LOGOUT_SUCCESS
    , AUTH_REGISTER_FAILED
    , AUTH_REGISTER_REQUEST
    , AUTH_REGISTER_SUCCESS
    , AUTH_EDIT_USER_FAILED
    , AUTH_EDIT_USER_REQUEST
    , AUTH_EDIT_USER_SUCCESS
} from '../constants';


export type TAuthState = {
    user: TUser | null;
    getUserRequest: boolean;
    getUserFailed: boolean;
    editUserRequest: boolean;
    editUserFailed: boolean;
    loginRequest: boolean;
    loginFailed: boolean;
    logoutRequest: boolean;
    logoutFailed: boolean;
    registerRequest: boolean;
    registerFailed: boolean;
};

const initialState: TAuthState = {
    user: null,
    getUserRequest: true,
    getUserFailed: false,
    editUserRequest: false,
    editUserFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    registerRequest: false,
    registerFailed: false
};

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
    switch (action.type) {

        case AUTH_GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true
            };
        }
        case AUTH_GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.data.user,
                getUserFailed: false,
                getUserRequest: false
            };
        }
        case AUTH_GET_USER_FAILED: {
            return {
                ...state,
                getUserFailed: true,
                getUserRequest: false
            };
        }


        case AUTH_EDIT_USER_REQUEST: {
            return {
                ...state,
                editUserRequest: true
            };
        }
        case AUTH_EDIT_USER_SUCCESS: {
            return {
                ...state,
                editUserFailed: false,
                editUserRequest: false,
                user: action.data.user
            };
        }
        case AUTH_EDIT_USER_FAILED: {
            return {
                ...state,
                editUserFailed: true,
                editUserRequest: false
            };
        }


        case AUTH_LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true
            };
        }
        case AUTH_LOGIN_SUCCESS: {
            setAccessToken(action.data.accessToken);
            setRefreshToken(action.data.refreshToken);
            return {
                ...state,
                loginFailed: false,
                loginRequest: false,
                user: action.data.user
            };
        }
        case AUTH_LOGIN_FAILED: {
            return {
                ...state,
                loginFailed: true,
                loginRequest: false
            };
        }


        case AUTH_LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true
            };
        }
        case AUTH_LOGOUT_SUCCESS: {
            deleteAccessToken();
            deleteRefreshToken();
            return {
                ...state,
                logoutFailed: false,
                logoutRequest: false,
                user: null
            };
        }
        case AUTH_LOGOUT_FAILED: {
            return {
                ...state,
                logoutFailed: true,
                logoutRequest: false
            };
        }


        case AUTH_REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true
            };
        }
        case AUTH_REGISTER_SUCCESS: {
            setAccessToken(action.data.accessToken);
            setRefreshToken(action.data.refreshToken);
            return {
                ...state,
                registerFailed: false,
                registerRequest: false,
                user: action.data.user
            };
        }
        case AUTH_REGISTER_FAILED: {
            return {
                ...state,
                registerFailed: true,
                registerRequest: false
            };
        }
        default: {
            return state;
        }
    }
};