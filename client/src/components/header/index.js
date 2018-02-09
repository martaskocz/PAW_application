import React, { Component } from 'react';

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
        return (
            <div className="header">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">WebSiteName</a>
                        </div>
                        <ul className="nav nabar-nav navbar-right">
                            <li><a href="/register">Register</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default HeaderComponent;