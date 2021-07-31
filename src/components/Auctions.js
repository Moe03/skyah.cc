import React, { Component } from 'react';

import $ from "jquery";

import Auction from "../components/Auction";

import { Container, Header, Modal, Input, Grid, Pagination, Popup } from 'semantic-ui-react';

import { Link } from "react-router-dom";

import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";

import Checkbox from "react-custom-checkbox";


class Auctions extends Component {


    constructor(props) {


        super(props);


        const APIlink = "https://hyskyapi.000webhostapp.com/apihandle.php?req=";

        let paginationForward;

        let paginationBack;

        paginationForward = <a style={{ display: 'flex', alignItems: 'center'}} href="#"><IoArrowForwardCircleOutline style={{ width: "40px", height: "40px", marginLeft: '25px' }}/></a>

        paginationBack = <a style={{ display: 'flex', alignItems: 'center'}} href="#"><IoArrowBackCircleOutline style={{ width: "40px", height: "40px", marginRight: "25px" }}/></a>

        let searchSection = 
                <div className="searchDiv" style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "50%"}}>{paginationBack}<input onKeyDown={this.hitEnter} style={{width: "100%"}} placeholder="SEARCH" type="text"></input> {paginationForward}</div>
                    <div className="checkbox-div" style={{display: "flex"}}>
                        
                   <div>
                   
                        <input style={{marginRight: "5px"}} id="c1" type="checkbox" checked></input>
                        <label for="c1">Ending Soon</label>
                       
                   </div>
                    
                   <div>
                   
                        <input style={{marginRight: "5px"}} id="c2" type="checkbox"></input>
                        <label for="c2">Least Bids</label>
                       
                   </div>
                   <div>
                   
                        <input style={{marginRight: "5px"}} id="c3" type="checkbox"></input>
                        <label for="c3">Cheapest</label>
                       
                   </div>
                    </div>

                </div>  
                //


        this.state = {

            realUnix: 0,

            searched: false,

            auctions: [],

            APIlink: APIlink,

            page: 1,

            totalAucs: 200,

            searchTerm: false,
            searchStatus: false,

            searchNow: searchSection,

            modalNow: false,

            playerNow: false,

            playerName: false,

            spy: false

        };


    }


    componentDidMount() {


        $.getJSON("https://hyskyapi.000webhostapp.com/getTimenow.php", (result) => {


            this.setState({ realUnix: result });

        })

        window.setInterval(() => {
            console.log(this.state.realUnix)
            this.setState({ realUnix: this.state.realUnix + 1000 });
        }, 1000)


        if (this.state.searchTerm == false) {

            $.getJSON(this.state.APIlink + "top", (result) => {


                this.setState({


                    auctions: result


                })


            })

        }

        else {

            $.getJSON(this.state.APIlink + "search&query=" + this.state.searchTerm, (result) => {


                this.setState({


                    auctions: result


                })


            })

        }


    }

    hitEnter = (e) => {
        console.log(e);
        if (e.keyCode == 13) {
            this.getSearch();
        }
    }


    getSearch = (e) => {

        var searchVal = $(".ui input").val().trim();

        if (searchVal) {

            if (searchVal.includes("/ah")) {

                var playerSearch = true;

                var player = searchVal.replace("/ah", "");

            }

            else if(searchVal.includes("/spy")){

                var playerSearch = true;

                var player = searchVal.replace("/spy", "");

                var spyVal = true;

            }


            this.setState({ searchTerm: searchVal, auctions: [], playerNow: playerSearch, playerName: player, page: 1, searched: true, spy: spyVal }, () => {

                this.componentDidMount();

            });
        }

    }


    pageChange = (e, data) => {


        this.setState({ page: data.activePage });


    }


    resetState = () => {

        this.setState({ auctions: [], modalNow: false, playerNow: false, playerName: false, searchTerm: false }, () => {

            this.componentDidMount();

        })

    }



    render() {

        console.log(this.state.realUnix);

        var Back = <button className="back-btn" onClick={this.resetState}>Back</button>;

        if (this.state.auctions == "false") {

            return (

                <Container>

                    <div style={{ flexDirection: "column", textAlign: "center", margin: "40px 0" }}>

                        <h3> {this.state.searchTerm} Doesn't Have Any Auctions. </h3>

                        {Back}

                    </div>

                </Container>

            )

        }


        if (this.state.page > -1 && this.state.page < 11) {


            if (this.state.auctions.length) {


                const startID = (this.state.page - 1) * 20;

                const endID = startID + 20;

                var Back = <button className="back-btn" style={{ marginLeft: "10px" }} onClick={this.resetState}>Back</button>;

                if (this.state.searchTerm == false) {

                    Back = "";

                }

                // const pagesNum = this.state.auctions.length / 20;


                if (this.state.playerNow && !this.state.spy) {
                        var showPlayer = <h1 className="t-c" style={{ margin: "40px 0" }}>Auctions of <span style={{ color: "#00ffb2", textTransform: "uppercase" }}>{this.state.playerName}</span></h1>
                }

                else if(this.state.spy){
                    var showPlayer = <h1 className="t-c" style={{ margin: "40px 0" }}>Current auctions<span style={{ color: "#00ffb2", textTransform: "uppercase" }}>{this.state.playerName}</span> is bidding on</h1>
                }

                else {
                    var showPlayer = "";

                }
            

                const output = this.state.auctions.slice(startID, endID).map((aucitem) =>


                    <Auction key={aucitem["auction_id"]} details={aucitem} page={this.state.page} unix={this.state.realUnix} showAuc={this.showAuc} />


                );

                let searchSection = this.state.searchNow;
                //

                return (



                    <Container>

                        <div id="shown-auc-modal"></div>

                        <div className="disp-flex jcc" style={{ marginBottom: "20px" }}>

                            {/* Search Box: */}

                            {searchSection}

                           


                        </div>

                        <div>

                            {showPlayer}

                        </div>

                       
                        <Grid><Grid.Row columns={3}>{output}</Grid.Row></Grid>

                    </Container>


                );

            }


            else if (this.state.searched && this.state.auctions.length == 0) {

                return (

                    <div className="loading" style={{ width: "100%", height: "100%" }}>
                        <div>
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                        <div>
                            <button className="back-btn" onClick={this.resetState}>Back</button>
                        </div>

                    </div>

                )

            }
            else {
                return (
                    <div className="disp-flex jcc loading" style={{ width: "100%", height: "100%" }}>

                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

                    </div>
                )
            }

        }

    }

}


export default Auctions;
