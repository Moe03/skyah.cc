import React, { Component } from 'react';
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import $ from "jquery";

class Landing extends Component {

  render() {

    if ($(document).width() > 550) {
      var iframe = <iframe style={{ margin: "30px 0" }} src="https://discordapp.com/widget?id=646838200501010432&theme=dark" width="500" height="500" allowtransparency="true" frameborder="0"></iframe>
    }
    else {
      var iframe = <iframe style={{ margin: "30px 0" }} src="https://discordapp.com/widget?id=646838200501010432&theme=dark" width="300" height="500" allowtransparency="true" frameborder="0"></iframe>
    }

    return (
      
      <Container className="d-flex" style={{ alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
        <ul style={{ maxWidth:"75%" }}>
          <h3 style={{ fontWeight: '900', letterSpacing: "7px", textAlign: 'center' }}>SEARCH FEATURES</h3>
          <li>
            <h4 className="list-headers">/ah (username)</h4>
            <p>Search for player's auctions.</p>
          </li>
          <hr></hr>
          <li>
            <h4 className="list-headers">/spy (username)</h4>
            <p>Search for auctions somebody has bid on.</p>
          </li>
          <hr></hr>
          <li>
            <h4 className="list-headers">/ebs (enchants)</h4>
            <p>Search for enchants (searches item lore)</p>
          </li>
          <hr></hr>
          <li>
            <h4 className="list-headers">Search Abbreviations</h4>
            <ul style={{ maxWidth: "100%" }}>
              <li>
                AOTE: Aspect of the end
              </li>
              <li>
                AOTD: Aspect of the dragons
              </li>
              <li>
                SDA: Superior Dragon Armor (helmet, chestplate, etc)
              </li>
              <li>
                UDA: Unstable Dragon Armor
              </li>
              <li>
                YDA: Young Dragon Armor
              </li>
              <li>
                WDA: Wise Dragon Armor
              </li>
              <li>
                ODA: Old Dragon Armor
              </li>
              <li>
                PDA: Protector Dragon Armor
              </li>
              <li>
                UDA: Unstable Dragon Armor
              </li>
            
            </ul>
          </li>
        </ul>
   
        <p style={{ letterSpacing: "5px" }}>JOIN TO SUGGEST MORE TO THE LIST!</p>
        {iframe}
      </Container>
    )
  }
  ;
}

export default Landing;
