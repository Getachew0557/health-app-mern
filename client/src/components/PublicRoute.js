import React from 'react'
import { Navigate } from 'react-router-dom'
function PublicRoute(props) {
    if (localStorage.getItem("token")) {
        return <Navigate to="/dashboard" />;  
      } else {
        return props.children;
      }
    }

export default PublicRoute