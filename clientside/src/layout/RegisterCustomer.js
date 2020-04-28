import React, { useEffect } from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Form } from 'react-final-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../assests/css/auth.css';
import AuthImage from '../assests/images/auth_image.jpg';

import InputField from '../components/auth/InputField';
import ShowError from '../components/auth/ShowError';

import { registerCustomerAction, stateInit } from '../actions/authActions';
import { regCustomerValidator } from '../validations/register';

const RegisterCustomer = (props) => {
  const { registerCustomerAction, stateInit } = props;
  const { isLoading, error, errorField, formSuccess } = props.auth;
  const { isAuthenticated } = props.cred;

  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  if (formSuccess) {
    stateInit(); // Seems problematic
    return <Redirect to={{ pathname: '/auth/login' }} />;
  }

  const onSubmit = async (values) => {
    await registerCustomerAction({
      ...values,
      contactNo: `+88${values.contactNo}`,
      role: 'customer',
    });
  };

  return (
    <div className='authContainer'>
      <div className={isLoading ? 'loader' : ''}></div>
      <div className={isLoading ? 'auth lessOpacity' : 'auth'}>
        <div className='auth_side_img'>
          <img src={AuthImage} alt='demoImage' />
        </div>
        <div className='auth_form px-2'>
          <ShowError error={error} />
          <Form
            onSubmit={onSubmit}
            validate={regCustomerValidator}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <div className='erow'>
                    <InputField
                      Name='fullname'
                      Type='text'
                      ID='fullnameID'
                      Placeholder='Full Name'
                    />
                  </div>
                  <div className='erow'>
                    <InputField
                      Name='email'
                      Type='email'
                      ID='emailID'
                      Placeholder='Email'
                    />
                  </div>
                  <div className='erow flx-prnt'>
                    <div className='flx-chld'>
                      <InputField
                        Type='password'
                        Name='password'
                        ID='passwordID'
                        Placeholder='Password'
                      />
                    </div>
                    <div className='flx-chld'>
                      <InputField
                        Type='password'
                        Name='confirmPassword'
                        ID='confirmPasswordID'
                        Placeholder='Confirm Password'
                      />
                    </div>
                  </div>
                  <div className='erow'>
                    <InputField
                      Type='text'
                      Name='homeAddress'
                      ID='homeAddressID'
                      Placeholder='Home Address'
                    />
                  </div>
                  <div className='erow flx-prnt'>
                    <div className='flx-chld'>
                      <InputField
                        Type='text'
                        Name='flatNo'
                        ID='flatNoID'
                        Placeholder='Flat No:'
                      />
                    </div>
                    <div className='flx-chld'>
                      <InputField
                        Type='text'
                        Name='identifier'
                        ID='identifierID'
                        Placeholder='Any Identifier: (Optional)'
                      />
                    </div>
                  </div>
                  <div className='erow'>
                    <InputField
                      Type='text'
                      Name='contactNo'
                      ID='contactNoID'
                      Placeholder='Contact No:'
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className='submit-btn text-center'>
                    <Button
                      type='submit'
                      id='submitID'
                      className='btn btn-dark px-5 py-2'
                      disabled={pristine || submitting}
                    >
                      Signup
                    </Button>
                  </div>
                </FormGroup>
              </form>
            )}
          ></Form>
          <div className='text-center'>
            <p>
              Already have an account? Please{' '}
              <Link to={`/auth/login`}> Login </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.signupReducer,
  cred: state.credentialReducer,
});
const mapDispatchToProps = { registerCustomerAction, stateInit };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCustomer);
