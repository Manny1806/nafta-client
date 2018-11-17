import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
import './home.css';
import './current-column.css';
import {fetchProPosts} from '../actions/home/pro-actions'

class Home extends Component {

  constructor() {
    super()
    this.state = {
      currentColumn: "none",
    }
  }

  getCurrentColumn() {
    if(this.state.currentColumn === "none") {
      return 
    }
    else if (this.state.currentColumn === "pro"){
      return (
        <ul className="pro-list-ul">
          {this.props.proPosts.map((item, index) => {
            return (
              <li className="pro-list-item" key={index}>
                <h2>{item.title}</h2>
                <p>{item.quote}</p>
                <div className="read-more"/>
              </li>
            )
          })}
        </ul>
      )
    }
  }

  render() {
    return (
      <div className="Home">
        <header className="home-header">
          <div className="home-banner-container">
            <span className="home-title"> NAFTA Reactor</span>
            <span className="home-sub-title">Sorting out Trump's New NAFTA</span>
            <div className="home-header-menu">
              <nav><span>home</span></nav>
              <nav><span>about</span></nav>
              <nav><span>login</span></nav>
              <nav><span>contact</span></nav>
          </div>
          </div>
        </header>
        <div className="column-header-container">
          <div className="for-header" onClick={()=>{
            console.log(this.props.proPosts)
            this.props.dispatch(fetchProPosts())
            this.setState({
              currentColumn: "pro"
            })
            }}>
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
        {/* Where current column will be displayed */}
        <div className="current-column">
          {this.getCurrentColumn()}
        </div>
        </div>
        <footer className="home-footer">
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  proPosts: state.proReducers.proPosts,
});

export default connect(mapStateToProps)(Home);