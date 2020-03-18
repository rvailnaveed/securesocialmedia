import React from 'react';
import Firestore from "./Firebase";

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            fullName: ""
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addUser = e => {
        e.preventDefault();
        const db = Firestore;
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("users").add({
            fullName: this.state.fullName,
            email: this.state.email
        });
        this.setState({
            fullName: "",
            email: ""
        });
    };

    render() {
        return (
            <form onSubmit={this.addUser}>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    onChange={this.updateInput}
                    value={this.state.fullName}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.updateInput}
                    value={this.state.email}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default User;