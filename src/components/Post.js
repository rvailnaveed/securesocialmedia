import React from "react";
import PostContent from "./PostContent"
import PostInput from "./PostInput";
import ReplyWindow from "./ReplyWindow";

class Post extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            replyWindowStyling: { display: 'none' },
            replies: []
        }

        this.replyWindowOpen = this.replyWindowOpen.bind(this)
        this.addReply = this.addReply.bind(this)

        this.postReplies = []
    }

    replyWindowOpen() {

        if (this.state.replyWindowStyling.display === 'none') {
            this.setState({
                replyWindowStyling: {
                    display: 'flex',
                    flexWrap: 'wrap'
                }
            })
        } else {
            this.setState({
                replyWindowStyling: { display: 'none' }
            })
        }
    }

    addReply(reply) {
        let replyData = {
            name: 'You',
            username: 'codepen_user',
            replyID: this.postReplies.length,
            text: reply,
            userID: 11
        }

        this.postReplies.push(replyData)
        this.setState({
            replies: this.postReplies
        })
    }
    render() {
        return (
            <div className="row mx-auto justify-content-start border mt-1 p-2 w-100 align-items-center">
                <PostContent postData={this.props.postData} />
                <PostInput replyWindowOpen={this.replyWindowOpen} />
                <ReplyWindow post={this.addReply} replies={this.state.replies} inlineStyling={this.state.replyWindowStyling} replyName={this.props.postData.username} />
            </div>
        )
    }
}

export default Post;