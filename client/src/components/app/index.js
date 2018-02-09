import React, { Component } from 'react';
import blood_1 from './blood_1.png';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <ul className="list-links">
                                        <li><a href="">Search Donors</a></li>
                                        <li><a href="">About Us</a></li>
                                        <li><a href="">Donor Registration</a></li>
                                        <li><a href="">Search Donors</a></li>
                                    </ul>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="Banner--Blood">
                                <div className="row">
                                    <div className="col-lg-7 col-md-7 col-sm-6 col-xs-6">
                                        <div className="Banner--Text">
                                            <p>Większą ma radość człowiek z dzielenia.</p>
                                            <p>Oddając krew możesz pomóc osobom walczącym o życie.</p>
                                            <p>Od bycia supermanem dzieli Cię tylko decyzja!</p>
                                        </div>
                                        <div>
                                            <p>Misja Krwiodawstwa</p>
                                            <p>Zadaniem priorytetowym RCKiK w Krakowie jest pobieranie krwi i jej składników od krwiodawców oraz przetwarzanie jej w celu wytworzenia preparatów niezbędnych dla ratowania życia i zdrowia pacjentów wymagających transfuzji. Procedury stosowane do wytworzenia składników krwi na które składa się: kwalifikacja krwiodawcy, pobranie krwi, jej przetworzenie, zbadanie, przechowanie i transportowanie gwarantują najwyższą jakość i bezpieczeństwo dla biorców.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-sm-6 col-xs-6 tc">
                                        <div className="Banner--Image img-responsive" width="100%">
                                            <span className="helper"><img src={blood_1}/></span>
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