import React from "react";

class Userbar extends React.Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-danger">
                <a className="navbar-brand" href="#"><i className="fas fa-user"></i></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#userLinks" aria-controls="userLinks" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="userLinks">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active"><a className="nav-link" href="#">Feed</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Messages</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Notifications</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Settings</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Userbar;