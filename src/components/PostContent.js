import React from "react";
import { Image } from "react-bootstrap";

class PostContent extends React.Component {
    render() {
        let imageSrc = "https://picsum.photos/60?image" + String(this.props.postData.uid)
        return (
            <div>
                <div className="col-12 d-flex align-items-center">
                    <Image src={imageSrc} roundedCircle />
                    <h3 className="font-weight-bold ml-2 mb-1 d-inline-block">{this.props.postData.name}</h3>
                    <span className="ml-2 text-muted">@{this.props.postData.uid}</span>
                </div>
                
                <div className="col-12">
                    <h5 className="mb-0">{this.props.postData.body}</h5>
                </div>
            </div>
        )
    }
}

export default PostContent;