import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RegisterCustomer from './layout/RegisterCustomer';
import RegisterDeliveryman from './layout/RegisterDeliveryman';
import RegisterAdmin from './layout/RegisterAdmin';
import Login from './layout/Login';
import Homepage from './layout/Homepage';

export default (props) => {
  return (
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
          <Route
            exact
            path='/auth/register/deliveryman'
            component={RegisterDeliveryman}
          />
          <Route exact path='/auth/register/admin' component={RegisterAdmin} />
          <Route exact path='/auth/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
};
