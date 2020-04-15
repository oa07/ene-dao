import React, { useState } from 'react';
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
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='dark' dark expand='md'>
        <div className='container'>
          <NavbarBrand href='#'>Home</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-sm-auto' navbar>
              <NavItem className='mr-5'>
                <InputGroup>
                  <Input placeholder='Search your product' />
                </InputGroup>
              </NavItem>
              <NavItem>
                <NavLink href='#'>Enlist your Fav Store</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#'>Contact Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
