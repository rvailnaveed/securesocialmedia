import React from "react";
import { Button, Icon } from 'semantic-ui-react'

class PostInput extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            heartColor: "grey"
        }

        this.toggleLike = this.toggleLike.bind(this)
    }

    toggleLike() {
        if(this.state.heartColor === "grey"){
            this.setState({heartColor: "red"})
        }
        else {
            this.setState({heartColor: "grey"})
        }
        
    }

    render() {
        return (
            <div className="col-sm-12 mt-1">
                <Button icon onClick={this.toggleLike} size="medium">
                    <Icon name='heart' color={this.state.heartColor}  size="large"/>
                </Button>
            </div>
        )
    }
}

export default PostInput;