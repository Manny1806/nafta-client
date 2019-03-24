import React, { Component } from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './modal'
import { showModal } from '../actions/home/modal'
import './home.css';
import './current-column.css';
import './edit.css'
import './header-footer.css'
import './filters.css'
import ProCard from './pro/pro-card'
import ConCard from './con/con-card'
import CongressCard from './congress/congress-card'
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchProPosts, fecthProPostsSearch, addEmptyProEntry, proSetEdit} from '../actions/home/pro-actions';
import {fetchConPosts, fetchConPostsSearch, addEmptyConEntry, conSetEdit} from '../actions/home/con-actions';
import {fetchCongressPosts, fetchCongressPostsSearch, addEmptyCongressEntry, congressSetEdit} from '../actions/home/congress-actions';



class Home extends Component {

  constructor() {
    super()
    this.state = {
      currentColumn: "none",
      proFilter: "All",
      editing: false
    }
    this.timeout = 0
    this.filter = React.createRef();
    this.search = React.createRef();
  }

  

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e){
    if(document.getElementsByClassName('pro-filter-dropdown')[0]){
      if (!document.getElementsByClassName('pro-filter-dropdown')[0].contains(e.target)){
        var dropdowns = document.getElementsByClassName("pro-filter-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
    
  }

  proSearch(searchText, filter){
    // let searchText = e.target.value
    if(this.timeout) clearTimeout(this.timeout)
    // if(searchText){
      this.timeout = setTimeout(()=>{this.props.dispatch(fecthProPostsSearch(searchText, filter))}, 500)
    // } else {
    //   this.timeout = setTimeout(()=>{this.props.dispatch(fetchProPosts())
    //   }, 500)
    // }
    
  }

  conSearch(e){
    let searchText = e.target.value
    if(this.timeout) clearTimeout(this.timeout)
    if(searchText){
      this.timeout = setTimeout(()=>{this.props.dispatch(fetchConPostsSearch(searchText))
      }, 500)
    } else {
      this.timeout = setTimeout(()=>{this.props.dispatch(fetchConPosts())
      }, 500)
    }
    
  }

  congressSearch(e){
    let searchText = e.target.value
    if(this.timeout) clearTimeout(this.timeout)
    if(searchText){
      this.timeout = setTimeout(()=>{this.props.dispatch(fetchCongressPostsSearch(searchText))
      }, 500)
    } else {
      this.timeout = setTimeout(()=>{this.props.dispatch(fetchCongressPosts())
      }, 500)
    }
    
  }

  getCurrentColumn() {
    if(this.state.currentColumn === "none") {
      return (
        <div className="landing-page-text-container">
        
        <p className="landing-text-1">The U.S. Congress is set to take up the new version of the 
          North American Free Trade Agreement. Called NAFTA 2.0 by many—called 
          the USMCA (United States-Mexico-Canada Agreement) by the Trump 
          administration—this is highly contested ground, the trade battle of our day.</p>

          <img className="signing-photo" alt="USMCA signing" src="https://res.cloudinary.com/siouxcitymusic/image/upload/v1549582185/2018120100384_0.jpg"/>

          <p className="landing-text-2">NAFTA 2.0's content is a 1,809-page text that was signed, in a ceremony
           on November 30, by the executives of Mexico, Canada, and the U.S. It takes
            effect if the legislatures of these signatory countries pass it.</p>

          <p className="landing-text-3">President Donald Trump touts his version of NAFTA as the solution our country needed.</p>

          <p className="landing-text-4"><span style={{"fontWeight": '700'}}>What are other people saying about the new NAFTA? </span>
          Click on a section above to take in a range of views by people and 
          organizations on the deal—whether they be the sort to like NAFTA 2.0, 
          to be left behind by NAFTA and NAFTA 2.0, or to be our own members of 
          Congress, whose pleasure or displeasure at the new NAFTA makes all the 
          difference.
          </p>
      </div>
      )
    }
    else if (this.state.currentColumn === "pro"){
      if(this.props.loading){
        return (
        <div className="loader-container">
          <ul className="loader"></ul>
        </div>
        )
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
                <ProCard key={index} cardIndex={index} cardItem={item} id={item._id} quoteText={`quote${index}`}/>
              )
            }
          })}
          </ul>
      )
    }} else if (this.state.currentColumn === "con"){
      if(this.props.loading){
        return (
          <div className="loader-container">
          <ul className="loader"></ul>
          </div>
      )
      } else {
      return (
        
        <ul className="pro-list-ul">
          {}
          {this.props.conPosts.map((item, index) => {
            if(item.id === "new"){
              
              return (
                <ConCard key={index} cardItem={item} id="new" />
              )
            } else {
              return (
                <ConCard key={index} cardIndex={index} cardItem={item} id={item._id}/>
              )
            }
          })}
          </ul>
      )
    }} else if (this.state.currentColumn === "congress"){
      if(this.props.loading){
        return (<div className="loader-container">
        <ul className="loader"></ul>
        </div>)
      } else {
      return (
        
        <ul className="pro-list-ul">
          {}
          {this.props.congressPosts.map((item, index) => {
            if(item.id === "new"){
              
              return (
                <CongressCard key={index} cardItem={item} id="new" />
              )
            } else {
              return (
                <CongressCard key={index} cardIndex={index} cardItem={item} id={item._id}/>
              )
            }
          })}
          </ul>
      )
    }}
  } 

  getCurrentFilter() {
    if(this.state.currentColumn === "none") {
      return (
      <div />
      )
    }
    else if (this.state.currentColumn === "pro"){
    return (
      <div className="filter-bar">
        
        <div className="pro-filter-dropdown">
          <button className="pro-filter-dropbtn" onClick={()=>{
            document.getElementById("pro-filter-dropdown").classList.toggle("show");
          }}>Type: {this.state.proFilter} &#9660;</button>
          <div id="pro-filter-dropdown" className="pro-filter-dropdown-content" >
            <label onClick={()=>{
              this.setState({proFilter: "Individuals"})
              this.proSearch(this.search.current.value, "Individuals")
              document.getElementById("pro-filter-dropdown").classList.remove("show")
              }}>Individuals</label>
            <label onClick={()=>{
              this.setState({proFilter: "Business Press"})
              this.proSearch(this.search.current.value, "Business Press")
              document.getElementById("pro-filter-dropdown").classList.remove("show")
              }}>Business Press</label>
            <label onClick={()=>{
              this.setState({proFilter: "Corporate Interests"})
              this.proSearch(this.search.current.value, "Corporate Interests")
              document.getElementById("pro-filter-dropdown").classList.remove("show")
              }}>Corporate Interests</label>
            <label onClick={()=>{
              this.setState({proFilter: "All"})
              this.proSearch(this.search.current.value, "All")
              document.getElementById("pro-filter-dropdown").classList.remove("show")
              }}>All</label>

          </div>
          <input className="search-input" ref={this.search} placeholder="Search" onChange={e=>this.proSearch(e.target.value, this.state.proFilter)}/>
        </div>
        {this.props.loggedIn?this.getNewEntryButton(): ""}
      </div>
    )
    }
    else if (this.state.currentColumn === "con"){
      return (
        <div className="filter-bar">
          <input className="search-input" placeholder="Search" onChange={e=>this.conSearch(e)}/>
          {this.props.loggedIn?this.getNewEntryButton(): ""}
        </div>
      )
    }
    else if (this.state.currentColumn === "congress"){
      return (
        <div className="filter-bar">
          <input className="search-input" placeholder="Search" onChange={e=>this.congressSearch(e)}/>
          {this.props.loggedIn?this.getNewEntryButton(): ""}
        </div>
      )
    }
  }

  getNewEntryButton() {
    if(this.state.currentColumn === "pro"){
      return (
        <section className="new-entry-button" onClick={()=>{
          this.props.dispatch(proSetEdit(true))
          this.props.dispatch(addEmptyProEntry())
          this.props.dispatch(showModal('active-pro-card'))
          document.body.style.overflow = "hidden"
          }}>New Entry</section>
      )
    }
    else if(this.state.currentColumn === "con"){
      return (
        <section className="new-entry-button" onClick={()=>{
          this.props.dispatch(conSetEdit(true))
          this.props.dispatch(addEmptyConEntry())
          this.props.dispatch(showModal('active-con-card'))
          document.body.style.overflow = "hidden"
          }}>New Entry</section>
      )
    }
    else if(this.state.currentColumn === "congress"){
      return (
        <section className="new-entry-button" onClick={()=>{
          this.props.dispatch(congressSetEdit(true))
          this.props.dispatch(addEmptyCongressEntry())
          this.props.dispatch(showModal('active-congress-card'))
          document.body.style.overflow = "hidden"
          }}>New Entry</section>
      )
    }
    
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
        <header className="header">
          <div className="banner-container">
          <div className="banner-transparency"/>
            <div className="logo-image-container">
              <img className="logo-image" alt="NAFTA Reactor logo" src="https://res.cloudinary.com/siouxcitymusic/image/upload/v1549600202/NAFTA_Reactor_logo_new.png"/>
            </div>
            {/* <span className="home-title"> NAFTA Reactor</span> */}
            {/* <span className="home-sub-title">Sorting out Trump's New NAFTA</span> */}
            <div className="header-menu">
              <nav><span onClick={()=>{this.setState({currentColumn: "none"})}}><Link to="/">home</Link></span></nav>
              <nav><span><Link to="/about">about</Link></span></nav>
              <nav><span><Link to="/feedback">feedback</Link></span></nav>
              
            </div>
          
          </div>
          <div className="yellow-banner"><span>Sorting out Trump's new version of the North American Free Trade Agreement</span></div>
        </header>
        <div className="column-header-container">
          <div className={`for-header ${this.state.currentColumn === "pro"? "column-header-active" : ""}`} onClick={()=>{
            if(this.state.currentColumn !== "pro"){
              this.props.dispatch(fetchProPosts())
              this.setState({
              currentColumn: "pro",
              proFilter: "All"
            })}
            }}>
            <div className={`column-header-hover ${this.state.currentColumn === "pro"? "column-header-hover-active" : ""}`}/>
            <div className={`column-header-hover-white ${this.state.currentColumn === "pro"? "column-header-hover-white-active" : ""}`}/>
            <span>Who likes the new NAFTA?</span>
          </div>
          <div className={`con-header ${this.state.currentColumn === "con"? "column-header-active" : ""}`} onClick={()=>{
            if(this.state.currentColumn !== "con"){
              this.props.dispatch(fetchConPosts())
              this.setState({
              currentColumn: "con",
              proFilter: "All"
            })}
            }}>
            <div className={`column-header-hover ${this.state.currentColumn === "con"? "column-header-hover-active" : ""}`}/>
            <div className={`column-header-hover-white ${this.state.currentColumn === "con"? "column-header-hover-white-active" : ""}`}/>
            <span>Who's left behind?</span>
          </div>
          <div className={`congress-header ${this.state.currentColumn === "congress"? "column-header-active" : ""}`} onClick={()=>{
            if(this.state.currentColumn !== "congress"){
              this.props.dispatch(fetchCongressPosts())
              this.setState({
              currentColumn: "congress",
              proFilter: "All"
            })}
            }}>
            <div className={`column-header-hover ${this.state.currentColumn === "congress"? "column-header-hover-active" : ""}`}/>
            <div className={`column-header-hover-white ${this.state.currentColumn === "congress"? "column-header-hover-white-active" : ""}`}/>
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
        <footer className="footer">
            <span>&copy;2019 Alex Widner</span> {this.getLoginNav()}
            
        </footer>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  proPosts: state.proReducers.proPosts,
  conPosts: state.conReducers.conPosts,
  congressPosts: state.congressReducers.congressPosts,
  editing: state.proReducers.editing,
  loading: state.proReducers.loading || state.conReducers.loading || state.congressReducers.loading,
  loggedIn: state.auth.currentUser !== null,
  isShowing: state.modal.isShowing
});


export default connect(mapStateToProps)(Home);