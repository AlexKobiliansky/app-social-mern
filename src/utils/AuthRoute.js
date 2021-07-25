import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

const AuthRoute = ({component: Component, ...rest}) => {
  const authenticated = useSelector(({user}) => user.authenticated);
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true ? <Redirect to='/'/> : <Component {...props}/>}
    />
  )
};

export default AuthRoute;