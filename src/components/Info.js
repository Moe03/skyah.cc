import React, { Component } from 'react';
import { Container } from "semantic-ui-react";

class Info extends Component {

    render() {

        return (
            <Container className="landing disp-flex" style={{ flexDirection: "column", marginTop: "50px", width: "50%" }}>
                <h1>About:</h1>
                <p>Skyah is an independant little tool created by <a className="mlr" href="https://twitter.com/Mlotov_">Mlotov</a> that fetches hypixel skyblock auctions from the <a className="custom-a" href="https://api.hypixel.net">Official Hypixel API</a> and displays it in a simple design.</p>

                <h1>The Hysky Project:</h1>
                <p>Skyah is powered by the <a className="custom-a" href="https://hyskyapi.000webhostapp.com/">Hysky API</a>, It was mainly created to help developers work with the huge amounts of auctions that are fetched through the Skyblock Auction House API, This is an Open source project so if you are a PHP developer you could contribute <a className="custom-a" target="_blank" href="https://hyskyapi.000webhostapp.com/">here</a>.</p>



                <div className="disp-flex jcc">
                    <iframe style={{ margin: "30px 0" }} src="https://discordapp.com/widget?id=646838200501010432&theme=dark" width="500" height="500" allowtransparency="true" frameborder="0"></iframe>
                </div>
            </Container>
        )
    }
    ;
}

export default Info;
