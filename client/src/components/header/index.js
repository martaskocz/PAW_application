import React, { Component } from 'react';
import logo from '../../blood_bank.png';
import Modal from 'react-modal';


class HeaderComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: [],
            modalIsOpen: false,
            name: '',
            password: ''
        };
        this.loadLoggedInUser = this.loadLoggedInUser.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal(){
        this.setState({modalIsOpen: false});
    }

    loadLoggedInUser(){
        fetch('/login',{
            method: 'GET'
        }).then(function (response) {
            if (response.statys >=400){
                throw new Error("bad response from server");
            }
            return response.json();
        }).then(function (data) {
            if (data === "no user"){
                console.log("HERE");
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

    handleSubmit(event) {
        event.preventDefault();
        /*var data = {
            name: this.state.name,
            password: this.state.password,
        };
        console.log(data);*/
        fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            //body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data);
            if(data == "success"){
                this.refs.msg.show('Some text or component', {
                    time: 2000,
                    type: 'success',
                })
            }
        }).catch(function(err) {
            console.log(err)
        });
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
        const modalStyle = {
            content : {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        return (
            <div className="header">
                <a href="/" className="logo-a"><span style={style}></span></a>
                <div className="header-links">
                    <a href="/register">Register</a>
                    <a onClick={this.openModal}>Login</a>
                    <a href="/users">Admin Panel</a>
                </div>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Modal" style={modalStyle}>
                    <form onSubmit={this.handleSubmit} method="POST">
                        <div className="col-md-12">
                            <div className="form-wrap">
                                <label>Login</label>
                                <input className="form-control" type='text' name='login' />
                            </div>
                            <div className="form-wrap">
                                <label>Password</label>
                                <input className="form-control" type='password' name='passwordLogin'/>
                            </div>
                            <div className="submit-section">
                                <button className="btn btn-uth-submit">Zaloguj</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default HeaderComponent;