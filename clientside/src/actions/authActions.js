import {
  AUTH_LOADING_SIGNUP,
  AUTH_ERROR_SIGNUP,
  AUTH_SUCCESSFUL_SIGNUP,
  AUTH_SIGNUP_INIT,
  AUTH_LOADING_LOGIN,
  AUTH_ERROR_LOGIN,
  AUTH_SUCCESSFUL_LOGIN,
  AUTH_LOGIN_INIT,
  AUTH_SIGNUP_THIRD_PARTY,
  TOKENS,
  LOGOUT,
} from './types';

import { emailCheck, phoneNoCheck } from '../utils/helper';

export const stateInit = () => (dispatch) => {
  dispatch({ type: AUTH_SIGNUP_INIT });
  dispatch({ type: AUTH_LOGIN_INIT });
};

export const registerCustomerAction = (authData, history) => async (
  dispatch
) => {
  console.log('In register action');
  dispatch({ type: AUTH_LOADING_SIGNUP });
  if (authData.password !== authData.confirmPassword) {
    dispatch({
      type: AUTH_ERROR_SIGNUP,
      message: 'Password are not matching',
      errorField: 'Password',
    });
  } else {
    const res = await fetch('/api/v1/auth/register/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) {
      dispatch({
        type: AUTH_ERROR_SIGNUP,
        message: data.message,
        errorField: data.errorField,
      });
    } else {
      dispatch({ type: AUTH_SUCCESSFUL_SIGNUP });
      history.push('/auth/login');
    }
  }
};

export const loginAction = (authData, history) => async (dispatch) => {
  console.log(authData);
  dispatch({ type: AUTH_LOADING_LOGIN });
  const { contactInfo, gmailID, facebookID } = authData;

  if (gmailID || facebookID) {
    await sendLoginRequest(authData, dispatch, history, false);
  } else {
    if (!emailCheck(contactInfo) && !phoneNoCheck(contactInfo)) {
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

      await sendLoginRequest(mData, dispatch, history);
    }
  }
};

export const getUserInfo = ({ accessToken, refreshToken }) => async (
  dispatch
) => {};

export const logoutAction = ({ accessToken, refreshToken }) => async (
  dispatch
) => {
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

// ###########################################################
// ###########################################################
// ###########################################################
// ###########################################################

async function sendLoginRequest(
  reqBody,
  dispatch,
  history,
  customLogin = true
) {
  const body = { ...reqBody, info: undefined };
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  console.log(data);
  if (!data.success) {
    if (customLogin) {
      dispatch({
        type: AUTH_ERROR_LOGIN,
        message: data.message,
        errorField: data.errorField,
      });
    } else {
      dispatch({ type: AUTH_LOGIN_INIT });
      dispatch({
        type: AUTH_SIGNUP_THIRD_PARTY,
        payload: reqBody.info,
      });
      history.push('/auth/register/customer');
    }
  } else {
    dispatch({ type: AUTH_SUCCESSFUL_LOGIN });
    const { accessToken, refreshToken } = data;
    const userInfo = await fetch(`/api/v1/auth/view-profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = await userInfo.json();
    if (user.success) {
      dispatch({
        type: TOKENS,
        payload: { accessToken, refreshToken, user: user.user },
      });
      history.push('/user/profile');
    }
  }
  console.log('Login Action Ends');
}
