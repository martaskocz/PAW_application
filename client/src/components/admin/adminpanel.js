import React, {Component} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modalIsOpen: false,
            name: '',
            email: '',
            bloodGroup: '',
            msg: '',
            id: 0
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    }

    openModal(user) {
        this.setState({
            modalIsOpen: true,
            name: user.name,
            email: user.email,
            bloodGroup: user.bloodGroup,
            id: user.id
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
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

    componentDidMount() {
        let self = this;
        fetch("http://localhost:3001/users/adminpanel", {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({users: data});
        }).catch(err => {
            console.log('caught it!',err);
        })
    }

    handleEdit(event) {
        event.preventDefault();
        var data = {
            name: this.state.name,
            email: this.state.email,
            bloodGroup: this.state.bloodGroup,
            id: this.state.id
        };
        console.log(data);
        fetch("http://localhost:3001/users/edit", {
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
            if (data === "success") {
                this.setState({
                    msg: "User has been edited."
                });
            }
        }).catch(function(err) {
            console.log(err)
        });
        this.closeModal();
    }

    deleteMember(user){
        var data = {
            id: user.id
        };
        fetch("http://localhost:3001/users/delete", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data === "success"){
                this.setState({msg: "User has been deleted."});
            }
        }).catch(function(err) {
            console.log(err)
        });
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
        var searchable = false;

        return (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Nr</th>
                            <th>Imię</th>
                            <th>Email</th>
                            <th>Grupa krwi</th>
                            <th>Telefon</th>
                            <th>Data urodzenia</th>
                            <th>Miasto</th>
                            <th>MODYFIKUJ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {nthis.state.users.map((user, i) =>
                            <tr key={user.id}>
                                <td>{i}</td>
                                <td>{user.name} </td>
                                <td>{user.email}</td>
                                <td>{user.bloodGroup}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.dob}</td>
                                <td>{user.address}</td>
                                <td><a onClick={() => this.openModal(user)}>Edytuj</a> | <a onClick={() => this.deleteMember(user)}>Usuń</a></td>
                            </tr>
                        )}
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal" >
                            <form onSubmit={this.handleEdit} method="POST">
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Imię</label>
                                        <input onChange={this.logChange} className="form-control" value={this.state.name} name='name' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Email</label>
                                        <input onChange={this.logChange} className="form-control" value={this.state.email} placeholder='email@email.com' type="email" name='email' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Grupa krwi</label>
                                        <Select
                                            name='bloodGroup'
                                            options={options}
                                            value={this.state.bloodGroup}
                                            onChange={this.logChange}
                                            searchable={searchable}
                                            clearable={searchable}
                                            placeholder='Edytuj grupę krwi użytkownika'
                                        />
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-uth-submit">Submit</button>
                                </div>
                            </form>
                        </Modal>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}