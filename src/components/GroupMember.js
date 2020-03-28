import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { Image } from "react-bootstrap";

class GroupMember extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            included: false,
            colour: "red",
            icon: "thumbs down outline icon"
        }
        this.toggleMember = this.toggleMember.bind(this);
    }

    toggleMember(){
        if(this.state.included === false){
            this.setState({
                included: true,
                colour: "green",
                icon: "thumbs up outline icon"
            })
        }
        else {
            this.setState({
                included: false,
                colour: "red",
                icon: "thumbs down outline icon"
            })
        }
    }

    render(){
        let imageSrc = this.props.userInfo.avatar_url
        var divStyle = {
            display: "flex",
            margin: "10px"
        }
        return (
            <div style={divStyle}>
                <div>
                    <Image src={imageSrc} roundedCircle />
                    <h3 className="font-weight-bold ml-2 mb-1 d-inline-block">{this.props.userInfo.name}</h3>
                </div>
                <Button icon color={this.state.colour} style={{ marginLeft: "auto" }} onClick={this.toggleMember} size="medium">
                    <Icon name={this.state.icon} size="large"/>
                </Button>
            </div>
        )
    }
}

export default GroupMember;