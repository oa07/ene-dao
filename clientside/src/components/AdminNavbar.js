import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';

import { connect } from 'react-redux';
import { logoutAction } from '../actions/authActions';

const AdminNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { logoutAction } = props;
  const { accessToken, refreshToken } = props.cred;

  const logout = async () => {
    await logoutAction(accessToken, refreshToken);
  };

  return (
    <div>
      <Navbar color='dark' dark expand='lg'>
        <div className='container'>
          <NavbarBrand href='/admin'>Dashboard</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-sm-auto' navbar>
              <NavItem>
                <NavLink href='/admin/products'> Products </NavLink>
              </NavItem>
              <NavItem>
                <Button
                  className='btn btn-outline-light ml-lg-3'
                  outline
                  onClick={logout}
                >
                  Logout
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = { logoutAction };
export default connect(mapStateToProps, mapDispatchToAction)(AdminNavbar);
