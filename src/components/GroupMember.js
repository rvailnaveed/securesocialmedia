import React from "react";
import { Button } from "semantic-ui-react";

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
        return (
            <div style={{ display: "flex" }}>
                <h3>Name</h3>
                <Button style={{ marginLeft: "auto" }} color={this.state.colour} onClick={this.toggleMember}>Toggle</Button>
            </div>
        )
    }
}

export default GroupMember;