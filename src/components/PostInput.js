import React from "react";

class PostInput extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            liked: false,
            retweeted: false
        }

        this.toggleLike = this.toggleLike.bind(this)
        this.toggleRetweet = this.toggleRetweet.bind(this)
        let likeStyle = {}
        let rtStyle = {}
        this.likeClass = 'far fa-heart mr-4 iconStyling'
        this.rtClass = 'fas fa-retweet mr-4 iconStyling'
    }

    toggleLike() {

        if (this.state.liked) {
            this.likeClass = this.likeClass.replace('fas', 'far')
            this.likeStyle = {}
            this.setState({
                liked: false
            })
        } else {
            this.likeClass = this.likeClass.replace('far', 'fas')
            this.likeStyle = { color: 'red' }
            this.setState({
                liked: true
            })
        }
    }

    toggleRetweet() {
        if (this.state.retweeted) {
            this.rtStyle = {}
            this.setState({
                retweeted: false
            })
        } else {
            this.rtStyle = { color: 'green' }
            this.setState({
                retweeted: true
            })
        }
    }

    render() {
        return (
            <div className="col-sm-12 mt-1">
                <i style={this.likeStyle} onClick={this.toggleLike} className={this.likeClass}></i>
                <i style={this.rtStyle} onClick={this.toggleRetweet} className={this.rtClass}></i>
                <i onClick={this.props.replyWindowOpen} className="fas fa-reply iconStyling"></i>
            </div>
        )
    }
}

export default PostInput;