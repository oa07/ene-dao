import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Form } from 'react-final-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import '../assests/css/auth.css';
import AuthImage from '../assests/images/auth_image.jpg';

import InputField from '../components/auth/InputField';
import ShowError from '../components/auth/ShowError';

import { loginAction, stateInit } from '../actions/authActions';
import { loginValidator } from '../validations/login';

const Login = (props) => {
  const { loginAction } = props;
  const { isLoading, error, formSuccess } = props.auth;
  const { isAuthenticated } = props.cred;

  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  const onSubmit = async (values) => {
    await loginAction({ ...values, role: 'USER' });
    if (formSuccess) props.history.push('/user/profile');
  };

  const responseGoogle = async (res) => {
    console.log(res);
    const { googleId, name, email } = res.profileObj;
    const info = { id: googleId, name, email, using: 'GMAIL' };
    await loginAction({ gmailID: res.profileObj.googleId, role: 'USER', info });
    props.history.push('/auth/register/customer');
  };

  const responseFacebook = async (res) => {
    const { id, name, email } = res;
    const info = { id, name, email, using: 'FB' };
    await loginAction({ facebookID: id, role: 'USER', info });
    props.history.push('/auth/register/customer');
  };

  return (
    <div className='authContainer'>
      <div className={isLoading ? 'loader' : ''}></div>
      <div className={isLoading ? 'auth lessOpacity' : 'auth'}>
        <div className='auth_side_img'>
          <img src={AuthImage} alt='demoImage' />
        </div>
        <div className='auth_form  px-2'>
          <ShowError error={error} />
          <Form
            onSubmit={onSubmit}
            validate={loginValidator}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <div className='erow'>
                    <InputField
                      Name='contactInfo'
                      Type='text'
                      ID='contactInfoID'
                      Placeholder='Email / Phone number'
                    />
                  </div>
                  <div className='erow'>
                    <InputField
                      Name='password'
                      Type='password'
                      ID='passwordID'
                      Placeholder='Password'
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className='submit-btn text-center'>
                    <Button
                      type='submit'
                      id='submitID'
                      className='btn btn-dark px-5 py-2'
                      disabled={submitting || pristine}
                    >
                      Signin
                    </Button>
                  </div>
                </FormGroup>
              </form>
            )}
          ></Form>

          <div className='fbGmailLogin'>
            <div className='gmail-btn py-2'>
              <GoogleLogin
                clientId='501935314157-nnfh7nvah1p9n1smdbj6ejt1avc6s22u.apps.googleusercontent.com'
                render={(renderProps) => (
                  <Button
                    className='btn btn-dark btn-block'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Login with Gmail
                  </Button>
                )}
                buttonText='Login'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>

            <div className='fb-btn'>
              <FacebookLogin
                appId='2643388962571610'
                fields='name,email,picture'
                callback={responseFacebook}
                render={(renderProps) => (
                  <Button
                    className='btn btn-dark btn-block'
                    onClick={renderProps.onClick}
                  >
                    Login with Facebook
                  </Button>
                )}
              />
            </div>
          </div>

          <div className='text-center pt-3'>
            <p>
              Don't have an account? Please{' '}
              <Link to={`/auth/register/customer`}> Sign up </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.loginReducer,
  cred: state.credentialReducer,
  addExtraField: state.signupReducer.addExtraField,
  addExtraPayload: state.signupReducer.addExtraPayload,
});

const mapDispatchToAction = { loginAction, stateInit };
export default connect(mapStateToProps, mapDispatchToAction)(Login);
