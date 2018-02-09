import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Udhiram</a>
                        </div>
                        <div className="navbar-right">
                            <a className="navbar-brand" href="/register">Register</a>
                            <a className="navbar-brand" href="#">Login</a>
                            <form className="navbar-form navbar-left">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                        </div>
                    </div>
                </nav>
                <div className="Bottom--Button">
                    <a href=""><div className="Become--Member">
                        <i className="icon ion-person-add"></i>
                    </div></a>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="Banner--Blood">
                                <div className="row">
                                    <div className="col-lg-8 col-md-7 col-sm-6 col-xs-6">
                                        <div className="Banner--Text ml30">
                                            <p>Większą ma radość człowiek z dzielenia.</p>
                                            <p>Oddając krew możesz pomóc osobom walczącym o życie.</p>
                                            <p>Od bycia supermanem dzieli Cię tylko igła!</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-5 col-sm-6 col-xs-6 tc">
                                        <div className="Banner--Image img-responsive" width="100%">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;