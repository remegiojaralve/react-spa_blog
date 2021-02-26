import { AUTH_LOGIN } from './authTypes';
import { AUTH_LOGOUT } from './authTypes';

export const authLogin = () => {
  return {
    type: AUTH_LOGIN
  };
};

export const authLogOut = () => {
  return {
    type: AUTH_LOGOUT
  };
};
