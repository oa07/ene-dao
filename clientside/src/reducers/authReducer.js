import {
  AUTH_LOADING,
  AUTH_ERROR,
  AUTH_SUCCESSFUL,
  AUTH_NOT_SUCCESSFUL,
} from '../actions/types';

const initialState = {
  isLoading: false,
  error: undefined,
  formSubmitted: false,
  formSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...initialState,
        isLoading: true,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AUTH_SUCCESSFUL:
      return {
        ...initialState,
        formSuccess: true,
      };
    case AUTH_NOT_SUCCESSFUL:
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
}
