import {
  AUTH_LOGIN_INIT,
  AUTH_LOADING_LOGIN,
  AUTH_ERROR_LOGIN,
  AUTH_SUCCESSFUL_LOGIN,
} from '../actions/types';

const initialState = {
  isLoading: false,
  error: undefined,
  errorField: undefined,
  formSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_INIT:
      return {
        ...initialState,
      };
    case AUTH_LOADING_LOGIN:
      return {
        ...initialState,
        isLoading: true,
      };
    case AUTH_ERROR_LOGIN:
      return {
        ...initialState,
        error: action.message,
        errorField: action.errorField,
      };
    case AUTH_SUCCESSFUL_LOGIN:
      return {
        ...state,
        formSuccess: true,
      };

    default:
      return state;
  }
}
