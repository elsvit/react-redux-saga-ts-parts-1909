/**
 * @fileOverview Auth container
 */

import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import AuthContainer from './AuthContainer';

interface AuthRouteProps extends RouteProps {
  path: string;
}

const AuthRoute = ({ path, component: Component, render, ...rest }: AuthRouteProps) => (
  <Route
    path={path}
    {...rest}
    render={props => {
      if (Component) {
        return (
          <AuthContainer path={path}>
            <Component {...props} />
          </AuthContainer>
        );
      }
      return null;
    }}
  />
);

export default AuthRoute;
