import React, { Component } from 'react';
import logo from '../../blood_bank.png';

class HeaderComponent extends Component {

    render() {
        var style = {
          backgroundImage: "url(" + logo + ")",
          backgroundSize: "contain",
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
          display:"inline-block",
          backgroundRepeat: "no-repeat"
        };
        return (
            <div className="header">
                <a href="/" className="logo-a"><span style={style}></span></a>
                <div className="header-links">
                    <a href="/register">Register</a>
                    <a href="/users">Admin Panel</a>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;