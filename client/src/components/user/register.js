import React, {Component} from 'react';
import { Redirect } from 'react-router'
import IntlTelInputApp from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/libphonenumber.js';
import 'react-intl-tel-input/dist/main.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Datetime from 'react-datetime';
import Autocomplete from 'react-google-autocomplete';
import Ionicon from 'react-ionicons';
import moment from 'moment';
import './style.css';
require('moment/locale/en-gb');

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone_number: '',
            address: '',
            dob: '',
            password: '',
            loading: false,
            error: false,
            bloodGroup: '',
            policy: 0,
            fireRedirect: false
        };
        this.logChange = this.logChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.phoneUpdate = this.phoneUpdate.bind(this);
        this.dateFormat = this.dateFormat.bind(this)
    }

    handleSubmit(event, policy) {
        event.preventDefault();
        this.setState({ fireRedirect: true });
        var data = {
            name: this.state.name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            address: this.state.address,
            dob: this.state.dob,
            password: this.state.password,
            bloodGroup: this.state.bloodGroup,
            policy: this.state.policy
        };
        console.log(data);
        fetch("http://localhost:3001/users/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            if (data == "success") {
                this.refs.msg.show('Some text or component', {
                    time: 2000,
                    type: 'success',
                })
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    phoneUpdate(status, value, countryData, number, id) {
        this.setState({'phone_number': number})
    }

    dateFormat(date){
        var theDate = new Date(date);
        var years = moment().diff(theDate, 'years');
        if(years < 18){
            var span = this.refs.dateError;
            span.style.display = "block";
            this.setState({'dob': moment(theDate).format("YYYY/MM/DD"), 'error': true})
        } else {
            this.setState({'dob': moment(theDate).format("YYYY/MM/DD"), 'error': false})
        }
    }

    logChange(e) {
        console.log(e);
        if(e.target){
            if(e.target.name){
                this.setState({[e.target.name]: e.target.value});

            }
            if(e.target.type == "tel"){
                this.setState({"phone_number": e.target.value});
            }
        } else {
            this.setState({'bloodGroup': e.value});
        }
    }

    render() {
        var options = [
            { value: 'A+', label: 'A+' },
            { value: 'B+', label: 'B+' },
            { value: 'O+', label: 'O+' },
            { value: 'AB+', label: 'AB+' },
            { value: 'A-', label: 'A-' },
            { value: 'B-', label: 'B-' },
            { value: 'O-', label: 'O-' },
            { value: 'AB-', label: 'AB-' }
        ];
        const { from } = this.props.location.state || '/';
        const { fireRedirect } = this.state;
        var searchable = false;
        var required = true;
        return (
            <div className="container register-form">
                <div className="heading-section">
                    <div className="main-heading">
                        Zostań jednym z najbardziej <span className="highlightme">szanowanych</span> i <span className="highlightme">docenianych</span> dawców krwi...
                    </div>
                    <div className="help-text">
                        ... ponieważ każda kropla krwi może uratować życie. Dołącz do<span className="highlightme"> nas</span> i ciesz się pomaganiem innym.
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit} method="POST" >
                            <div className="panel panel-default p50 uth-panel">
                                <div className="panel-body uth-panel-body">
                                    <div className="col-md-12">
                                        <div className="form-wrap">
                                            <label>Imię</label>
                                            <input onChange={this.logChange} className="form-control" placeholder='Wpisz imię...' name='name' required/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-wrap">
                                            <label>Email</label>
                                            <input onChange={this.logChange} className="form-control" placeholder='email@email.com' name='email' type="email" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-wrap">
                                            <label>Telefon</label>
                                            <IntlTelInputApp
                                                css={['intl-tel-input', 'form-control']}
                                                utilsScript={'libphonenumber.js'}
                                                preferredCountries={['pl']}
                                                onPhoneNumberChange={this.phoneUpdate}
                                                placeholder='500 123 456'
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-wrap">
                                            <label>Miasto</label>
                                            <Autocomplete
                                                className="form-control"
                                                onPlaceSelected={(place) => {
                                                    this.setState({'address': place.formatted_address});
                                                }}
                                                types={['(regions)']}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-wrap">
                                            <label>Grupa krwi</label>
                                            <Select
                                                name='bloodgroup'
                                                options={options}
                                                value={this.state.bloodGroup}
                                                onChange={this.logChange}
                                                searchable={searchable}
                                                clearable={searchable}
                                                placeholder='Wybierz swoją grupę krwi'
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-wrap">
                                            <label>Data urodzenia</label>
                                            <Datetime onChange={this.dateFormat} timeFormat={false} required="required"/>
                                            <span style={{"display": "none"}} ref="dateError" className='form-error is-visible'>Osoba oddająca krew musi być pełnoletnia.</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-wrap">
                                            <label>Hasło *</label>
                                            <input onChange={this.logChange} className="form-control" type='password' name='password'/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-wrap">
                                            <p>* umożliwi sprawdzić wiarygodność rejestracji użytkownika</p>
                                    </div>
                                </div>
                                    <div className="row col-md-12 tc">
                                        <div className="col-md-1">
                                        <input onChange={this.logChange} id='policy' type='checkbox' errorClassName='is-invalid-input' name='policy' value='1' required="required" />
                                        </div>
                                        <div className="col-md-11">
                                            <label htmlFor="policy">Wyrażam zgodę na użycie podanego numeru telefonu oraz adresu e-mail przez administratora Bazy Dawców Krwi w razie konieczności. Oświadczam, iż zapoznałem się z <a>warunkami rejestracji.</a>
                                        </label>
                                        </div>
                                    </div>
                                    <div className="submit-section">
                                        <button className="btn btn-uth-submit">Wyślij</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {fireRedirect && (
                            <Redirect to={from || '/thanks'}/>
                        )}
                    </div>
                    <div className="col-md-4">
                        <div className="panel panel-default p25 uth-panel">
                            <div className="uth-panel-head">Obecne zapotrzebowanie</div>
                            <div className="panel-body uth-panel-body">
                                <ul className="list-unstyled blood-requirements">
                                    <li className="requiree">
                                        <div><span style={{"fontWeight": "bold"}}>28%</span> w regionalnym banku krwi</div>
                                        <span className="highlightme meta-details"><Ionicon fontSize="18px" icon="ios-water" color="#ff8484" />A +</span>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-android-call" color="#4e585e" />ul. Saska 63/75</div>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-location" color="#4e585e" />RCKiK w Warszawie</div>
                                    </li>
                                    <li className="requiree">
                                        <div><span style={{"fontWeight": "bold"}}>42%</span> w regionalnym banku krwi</div>
                                        <span className="highlightme meta-details"><Ionicon fontSize="18px" icon="ios-water" color="#ff8484" /> O +</span>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-android-call" color="#4e585e" />ul. Wrocławska 1-3</div>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-location" color="#4e585e" />Wojskowe CKiK w Krakowie</div>
                                    </li>
                                    <li className="requiree">
                                        <div><span style={{"fontWeight": "bold"}}>46%</span> w regionalnym banku krwi</div>
                                        <span className="highlightme meta-details"><Ionicon fontSize="18px" icon="ios-water" color="#ff8484" /> B -</span>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-android-call" color="#4e585e" />ul. Czerwonego Krzyża 5/9</div>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-location" color="#4e585e" />RCKiK we Wrocławiu</div>
                                    </li>
                                    <li className="requiree">
                                        <div><span style={{"fontWeight": "bold"}}>57%</span> w regionalnym banku krwi</div>
                                        <span className="highlightme meta-details"><Ionicon fontSize="18px" icon="ios-water" color="#ff8484" /> AB + </span>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-android-call" color="#4e585e" />ul. Marcelińska 44</div>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-location" color="#4e585e" />RCKiK w Poznaniu</div>
                                    </li>
                                    <li className="requiree">
                                        <div><span style={{"fontWeight": "bold"}}>59%</span> w regionalnym banku krwi</div>
                                        <span className="highlightme meta-details"><Ionicon fontSize="18px" icon="ios-water" color="#ff8484" /> O + </span>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-android-call" color="#4e585e" />ul. I Armii Wojska Polskiego 8 </div>
                                        <div className="meta-details"><Ionicon fontSize="18px" icon="ion-location" color="#4e585e" />RCKiK w Lublinie</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
    }