import React, { Component } from 'react';
import $ from "jquery";
import FormatLore from "./FormatLore";

class AuctionModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            sellerName: "",
            sellerLoaded: false,
            det: this.props.det,
            aucTime: <div className="loading-alt"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>,
            virtualNow: 0,
            nowUNIX: 0,
            aucStatus: 0,
            topBidder: "Loading..."
        }

    }

    componentDidMount() {
        this.getUsername();
        window.setInterval(() => {
            var end = this.props.det["end"];
            if (this.state.nowUNIX != 0) {

                var now = this.state.nowUNIX

                if (end > now) {
                    var aucValue = true;
                }
                else {
                    var aucValue = false;
                }

                var dispTime = this.sformat((end - now) / 1000);

                this.setState({ aucTime: dispTime, nowUNIX: now + 1000, aucStatus: aucValue });
            }
        }, 1000)

    }

    sformat = (s) => {

        if (s < 0) {
            s = -(s);
        }

        // create array of day, hour, minute and second values
        var fm = [
            Math.floor(s / (3600 * 24)),
            Math.floor(s % (3600 * 24) / 3600),
            Math.floor(s % 3600 / 60),
            Math.floor(s % 60)
        ];

        // map over array
        return $.map(fm, (v, i) => {

            // if a truthy value


            // add the relevant value suffix
            if (i === 0) {
                v = this.plural(v, "Day");
            } else if (i === 1) {
                v = this.plural(v, "Hr");
            } else if (i === 2) {
                v = this.plural(v, "Min");
            } else if (i === 3) {
                v = this.plural(v, "Sec");
            }

            return v;


        }).join(', ');

    }

    plural = (value, unit) => {

        if (value === 1) {
            return "0" + value + " " + unit;
        } else if (value > 1) {
            if (value < 10) {
                return "0" + value + " " + unit;
            }
            return value + " " + unit;
        }
        else if (value === 0) {
            return "00 " + unit;
        }

    }

    formatCash = (n) => {
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
    };

    getUsername = () => {
        const API = "https://api.mystichat.xyz/"
        const a = this.props.det;

        $.getJSON( API + "getusername.php?uuid=" + this.props.det["auctioneer"], (result) => {

            this.setState({
                sellerName: result, sellerLoaded: true
            });
            $.getJSON( API + "getTimenow.php", (result) => {
                this.setState({ nowUNIX: result });
            })
            if (a["latest_bid"]) {
                $.getJSON( API +"getusername.php?uuid=" + a["latest_bid"]["bidder"], (result) => {
                    if (result) {
                        this.setState({ topBidder: result });
                    }
                    else {
                        this.setState({ topBidder: "UNKNOWN" });
                    }
                })
            }
            else {
                this.setState({ topBidder: "No Bids!" });
            }
        });
    }

    copy = () => {
        // Create container for the HTML
        // [1]
        var container = document.createElement('div')
        container.innerHTML = "/ah " + this.state.sellerName;

        // Hide element
        // [2]
        container.style.position = 'fixed'
        container.style.pointerEvents = 'none'
        container.style.opacity = 0

        // Detect all style sheets of the page
        var activeSheets = Array.prototype.slice.call(document.styleSheets)
            .filter(function (sheet) {
                return !sheet.disabled
            })

        // Mount the container to the DOM to make `contentWindow` available
        // [3]
        document.body.appendChild(container)

        // Copy to clipboard
        // [4]
        window.getSelection().removeAllRanges()

        var range = document.createRange()
        range.selectNode(container)
        window.getSelection().addRange(range)

        // [5.1]
        document.execCommand('copy')

        // [5.2]
        for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = true

        // [5.3]
        document.execCommand('copy')

        // [5.4]
        for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false

        // Remove the container
        // [6]
        document.body.removeChild(container)

        $(".app-btn-thick").text("Copied!");
    }

    render() {
        const a = this.state.det;
        if (this.state.sellerLoaded) {
            var src = "https://minotar.net/armor/body/" + this.state.sellerName + "/70.png";
            var imgLink = <img src={src}></img>
        }
        else {
            var imgLink = <div className="disp-flex" style={{ justifyContent: "center", alignItems: "center" }}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>;
        }
        if (this.state.aucStatus) {
            var beforeEnding = <p style={{ marginBottom: 0, textAlign: "center" }} >Ending In</p>;
            var ago = "";
        }
        else {
            var beforeEnding = <p style={{ color: "red", marginBottom: 0, textAlign: "center" }}>Auction Ended</p>;
            var ago = "ago"
        }

        var timeLeft = this.state.aucTime;

        if (timeLeft === timeLeft.toString()) {
            timeLeft = timeLeft.split(",");
            var timeOutput = [];
            var numThings = [];
            var wordThings = [];

            timeLeft.forEach(element => {
                var thingy = element.split(" ");

                thingy.forEach(element => {

                    if (isNaN(element)) {
                        var throat = <span>{element}</span>;
                        wordThings.push(throat);
                    }
                    else if (element) {
                        var throat = <span>{element}</span>;
                        numThings.push(throat);
                    }
                });
            });
            if ($(document).width() < 550) {
                timeOutput = <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-evenly" }}><div style={{ width: "35px" }}></div><div className="flex-pack"> {wordThings}</div><div className="flex-pack"> {numThings} </div><div style={{ width: "35px" }}></div></div>
            }
            else {
                timeOutput = <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-evenly" }}> <div className="flex-pack"> {wordThings}</div><div className="flex-pack"> {numThings} </div> </div>
            }
        }
        else {
            timeOutput = this.state.aucTime;
        }

        var lore = a["item_lore"];

        if (a["bid_num"]) {
            var bid_num = a["bid_num"];
        }
        else {
            var bid_num = "No";
        }

        if (a["item_count"] == 1) {
            var count = "x1";
            var s = "";
        }
        else {
            var count = "x" + a["item_count"];
            var s = "s";
        }

        if (!a["anvils"]) {
            a["anvils"] = "1";
        }

        var width = $(document).width();

        if (width > 550) {
            var output =
                <div style={{ justifyContent: "space-evenly", border: "5px solid #00ffb2", borderRadius: "20px", paddingBottom: "20px" }} className="disp-flex auc-modal">
                    <div style={{ width: "130px", marginTop: "70px" }}>
                        <div>
                            <div style={{ minHeight: "140px" }} className="disp-flex jcc">
                                {imgLink}
                            </div>
                            <p style={{ fontSize: "20px", fontWeight: "700", margin: "12px 0", textAlign: "center", height: "30px" }}>{this.state.sellerName}</p>
                            <div className="disp-flex jcc" style={{ marginBottom: "20px" }}>
                                <button onClick={this.copy} className="app-btn-thick">Copy</button>
                            </div>
                            <p className="t-c" style={{ minHeight: "120px" }}>{beforeEnding} <div style={{ fontSize: "20px", fontWeight: "700", textAlign: "start" }}>{timeOutput}</div></p>
                            <div className="disp-flex" style={{ marginTop: "20px", justifyContent: "space-evenly" }}>

                                <div style={{ fontWeight: "700" }} className="t-c">
                                    <p>S.B</p>
                                    <p style={{ fontSize: "17px" }}>{this.formatCash(a["starting_bid"])}</p>
                                </div>
                                <div style={{ fontWeight: "700" }} className="t-c">
                                    <p>T.B</p>
                                    <p style={{ fontSize: "17px" }}>{this.formatCash(a["highest_bid_amount"])}</p>
                                </div>

                            </div>
                            <div style={{ marginTop: "20px", textAlign: "center" }}>
                                <p style={{ fontSize: "12px", color: "#9d9d9d" }}>{this.state.topBidder = "No" ? "" : this.state.topBidder }</p>
                                <p style={{ fontSize: "12px", color: "#9d9d9d" }}>This item has <span style={{ color: "#00ffb2" }}>{bid_num}</span> Bids</p>
                            </div>

                        </div>
                    </div>
                    <div style={{ width: "50%" }}>
                        <div className="item-container">
                            <p style={{ fontSize: "20px", color: "#2c2c2c", paddingTop: "15px" }}>{a["item_name"]}{s} {count}</p>
                        </div>
                        <FormatLore lore={lore} />
                        <p>Anvil Uses: <span style={{ color: "red " }}>{a["anvils"]}</span></p>
                    </div>
                </div >
        }
        else {
            var output =
            
                <div style={{ flexDirection: "column", border: "5px solid #00ffb2", borderRadius: "10px", paddingBottom: "20px" }} className="disp-flex auc-modal">
                    <div style={{ width: "100%" }}>
                        <div className="item-container">
                            <p style={{ fontSize: "18px", color: "#2c2c2c", paddingTop: "15px" }}>{a["item_name"]}{s} {count}</p>
                        </div>
                    </div>
                    <div style={{ width: "100%", marginTop: "10px" }}>
                        <div>
                            <p style={{ fontSize: "18px", fontWeight: "700", margin: "12px 0", textAlign: "center", height: "30px" }}>{this.state.sellerName}</p>
                            <div className="disp-flex jcc" style={{ marginBottom: "20px" }}>
                                <button onClick={this.copy} className="app-btn-thick">Copy</button>
                            </div>
                            <p style={{ height: "110px" }} className="t-c">{beforeEnding} <div style={{ fontSize: "18px", fontWeight: "700", textAlign: "start" }}>{timeOutput}</div></p>
                            <div className="disp-flex" style={{ marginTop: "20px", justifyContent: "space-evenly" }}>
                                <div style={{ width: "18px" }}></div>
                                <div style={{ fontWeight: "700" }} className="t-c">
                                    <p>S.B</p>
                                    <p style={{ fontSize: "16px" }}>{this.formatCash(a["starting_bid"])}</p>
                                </div>
                                <div style={{ fontWeight: "700" }} className="t-c">
                                    <p>T.B</p>
                                    <p style={{ fontSize: "16px" }}>{this.formatCash(a["highest_bid_amount"])}</p>
                                </div>
                                <div style={{ width: "40px" }}></div>
                            </div>
                            <div style={{ marginTop: "20px", textAlign: "center" }}>
                               
                                <p style={{ fontSize: "12px", color: "#9d9d9d" }}>This item has <span style={{ color: "#00ffb2" }}>{bid_num}</span> Bids</p>
                            </div>

                        </div>
                    </div>
                    <div style={{ width: "100%", textAlign: "center", fontSize: "14px", marginTop: "30px" }}>
                        <FormatLore lore={lore} />
                        <p>Anvil Uses: <span style={{ color: "red " }}>{a["anvils"]}</span></p>
                    </div>
                </div>
                
        }


        return (
            output
        )
    }


}

export default AuctionModal;
