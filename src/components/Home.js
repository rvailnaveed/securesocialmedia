import React from 'react';
import firestore from "./Firebase";
import Userbar from "./Userbar";
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
            var groupsRef = db.collection("groups");
            var groupMembers = [];

            // get all members of the group
            groupsRef.get()
            .then(snapshot => {
                snapshot.docs.forEach((group) => {
                    var groupData = group.data();
                    
                    groupMembers.push(groupData.members);
                    return;
                })
            })
            this.setState({groupMembers: groupMembers});

            
            var posts = [];

            postsRef.get()
            .then(snapshot => {
                snapshot.docs.forEach((post) => {
                    var postData = post.data();
                    var uid = postData.uid;
                    var posted_by = postData.posted_by;
                    var body = postData.body;
                    
                    // decrypt if part of group
                    for(var i = 0; i <= groupMembers.length; i++){
                        if(posted_by === groupMembers[0][i]["name"]){
                            var key = postData.key
                            body = CryptoJS.AES.decrypt(postData.body, key).toString(CryptoJS.enc.Latin1);
                        }
                    }

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
            })

            this.setState({allPosts: posts})

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
        }

        this.loaded = true
    }


    userPost(post) {
        let newPostData = {
            name: 'You',
            uid: 'current_user',
            body: post,
            userPost: true
        }

        // Generate key for new post
        var current_date = (new Date()).valueOf().toString();
        var random_string = Math.random().toString();
        var key = Crypto.createHash('sha1').update(current_date + random_string).digest('hex');

        var encrypted = CryptoJS.AES.encrypt(post, key).toString();
        //console.log(encrypted.);

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
                <Userbar />
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


