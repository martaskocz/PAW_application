import React from 'react';
import {Router, Route} from 'react-router';
import App from '/.components/app';
import Error404 from '/.components/error404';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}/>
        <Route path="*" component={Error404}/>
    </Router>
);

export default Routes;