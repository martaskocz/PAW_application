import React, {Component} from 'react';
//import Validation from 'react-validation';
//import "../validation.js";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            msg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {
            name: this.state.name,
            email: this.state.email
        };
        console.log(data);
        fetch("/users/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data);
            if(data == "success"){
                this.setState({msg: "Thanks for registering"});
            }
        }).catch(function(err) {
            console.log(err)
        });
    };

    /*logChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }*/

    render() {
        return (
            <div className="container register-form">
                <form onSubmit={this.handleSubmit} method="POST">
                    <label>Name</label>
                    <input onChange={this.logChange} className="form-control" placeholder='John' name='name' validations={['required']}/>
                    <label>Email</label>
                    <input onChange={this.logChange} className="form-control" placeholder='email@email.com' name='email' validations={['required', 'email']}/>
                    <div className="submit-section">
                        <button className="btn btn-uth-submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}