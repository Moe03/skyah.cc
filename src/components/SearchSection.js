import React, { Component } from 'react';

import $ from "jquery";

import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";

import AuctionsOut from "../components/AuctionsOut";

import ReactLoading from 'react-loading';

import { SearchCategory } from 'semantic-ui-react';


class SearchSection extends Component {

    constructor(props) {

        super(props);
        this.state = {
            auctions: [],
            APIlink: "https://hyskyapi.000webhostapp.com/apihandle.php?req=",
            searchStatus: false,
            page: 1,
            search: true,
            cheapest: false,
            least_bids: false,
            searchValue: false,
            ahSearch: false,
            spySearch: false
        }
    }

    hitEnter = (e) => {
        if (e.keyCode == 13) {
            this.getSearch();
            this.disableSearch();
        }
    }

    disableSearch = () => {
        this.setState({
            search: false
        })
    }

    getSearch = (e) => {

        var searchVal = $("input").val();

        console.log(searchVal);

        if (searchVal) {

            let sortby;
            this.state.least_bids ? sortby = "least_bids" : sortby = "endingsoon";
            this.state.cheapest ? sortby += ",cheapest": sortby += "";
                $.getJSON(this.state.APIlink + "search&query=" + searchVal + "&sortby=" + sortby, (result) => {
                    let ah;
                    let spy;
                    spy = searchVal.includes("/spy") ? true : false;
                    ah  = searchVal.includes("/ah") ? true : false;

                    if(result == "false" || result == [] || result == false){
                        result = 'NOAUCTIONS';
                    }
    
                    this.setState({
                        auctions: result,
                        searchStatus: true,
                        search: true,
                        searchValue: searchVal,
                        spySearch: spy,
                        ahSearch: ah
                    })
    
    
                })
            
        }

    }

    pageForward = () => {
        this.setState({
            page: this.state.page == 10 ? this.state.page : this.state.page += 1
        })
    }

    pageBack = () => {
        this.setState({
            page: this.state.page == 1 ? this.state.page : this.state.page -= 1
        })
    }

    leastBidsSwitch = () => {
        this.setState({
            least_bids: this.state.least_bids ? false : true
        })
    }

    cheapestSwitch = () => {
        this.setState({
            cheapest: this.state.cheapest ? false : true
        })
    }

    checkSearch = () => {

        if(this.state.searchValue.includes("/ah")){

            return <h3 className="text-center">Showing auctions of {this.state.searchValue.replace("/ah ", "")}</h3>
        }
        if(this.state.searchValue.includes("/spy")){
           
            return <h3 className="text-center">Spying on {this.state.searchValue.replace("/spy ", "")}</h3>
        }
        else{
            return <h3 className="text-center" style={{ letterSpacing: "7px" }}>SEARCH RESULTS</h3>
        }

    }

    resetState = () => {

        this.setState({
            auctions: [],
            APIlink: "https://hyskyapi.000webhostapp.com/apihandle.php?req=",
            searchStatus: false,
            page: 1,
            search: true,
            cheapest: false,
            least_bids: false,
            searchValue: false
         })

    }

