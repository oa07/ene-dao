import React from 'react';
import { connect } from 'react-redux';

const UserProfile = (props) => {
  console.log(props);
  return (
    <div>
      <p> Hello World</p>
    </div>
  );
};

const mapStateToProps = (state) => ({ cred: state.credentialReducer });
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
