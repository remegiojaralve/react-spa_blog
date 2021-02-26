import { AUTH_LOGIN } from './authTypes';
import { AUTH_LOGOUT } from './authTypes';

const token = localStorage.getItem('token');
const INITIAL_STATE = token ? true : false;

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return !state;
    case AUTH_LOGOUT:
      localStorage.removeItem('token');
      return !state
    default:
      return state;
  }
}

export default authReducer;