    render() {

        let beforeAucs;

        beforeAucs = this.state.searchValue ? this.checkSearch() : <h3 className="text-center" style={{ letterSpacing: "7px" }}>TOP AUCTIONS</h3>;

        beforeAucs = this.state.search == false ? "" : beforeAucs;

        let paginationForward;

        let paginationBack;

        paginationForward = <a onClick={this.pageForward} style={{ display: 'flex', alignItems: 'center'}} href="#"><IoArrowForwardCircleOutline style={{ width: "40px", height: "40px", color: "#44ffb2" }}/></a>

        paginationBack = <a onClick={this.pageBack} style={{ display: 'flex', alignItems: 'center'}} href="#"><IoArrowBackCircleOutline style={{ width: "40px", height: "40px", color: "#44ffb2" }}/></a>

        if(this.state.page == 1){
            paginationBack =  <a onClick={this.pageBack} style={{ display: 'flex', alignItems: 'center'}} href="#"><IoArrowBackCircleOutline style={{ width: "40px", height: "40px", color: "grey" }}/></a>
        }
        else if(this.state.page == 10){
            paginationForward = <a onClick={this.pageForward} style={{ display: 'flex', alignItems: 'center'}} href="#"><IoArrowForwardCircleOutline style={{ width: "40px", height: "40px", color: "grey" }}/></a>
        }
        let disabledOrnot;
        let showLoading;
        this.state.search ? disabledOrnot = false : disabledOrnot = true;
        disabledOrnot ? showLoading = "d-block" : showLoading = "d-none";
        let searchSection = 
        
                <div className="searchDiv container mb-5" style={{display: "flex", alignItems: "center", flexDirection: "column", marginBottom: "20px", position: "relative"}}>
                    <div className="row" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                    <div className="col-12 col-md-8 row d-flex align-items-center">
                        <div className="col-2 col-md-2 d-flex justify-content-center">
                             
                        </div>
                        <div style={{ color:"gray", fontSize: "13px" }} className="col-8 col-md-8 position-relative align-items-center justify-content-between d-flex">
                            <p>Page: <span style={{ fontWeight: "700"}}>{this.state.page}</span></p>
                            <p>Search with Enter</p>
                        </div>
                        <div className="col-2 col-md-2 d-flex justify-content-center">
                               
                        </div>
                        </div>
                        <div className="col-12 col-md-8 row d-flex align-items-center">
                            <div className="col-2 col-md-2 d-flex justify-content-center">
                                {paginationBack}
                            </div>
                            <div className="col-8 col-md-8 position-relative align-items-center justify-content-right d-flex mb-2">
                                <ReactLoading className={showLoading} style={{ position:"absolute", display:"flex", alignItems: "center", width:"1.7rem", right: "20px" }} type={'spin'} color={'grey'} height={'5%'} width={'5%'} />
                                <input onKeyDown={this.hitEnter} style={{width: "100%"}} placeholder="SEARCH" type="text" disabled={disabledOrnot}>
                                </input> 
                                
                            </div>
                            <div className="col-2 col-md-2 d-flex justify-content-center">
                                {paginationForward}
                            </div>
                            <div className="row justify-content-center">
                           
                                <div className="col-12 col-md-3 mb-3 mb-md-1 d-flex justify-content-center">
                                        <div>
                                        <input style={{ marginRight: "5px" }} id="endingsoon" id="c1" type="checkbox" checked></input>
                                        <label for="c1">End Soon</label>
                                        </div>
                                </div>
                                    
                                <div className="col-12 col-md-3 mb-3 mb-md-1 d-flex justify-content-center">
                                        <div>
                                        <input style={{ marginRight: "5px" }} onClick={this.leastBidsSwitch} id="least_bids" id="c2" type="checkbox"></input>
                                        <label for="c2">Least Bids</label>
                                        </div>
                                    
                                </div>
                                <div className="col-12 col-md-3 mb-3 mb-md-1 d-flex justify-content-center">
                                        <div>
                                        <input style={{ marginRight: "5px" }} onClick={this.cheapestSwitch} id="cheapest" id="c3" type="checkbox"></input>
                                        <label for="c3">Cheapest</label>
                                        </div>
                                </div>
                               
                    </div>
                        </div>
                    </div>
                   

                </div>  
        let message;
        if(this.state.ahSearch){
            message = <h3 className="text-center">Oops! This Player has no auctions.</h3>
        }
        else if(this.state.spySearch){
            message = <h3 className="text-center">Oops! This Player hasn't bid on anything.</h3>
        }
        else{
            message = <h3 className="text-center">Oops! This Item Doesn't Exist.</h3>
        }
      
        
        if(this.state.auctions == "NOAUCTIONS"){
            return(
                <div>
                {searchSection}
                <div className="d-flex flex-column justify-content-center align-items-center">
                    {message}
                    <VscError style={{ width: "75px", height: "75px", marginBottom: "20px", color: 'grey' }}/>
                    <a style={{ width: "30%" }} className="text-center back-btn" onClick={this.resetState} href="#">BACK</a>
                
                </div>
                </div>
            )
        }
        else{   
            return (
                <div>
                {searchSection}
                {beforeAucs}
                <AuctionsOut search={this.state.search} page={this.state.page} searchStatus={this.state.searchStatus} auctions={this.state.auctions}/>
                </div>
            )
        }

    }


}

export default SearchSection;