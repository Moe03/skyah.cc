import React, { Component } from 'react';
import $ from "jquery";

class Timer extends Component {

    constructor(props) {

        super(props);
        this.state = {
            aucTime: "Loading Time Left",
            virtualNow: 0,
            nowUNIX: 0,
            aucStatus: "notloaded"
        }
    }

    componentDidMount() {

        window.setInterval(() => {
            let end = this.props.end;
	    let now = this.state.virtualNow;
	    let aucValue = false;
            if (this.state.virtualNow === 0) {
                now = this.props.unix;
            }
            if (end > now) {
                aucValue = true;
            }

            let dispTime = this.sformat((end - now) / 1000);

            this.setState({ aucTime: dispTime, nowUNIX: now + 1000, virtualNow: now + 1000, aucStatus: aucValue });
        }, 1000)
    }


    sformat = (s) => {

        if (s < 0) {
            s = -(s);
        }

        // create array of day, hour, minute and second values
        let fm = [
            Math.floor(s / (3600 * 24)),
            Math.floor(s % (3600 * 24) / 3600),
            Math.floor(s % 3600 / 60),
            Math.floor(s % 60)
        ];

        // map over array
        let output = $.map(fm, (v, i) => {

            // if a truthy value
            if (Boolean(v)) {

                // add the relevant value suffix
                if (i === 0) {
                    v = this.plural(v, "D");
                } else if (i === 1) {
                    v = this.plural(v, "Hr");
                } else if (i === 2) {
                    v = this.plural(v, "Min");
                } else if (i === 3) {
                    v = this.plural(v, "Sec");
                }

                return v;
            }

        }).join(', ');

        return output;

    }

    plural = (value, unit) => {

        if (value === 1) {
            return value + " " + unit;
        } else if (value > 1) {
            return value + " " + unit;
        }

    }

    render() {
	let beforeEnding = <div className="loading-alt"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>;
	let ago = "";
        if (this.state.aucStatus === true) {
            beforeEnding = <p style={{ marginBottom: 0 }} >Ending In</p>;
            ago = "";
        }
        else if (this.state.aucStatus === false) {
            beforeEnding = <p style={{ color: "red", marginBottom: 0 }}>Auction Ended</p>;
            ago = "ago"
        }
        const timeLeft = this.state.aucTime;
        return (
            <p>{beforeEnding} {timeLeft} {ago}</p>
        )
    }


}

export default Timer;
