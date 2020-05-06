import { TOKENS, LOGOUT } from '../actions/types';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  userInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOKENS:
      return {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userInfo: action.payload.user,
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
