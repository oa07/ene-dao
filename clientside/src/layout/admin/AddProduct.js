import React, { useState } from 'react';
import '../../assests/css/adminAddProduct.css';
import AdminNavbar from '../../components/AdminNavbar';

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

export default function AddProduct() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('Category');

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const changeValue = (e) => {
    setDropdownValue(e.currentTarget.textContent);
  };

  return (
    <div>
      <nav>
        <AdminNavbar />
      </nav>
      <div className='container'>
        <div className='addProd_header text-center my-4 '>
          <h1> Add Product </h1>
        </div>
        <div className='addProd_form'>
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
            <div className='form-group'>
              <label for='prodImageID'> Product Image: </label> <br />
              <input
                type='file'
                id='prodImageID'
                name='prodImage'
                accept='image/*'
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
                <label for='prodCategoryID'> Product Category: </label> <br />
                <select className='form-control' id='prodCategoryID'>
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
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
