import { AuthClient } from "../../core/clients/auth.client";
import { UserClient } from "../../core/clients/user.client";

export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_FAILED = 'AUTH_LOGOUT_FAILED';

export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILED = 'AUTH_REGISTER_FAILED';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED';

export const AUTH_GET_USER_REQUEST = 'AUTH_GET_USER_REQUEST';
export const AUTH_GET_USER_SUCCESS = 'AUTH_GET_USER_SUCCESS';
export const AUTH_GET_USER_FAILED = 'AUTH_GET_USER_FAILED';

export const AUTH_EDIT_USER_REQUEST = 'AUTH_EDIT_USER_REQUEST';
export const AUTH_EDIT_USER_SUCCESS = 'AUTH_EDIT_USER_SUCCESS';
export const AUTH_EDIT_USER_FAILED = 'AUTH_EDIT_USER_FAILED';



export const logout = () => (dispatch) => {
    dispatch({
        type: AUTH_LOGOUT_REQUEST
    });
    UserClient.get()
        .then(data => dispatch({
            type: AUTH_LOGOUT_SUCCESS,
            data
        }))
        .catch(err => dispatch({
            type: AUTH_LOGOUT_FAILED
        }))
};

export const register = (name, email, password) => (dispatch) => {
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


export const login = (email, password) => (dispatch) => {
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

export const getUser = () => (dispatch) => {
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

export const editUser = (fields) => (dispatch) => {
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