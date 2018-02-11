import React, {Component} from 'react';
import Ionicon from 'react-ionicons';
import './style.css';
import blood from './thanks.png';

export default class thanks extends Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="Banner--Blood">
                            <div className="row">
                                <div className="col-lg-7 col-md-7 col-sm-6 col-xs-6">
                                    <div className="col-md-12 Banner--Thanks">
                                        <Ionicon icon="md-heart" fontSize="60px" color="#E52C34" beat={true} />
                                        <h3>Dziękujemy za rejestrację!</h3>
                                    </div>
                                    <div className="Banner--Text">
                                        <p>Większą ma radość człowiek z dzielenia.</p>
                                        <p>Oddając krew możesz pomóc osobom walczącym o życie.</p>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-6 col-xs-6 tc">
                                    <div className="Banner--Image img-responsive" width="100%">
                                        <span className="helper"><img src={blood}/></span>
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