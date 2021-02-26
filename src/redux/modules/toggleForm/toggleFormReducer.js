import { TOGGLE_FORM } from './toggleFormTypes';

const INITIAL_STATE = false;

const toggleFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_FORM:
      return !state;
    default:
      return state;
  }
}

export default toggleFormReducer;
