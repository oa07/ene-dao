import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { connect } from 'react-redux';

const NavbarCredentials = (props) => {
  const { isAuthenticated } = props.cred;
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
          <Link to='/' className='btn btn-outline-light ml-lg-2' outline>
            Logout
          </Link>
        </NavItem>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(NavbarCredentials);
