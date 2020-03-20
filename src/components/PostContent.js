import React from "react";

class PostContent extends React.Component {
    render() {
        return (
            <div>
                <div className="col-12 d-flex align-items-center">
                    <h3 className="font-weight-bold ml-2 mb-1 d-inline-block">{this.props.postData.name}</h3>
                    <a href="#" className="ml-2 text-muted">@{this.props.postData.username}</a>
                </div>
                <div className="col-12">
                    <p className="mb-0">{this.props.postData.body}</p>
                </div>
            </div>
        )
    }
}

export default PostContent;