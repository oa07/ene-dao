import React, { useState, useEffect } from 'react';
import { Input, FormGroup, Button } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import { Link, Redirect } from 'react-router-dom';

import '../css/auth.css';
import AuthImage from '../images/auth_image.jpg';

import { checkNull, emailCheck, phoneNoCheck } from '../utils/helper';

import InputField from '../components/auth/InputField';
import ShowError from '../components/auth/ShowError';

const RegisterCustomer = (props) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setCpassword] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [contactNo, setContactNo] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(undefined);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (values) => {
    if (values.password !== values.cpassword) {
      setError(`Password isn't matching`);
    } else {
      setFullname(values.fullname);
      setEmail(values.email);
      setPassword(values.password);
      setCpassword(values.cpassword);
      setHomeAddress(values.homeAddress);
      setFlatNo(values.flatNo);
      setIdentifier(values.identifier);
      setContactNo(`+88${values.contactNo}`);
      setError(undefined);
      setFormSubmitted(true);
    }
  };

  useEffect(() => {
    console.log('in use effect');
    if (formSubmitted) {
      setLoading(true);
      fetch('/api/v1/auth/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          confirmPassword,
          homeAddress,
          flatNo,
          identifier,
          contactNo,
          role: 'customer',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) setError(data.message);
          else {
            setError(undefined);
            setFormSuccess(true);
          }
          setFormSubmitted(false);
          setLoading(false);
        });
    }
  }, [formSubmitted, error, formSuccess, isLoading]);

  const validation = (values) => {
    const err = {};
    if (!values.fullname) {
      err.fullname = 'Fullname is Required';
    }
    if (!values.email) {
      err.email = 'Email is Required';
    }
    if (!values.password) {
      err.password = 'Password is Required';
    }
    if (!values.cpassword) {
      err.cpassword = 'Confirm Password is Required';
    }
    if (!values.homeAddress) {
      err.homeAddress = 'Home Address is Required';
    }
    if (!values.flatNo) {
      err.flatNo = 'Flat No is Required';
    }
    if (!values.contactNo) {
      err.contactNo = 'ContactNo is Required';
    }

    return err;
  };

  if (formSuccess) {
    return <Redirect to='/auth/login' />;
  }

  if (isLoading) {
    return (
      <div className='authContainer'>
        <div className='loader'></div>
      </div>
    );
  }

  return (
    <div className='authContainer'>
      <div className='auth'>
        <div className='auth_side_img'>
          <img src={AuthImage} alt='demoImage' />
        </div>
        <div className='auth_form px-2'>
          <ShowError error={error} />
          <Form
            onSubmit={onSubmit}
            validate={validation}
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
                        Name='cpassword'
                        ID='cpasswordID'
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

export default RegisterCustomer;
