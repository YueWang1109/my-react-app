import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, currentUser, level, ...rest }) =>{  
  debugger;
  let passed = false;
  if (currentUser >= level)
    passed = true
  return <Route
      {...rest}
      render={props =>
        passed
          ? <Component currentUser={currentUser} {...props} />
          : <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />}
    />;
}


export default PrivateRoute;