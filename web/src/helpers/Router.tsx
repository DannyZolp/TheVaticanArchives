import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Loading from '../components/Loading';
import Dashboard from '../views/Dashboard';
import Home from '../views/Home';
import HowItWorks from '../views/HowItWorks';
import Login from '../views/Login';
import Signup from '../views/Signup';
import View from '../views/View';
import firebase from './firebase';

interface RouteProps {
  component: React.ElementType;
  authenticated: boolean;
  path?: string | string[];
}

function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}: RouteProps) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({
  component: Component,
  authenticated,
  ...rest
}: RouteProps) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
}

class Router extends Component {
  state = {
    authenticated: false,
    loading: true,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/view" component={View}></Route>
          <Route exact path="/how-it-works" component={HowItWorks}></Route>
          <PublicRoute
            path="/login"
            authenticated={this.state.authenticated}
            component={Login}
          ></PublicRoute>
          <PublicRoute
            path="/signup"
            authenticated={this.state.authenticated}
            component={Signup}
          ></PublicRoute>
          <PrivateRoute
            path="/dashboard"
            authenticated={this.state.authenticated}
            component={Dashboard}
          ></PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
