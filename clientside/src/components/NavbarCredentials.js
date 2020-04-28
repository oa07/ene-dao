import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { logoutAction } from '../actions/authActions';

const NavbarCredentials = (props) => {
  const { logoutAction } = props;
  const { isAuthenticated, accessToken, refreshToken } = props.cred;
  const logout = () => {
    logoutAction({ accessToken, refreshToken });
  };
  return (
    <Fragment>
      <NavItem>
        <Link
          to={isAuthenticated ? '/user/profile' : '/auth/login'}
          className='btn ml-lg-5 px-lg-4 btn-outline-light'
          outline
        >
          {isAuthenticated ? 'My profile' : 'Login'}
        </Link>
      </NavItem>

      {isAuthenticated && (
        <NavItem>
          <Button
            className='btn btn-outline-light ml-lg-2'
            outline
            onClick={logout}
          >
            Logout
          </Button>
        </NavItem>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = { logoutAction };
export default connect(mapStateToProps, mapDispatchToAction)(NavbarCredentials);
