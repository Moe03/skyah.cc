import React, { Component } from 'react';

import $ from "jquery";

import Auction from "../components/Auction";

import { Container, Header, Modal, Input, Grid, Pagination, Popup } from 'semantic-ui-react';

import { Link } from "react-router-dom";


class Auctions extends Component {


    constructor(props) {


        super(props);


        const APIlink = "https://hyskyapi.000webhostapp.com/apihandle.php?req=";



        this.state = {

            realUnix: 0,

            searched: false,

            auctions: [],

            APIlink: APIlink,

            page: 1,

            totalAucs: 200,

            searchTerm: false,
            searchStatus: false,

            searchNow: <Modal style={{ justifyContent: "center", textAlign: "center" }} open={this.searchStatus} trigger={<button className="app-btn">Search</button>} basic size='small'>

                <Header style={{ display: "flex", justifyContent: "center" }} icon='search' content='Looking for some nice deals, huh?' />

                <Modal.Content>


                    <Link to="/smart"><a href="#">Check out Smart Search!</a></Link>


                    <Popup size="small" content={<div><p>

                        Search for an item or type /ah (Player) to search for a player's auctions

                    </p>

                        <br />

                        <p>

                            Search for enchants using /ebs (Enchants)

                    </p>
                    <br />
                    <p>

                            Search for auctions someone has bid on using /spy (username)

                    </p></div>} trigger={<Input style={{ width: "100%", marginTop: "20px" }} placeholder="Search" onKeyDown={this.hitEnter} />} />


                </Modal.Content>

                <Modal.Actions style={{ display: "flex", justifyContent: "center" }}>

                    <button className="search-btn" id="Yes" onClick={this.getSearch} >

                        Search

              </button>

                </Modal.Actions>

            </Modal>,

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

    openSearch = () => {
        this.setState({
            searchStatus: true
        })
    }

    render() {

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


                if (this.state.auctions.length >= 20) {

                    var PaginationOutput =

                        <Pagination

                            defaultActivePage={this.state.page}

                            firstItem={null}

                            lastItem={null}

                            pointing

                            secondary

                            totalPages={10}

                            siblingRange={1}

                            boundaryRange={0}

                            ellipsisItem={null}

                            onPageChange={this.pageChange}

                        />

                }

                else {

                    var PaginationOutput = "";

                }



                const paginationStyle = {

                    display: "flex",

                    justifyContent: "center"

                }



                const output = this.state.auctions.slice(startID, endID).map((aucitem) =>


                    <Auction key={aucitem["auction_id"]} details={aucitem} page={this.state.page} unix={this.state.realUnix} showAuc={this.showAuc} />


                );


                return (



                    <Container>

                        <div id="shown-auc-modal"></div>

                        <div className="disp-flex jcc" style={{ marginBottom: "20px" }}>

                            {/* Search Box: */}

                            {this.state.searchNow}

                            {Back}


                        </div>

                        <div>

                            {showPlayer}

                        </div>

                        <div style={paginationStyle}>

                            {PaginationOutput}

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
