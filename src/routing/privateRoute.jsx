import React from 'react'
import { useContext } from 'react';
import { Redirect, Route } from 'react-router';
 
import { AuthContext } from "../App";
 
export default function PrivateRoute({ children, ...rest }) {
    const context = useContext(AuthContext)

    const handleRender = ({location}) => {
      if(context.isConnected) {
        return children
      }

      return (<Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />)
    }

    return (
      <Route 
      {...rest}
      render={handleRender}
      />
    )
  }