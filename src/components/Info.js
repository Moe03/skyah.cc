import React, { Component } from 'react';
import { Container } from "semantic-ui-react";

class Info extends Component {

    render() {

        return (
            <Container className="landing disp-flex" style={{ flexDirection: "column", marginTop: "50px", width: "50%" }}>
                <h1>About:</h1>
                <p>Skyah is an independant website that fetches hypixel skyblock auctions from the <a className="custom-a" href="https://api.hypixel.net">Official Hypixel API</a> and displays it in a simple design.</p>

                <h1>The Hysky Project:</h1>
                <p>Skyah is powered by the <a className="custom-a" href="http://hyskyapi.cc">Hysky API</a> Project, It was created to help developers work with the huge amounts of auctions that are fetched through the Skyblock Auction House API, Make sure to check it out <a className="custom-a" target="_blank" href="https://certii.hyskyapi.cc/">here</a>.</p>

                <h1>Skyah is recruiting staff:</h1>
                <p>We also have a little discord server that needs some moderation, so if you would like to apply for a position in the staff team make sure you join the <a className="custom-a" href="https://discord.gg/eFmgTcr" target="_blank">discord</a>, then head to #apply-for-staff channel which will have the application link and details.</p>

                <div className="disp-flex jcc">
                    <iframe style={{ margin: "30px 0" }} src="https://discordapp.com/widget?id=646838200501010432&theme=dark" width="500" height="500" allowtransparency="true" frameborder="0"></iframe>
                </div>
            </Container>
        )
    }
    ;
}

export default Info;
