import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import AdminNavbar from '../../components/AdminNavbar';
import '../../assests/css/adminProductCategory.css';

import {
  submitCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
} from '../../actions/prodCatActions';

const ProductCategory = (props) => {
  const {
    submitCategory,
    fetchCategory,
    updateCategory,
    deleteCategory,
  } = props;
  const { isLoading, category, categories } = props.cat;
  const { accessToken, refreshToken } = props.cred;

  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const [categoryName, setCategoryName] = useState('');

  const updateForm = async (e) => {
    e.preventDefault();
    await updateCategory(modalData, accessToken, refreshToken);
    updateToggle();
  };

  const delCategory = async (e) => {
    e.preventDefault();
    await deleteCategory(modalData, accessToken, refreshToken);
    deleteToggle();
  };

  const updateToggle = (data = {}) => {
    setUpdateModal(!updateModal);
    setModalData(data);
  };
  const deleteToggle = (data = {}) => {
    setDeleteModal(!deleteModal);
    setModalData(data);
  };

  useEffect(() => {
    (async () => await fetchCategory(accessToken, refreshToken))();
  }, []);

  const newCategorySubmit = async (e) => {
    e.preventDefault();
    console.log(categoryName);
    await submitCategory({ categoryName }, accessToken, refreshToken);
    setCategoryName('');
  };

  return (
    <div>
      <nav>
        <AdminNavbar />
      </nav>
      <div className='container'>
        <div className={isLoading ? 'loader' : ''}></div>
        <div
          className={isLoading ? 'adminCategory lessOpacity' : 'adminCategory'}
        >
          <div className='adminCategory_header text-center mt-3 pb-2'>
            <h1>Category</h1>
          </div>
          <div className='adminCategory_search mt-4'>
            <form onSubmit={newCategorySubmit}>
              <div className='form-group d-flex'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Add Category'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <input
                  type='submit'
                  className='btn btn-success px-4'
                  value='Add Category'
                />
              </div>
            </form>
          </div>
          <div className='adminCategory_all mt-5'>
            {categories.map((cat) => (
              <div className='adminCategory_each' key={cat._id}>
                <span className='adminCategory_each_name'>
                  {cat.categoryName}
                </span>
                <div className='adminCategory_each_icons'>
                  <span
                    className='fa fa-pencil-square-o'
                    onClick={() => updateToggle(cat)}
                  ></span>
                  <span
                    className='fa fa-trash-o'
                    onClick={() => deleteToggle(cat)}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={updateModal} toggle={updateToggle} className='updateModal'>
        <ModalHeader toggle={updateToggle}>Update Category</ModalHeader>
        <ModalBody>
          <div className='updateCateogoryModal'>
            <div className='form-group d-flex'>
              <form onSubmit={updateForm}>
                <input
                  type='text'
                  className='form-control'
                  value={modalData.categoryName}
                  onChange={(e) =>
                    setModalData({ ...modalData, categoryName: e.target.value })
                  }
                  placeholder='Update Category'
                />
                <input
                  type='submit'
                  className='btn btn-success px-4'
                  value='Update'
                />
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={updateToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal} toggle={deleteToggle} className='deleteModal'>
        <ModalHeader toggle={deleteToggle}>Delete Category</ModalHeader>
        <ModalBody>
          Do you want to delete this Category "{modalData.categoryName}"?
        </ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={delCategory}>
            Delete
          </Button>{' '}
          <Button color='secondary' onClick={deleteToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cat: state.productCateogryReducer,
  cred: state.credentialReducer,
});

const mapDispatchToAction = {
  submitCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
};
export default connect(mapStateToProps, mapDispatchToAction)(ProductCategory);
