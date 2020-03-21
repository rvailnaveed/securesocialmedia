import React from "react";
import Reply from "./Reply";
class ReplyDisplay extends React.Component {
    render() {
        if (this.props.replies.length > 0) {
            return (
                <div className="col-sm-12 mt-2">
                    {this.props.replies.map((reply, key) =>
                        <Reply reply={reply} key={key} />
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

export default ReplyDisplay;