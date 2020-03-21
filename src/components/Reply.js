import React from "react";

class Reply extends React.Component {
    render() {
        return (
            <div className='border-top p-2 replyDisplay'>
                <div className="d-flex align-items-center">
                    <img src={"https://picsum.photos/50?image" + String(this.props.reply.userID)} />
                    <h5 className="ml-2 font-weight-bold d-inline-block">{this.props.reply.name}</h5>
                    <a href="#" className="ml-2 text-muted">@{this.props.reply.username}</a>
                </div>
                <p>{this.props.reply.text}</p>
            </div>
        )
    }
}

export default Reply;