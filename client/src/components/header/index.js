import React, { Component } from 'react';
import logo from '../../blood_bank.png';

class HeaderComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: []
        };
        this.loadLoggedInUser = this.loadLoggedInUser.bind(this);
    }

    loadLoggedInUser(){
        fetch('/loginuser',{
            method: 'GET'
        }).then(function (response) {
            if (response.statys >=400){
                throw new Error("bad response from server");
            }
            return response.json();
        }).then(function (data) {
            if (data === "no user"){
                console.log("HERE")
                this.setState({user: ""})
            } else {
                console.log("HERE2")
            }
        }).catch(err => {
            console.log('caught it!, err');
        })
    }

    componentDidMount(){
        this.loadLoggedInUser.bind(this);
    }

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
                    <a href="/login">Login</a>
                    <a href="/search">Search</a>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;