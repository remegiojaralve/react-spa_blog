import { combineReducers } from 'redux'
import authReducer from './modules/auth/authReducer';
import toggleFormReducer from './modules/toggleForm/toggleFormReducer';
import toggleFormTypeReducer from './modules/toggleForm/toggleFormTypeReducer';

const reducers = combineReducers({
  auth : authReducer,
  toggleForm : toggleFormReducer,
  toggleFormType : toggleFormTypeReducer,
});

export default reducers;
