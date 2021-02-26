import { TOGGLE_FORM_TYPE } from './toggleFormTypes';

const INITIAL_STATE = 'login-form';

const toggleFormTypeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_FORM_TYPE:
      return state = action.payload;
    default:
      return state;
  }
}

export default toggleFormTypeReducer;
