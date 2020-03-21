import React from "react";
import ReplyDisplay from "./ReplyDisplay";
import ReplyField from "./ReplyField";

class ReplyWindow extends React.Component {
    render() {

        return (
            <div style={this.props.inlineStyling} className="w-100">
                <ReplyDisplay className="col-12" replies={this.props.replies} />
                <ReplyField replyName={this.props.replyName} post={this.props.post} />
            </div>
        )
    }
}

export default ReplyWindow;