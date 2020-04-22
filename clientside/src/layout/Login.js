import React, { useState, useEffect } from 'react';
import { Input, FormGroup, Button } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import '../css/auth.css';
import AuthImage from '../images/auth_image.jpg';

import InputField from '../components/auth/InputField';
import ShowError from '../components/auth/ShowError';

import { checkNull, emailCheck, phoneNoCheck } from '../utils/helper';

const Login = (props) => {
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);

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
      let loginUsing = 'EMAIL';
      if (phoneNoCheck(contactInfo)) loginUsing = 'PHONE';
      fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactInfo,
          password,
          role: 'USER',
          infoMed: loginUsing,
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

  return (
    <div className='authContainer'>
      <div className='auth'>
        <div className='auth_side_img'>
          <img src={AuthImage} alt='demoImage' />
        </div>
        <div className='auth_form  px-2'>
          <ShowError error={error} />
          <Form
            onSubmit={onSubmit}
            validate={validation}
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

export default Login;
