import React from "react";
import { Button } from "semantic-ui-react";
import { Image } from "react-bootstrap";

class GroupMember extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            included: false,
            colour: "red"
        }
        
        this.toggleMember = this.toggleMember.bind(this);
    }

    toggleMember(){
        if(this.state.included === false){
            this.setState({
                included: true,
                colour: "green"
            })
        }
        else {
            this.setState({
                included: false,
                colour: "red"
            })
        }
    }

    render(){
        let imageSrc = this.props.userInfo.avatar_url
        var divStyle = {
            display: "flex",
            padding: "10px",
            margin: "10px"
        }
        return (
            <div style={divStyle}>
                <div >
                    <Image src={imageSrc} roundedCircle />
                    <h3 className="font-weight-bold ml-2 mb-1 d-inline-block">{this.props.userInfo.name}</h3>
                </div>
                
                <Button style={{ marginLeft: "auto" }} color={this.state.colour} onClick={this.toggleMember}>Toggle</Button>
                <div className="divider" />
            </div>
        )
    }
}

export default GroupMember;