/* eslint-disable */
import React from "react";
import firestore from "./Firebase";

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.binf(this);
    }

    componentDidMount() {
       const db = firestore;
       
       // Reference to users colletion
       var usersRef = db.collection("users");
       var users = [];

       usersRef.get()
       .then(snapshot => {
           snapshot.docs.forEach((user) => {
               var userData = user.data();

               users.push({
                   id: user.id,
                   name: userData.fullName,
                   email: userData.email

               });
               return;
           })
       })
    
        this.setState({
            items: users
        });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.items.map((item) => {
                        <li key={item.id}>
                            <h3>{item.user}</h3>
                            <p>{item.email}</p>
                        </li>
                    })}
                </ul>
            </div>

        )
    }
}

export default Test;