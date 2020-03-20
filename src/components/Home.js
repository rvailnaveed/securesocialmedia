import React from 'react';
import firestore from "./Firebase";
import Userbar from "./Userbar";
import CreatePost from "./CreatePost";
import Feed from "./Feed";
import UserFeed from "./UserFeed";

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
            userPosts: []
        }
       
     //   this.sortPosts = this.sortPosts.bind(this)
        this.matchAccounts = this.matchAccounts.bind(this)
        this.userPost = this.userPost.bind(this)

        this.loaded = false
        this.postDataWithoutUserInfo = []
        this.newUserPosts = []
    }


    componentDidMount() {

        if (this.loaded === false) {
            const db = firestore;

            var postsRef = db.collection("posts");
            var posts = [];

            postsRef.get()
            .then(snapshot => {
                snapshot.docs.forEach((post) => {
                    var postData = post.data();

                    posts.push({
                        userId: postData.posted_by,
                        id: post.id,
                        name: postData.posted_by,
                        username: "other_user" + post.id,
                        body: postData.text
                    })
                    return;
                })
            })

            this.setState({allPosts: posts})

            //this.sortPosts(posts)
            this.postDataWithoutUserInfo = posts;

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

            // var feedData = this.matchAccounts(users);

            // this.setState({allPosts: feedData});
            // fetch('https://jsonplaceholder.typicode.com/posts')
            //     .then(response => response.json())
            //     .then(json => this.sortPosts(json))
            //     .then(() => {
            //         return fetch('https://jsonplaceholder.typicode.com/users')
            //     })
            //     .then(response => response.json())
            //     .then(json => this.matchAccounts(json))
            //     .then(json => this.setState({ allPosts: json }))
            //     .catch(error => console.log(error))
        }

        this.loaded = true
    }


    userPost(post) {
        let totalLength = this.state.allPosts.length + this.state.userPosts.length
        let newPostData = {
            userId: 7,
            id: totalLength + 2,
            name: 'You',
            username: 'current_user',
            body: post,
            userPost: true
        }

        this.newUserPosts.unshift(newPostData)

        this.setState({
            userPosts: this.newUserPosts
        })
    }


    // sortPosts(array) {
    //     var currentIndex = array.length, temporaryValue, randomIndex;

    //     // While there remain elements to shuffle...
    //     while (0 !== currentIndex) {

    //         // Pick a remaining element...
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex -= 1;

    //         // And swap it with the current element.
    //         temporaryValue = array[currentIndex];
    //         array[currentIndex] = array[randomIndex];
    //         array[randomIndex] = temporaryValue;
    //     }

    //     this.postDataWithoutUserInfo = array;
    //     return array;
    // }

    matchAccounts(userData) {
        let completeFeedData = []
        for (let i = 0; i < this.postDataWithoutUserInfo.length; i++) {
            for (let j = 0; j < userData.length; j++) {
                if (this.postDataWithoutUserInfo[i].posted_by === userData[j].id) {

                    completeFeedData.push({ ...this.postDataWithoutUserInfo[i], ...userData[j] })
                }
            }
        }

        return completeFeedData
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


