import React, { useState, useEffect } from 'react';
import { Input, FormGroup, Button } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import '../css/auth.css';
import AuthImage from '../images/auth_image.jpg';

import Isemail from 'isemail';

const Login = (props) => {
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);

  const checkNull = (data) => {
    return data === '' || data === null || data === undefined;
  };

  const emailCheck = (data) => {
    return Isemail.validate(data);
  };

  const phoneNoCheck = (data) => {
    const re = /^[0-9]+$/;
    return re.test(data) && data.length === 11;
  };

  const onSubmit = (values) => {
    if (!emailCheck(values.contactInfo) && !phoneNoCheck(values.contactInfo)) {
      setError('Contact Info is invalid');
    } else if (!checkNull(values.contactInfo) && !checkNull(values.password)) {
      setError(undefined);
      setContactInfo(values.contactInfo);
      setPassword(values.password);
    }
  };

  useEffect(() => {
    console.log('in use effect');
    if (!checkNull(contactInfo) && !checkNull(password) && checkNull(error)) {
      let infoMed = 'EMAIL';
      if (phoneNoCheck(contactInfo)) infoMed = 'PHONE';
      fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactInfo,
          password,
          role: 'USER',
          infoMed,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) setError(data.message);
        });
    }
  }, [contactInfo, password, error]);

  const validation = (values) => {
    const err = {};
    if (!values.contactInfo) {
      err.contactInfo = 'Email or Phone number is Required';
    }
    if (!values.password) {
      err.password = 'Password is Required';
    }
    return err;
  };

  const errorShowing = (meta) => {
    return (
      meta.error &&
      meta.touched && <div className='formError'> * {meta.error}</div>
    );
  };
  return (
    <div className='authContainer'>
      <div className='auth'>
        <div className='auth_side_img'>
          <img src={AuthImage} alt='demoImage' />
        </div>
        <div className='auth_form  px-2'>
          {error && (
            <div className='alert alert-danger text-center' role='alert'>
              {error}
            </div>
          )}
          <Form
            onSubmit={onSubmit}
            validate={validation}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Field name='contactInfo'>
                    {({ input, meta }) => (
                      <div className='erow'>
                        <Input
                          {...input}
                          type='text'
                          id='contactInfoID'
                          placeholder='Email / Phone number'
                        />
                        {errorShowing(meta)}
                      </div>
                    )}
                  </Field>
                  <Field name='password'>
                    {({ input, meta }) => (
                      <div className='erow'>
                        <Input
                          {...input}
                          type='password'
                          id='passwordID'
                          placeholder='Password'
                        />
                        {errorShowing(meta)}
                      </div>
                    )}
                  </Field>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
