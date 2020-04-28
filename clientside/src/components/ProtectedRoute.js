import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../layout/Login';

const ProtectedRoute = (props) => {
  const { url, cred, component } = props;
  const { isAuthenticated } = cred;
  return (
    <Fragment>
      <Route exact path={url} component={isAuthenticated ? component : Login} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(ProtectedRoute);
