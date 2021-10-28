import React from 'react';
import { Route } from 'react-router-dom';
import NotFound from '../NotFound/';

const PresentationLayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            localStorage.getItem('token') !== null ?
                <Layout {...props}>
                    <Component {...props} />
                </Layout>
                :
                <NotFound {...props} />
        )}
    />
);

export default PresentationLayoutRoute;
