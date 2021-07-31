import React, { Component } from 'react';
import Auctions from "./components/Auctions";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Info from "./components/Info";
import Smart from "./components/Smart";
import SearchSection from './components/SearchSection';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {

  render() {
    let active = window.location.pathname;

    return (
      <Router>
        <div className="container main-app">

          <Header active = {active} />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/ah" component={SearchSection}/>
            <Route path="/info" component={Info} />
            <Route path="/smart" component={Smart} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
  ;
}

export default App;
