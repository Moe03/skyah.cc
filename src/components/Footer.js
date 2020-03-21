import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component {

    render() {

        return (
            <div className="footer">
                <div id="foot">
                    Created by <a className="mlr" href="https://twitter.com/Mlotov_">   Mlotov.   </a> Powered by <a className="mlr" target="_blank" rel="noopener noreferrer" href="https://reactjs.org"> React.</a> Not Affiliated with Hypixel or Mojang.
                </div>
                <div className="t-c">
                    <Link to="/info">About</Link> | <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/eFmgTcr"> Discord</a>.
                </div>
            </div>
        )
    }
    ;
}

export default Footer;
