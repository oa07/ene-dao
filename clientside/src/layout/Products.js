import React, { useState } from 'react';
import '../assests/css/products.css';
import ProductImage from '../assests/images/food-image.jpg';
import NavBar from '../components/NavBar';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

export default function Products() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('Category');

  const [MODALdropdownOpen, setMODALDropdownOpen] = useState(false);
  const [MODALdropdownValue, setMODALDropdownValue] = useState('Select Shop');
  const [MODALdropdownPrice, setMODALDropdownPrice] = useState(null);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const MODALtoggle = () => setMODALDropdownOpen((prevState) => !prevState);

  const changeValue = (e) => {
    setDropdownValue(e.currentTarget.textContent);
  };

  const MODALchangeValue = (e) => {
    const shopNamePrice = e.currentTarget.textContent;

    setMODALDropdownValue(shopNamePrice.split('BDT')[0].trim());
    setMODALDropdownPrice(`BDT ${shopNamePrice.split('BDT')[1]}`);
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <section className='products'>
        <div className='products_header text-center pb-3 pt-4'>
          <h1> Our Products </h1>
        </div>
        <div className='products_two_section'>
          <div className='products_each_section'>
            <div className='category'>
              <div className='category_name'>
                <p> Category </p>
              </div>
              <div className='categories'>
                <div className='cat'>
                  <i className='fa fa-angle-right'></i> <span>Category</span>
                </div>
                <div className='cat'>
                  <i className='fa fa-angle-right'></i> <span>Category</span>
                </div>
                <div className='cat'>
                  <i className='fa fa-angle-right'></i> <span>Category</span>
                </div>
                <div className='cat'>
                  <i className='fa fa-angle-right'></i> <span>Category</span>
                </div>
                <div className='cat'>
                  <i className='fa fa-angle-right'></i> <span>Category</span>
                </div>
                <div className='cat'>
                  <i className='fa fa-angle-right'></i> <span>Category</span>
                </div>
                <div className='cat'>
                  <i className='fa fa-angle-right'></i> <span>Category</span>
                </div>
                <div className='cat'>
                  <i className='fa fa-angle-right'></i> <span>Category</span>
                </div>
                <div className='cat'>
                  <i className='fa fa-angle-right'></i> <span>Category</span>
                </div>
              </div>
            </div>
          </div>
          <div className='products_each_section'>
            <div className='all_products_heading'>
              <p> Fruits </p>
            </div>
            <div className='searchSection'>
              <div className='searchSection_flx_chld'>
                <input
                  className='form-control SearchAnything'
                  type='text'
                  placeholder='What are you looking for...'
                  aria-label='Search'
                />
              </div>
              <div className='searchSection_flx_chld'>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className='w-100'
                >
                  <DropdownToggle caret className='w-100'>
                    {dropdownValue}
                  </DropdownToggle>
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
              <div className='searchSection_flx_chld'>
                <button className='btn btn-dark searchBtn'>Search </button>
              </div>
            </div>
            <div className='product_list'>
              <div className='each_product' onClick={toggleModal}>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_price'>
                  <p> BDT 10.00</p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
            </div>
            <Modal
              isOpen={modal}
              toggle={toggleModal}
              centered='true'
              size='lg'
            >
              <ModalHeader toggle={toggleModal}>Select Shop</ModalHeader>
              <ModalBody>
                <section>
                  <div className='modal_productInfo'>
                    <div className='modal_productInfo_img_wrpr'>
                      <div className='modal_productInfo_img'>
                        <img src={ProductImage} alt='img' />
                      </div>
                    </div>
                    <div className='modal_productInfo_info'>
                      <div className='modal_productInfo_info_name'>
                        <p>Red Velvet Cupcake</p>
                      </div>
                      <div className='modal_productInfo_info_cat'>
                        <p>
                          <i class='fa fa-tags'></i>
                          <span>Product Category</span>
                        </p>
                      </div>

                      <div className='modal_productInfo_info_price'>
                        <p>
                          <i class='fa fa-money'></i>
                          <span>BDT 10.50</span>
                        </p>
                      </div>

                      <div className='modal_productInfo_info_shop'>
                        <Dropdown
                          isOpen={MODALdropdownOpen}
                          toggle={MODALtoggle}
                          className='w-100'
                        >
                          <DropdownToggle caret className='w-100'>
                            {MODALdropdownValue}
                          </DropdownToggle>
                          <DropdownMenu className='w-100'>
                            <DropdownItem onClick={MODALchangeValue}>
                              <div className='EachShop'>
                                <p className='EachShop_name'>
                                  <i className='fa fa-shopping-cart'></i>
                                  <span> Daily Super Shop </span>
                                </p>

                                <p className='EachShop_price'>
                                  <i className='fa fa-money'></i>
                                  <span>BDT 90 </span>
                                </p>
                              </div>
                            </DropdownItem>
                            <DropdownItem onClick={MODALchangeValue}>
                              <div className='EachShop'>
                                <p className='EachShop_name'>
                                  <i className='fa fa-shopping-cart'></i>
                                  <span> Meena Super Shop </span>
                                </p>

                                <p className='EachShop_price'>
                                  <i className='fa fa-money'></i>
                                  <span>BDT 85 </span>
                                </p>
                              </div>
                            </DropdownItem>
                            <DropdownItem onClick={MODALchangeValue}>
                              <div className='EachShop'>
                                <p className='EachShop_name'>
                                  <i className='fa fa-shopping-cart'></i>
                                  <span> Raju Super Shop </span>
                                </p>

                                <p className='EachShop_price'>
                                  <i className='fa fa-money'></i>
                                  <span>BDT 83 </span>
                                </p>
                              </div>
                            </DropdownItem>
                            <DropdownItem onClick={MODALchangeValue}>
                              <div className='EachShop'>
                                <p className='EachShop_name'>
                                  <i className='fa fa-shopping-cart'></i>
                                  <span> Mithu Super Shop </span>
                                </p>

                                <p className='EachShop_price'>
                                  <i className='fa fa-money'></i>
                                  <span>BDT 92 </span>
                                </p>
                              </div>
                            </DropdownItem>
                            <DropdownItem onClick={MODALchangeValue}>
                              <div className='EachShop'>
                                <p className='EachShop_name'>
                                  <i className='fa fa-shopping-cart'></i>
                                  <span> Saif Super Shop </span>
                                </p>

                                <p className='EachShop_price'>
                                  <i className='fa fa-money'></i>
                                  <span>BDT 100 </span>
                                </p>
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                      <label for='quantityID' className='mt-2'>
                        {' '}
                        Quantity:{' '}
                      </label>
                      <div className='modal_productInfo_info_AddCart d-flex'>
                        <div className='form-group'>
                          <input
                            type='number'
                            id='quantityID'
                            className='form-control'
                            placeholder='Enter an amount'
                          />
                        </div>
                        <div className='modal_productInfo_info_add_cart'>
                          <button className='btn btn-success'>
                            <i className='fa fa-plus mr-1'></i>Add to Cart
                          </button>
                        </div>
                      </div>
                      <div className='text-center'>
                        <p>
                          Add{' '}
                          <span style={{ color: 'red', fontWeight: 'bold' }}>
                            {' '}
                            32.00 BDT
                          </span>{' '}
                          to reach cart minimum
                        </p>
                      </div>

                      <div className='text-center'>
                        <button className='btn btn-success px-5 py-2'>
                          View Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </ModalBody>
              <ModalFooter>
                <Button color='secondary' onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
}
