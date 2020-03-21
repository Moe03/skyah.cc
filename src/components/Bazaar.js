import React, { Component } from 'react';
import $ from "jquery";
import { Container, Header, Modal, Input, Grid, Pagination, Popup } from 'semantic-ui-react';
import { Link } from "react-router-dom";

class Bazaar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			APIlink: "https://hyskyapi.cc/apihandle.php?req=",
			page: 1,
			totalItems: 200,
			searchTerm: false,
			searchStatus: false,
			searchNow: <Modal style={{ justifyContent: "center", textAlign: "center" }} open={this.searchStatus} trigger={<button className="app-btn">Search</button>} basic size="small">
				<Header style={{ display: "flex", justifyContent: "center" }} icon="search" content="It's flipping time"/>
				<Modal.Content>
					<Popup size="small" content={<div><p>
						Search for an item or type /hot to search for items rising in price
					</p></div>} trigger={<Input style={{ width: "100%", marginTop: "20px" }} placeholder="Search" onKeyDown={this.hitEnter} />} />
				</Modal.Content>
				<Modal.Actions style={{ display: "flex", justifyContent: "Center" }}>
					<button className="search-btn" id="Yes" onClick={this.getSearch}>Search</button>
				</Modal.Actions>
			</Modal>
		};
	}

	componentDidMount() {
		$.getJSON("https://hyskyapi.cc/getTimenow.php", (result) => {
			this.setState({ realUnix: result });
		});
		if(this.state.searchTerm === false) {
			//TODO
			//List default items
		} else {
			$.getJSON(this.state.APIlink + "bazaar&query=" + this.state.searchTerm, (result) => {
				this.setState({ items: result.product_info });
			});
		}
	}

	hitEnter = (e) => {
		if(e.keyCode===13) {
			this.getSearch();
		}
	}

	getSearch = (e) => {
		let searchVal = $(".ui input").val().trim().replace(/ /g, "_").toUpperCase();
		this.setState({ searchTerm: searchVal, items: [], page: 1, searched: true }, () => {
			this.componentDidMount();
		});
	}

	pageChange = (e, data) => {
		this.setState({ page: data.activePage });
	}

	resetState = () => {
		this.setState({ items: [], searchTerm: false }, () => {
			this.componentDidMount();
		});
	}

	openSearch = () => {
		this.setState({ searchStatus: true });
	}
	
	render() {
		let Back = <button className="back-btn" onClick={this.resetState}>Back</button>;
		let pages = ["Farming", "Mining", "Combat", "Woods & Fishes", "Oddities"];
		if(this.state.items === []) {
			return(
				<Container>
					<div style={{ flexDirection: "column", textAlign: "center", margin: "40px 0" }}>
						<h3>{this.state.searchTerm} cannot be found</h3>
						{Back}
					</div>
				</Container>
			);
		} if(this.state.page > -1 && this.state.page <11) {
			if(this.state.items.length !== 0) {
				//TODO
				//Make return function
				return(
					<div></div>
				);
			} else if(this.state.searched && this.state.items.length === 0) {
				return(
					<div className="loading" style={{ width: "100%", height: "100%" }}>
						<div>
							<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
						</div>
						<div>
							<button className="back-btn" onClick={this.resetState}>Back</button>
						</div>
					</div>
				);
			} else {
				return(
					<div className="disp-flex jcc loading" style={{ width: "100%", height: "100%" }}>
						<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
					</div>
				);
			}
		}
	}
}


export default Bazaar;
