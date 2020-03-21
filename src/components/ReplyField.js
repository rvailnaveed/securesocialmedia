import React from "react";

class ReplyField extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            replyText: ''
        }

        this.updateReplyText = this.updateReplyText.bind(this)
        this.submitReply = this.submitReply.bind(this)
        this.id = 'replyField' + String(Math.floor(Math.random() * 100000))
    }

    updateReplyText(e) {
        this.setState({
            replyText: e.target.value
        })
    }

    submitReply() {
        if (this.state.replyText.length > 0) {
            this.props.post(this.state.replyText)
            document.getElementById(this.id).value = ''
            this.setState({
                replyText: ''
            })
        }
    }

    render() {

        return (
            <div className="col-sm-12 form-inline mt-1">
                <div className="input-group flex-grow-1">
                    <div class="input-group-prepend">
                        <div class="input-group-text">@{this.props.replyName}</div>
                    </div>
                    <input type="text" onChange={this.updateReplyText} id={this.id} className="form-control" placeholder="Say something nice!" />
                </div>
                <button className="btn btn-warning" onClick={this.submitReply}><span>Reply</span></button>
            </div>
        )
    }
}

export default ReplyField;