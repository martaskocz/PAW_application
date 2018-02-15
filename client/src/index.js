import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import HeaderComponent from './components/header';
import FooterComponent from './components/footer';
import App from './components/app';
import Register from './components/user/register';
import Users from './components/admin/adminpanel';
import thanks from './components/thanks/thanks';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const Apps = () => (
    <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/thanks" component={thanks}/>
        <Route path="/users" component={Users}/>
        <Route path="/" component={App}/>
    </Switch>
);

ReactDOM.render(
    <div>
        <HeaderComponent />
        <Router>
            <Apps/>
        </Router>
        <FooterComponent />
    </div>,
    document.getElementById('root')
);

registerServiceWorker();
