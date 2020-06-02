import { combineReducers } from 'redux';
import loginReducer from './login';
import credentialReducer from './credential';
import signupReducer from './signup';
import adminLoginReducer from './adminLogin';
import productCateogryReducer from './productCateogry';

export default combineReducers({
  loginReducer,
  credentialReducer,
  signupReducer,
  adminLoginReducer,
  productCateogryReducer,
});
