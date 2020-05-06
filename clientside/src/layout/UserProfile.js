import React from 'react';
import { connect } from 'react-redux';

import '../assests/css/user-profile.css';

const UserProfile = (props) => {
  console.log(props);
  const { fullname, email, contactNo } = props.cred.userInfo;
  return (
    <div className='container'>
      <section className='userProfile pt-5'>
        <div className='userAllinfo'>
          <table class='table table-hover'>
            <thead>
              <tr className='text-left'>
                <th scope='col' colSpan='2'>
                  CONTACT INFORMATION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'> Name </th>
                <td>{fullname}</td>
              </tr>
              <tr>
                <th scope='row'> Email </th>
                <td>{email}</td>
              </tr>

              <tr>
                <th scope='row'> Contact No </th>
                <td>{contactNo}</td>
              </tr>
              <tr>
                <th scope='row'> Location </th>
                <td> N/A </td>
              </tr>
            </tbody>
          </table>

          <div className='updateBtn text-right'>
            <button className='btn btn-success'>
              <i className='fa fa-edit pr-1'></i>
              Edit Profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({ cred: state.credentialReducer });
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
