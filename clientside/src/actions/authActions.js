import {
  AUTH_INIT,
  AUTH_LOADING,
  AUTH_ERROR,
  AUTH_SUCCESSFUL,
  AUTH_NOT_SUCCESSFUL,
  TOKENS,
} from './types';

import { emailCheck, phoneNoCheck } from '../utils/helper';

export const registerCustomerAction = (authData) => async (dispatch) => {
  console.log('In Register Customer Action');
  console.log(authData);

  if (authData.password !== authData.confirmPassword) {
    dispatch({ type: AUTH_ERROR, payload: `Password isn't matching` });
  } else {
    dispatch({ type: AUTH_INIT });
    dispatch({ type: AUTH_LOADING });
    const res = await fetch('/api/v1/auth/register/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) {
      dispatch({ type: AUTH_NOT_SUCCESSFUL, payload: data.message });
    } else {
      dispatch({ type: AUTH_SUCCESSFUL });
    }
  }
};

export const loginAction = (authData) => async (dispatch) => {
  console.log('In Login Action');
  console.log(authData);
  const { contactInfo } = authData;

  if (!emailCheck(contactInfo) && !phoneNoCheck(contactInfo)) {
    dispatch({ type: AUTH_ERROR, payload: 'Contact Info is invalid' });
  } else {
    dispatch({ type: AUTH_INIT });
    dispatch({ type: AUTH_LOADING });

    let loginUsing = 'EMAIL';
    if (phoneNoCheck(contactInfo)) loginUsing = 'PHONE';
    let mData = { ...authData, infoMed: loginUsing };
    if (loginUsing === 'PHONE')
      mData.contactInfo = `+88${authData.contactInfo}`;

    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mData),
    });
    const data = await res.json();
    if (!data.success) {
      dispatch({ type: AUTH_NOT_SUCCESSFUL, payload: data.message });
    } else {
      dispatch({ type: AUTH_SUCCESSFUL });
      const { accessToken, refreshToken } = data;
      dispatch({ type: TOKENS, payload: { accessToken, refreshToken } });
    }
  }
};
