import React, { useState, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProductImage from '../assests/images/food-image.jpg';

const Modal = (props) => {
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('Category');

  const changeValue = (e) => {
    setDropdownValue(e.currentTarget.textContent);
  };

  const toggleModal = () => setModal(!modal);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Fragment>
      <Modal isOpen={modal} toggle={toggleModal} centered='true' size='lg'>
        <ModalHeader toggle={toggleModal}>Select Shop</ModalHeader>
        <ModalBody>
          <section>
            <div className='modal_productInfo'>
              <div className='modal_productInfo_img'>
                <img src={ProductImage} alt='img' />
              </div>
              <div className='modal_productInfo_info'>
                <div>
                  <p>Red Velvet Cupcake</p>
                </div>
                <div>
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>{dropdownValue}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={changeValue}>
                        Some Action
                      </DropdownItem>
                      <DropdownItem onClick={changeValue}>
                        Bar Action
                      </DropdownItem>
                      <DropdownItem onClick={changeValue}>
                        Quo Action
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div>
                  <Button> ADD TO CART </Button>
                </div>
              </div>
            </div>
          </section>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggleModal}>
            Do Something
          </Button>
          <Button color='secondary' onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Modal;
