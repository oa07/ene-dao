import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RegisterCustomer from './layout/RegisterCustomer';
import Login from './layout/Login';
import Homepage from './layout/Homepage';
import PageNotFound from './layout/PageNotFound';
import UserProfile from './layout/UserProfile';

import { Provider } from 'react-redux';

import store from './store';

export default (props) => {
  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
          <div>
            <NavBar />
          </div>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route
              exact
              path='/auth/register/customer'
              component={RegisterCustomer}
            />
            <Route exact path='/auth/login' component={Login} />
            <Route exact path='/user/profile' component={UserProfile} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};
