import { TOGGLE_FORM, TOGGLE_FORM_TYPE } from './toggleFormTypes';

export const toggleForm = () => {
  return {
    type: TOGGLE_FORM
  }
}

export const toggleFormType = (formType) => {
  return {
    type: TOGGLE_FORM_TYPE,
    payload: formType
  }
}
