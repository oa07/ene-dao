import { TOKENS, LOGOUT } from '../actions/types';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
