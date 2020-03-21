import React, { Component } from 'react';
import $ from "jquery";
import { Container, Header, Modal, Input, Grid, Pagination, Popup } from 'semantic-ui-react';
import { Link } from "react-router-dom";

class Bazaar extends Component {

	constructor(props) {
		super(props);
		const APIlink = "https://hyskyapi.cc/apihandle.php?req=";
	}
	
	render() {
		return(
			<Container className="landing disp-flex jcc" style={{ alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
				<h1>Bazaar</h1>
			</Container>
		)
	};
}


export default Bazaar;
