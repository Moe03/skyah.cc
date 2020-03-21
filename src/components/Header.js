import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {

    constructor() {
        super();
        this.state = {
            active: "home"
        }
    }

    handleActive = (event) => {
        var newActive = event.target.attributes.value.value;
        this.setState({ active: newActive });
    }

    render() {

        var homeClass = "";
        var infoClass = "";
        var ahClass = "";

        if (this.state.active == "home") {
            homeClass = "active-yes";
        }
        if (this.state.active == "info") {
            infoClass = "active-yes";
        }
        if (this.state.active == "ah") {
            ahClass = "active-yes";
        }

        return (

            <nav className="navbar" style={{ marginTop: "25px", marginBottom: "45px" }}>
                <div className="disp-flex" style={{ justifyContent: "space-around" }}>
                    <div className="skyah">
                        <Link to="/">
                            <a className="navbar-brand" href="#">Skyah.cc</a>
                        </Link>
                    </div>
                    <div className="disp-flex">
                        <Link to="/">
                            <div className="nav-item active">
                                <a className={homeClass} onClick={this.handleActive} value="home" href="#home">Home</a>
                            </div>
                        </Link>
                        <Link to="/ah">
                            <div className="nav-item">
                                <a className={ahClass} onClick={this.handleActive} value="ah" href="#ah">Ah</a>
                            </div>
                        </Link>
                        <Link to="/info">
                            <div className="nav-item float-right">
                                <a className={infoClass} onClick={this.handleActive} value="info" href="#info">info</a>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
    ;
}

export default Header;
