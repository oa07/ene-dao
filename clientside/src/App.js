import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import RegisterCustomer from './layout/RegisterCustomer';
import Login from './layout/Login';
import Homepage from './layout/Homepage';
import PageNotFound from './layout/PageNotFound';
import UserProfile from './layout/UserProfile';
import Products from './layout/Products';

import AdminLogin from './layout/admin/AdminLogin';
import AdminDashboard from './layout/admin/AdminDashboard';
import AdminProductCategory from './layout/admin/ProductCategory';
import AdminProducts from './layout/admin/Products';
import AdminAddProduct from './layout/admin/AddProduct';

const App = (props) => {
  const {
    cred: { isAuthenticated, userInfo },
  } = props;
  const protectedRoute = (role = undefined, component) => {
    if (role === 'admin') {
      return userInfo.role === 'admin' ? component : AdminLogin;
    } else {
      return isAuthenticated ? component : Login;
    }
  };

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route
            exact
            path='/auth/register/customer'
            component={RegisterCustomer}
          />

          <Route exact path='/auth/login' component={Login} />
          <Route exact path='/products' component={Products} />

          <Route exact path='/admin/login' component={AdminLogin} />
          <Route
            exact
            path='/user/profile'
            component={protectedRoute(UserProfile)}
          />

          <Route
            exact
            role='admin'
            path={['/admin', '/admin/Dashboard']}
            component={protectedRoute('admin', AdminDashboard)}
          />

          <Route
            exact
            role='admin'
            path='/admin/products/category'
            component={protectedRoute('admin', AdminProductCategory)}
          />
          <Route
            exact
            role='admin'
            path='/admin/products'
            component={protectedRoute('admin', AdminProducts)}
          />
          <Route
            exact
            role='admin'
            path='/admin/products/new'
            component={protectedRoute('admin', AdminAddProduct)}
          />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(App);
