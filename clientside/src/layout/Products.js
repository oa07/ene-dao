import React, { useState } from 'react';

import '../assests/css/products.css';
import ProductImage from '../assests/images/food-image.jpg';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default function Products() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('Category');

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const changeValue = (e) => {
    setDropdownValue(e.currentTarget.textContent);
  };

  return (
    <div>
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
              <div className='each_product'>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
              <div className='each_product'>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
              <div className='each_product'>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
              <div className='each_product'>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
              <div className='each_product'>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
              <div className='each_product'>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
              <div className='each_product'>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
              <div className='each_product'>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
              <div className='each_product'>
                <div className='each_product_img'>
                  <img src={ProductImage} />
                </div>
                <div className='each_product_name'>
                  <p> Red Velvet Cupcake </p>
                </div>
                <div className='each_product_btn'>
                  <button> ADD TO CHART </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
