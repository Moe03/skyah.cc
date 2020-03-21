import React, { Component } from 'react';
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import $ from "jquery";

class Landing extends Component {

  render() {
    let iframe = <iframe title="discord" style={{ margin: "30px 0" }} src="https://discordapp.com/widget?id=646838200501010432&theme=dark" width="300" height="500" allowtransparency="true" frameborder="0"></iframe>;
    if ($(document).width() > 550) {
      iframe = <iframe title="discord" style={{ margin: "30px 0" }} src="https://discordapp.com/widget?id=646838200501010432&theme=dark" width="500" height="500" allowtransparency="true" frameborder="0"></iframe>
    }
    return (
      <Container className="landing disp-flex jcc" style={{ alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
        <h1>Welcome To Skyah!</h1>
        <p>Here you can find some sweet deals off our cool little <Link to="/ah"> <a className="custom-a" href="#ah">AH</a> </Link></p>
        <p>Have a suggestion or want to report a bug?</p>
        <p>Feel free to do it in our discord!</p>
        {iframe}
      </Container>
    )
  };
}

export default Landing;
