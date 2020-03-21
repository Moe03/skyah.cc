import React, { Component } from 'react';
import { Grid, Modal } from "semantic-ui-react";
import Timer from "./Timer";
import AuctionModal from "./AuctionModal";


class Auction extends Component {



  constructor(props) {

    super(props);
    this.state = {
      aucStatus: 1
    }

  }


  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  formatCash = (n) => {
    if (n < 1e3) return n;
    if (n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    return +(n / 1e12).toFixed(1) + "T";
  };

  render() {

    const id = this.uid();
    const a = this.props.details;
    const aucTimer = <Timer end={this.props.details["end"]} unix={this.props.unix} />;
    
    let count;
    let s;
    if (a["item_count"] === "1") {
      count = "x1";
      s = "";
    }
    else {
      count = "x" + a["item_count"];
      s = "s";
    }

    const detailsBtn = <button id={id} onClick={this.getUsername} className="app-btn" >Details</button>;

    // "a" Stands for auction :)

    const auctionTemplate =
      <div style={{ border: "5px solid #00ffb2", padding: "20px", margin: "20px 0", borderRadius: "5px" }} className="auction-model">

        <div style={{ marginBottom: "10px" }} className="top t-c extra-bold">
          <p>{a["item_name"]}{s} <span style={{ fontSize: "12px", fontWeight: "500" }}>{count}</span></p>
        </div>

        <div className="below">
          <div style={{ marginBottom: "1.8rem" }} className="ending-time">
            <div className="t-c">
              {aucTimer}
            </div>
          </div>

          {/* Details Btn, sb, and tb template. */}
          <div className="end disp-flex space-even">
            <div>
              <div className="left-side">
                <Modal dimmer="blurring" trigger={detailsBtn} basic size='small' closeIcon>
                  <Modal.Content>
                    <AuctionModal det={this.props.details} />
                  </Modal.Content>
                </Modal>
              </div>
            </div>
            <div className="middle">
              <div className="t-c">
                <p style={{ fontWeight: "500" }}>Start Bid</p>
                <p style={{ fontWeight: "700" }}>{this.formatCash(a["starting_bid"])}</p>
              </div>
            </div>
            <div className="end-side">
              <div className="t-c">
                <p style={{ fontWeight: "500" }}>Top Bid</p>
                <p style={{ fontWeight: "700" }}>{this.formatCash(a["highest_bid_amount"])}</p>
              </div>
            </div>

          </div>


        </div>
      </div>


    return (


      <Grid.Column computer={5} tablet={8} mobile={16}>
        {auctionTemplate}
      </Grid.Column>

    )

  }
  ;
}

export default Auction;
