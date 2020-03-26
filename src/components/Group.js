import React from "react";
import {Button, Modal} from 'react-bootstrap';
import GroupMember from "./GroupMember";

class Group extends React.Component{
    constructor() {
        super()

        this.state = {
            isOpen: true,
            setIsOpen: false
        }
       
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal(){
        this.setState({isOpen: true});
    };
    
    hideModal(){
        this.setState({isOpen: false})
    };

    render(){
        return(
          <Modal show={this.state.isOpen} onHide={this.hideModal} size="lg"
          aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                  <Modal.Title>Group Members</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <GroupMember/>
              </Modal.Body>
          </Modal> 
        );
    }
}

export default Group;