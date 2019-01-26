import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
import Modal from './modal'
import { showModal } from '../actions/home/modal'
import './home.css';
import './current-column.css';
import './edit.css'
import ProCard from './pro/pro-card'
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchProPosts, addEmptyProEntry, proSetEdit} from '../actions/home/pro-actions';
import {fetchConPosts, addEmptyConEntry, conSetEdit} from '../actions/home/con-actions';
import {fetchCongressPosts, addEmptyCongressEntry, congressSetEdit} from '../actions/home/congress-actions';



class Home extends Component {

  constructor() {
    super()
    this.state = {
      currentColumn: "none",
      editing: false
    }
  }

  getCurrentColumn() {
    if(this.state.currentColumn === "none") {
      return (<ul className="pro-list-ul"/>)
    }
    else if (this.state.currentColumn === "pro"){
      if(this.props.loading){
        return (<ul className="loader"></ul>)
      } else {
      return (
        
        <ul className="pro-list-ul">
          {}
          {this.props.proPosts.map((item, index) => {
            if(item.id === "new"){
              
              return (
                <ProCard key={index} cardItem={item} id="new" />
              )
            } else {
              return (
                <ProCard key={index} cardIndex={index} cardItem={item} id={item._id}/>
              )
            }
          })}
          </ul>
      )
    }}
  }

  getCurrentFilter() {
    if(this.state.currentColumn === "none") {
      return (<div/>)
    }
    else if (this.state.currentColumn === "pro"){
    return (
      <div className="filter-bar">
        {this.props.loggedIn?this.getNewEntryButton(): ""}
      </div>
    )
    }
  }

  getNewEntryButton() {
    return (
      <section className="new-entry-button" onClick={()=>{
        this.props.dispatch(proSetEdit(true))
        this.props.dispatch(addEmptyProEntry())
        this.props.dispatch(showModal('active-pro-card'))
        document.body.style.overflow = "hidden"
        }}>New Entry</section>
    )
  }

  getLoginNav() {
    if(this.props.loggedIn){
      return (
        <nav onClick={()=>{
            this.props.dispatch(clearAuth())
            clearAuthToken()
            }}>
          <span>log out</span>
        </nav>
      )
    } else {
      return (
        <nav onClick={()=>this.props.dispatch(showModal('login'))}>
          <span>log in</span>
        </nav>
      )
    }
  }

  render() {
    return (
      <section className="Home">
      <Modal />
        <header className="home-header">
          <div className="home-banner-container">
            <span className="home-title"> NAFTA Reactor</span>
            <span className="home-sub-title">Sorting out Trump's New NAFTA</span>
            <div className="home-header-menu">
              <nav><span>home</span></nav>
              <nav><span>about</span></nav>
              {this.getLoginNav()}
              <nav><span>contact</span></nav>
            </div>
          </div>
        </header>
        <div className="column-header-container">
          <div className="for-header" onClick={()=>{
            if(this.state.currentColumn !== "pro"){
              this.props.dispatch(fetchProPosts())
              this.setState({
              currentColumn: "pro"
            })}
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
        <div className='current-column' >
          {this.getCurrentFilter()}
          {this.getCurrentColumn()}
        </div>
        </div>
        <footer className="home-footer">
        </footer>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  proPosts: state.proReducers.proPosts,
  editing: state.proReducers.editing,
  loading: state.proReducers.loading,
  loggedIn: state.auth.currentUser !== null,
  isShowing: state.modal.isShowing
});


export default connect(mapStateToProps)(Home);