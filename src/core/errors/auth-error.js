export const AUTH_ERROR_CODE = 401;

export class AuthError extends Error {
    constructor(message) {
      super(message);
      this.code = AUTH_ERROR_CODE;
    }
  }