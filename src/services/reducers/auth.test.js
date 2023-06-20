import { authReducer } from './auth.reducer';
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

const initialStateMock = {
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

describe('Auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {}))
            .toEqual(initialStateMock)
    })

    it('should handle AUTH_GET_USER_REQUEST', () => {
        expect(authReducer(undefined, { type: AUTH_GET_USER_REQUEST }))
            .toEqual({ ...initialStateMock, getUserRequest: true })
    })

    it('should handle AUTH_GET_USER_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: AUTH_GET_USER_SUCCESS,
            data: { user: { email: 'email', name: 'name' } }
        }))
            .toEqual({
                ...initialStateMock
                , user: { email: 'email', name: 'name' }
                , getUserFailed: false
                , getUserRequest: false
            })
    })

    it('should handle AUTH_GET_USER_FAILED', () => {
        expect(authReducer(undefined, { type: AUTH_GET_USER_FAILED }))
            .toEqual({
                ...initialStateMock,
                getUserFailed: true,
                getUserRequest: false
            })
    })

    it('should handle AUTH_EDIT_USER_REQUEST', () => {
        expect(authReducer(undefined, { type: AUTH_EDIT_USER_REQUEST }))
            .toEqual({ ...initialStateMock, editUserRequest: true })
    })

    it('should handle AUTH_EDIT_USER_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: AUTH_EDIT_USER_SUCCESS,
            data: { user: { email: 'email', name: 'name' } }
        }))
            .toEqual({
                ...initialStateMock
                , user: { email: 'email', name: 'name' }
                , editUserFailed: false
                , editUserRequest: false
            })
    })

    it('should handle AUTH_EDIT_USER_FAILED', () => {
        expect(authReducer(undefined, { type: AUTH_EDIT_USER_FAILED }))
            .toEqual({
                ...initialStateMock
                , editUserFailed: true
                , editUserRequest: false
            })
    })


    it('should handle AUTH_LOGIN_REQUEST', () => {
        expect(authReducer(undefined, { type: AUTH_LOGIN_REQUEST }))
            .toEqual({ ...initialStateMock, loginRequest: true })
    })

    it('should handle AUTH_LOGIN_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: AUTH_LOGIN_SUCCESS,
            data: {
                user: { email: 'email', name: 'name' },
                accessToken: 'accessToken',
                refreshToken: 'refreshToken'
            }
        }))
            .toEqual({
                ...initialStateMock
                , user: { email: 'email', name: 'name' }
                , loginFailed: false
                , loginRequest: false
            })
    })

    it('should handle AUTH_LOGIN_FAILED', () => {
        expect(authReducer(undefined, { type: AUTH_LOGIN_FAILED }))
            .toEqual({
                ...initialStateMock
                , loginFailed: true
                , loginRequest: false
            })
    })

    it('should handle AUTH_LOGOUT_REQUEST', () => {
        expect(authReducer(undefined, { type: AUTH_LOGOUT_REQUEST }))
            .toEqual({ ...initialStateMock, logoutRequest: true })
    })

    it('should handle AUTH_LOGOUT_SUCCESS', () => {
        expect(authReducer(undefined, { type: AUTH_LOGOUT_SUCCESS }))
            .toEqual({
                ...initialStateMock,
                logoutFailed: false
                , logoutRequest: false
                , user: null
            })
    })

    it('should handle AUTH_LOGOUT_FAILED', () => {
        expect(authReducer(undefined, { type: AUTH_LOGOUT_FAILED }))
            .toEqual({
                ...initialStateMock
                , logoutFailed: true
                , logoutRequest: false
            })
    })

    it('should handle AUTH_REGISTER_REQUEST', () => {
        expect(authReducer(undefined, { type: AUTH_REGISTER_REQUEST }))
            .toEqual({ ...initialStateMock, registerRequest: true })
    })

    it('should handle AUTH_REGISTER_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: AUTH_REGISTER_SUCCESS,
            data: {
                user: { email: 'email', name: 'name' },
                accessToken: 'accessToken',
                refreshToken: 'refreshToken'
            }
        }))
            .toEqual({
                ...initialStateMock
                , user: { email: 'email', name: 'name' }
                , registerFailed: false
                , registerRequest: false
            })
    })

    it('should handle AUTH_REGISTER_FAILED', () => {
        expect(authReducer(undefined, { type: AUTH_REGISTER_FAILED }))
            .toEqual({
                ...initialStateMock
                , registerFailed: true
                , registerRequest: false
            })
    })
})
