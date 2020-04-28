import {
  AUTH_LOADING_SIGNUP,
  AUTH_ERROR_SIGNUP,
  AUTH_SUCCESSFUL_SIGNUP,
  AUTH_SIGNUP_INIT,
  AUTH_LOADING_LOGIN,
  AUTH_ERROR_LOGIN,
  AUTH_SUCCESSFUL_LOGIN,
  AUTH_LOGIN_INIT,
  TOKENS,
  LOGOUT,
} from './types';

import { emailCheck, phoneNoCheck } from '../utils/helper';

export const logoutAction = ({ accessToken, refreshToken }) => async (
  dispatch
) => {
  console.log('Logout Action');
  console.log({ accessToken, refreshToken });
  const res = await fetch(
    `/api/v1/auth/logout/${accessToken}/${refreshToken}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  if (data.success) {
    dispatch({ type: LOGOUT });
  }
};

export const stateInit = () => (dispatch) => {
  dispatch({ type: AUTH_SIGNUP_INIT });
  dispatch({ type: AUTH_LOGIN_INIT });
};

export const registerCustomerAction = (authData) => async (dispatch) => {
  if (authData.password !== authData.confirmPassword) {
    dispatch({
      type: AUTH_ERROR_SIGNUP,
      message: 'Password are not matching',
      errorField: 'Password',
    });
  } else {
    dispatch({ type: AUTH_LOADING_SIGNUP });
    const res = await fetch('/api/v1/auth/register/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });
    const data = await res.json();
    if (!data.success) {
      dispatch({
        type: AUTH_ERROR_SIGNUP,
        message: data.message,
        errorField: data.errorField,
      });
    } else {
      dispatch({ type: AUTH_SUCCESSFUL_SIGNUP });
    }
  }
};

export const loginAction = (authData) => async (dispatch) => {
  console.log('In Login Action');
  console.log(authData);
  const { contactInfo, gmailID, facebookID } = authData;

  if (gmailID || facebookID) {
    console.log('In Gmail Facebook Section');
    await sendLoginRequest(authData, dispatch);
  } else {
    console.log('In Custom Login Section');
    if (!emailCheck(contactInfo) && !phoneNoCheck(contactInfo)) {
      console.log('eta email phone number na');
      dispatch({
        type: AUTH_ERROR_LOGIN,
        message: 'Contact Info is invalid',
        errorField: 'Contact Info',
      });
    } else {
      let loginUsing = 'EMAIL';
      if (phoneNoCheck(contactInfo)) loginUsing = 'PHONE';
      let mData = { ...authData, infoMed: loginUsing };
      if (loginUsing === 'PHONE')
        mData.contactInfo = `+88${authData.contactInfo}`;

      await sendLoginRequest(mData, dispatch);
    }
  }
};

async function sendLoginRequest(reqBody, dispatch) {
  dispatch({ type: AUTH_LOADING_LOGIN });
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody),
  });
  const data = await res.json();
  console.log(data);
  if (!data.success) {
    dispatch({
      type: AUTH_ERROR_LOGIN,
      message: data.message,
      errorField: data.errorField,
    });
  } else {
    dispatch({ type: AUTH_SUCCESSFUL_LOGIN });
    const { accessToken, refreshToken } = data;
    dispatch({ type: TOKENS, payload: { accessToken, refreshToken } });
  }
}
