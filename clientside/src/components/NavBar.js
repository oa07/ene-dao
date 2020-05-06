import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  Input,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarCredentials from '../components/NavbarCredentials';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = props.cred;

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='dark' dark expand='lg'>
        <div className='container'>
          <NavbarBrand href='/'>Home</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-sm-auto' navbar>
              <NavItem className='mr-5'>
                <InputGroup>
                  <Input placeholder='Search your product' />
                </InputGroup>
              </NavItem>
              <NavItem className='pr-3'>
                <NavLink href='/products'>Products</NavLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink href='#' className='pr-3'>
                    <i className='fa fa-cart-plus pr-1'></i> My Cart
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink href='#'>Contact Us</NavLink>
              </NavItem>
              <NavbarCredentials />
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

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(NavBar);
