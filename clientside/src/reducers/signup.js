import {
  AUTH_SIGNUP_INIT,
  AUTH_LOADING_SIGNUP,
  AUTH_ERROR_SIGNUP,
  AUTH_SUCCESSFUL_SIGNUP,
  AUTH_SIGNUP_THIRD_PARTY,
} from '../actions/types';

const initialState = {
  isLoading: false,
  error: undefined,
  errorField: undefined,
  formSuccess: false,
  hasThirdPartyLogin: false,
  ThirdPartyInfo: undefined,
};

export default function (state = initialState, action) {
  let msg = action.message;
  if (msg === `Contact Number's length must be 14`) {
    action.message = `Contact Number's length must be 11`;
  }
  if (msg === `Password must contain characters [a-z], [A-Z], [0-9]`) {
    action.message = `Password must contain atleast 8 characters including uppercase, lowercase and numbers`;
  }

  switch (action.type) {
    case AUTH_SIGNUP_INIT:
      return {
        ...initialState,
      };
    case AUTH_LOADING_SIGNUP:
      return {
        ...initialState,
        isLoading: true,
      };
    case AUTH_ERROR_SIGNUP:
      return {
        ...initialState,
        error: action.message,
        errorField: action.errorField,
      };
    case AUTH_SUCCESSFUL_SIGNUP:
      return {
        ...initialState,
        formSuccess: true,
      };
    case AUTH_SIGNUP_THIRD_PARTY:
      return {
        ...initialState,
        hasThirdPartyLogin: true,
        ThirdPartyInfo: action.payload,
      };
    default:
      return state;
  }
}
