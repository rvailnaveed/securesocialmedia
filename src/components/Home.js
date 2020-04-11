import React from 'react';
import firestore from "./Firebase";
import CreatePost from "./CreatePost";
import Feed from "./Feed";
import UserFeed from "./UserFeed";

var CryptoJS = require("crypto-js");
var Crypto = require("crypto");

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            allPosts: [{
                title: 'LOADING',
                body: 'LOADING',
                name: 'LOADING',
                username: '@LOADING'
            }],
            userPosts: [],
            groupMembers: []
        }
       
        this.userPost = this.userPost.bind(this)
        this.loaded = false
        this.newUserPosts = []
    }

    componentDidMount() {

        if (this.loaded === false) {
            const db = firestore;

            var postsRef = db.collection("posts");
            var groupRef = db.collection("groups").doc("rw9BI2AbLfz0rzEoxGW7");
            var groupMembers = [];

            // get all members of the group
            groupRef.get()
            .then(snapshot => {
                var currMembers = snapshot.data().members;
                for(var i = 0; i < currMembers.length; i++){
                    groupMembers.push(currMembers[i])
                }
                this.setState({groupMembers: groupMembers})
            })

            var posts = [];

            // retrieve all posts from firestore backend
            postsRef.get()
            .then(snapshot => {
                snapshot.docs.forEach((post) => {
                    var postData = post.data();
                    var uid = postData.uid;
                    var posted_by = postData.posted_by;
                    var body = postData.body;
                    // decrypt using post key only if part of group
                    for(var i = 0; i < this.state.groupMembers.length; i++){
                        console.log(typeof uid, typeof groupMembers[i].uid)
                        if(uid == this.state.groupMembers[i].uid || posted_by === "current_user"){
                            var key = postData.key
                            body = CryptoJS.AES.decrypt(postData.body, key).toString(CryptoJS.enc.Latin1);
                        }
                    }

                    // change post formatting for current user (purely display purposes)
                    if (uid === 7 && posted_by === "current_user"){
                        uid = 'current_user';
                        posted_by = 'You';
                    }

                    // post will contain decrypted or encrypted body depending on group inclusion
                    posts.push({
                        uid: uid,
                        id: post.id,
                        name: posted_by,
                        body: body
                    })
                    return;
                })
                this.setState({allPosts: posts})
                this.loaded = true;
            })
        }
    }

    // Handles a new post created by the current user
    userPost(post) {
        let totalLength = this.state.allPosts.length + this.state.userPosts.length
        let newPostData = {
            name: 'You',
            uid: 'current_user',
            id: totalLength + 2,
            body: post,
            userPost: true
        }

        // Generate a new key for the post
        var current_date = (new Date()).valueOf().toString();
        var random_string = Math.random().toString();
        var key = Crypto.createHash('sha1').update(current_date + random_string).digest('hex');

        var encrypted = CryptoJS.AES.encrypt(post, key).toString();

        // push new encrypted post object to firestore backend
        const db = firestore;
        var postsRef = db.collection("posts");
        postsRef.add({
            uid: 7,
            posted_by: "current_user",
            body: encrypted,
            key: key
        });

        this.newUserPosts.unshift(newPostData)

        this.setState({
            userPosts: this.newUserPosts
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <CreatePost post={this.userPost} />
                        </div>
                    </div>
                </div>

                <div className="container">
                    <UserFeed postData={this.state.userPosts} />
                    <Feed postData={this.state.allPosts} />
                </div>
            </div>
        )
    }
}

export default Home;
