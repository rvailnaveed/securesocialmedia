import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import GroupMember from "./GroupMember";
import firestore from "./Firebase";

class Group extends React.Component {
    constructor() {
        super();

        this.state = {
            isOpen: true,
            setIsOpen: false,
            allUsers: [],
            groupMembers: []
        };

        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
        const db = firestore;
        var usersRef = db.collection("users");
        var users = [];
        usersRef.get().then(snapshot => {
            snapshot.docs.forEach(user => {
                var userData = user.data();
                if (userData.id !== 7) {
                    users.push({
                        name: userData.name,
                        id: userData.id,
                        avatar_url: "https://picsum.photos/60?image" + String(userData.id),
                        membership: true
                    });
                    return;
                }
            });
            this.setState({ allUsers: users });
        });
    }

    hideModal() {
        this.setState({ isOpen: false });
        window.location.href = "/";
    }

    render() {
        var divStyle = {
            "text-align": "center"
        };
        return (
            <Modal
                show={this.state.isOpen}
                onHide={this.hideModal}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Group Members</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.allUsers.map(user => (
                        <GroupMember userInfo={user} key={user.id} />
                    ))}
                </Modal.Body>

                <Modal.Footer>
                    <Button color="blue" onClick={this.hideModal}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Group;
