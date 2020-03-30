/* eslint-disable */
import React from "react";
import firestore from "./Firebase";
import { Button } from "react-bootstrap";
var CryptoJS = require("crypto-js");
var Crypto = require("crypto");

class Test extends React.Component {
    constructor() {
        super();
        
        this.state = {
            deleted: false,
            uid: 0,
            posted_by: "",
            body: "",
            key: ""

        }

        this.updateInput = this.updateInput.bind(this);
        this.addPost = this.addPost.bind(this);
        this.deleteAllPosts = this.deleteAllPosts.bind(this);
        this.deleteUserPosts = this.deleteUserPosts.bind(this);
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    deleteAllPosts(){
        const db = firestore;
        var postsRef = db.collection("posts");
        postsRef.get()
        .then(snapshot => {
            snapshot.docs.forEach((post) => {
                post.ref.delete();
            })
        })
        this.state.deleted = true;
    }

    deleteUserPosts(){
        const db = firestore;
        db.collection('posts').where('uid','==',7).get()
            .then(function(querySnapshot) {
            // Once we get the results, begin a batch
            var batch = db.batch();

            querySnapshot.forEach(function(doc) {
                batch.delete(doc.ref);
            });
            // Commit the batch
            return batch.commit();
        })
    }

    addPost = e => {
        e.preventDefault();
        // Generate key for new post
        var current_date = (new Date()).valueOf().toString();
        var random_string = Math.random().toString();
        this.state.key = Crypto.createHash('sha1').update(current_date + random_string).digest('hex');

        var encrypted = CryptoJS.AES.encrypt(this.state.body, this.state.key).toString();
        //console.log(encrypted.);

        const db = firestore;
        var postsRef = db.collection("posts");
        postsRef.add({
            uid: this.state.uid,
            posted_by: this.state.posted_by,
            body: encrypted,
            key: this.state.key
        });

        this.setState({
            uid: 0,
            posted_by: "",
            body: "",
            key: ""
        })
    }

    render() {
        return (
            <div style={{margin: "100px"}}>
                <Button onClick={this.deleteAllPosts}>Purge Firestore Posts</Button>
                <Button onClick={this.deleteUserPosts}>Delete User Posts</Button>

                <form onSubmit={this.addPost}>
                    <input
                        type="text"
                        name="posted_by"
                        placeholder="Full name"
                        onChange={this.updateInput}
                        value={this.state.posted_by}
                    />
                    <input
                        type="number"
                        name="uid"
                        placeholder="uid"
                        onChange={this.updateInput}
                        value={this.state.uid}
                    />
                    <input
                        type="text"
                        name="body"
                        placeholder="Body"
                        onChange={this.updateInput}
                        value={this.state.body}
                    />                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Test;