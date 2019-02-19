import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
import Modal from './modal'
import { showModal } from '../actions/home/modal'
import { sendFeedback } from '../actions/feedback'
import './feedback.css';
import './header-footer.css'
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';



class Feedback extends Component {

    constructor() {
        super()
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.email = React.createRef();
        this.phone = React.createRef();
        this.zip = React.createRef();
        this.usState = React.createRef();
        this.subject = React.createRef();
        this.comment = React.createRef();
        this.state = {
            characterCount: 500,
            firstNameValid: false,
            firstNameErrorClass: "",
            lastNameValid: false,
            lastNameErrorClass: "",
            emailValid: false,
            emailErrorClass: ""
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
              <div className="feedback-input-container"><label>*First Name</label><input ref={this.firstName} className={this.state.firstNameErrorClass}maxLength="25" onChange={(e)=>{
                  if(e.target.value){
                      this.setState({
                          firstNameValid: true,
                          firstNameErrorClass: ""
                      })
                  } else {
                    this.setState({
                        firstNameValid: false,
                        firstNameErrorClass: "input-error"
                    }) 
                  }
              }}/></div>
              <div className="feedback-input-container"><label>*Last Name</label><input ref={this.lastName} className={this.state.lastNameErrorClass} maxLength="25" onChange={(e)=>{
                  if(e.target.value){
                      this.setState({
                          lastNameValid: true,
                          lastNameErrorClass: ""
                      })
                  } else {
                    this.setState({
                        lastNameValid: false,
                        lastNameErrorClass: "input-error"
                    }) 
                  }
              }}/></div>
              <div className="feedback-input-container"><label>*Email</label><input ref={this.email} className={this.state.emailErrorClass} maxLength="75" onChange={(e)=>{
                  if(e.target.value){
                      this.setState({
                          emailValid: true,
                          emailErrorClass: ""
                      })
                  } else {
                    this.setState({
                        emailValid: false,
                        emailErrorClass: "input-error"
                    }) 
                  }
              }}/></div>
              <div className="feedback-input-container"><label>Phone</label><input ref={this.phone} maxLength="10" size="10" onKeyPress={(e)=>{
                  const keyCode = e.keyCode || e.which;
                  const keyValue = String.fromCharCode(keyCode);
                  if (keyCode != 46 && keyCode > 31 && (keyCode < 48 || keyCode > 57)){
                    e.preventDefault();
                  }    
              }}/></div>
              <div className="feedback-input-container"><label>ZIP code</label><input ref={this.zip} maxLength="5" size="5" onKeyPress={(e)=>{
                  const keyCode = e.keyCode || e.which;
                  const keyValue = String.fromCharCode(keyCode);
                  if (keyCode != 46 && keyCode > 31 && (keyCode < 48 || keyCode > 57)){
                    e.preventDefault();
                  }
                    
              }}/></div>
              <div className="feedback-input-container"><label>State</label>
                <select defaultValue="OR" ref={this.usState}>
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
                    <select name="subjects" ref={this.subject}>
                    <option value="I have a suggestion for a particular person/entity to add to the site">I have a suggestion for a particular person/entity to add to the site.</option>
                    <option value="I want to know more about how I can reach out to my representatives">I want to know more about how I can reach out to my representatives.</option>
                    <option value="I would like to report problems/errors with the site">I would like to report problems/errors with the site.</option>
                    <option value="Other">Other</option>
                    </select>
              </div>
              <div className="feedback-textarea-container">
                <label>Comment</label>
                <textarea ref={this.comment} maxLength="500" onChange={(e)=>{
                        this.setState({
                            characterCount: e.target.value.length ? 500 - e.target.value.length : 500
                        }) 
                }}/>
                <label className="character-limit">{this.state.characterCount} characters left</label>
              </div>
              <div className="feedback-button-container"><label className="feedback-submit-button" onClick={()=>{
                  if(!this.state.firstNameValid || (!this.state.lastNameValid || !this.state.emailValid)){
                      if(!this.state.firstNameValid){
                        this.setState({
                            firstNameErrorClass: "input-error"
                        })
                      }

                      if(!this.state.lastNameValid){
                        this.setState({
                            lastNameErrorClass: "input-error"
                        })
                      }

                      if(!this.state.emailValid){
                        this.setState({
                            emailErrorClass: "input-error"
                        })
                      }
                  } else {
                      const data = {
                        subject: this.subject.current.value || "",
                        firstName: this.firstName.current.value || "",
                        lastName: this.lastName.current.value || "",
                        email: this.email.current.value || "",
                        phone: this.phone.current.value || "",
                        zip: this.zip.current.value || "",
                        state: this.usState.current.value || "",
                        comment: this.comment.current.value || ""
                      }
                      this.props.dispatch(showModal('feedback-modal'))
                      this.props.dispatch(sendFeedback(data))
                      .then((res)=>{})

                  }
              }}>Submit</label></div>
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