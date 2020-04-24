import {
  AUTH_INIT,
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
    case AUTH_INIT:
      return {
        ...initialState,
      };
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AUTH_SUCCESSFUL:
      return {
        ...state,
        isLoading: !state.isLoading,
        formSuccess: true,
      };
    case AUTH_NOT_SUCCESSFUL:
      return {
        ...state,
        isLoading: !state.isLoading,
        formSubmitted: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
