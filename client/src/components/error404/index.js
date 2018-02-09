import React, { Component } from 'react';
import '.style.css';
import error from 'error404.png';
import {Bootstrap} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css';

export default class NotFound extends Component {
    render() {
        return (
            <div className="logostyle">
                <img src={error} alt="error404-notfound"/>
            </div>
        );
    }
}
