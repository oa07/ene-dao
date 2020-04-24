import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Form } from 'react-final-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/auth.css';
import AuthImage from '../images/auth_image.jpg';

import InputField from '../components/auth/InputField';
import ShowError from '../components/auth/ShowError';

import { loginAction } from '../actions/authActions';
import { loginValidator } from '../validations/login';

const Login = (props) => {
  const { loginAction } = props;
  const { isLoading, error, formSuccess } = props.auth;

  const onSubmit = (values) => {
    loginAction({ ...values, role: 'USER' });
  };

  if (formSuccess) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: 'We are done!!',
        }}
      />
    );
  }

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
                      disabled={submitting}
                    >
                      Signup
                    </Button>
                  </div>
                </FormGroup>
              </form>
            )}
          ></Form>

          <div className='fbGmailLogin'>
            <div className='gmail-btn py-2'>
              <Button className='btn btn-dark btn-block'>
                Login with Gmail
              </Button>
            </div>
            <div className='fb-btn'>
              <Button className='btn btn-dark btn-block'>
                Login with Facebook
              </Button>
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

const mapStateToProps = (state) => ({ auth: state.authReducer });
export default connect(mapStateToProps, { loginAction })(Login);
