import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component , ...rest }) => {

    const isLogged  = localStorage.getItem("token");

    return(
        <Route 
            {...rest}
            render={({location}) => 
                isLogged ? (
                    component
                ) : (
                        <Redirect to={{
                            pathname: "/",
                            state: {from: location}
                        }} />
                )}/>
    );
}


export default PrivateRoute;