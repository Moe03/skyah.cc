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
        let newActive = event.target.attributes.value.value;
        this.setState({ active: newActive });
    }

    render() {

        let homeClass = "",
        infoClass = "",
        ahClass = "",
	bazaarClass = "";

        switch(this.state.active) {
	    default:
	    case "home":
		homeClass = "active-yes";
		break;
	    case "info":
		infoClass = "active-yes";
		break;
	    case "ah":
		ahClass = "active-yes";
		break;
	    case "bazaar":
		bazaarClass = "active-yes";
        }

        return (

            <nav className="navbar" style={{ marginTop: "25px", marginBottom: "45px" }}>
                <div className="disp-flex" style={{ justifyContent: "space-around" }}>
                    <div className="skyah">
                        <Link to="/">Skyah.cc</Link>
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
			<Link to="/bazaar">
                            <div className="nav-item">
                                <a className={bazaarClass} onClick={this.handleActive} value="bazaar" href="#bazaar">Bazaar</a>
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
