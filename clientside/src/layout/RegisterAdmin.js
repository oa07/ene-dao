import React from 'react';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthImage from '../images/auth_image.jpg';

import '../css/auth.css';

export default function RegisterAdmin() {
  return (
    <div className='authContainer'>
      <div className='auth'>
        <div className='auth_side_img'>
          <img src={AuthImage} alt='demoImage' />
        </div>
        <div className='auth_form px-2'>
          <Form>
            <FormGroup>
              <div className='erow'>
                <Input
                  type='text'
                  name='fullname'
                  id='fullnameID'
                  placeholder='Full Name'
                />
              </div>
              <div className='erow'>
                <Input
                  type='email'
                  name='email'
                  id='emailID'
                  placeholder='Email'
                />
              </div>
              <div className='erow flx-prnt'>
                <div className='flx-chld'>
                  <Input
                    type='password'
                    name='password'
                    id='passwordID'
                    placeholder='Password'
                  />
                </div>
                <div className='flx-chld'>
                  <Input
                    type='password'
                    name='cpassword'
                    id='cpasswordID'
                    placeholder='Confirm Password'
                  />
                </div>
              </div>
              <div className='erow'>
                <Input
                  type='text'
                  name='contactNo'
                  id='contactNoID'
                  placeholder='Contact No:'
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
          </Form>
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
}
