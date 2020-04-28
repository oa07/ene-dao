import { combineReducers } from 'redux';
import loginReducer from './login';
import credentialReducer from './credential';
import signupReducer from './signup';

export default combineReducers({
  loginReducer,
  credentialReducer,
  signupReducer,
});
