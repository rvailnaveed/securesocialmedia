import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { Image } from "react-bootstrap";
import firestore from "./Firebase";
import Firebase from "firebase";
require("firebase/firestore");

class GroupMember extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            included: false,
            colour: "red",
            icon: "toggle off"
        }
        this.toggleMember = this.toggleMember.bind(this);
    }

    componentDidMount(){
        var db = firestore;
        var groupRef = db.collection("groups").doc("rw9BI2AbLfz0rzEoxGW7");
        groupRef.get()
        .then(snapshot => {
            var currMembers = snapshot.data().members;
            for(var i = 0; i < currMembers.length; i++){
                console.log(currMembers[i]);
                if(this.props.userInfo.id === currMembers[i]["uid"]){
                    this.toggleMember();
                }
            }
        })
    }

    toggleMember(){
        var db = firestore;
        var groupRef = db.collection("groups").doc("rw9BI2AbLfz0rzEoxGW7");
        if(this.state.included === false){
            this.setState({
                included: true,
                colour: "green",
                icon: "toggle on"
            })
            groupRef.update({
                "members": Firebase.firestore.FieldValue.arrayUnion({"name": this.props.userInfo.name, "uid": this.props.userInfo.id})
            })
        }
        else {
            this.setState({
                included: false,
                colour: "red",
                icon: "toggle off"
            })
            groupRef.update({
                "members": Firebase.firestore.FieldValue.arrayRemove({"name": this.props.userInfo.name, "uid": this.props.userInfo.id})
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