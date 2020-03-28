import React from "react";

class CreatePost extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            postText: ''
        }

        this.updatePostText = this.updatePostText.bind(this)
        this.submitPostText = this.submitPostText.bind(this)
    }

    updatePostText(e) {
        this.setState({
            postText: e.target.value
        })
    }

    submitPostText(e) {
        if (this.state.postText.length > 0) {
            this.props.post(this.state.postText)
            document.getElementById('postField').value = ''

            this.setState({
                postText: ''
            })
        }
    }

    render() {
        var style = {
            margin: "50px"
        }
        return (
            <div className="mb-2 fixedMenuFix" style={style}>
                <input id="postField" onChange={this.updatePostText} type="text" className="form-control" placeholder="What's up?" />
                <button onClick={this.submitPostText} className="btn btn-large btn-warning btn-block"><span>Post</span></button>
            </div>
        )
    }
}

export default CreatePost;