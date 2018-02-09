import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
//import Routes from './routes.js';
import registerServiceWorker from './registerServiceWorker';

import HeaderComponent from './components/header';
import FooterComponent from './components/footer';
import App from './components/app';
import Register from './components/user/register';

import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import * as ReactBootstrap from 'react-bootstrap';
import './index.css';


ReactDOM.render(
    <div>
        <HeaderComponent />
        <Router>
            <div>
                <App/>
                <Route path="/register" component={Register}/>
            </div>
        </Router>
        <FooterComponent />
    </div>,
    document.getElementById('root')
);

registerServiceWorker();
