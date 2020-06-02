import React from 'react';
import { FormGroup } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import ShowError from '../../components/auth/ShowError';

import '../../assests/css/adminLogin.css';

import { adminLoginAction, stateInit } from '../../actions/authActions';

const AdminLogin = (props) => {
  const { adminLoginAction } = props;
  const { isLoading, error } = props.auth;
  const { isAuthenticated } = props.cred;

  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/admin' }} />;
  }

  const onSubmit = async (values) => {
    await adminLoginAction(values, props.history);
  };
  const errorShowing = (meta) => {
    return (
      meta.error &&
      meta.touched && <div className='formError'> * {meta.error}</div>
    );
  };
  const loginValidator = (values) => {
    const err = {};
    if (!values.username) {
      err.username = 'Username is Required';
    }
    if (!values.password) {
      err.password = 'Password is Required';
    }
    return err;
  };
  return (
    <div className='adminLogin'>
      <nav>
        <p> Admin Login </p>
      </nav>
      <div>
        <div className='container'>
          <div className={isLoading ? 'loader' : ''}></div>
          <div className={isLoading ? 'lessOpacity' : ''}>
            <Form
              onSubmit={onSubmit}
              validate={loginValidator}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit} className='loginFormID'>
                  <ShowError error={error} />

                  <FormGroup>
                    <div className='form-group'>
                      <label for='usernameID'>Username: </label>
                      <Field name='username'>
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              type='text'
                              className='form-control'
                              id='usernameID'
                              placeholder='Enter username'
                            />
                            {errorShowing(meta)}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className='form-group'>
                      <label for='passwordID'>Password: </label>
                      <Field name='password'>
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              type='password'
                              className='form-control'
                              id='passwordID'
                              placeholder='Enter Password'
                            />
                            {errorShowing(meta)}
                          </div>
                        )}
                      </Field>
                    </div>
                  </FormGroup>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={submitting || pristine}
                  >
                    Submit
                  </button>
                </form>
              )}
            ></Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.adminLoginReducer,
  cred: state.credentialReducer,
});

const mapDispatchToAction = { adminLoginAction, stateInit };
export default connect(mapStateToProps, mapDispatchToAction)(AdminLogin);
