import { combineReducers } from 'redux';
import authReducer from './authReducer';
import credentialReducer from './credentialReducer';

export default combineReducers({ authReducer, credentialReducer });
