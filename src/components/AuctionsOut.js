import React, { Component } from 'react';

import $ from "jquery";

import Auction from "../components/Auction";

import SearchSection from "../components/SearchSection";

import { Container, Header, Modal, Input, Grid, Pagination, Popup } from 'semantic-ui-react';

import { Link } from "react-router-dom";

import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";

import Checkbox from "react-custom-checkbox";


class AuctionsOut extends Component {


    constructor(props) {


        super(props);


        const APIlink = "https://hyskyapi.com/apihandle.php?req=";


        this.state = {

            realUnix: 0,

            searched: false,

            auctions: [],

            APIlink: APIlink,

            page: 1,

            totalAucs: 200,

            searchTerm: props.searchStatus,

            searchStatus: false,

            modalNow: false,

            playerNow: false,

            playerName: false,

            spy: false

        };


    }


    componentDidMount() {


        $.getJSON("https://hyskyapi.com/getTimenow.php", (result) => {


            this.setState({ realUnix: result });

        })

        window.setInterval(() => {
            
            this.setState({ realUnix: this.state.realUnix + 1000 });
        }, 1000)


        if (this.props.searchStatus == false) {

            $.getJSON(this.state.APIlink + "top", (result) => {


                this.setState({


                    auctions: result


                })


            })

        }


    }
   


    pageChange = (e, data) => {


        this.setState({ page: data.activePage });


    }




    render() {  
     
        if( (this.state.auctions.length == 0 && this.props.auctions.length == 0) || (this.props.search == false) ){
            return(
                <div className="disp-flex jcc loading" style={{ width: "100%", height: "100%" }}>

                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

                    </div>
            );
        }
        
        var Back = <button className="back-btn" onClick={this.resetState}>Back</button>;
        let output;

        let startID = (this.props.page - 1) * 20;

        let endID = startID + 20;

        if(this.props.auctions == false){
            output = this.state.auctions.slice(startID, endID).map((aucitem) =>


            <Auction key={aucitem["auction_id"]} details={aucitem} page={this.state.page} unix={this.state.realUnix} />)
        }

        else{
            output = this.props.auctions.slice(startID, endID).map(aucitem =>


            <Auction key={aucitem["auction_id"]} details={aucitem} page={this.state.page} unix={this.state.realUnix} />)

        }

        return(
                
            <Container>

            <div id="shown-auc-modal"></div>

          

           
            <Grid><Grid.Row columns={3}>{output}</Grid.Row></Grid>

        </Container>
        )


    }

}


export default AuctionsOut;
