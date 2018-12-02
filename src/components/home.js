import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
import './home.css';
import './current-column.css';
import {fetchProPosts, addEmptyProEntry} from '../actions/home/pro-actions';
import { wrapGrid } from 'animate-css-grid'

//class for individual card entries
class Card extends React.Component {
  //cards start out collapsed 
  state = { expanded: false, editing: false };

  render() {
    
    if(this.state.editing || this.props.cardItem.new){
      return (
        <div className="pro-list-item-active">
          <div>
            <h2><input value={this.props.cardItem.title}/></h2>
            <p><input value={this.props.cardItem.quote}/></p>
            <div className="read-more"/>
          </div>
        </div>
      );
    } else if(!this.state.editing){
      return (
        <div className={this.state.expanded ? "pro-list-item-active" : "pro-list-item"}
          onClick={() => {this.setState({ expanded: !this.state.expanded });}}>
          <div>
            <h2>{this.props.cardItem.title}</h2>
            <p>{this.props.cardItem.quote}</p>
            <div className="read-more"/>
          </div>
        </div>
      );
    }
  }
}

class Home extends Component {

  constructor() {
    super()
    this.state = {
      currentColumn: "none",
      editing: false
    }
  }

  componentDidMount() {
    // will automatically clean itself up when dom node is removed
    wrapGrid(document.querySelector(".pro-list-ul"), { easing : 'circOut', stagger: 10, duration: 500 });
  }

  getCurrentColumn() {
    if(this.state.currentColumn === "none") {
      return (<ul className="pro-list-ul"/>)
    }
    else if (this.state.currentColumn === "pro"){
      return (
        
        <ul className="pro-list-ul">
          {this.props.proPosts.map((item, index) => {
            return (
              <Card key={index} cardItem={item}/>
            )
          })}
          </ul>
      )
    }
  }

  getCurrentFilter() {
    if(this.state.currentColumn === "none") {
      return (<div/>)
    }
    else if (this.state.currentColumn === "pro"){
    return (
      <div className="filter-bar">
        <section className="new-entry-button" onClick={()=>{this.props.dispatch(addEmptyProEntry())}}>New Entry</section>
      </div>
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
        <div className="current-column" >
          {this.getCurrentFilter()}
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