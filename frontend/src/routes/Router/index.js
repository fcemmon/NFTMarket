import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AuthRequiredRoute from '../../auth/AuthRequired';

import Home from '../../pages/Home';
import WalletLogin from '../../pages/WalletLogin';
import CreateNewProduct from '../../pages/CreateNewProduct';
import CreateSingle from '../../pages/CreateSingle';
import CreateMulti from '../../pages/CreateMulti';
import Notfound from '../../pages/NotFound';

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />

        <AuthRequiredRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/product/new/single"
          component={CreateSingle}
        />

        <AuthRequiredRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/product/new/multi"
          component={CreateMulti}
        />

        <AuthRequiredRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/product/new/"
          component={CreateNewProduct}
        />
        <Route path="/auth/wallet-begin" component={WalletLogin} />
        <Route component={Notfound} />
      </Switch>
    );
  }
}

export default Router;