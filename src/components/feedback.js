import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
import Modal from './modal'
import { showModal } from '../actions/home/modal'
import './feedback.css';
import './header-footer.css'
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';



class Feedback extends Component {

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
      <section className="Feedback">
      <Modal />
        
          <header className="banner-container">
          <div className="banner-transparency"/>
            <div className="logo-image-container">
              <img className="logo-image" src="https://res.cloudinary.com/siouxcitymusic/image/upload/v1549600202/NAFTA_Reactor_logo_new.png"/>
            </div>
            {/* <span className="home-title"> NAFTA Reactor</span> */}
            {/* <span className="home-sub-title">Sorting out Trump's New NAFTA</span> */}
            <div className="header-menu">
              <nav><span><Link to="/">home</Link></span></nav>
              <nav><span><Link to="/about">about</Link></span></nav>
              <nav><span><Link to="/feedback">feedback</Link></span></nav>
            </div>
          
          </header>
        
        <div className="feedback-body">
          <h2>Thanks for diving into the NAFTA Reactor.<br/>Provide us with some feedback using the form below.</h2>
          <div className="feedback-form">
              <div className="feedback-input-container"><label>*First Name</label><input/></div>
              <div className="feedback-input-container"><label>*Last Name</label><input/></div>
              <div className="feedback-input-container"><label>*Email</label><input/></div>
              <div className="feedback-input-container"><label>Phone</label><input/></div>
              <div className="feedback-input-container"><label>ZIP code</label><input maxLength="5" size="5"/></div>
              <div className="feedback-input-container"><label>State</label>
                <select defaultValue="OR">
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR" >Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
              </div>
              <div className="feedback-input-container" id="subject-container"><label>Subject</label>
                    <select name="subjects">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="fiat">Fiat</option>
                    <option value="audi">Audi</option>
                    </select>
              </div>
              <div className="feedback-textarea-container"><label>Comment</label><textarea/></div>
              <div className="feedback-button-container"><label className="feedback-submit-button">Submit</label></div>
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
  loggedIn: state.auth.currentUser !== null,
  isShowing: state.modal.isShowing
});


export default connect(mapStateToProps)(Feedback);