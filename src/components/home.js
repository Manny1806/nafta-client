import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
import './home.css';
import './current-column.css';
import './edit.css'
import {fetchProPosts, addEmptyProEntry, editProPost, addProPost, deleteProPost} from '../actions/home/pro-actions';
import { wrapGrid } from 'animate-css-grid'

//class for individual card entries
class Card extends React.Component {
  //cards start out collapsed 
  state = { expanded: false, editing: false,
            values: { title: this.props.cardItem.title ? this.props.cardItem.title : "",
                      quote: this.props.cardItem.quote ? this.props.cardItem.quote : ""
            }      
  };

  render() {
    console.log(this.props.cardItem.title)
    if(this.state.editing || this.props.cardItem.new){
      return (
        <div className="pro-list-item-active">
          <div>
            <h2><label>Title<input className="title-input"defaultValue={this.props.cardItem.title} onChange={(e)=>{
              var x = Object.assign(this.state.values, {title: e.target.value})
              this.setState({values: x})}}/></label></h2>

            <p><label>Quote<textarea className="quote-input"defaultValue={this.props.cardItem.quote} onChange={(e)=>{
              var x = Object.assign(this.state.values, {quote: e.target.value})
              this.setState({values: x})}}/></label></p>

            <button onClick={()=>{
              if(this.props.cardItem.new){
                this.props.onAdd(addProPost(this.state.values))
                this.setState({editing: false})
              } else {
                console.log("triggered")
                this.props.onAdd(editProPost(this.props.id, this.state.values))
                this.setState({editing: false})
              }
              
              }}>Confirm</button>

            <button onClick={()=>{
              if(this.props.cardItem.new){
                this.props.onAdd(fetchProPosts())
              } else {
                this.setState({editing: false})
              }
              }}>Cancel</button>
          </div>
        </div>
      );
    } else if(!this.state.editing && !this.state.expanded){
      return (
        <div className="pro-list-item"
          onClick={() => {this.setState({ expanded: !this.state.expanded });}}>
          <div>
            <h2>{this.props.cardItem.title}</h2>
            <p>{this.props.cardItem.quote}</p>
            <div className="read-more"/>
          </div>
        </div>
      );
    } else if(!this.state.editing && this.state.expanded){
      return(
      <div className="pro-list-item-active">
          <div>
            <h2>{this.props.cardItem.title}</h2>
            <p>{this.props.cardItem.quote}</p>
            <button onClick={()=>this.setState({expanded: false})}>Collapse</button>
            <button onClick={()=>this.setState({editing: true})}>Edit</button>
            <button onClick={()=>this.props.onAdd(deleteProPost(this.props.id))}>Delete</button>
          </div>
        </div>
      )
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
            // console.log(item._links ? item._links.self.href.substring(item._links.self.href.lastIndexOf('/')+1): "")
            return (
              <Card key={index} onAdd={(func) => this.props.dispatch(func)} cardItem={item} id={item._links ? item._links.self.href.substring(item._links.self.href.lastIndexOf('/')+1) : ""}/>
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
            <div className="column-header-hover"/>props.dispatch(editProPost
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