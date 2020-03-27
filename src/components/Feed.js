import React from "react";
import Post from "./Post";

class Feed extends React.Component {
    render() {
        if (this.props.postData.length > 0) {
            return (
                <div>
                    {this.props.postData.map((post, i) => 
                        <Post postData={post} key={post.id} />
                    )}
                </div>
            )
        } 
        else {
            return (
                <div></div>
            )
        }
    }
}

export default Feed;