import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <header className="home-header">
          <div className="home-banner-container">
            <h1>NAFTA Reactor</h1>
            <h2>Sorting out Trump's New NAFTA, the USMCA</h2>
          </div>
          <div className="home-header-menu"></div>
        </header>
        <div className="column-header-container">
          <div className="for-header">
            <div className="column-header-hover"/>
            <span>Who likes the new NAFTA?</span>
          </div>
          <div className="con-header">
            <div className="column-header-hover"/>
            <span>Who's left behind?</span>
          </div>
          <div className="congress-header">
            <div className="column-header-hover"/>
            <span>Where do our representatives stand?</span>
          </div>
        </div>
        <div className="column-entries-container">

        </div>
        <footer className="home-footer">
        </footer>
      </div>
    );
  }
}

export default Home;