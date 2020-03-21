/* eslint-disable */
import React from "react";
import firestore from "./Firebase";
import { Button } from "react-bootstrap";

class Test extends React.Component {
    constructor() {
        super();
        
        this.state = {
            deleted: false
        }

        this.deleteAllPosts = this.deleteAllPosts.bind(this);
    }

    

    deleteAllPosts(){
        const db = firestore;
        var postsRef = db.collection("posts");
        postsRef.get()
        .then(snapshot => {
            snapshot.docs.forEach((post) => {
                post.ref.delete();
                return;
            })
        })
        this.state.deleted = true;

        
        
    }

    render() {
        return (
            <div>
                <Button onClick={this.deleteAllPosts}>Delete Posts from Firestore</Button>
                { this.state.deleted ? <h3>Firestore posts successfully purged</h3> : null }
            </div>
        )
    }
}

export default Test;