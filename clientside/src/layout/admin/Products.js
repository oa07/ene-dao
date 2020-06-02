import React, { useState } from 'react';
import '../../assests/css/products.css';
import '../../assests/css/adminProd.css';
import ProductImage from '../../assests/images/food-image.jpg';
import NavBar from '../../components/AdminNavbar';

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

export default function Products(props) {
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('Category');

  const [MODALdropdownOpen, setMODALDropdownOpen] = useState(false);
  const [MODALdropdownValue, setMODALDropdownValue] = useState('Shops');
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
        <div className='seeCategoryBtn'>
          <button
            className='btn btn-dark'
            onClick={() => props.history.push('/admin/products/new')}
          >
            Add Product
          </button>
          <button
            className='btn btn-dark'
            onClick={() => props.history.push('/admin/products/category')}
          >
            Add category
          </button>
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
                  <button> UPDATE </button>
                </div>
              </div>
            </div>

            <Modal
              isOpen={modal}
              toggle={toggleModal}
              centered='true'
              size='lg'
            >
              <ModalHeader toggle={toggleModal}>
                Update Product Information
              </ModalHeader>
              <ModalBody>
                <section>
                  <div className='modal_admin_productInfo'>
                    <div className='modal_productInfo_img_wrpr'>
                      <div className='modal_productInfo_img'>
                        <img src={ProductImage} alt='img' />
                      </div>
                      <div className='updateFile text-center mb-2'>
                        <label
                          for='updateFileID'
                          className='btn btn-success mt-2 px-3'
                        >
                          Update Image
                        </label>
                        <input
                          type='file'
                          id='updateFileID'
                          accept='image/*'
                          name='updateImage'
                          style={{ display: 'none' }}
                        />
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

                      <div className='modal_productInfo_info_des'>
                        <p>
                          This is product Description This is product
                          Description This is product Description
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
                          </DropdownMenu>
                        </Dropdown>
                      </div>

                      <div className='modal_productInfo_info_add_cart'>
                        <button
                          className='btn btn-success'
                          onClick={toggleNested}
                        >
                          Update Informations
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <Modal
                  isOpen={nestedModal}
                  toggle={toggleNested}
                  onClosed={closeAll ? toggle : undefined}
                  centered='true'
                  size='lg'
                >
                  <ModalHeader>Update Informations</ModalHeader>
                  <ModalBody>
                    <div className='container'>
                      <form>
                        <div className='form-group'>
                          <label for='prodNameID'> Product name: </label>
                          <input
                            type='text'
                            id='prodNameID'
                            name='prodName'
                            className='form-control'
                            placeholder='Enter product name'
                          />
                        </div>
                        <div className='form-group'>
                          <label for='prodDesID'> Product description: </label>
                          <textarea
                            id='prodDesID'
                            name='prodDes'
                            className='form-control'
                            placeholder='Enter product description'
                            rows='3'
                          />
                        </div>
                        <div className='dFlex'>
                          <div className='form-group'>
                            <label for='prodPriceID'> Product price: </label>
                            <input
                              type='number'
                              id='prodPriceID'
                              name='prodPrice'
                              className='form-control'
                              placeholder='Enter product price'
                            />
                          </div>
                          <div className='form-group'>
                            <label for='prodCategoryID'>
                              {' '}
                              Product Category:{' '}
                            </label>{' '}
                            <br />
                            <select
                              className='form-control'
                              id='prodCategoryID'
                            >
                              <option disabled selected>
                                Select Category
                              </option>
                              <option>1</option>
                              <option>2</option>
                              <option>Others</option>
                            </select>
                          </div>
                        </div>
                        <div className='form-group'>
                          <label for='prodNewCatID'> Enter Category: </label>
                          <input
                            type='text'
                            id='prodNewCatID'
                            name='prodNewCat'
                            className='form-control'
                            placeholder='Enter new category name'
                          />
                        </div>
                      </form>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' onClick={toggleNested}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
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
