export const AUTH_ERROR_CODE = 401;
export const TOKEN_EXPIRED_ERROR_CODE = 403;

export class AuthError extends Error {
    code: number;

    constructor(message?: string) {
      super(message);
      this.code = AUTH_ERROR_CODE;
    }
  }