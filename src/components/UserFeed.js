import React from "react";
import Post from "./Post";

class UserFeed extends React.Component {
    render() {
        if (this.props.postData.length > 0) {
            return (
                <div>
                    {this.props.postData.map((post, key) =>
                        <Post postData={post} key={post.id} />
                    )}
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default UserFeed;