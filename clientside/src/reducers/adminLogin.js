import {
  AUTH_ADMIN_LOGIN_INIT,
  AUTH_ADMIN_LOGIN_ERROR,
  AUTH_ADMIN_LOGIN_LOADING,
  AUTH_ADMIN_LOGIN_SUCCESSFUL,
} from '../actions/types';

const initialState = {
  isLoading: false,
  error: undefined,
  errorField: undefined,
  formSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_ADMIN_LOGIN_INIT:
      return {
        ...initialState,
      };
    case AUTH_ADMIN_LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_ADMIN_LOGIN_ERROR:
      return {
        ...initialState,
        error: action.message,
        errorField: action.errorField,
      };
    case AUTH_ADMIN_LOGIN_SUCCESSFUL:
      return {
        ...initialState,
        formSuccess: true,
      };

    default:
      return state;
  }
}
