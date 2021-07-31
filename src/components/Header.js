import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container } from 'semantic-ui-react';

class Header extends Component {

    constructor(props) {
        super(props);
        let startURL;
        if(this.props.active == "/"){
            startURL = 'home';
        }
        else if(this.props.active == "/ah"){
            startURL = 'ah';
        }
        else if(this.props.active == "/info"){
            startURL = 'info';
        }
        else{
            startURL = '';
        }
        this.state = {
            active: startURL

        }
    }

    handleActive = (event) => {
        var newActive = event.target.attributes.value.value;
        this.setState({ active: newActive });
    }

    render() {

        console.log(this.props.active);
       
        var homeClass = "nav-item";
        var infoClass = "nav-item";
        var ahClass = "nav-item";

        let mainClass = ' active-yes';

        if (this.state.active == "home") {
            homeClass += mainClass;
        }
        if (this.state.active == "info") {
            infoClass += mainClass;
        }
        if (this.state.active == "ah") {
            ahClass += mainClass;
        }

     

        return (
            
            <nav className="skyah container" style={{ marginTop: "25px", marginBottom: "15px" }}>
                <h3 className="site" style={{ textAlign: "center", letterSpacing: "27px" }}>SKYA<span style={{letterSpacing: "0" }}>H</span></h3>
                <div className="disp-flex" style={{ justifyContent: "center" }}>
                    <Container>
                    <div className="d-flex row justify-content-center">
                        <Link className="col-12 col-md-4 text-center" value="home" onClick={this.handleActive} to="/">
                            <div value="home" className={homeClass}>
                                <a style={{ letterSpacing: '3px' }} value="home" href="#home">HOME</a>
                            </div>
                        </Link>
                        <Link className="col-12 col-md-4 text-center" value="ah" onClick={this.handleActive} to="/ah">
                            <div value="ah" className={ahClass}>
                                <a style={{ letterSpacing: '3px' }} value="ah" href="#ah">AH</a>
                            </div>
                        </Link>
                        <Link className="col-12 col-md-4 text-center" value="info" onClick={this.handleActive} to="/info">
                            <div value="info" className={infoClass}>
                                <a style={{ letterSpacing: '3px' }} value="info" href="#info">INFO</a>
                            </div>
                        </Link>
                    </div>
                    </Container>
                </div>
            </nav>
        )
    }
    ;
}

export default Header;
