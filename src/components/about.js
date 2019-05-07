import React, { Component } from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './modal'
import { showModal } from '../actions/home/modal'
import './about.css';
import './header-footer.css'
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';



class About extends Component {

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
      <section className="About">
      <Modal />
        
          <header className="banner-container">
          <div className="banner-transparency"/>
            <div className="logo-image-container">
            <Link to="/"><img className="logo-image" alt="NAFTA Reactor logo" src="https://res.cloudinary.com/siouxcitymusic/image/upload/v1549600202/NAFTA_Reactor_logo_new.png"/></Link>
            </div>
            <div className="header-menu">
              <nav><span><Link to="/">home</Link></span></nav>
              <nav><span><Link to="/about">about</Link></span></nav>
              
              <nav><span><Link to="/feedback">feedback</Link></span></nav>
              
            </div>
          
          </header>
        
        <div className="about-body">
          <h2>This website is composed entirely of quotes...</h2>
          <p className="about-text-1">
           Quotes of organizations' and individuals' remarks on the the new NAFTA. Some of these are big business interests, some are media, some are defenders of people and the planet.  
          And some are those who will decide the fate of the new NAFTA: members of the U.S. Congress.
          <br/><br/>
          We suggest you take particular care in reading the member-of-Congress remarks on NAFTA 2.0.  If your members of Congress 
          are not on the record, <a target="_blank" rel="noopener noreferrer" href="https://www.usa.gov/elected-officials">reach out to them</a>.
          <br/><br/>
          NAFTA Reactor is brought to you by Oregon Fair Trade Campaign.  We are a nonprofit, grassroots coalition of a broad range 
          of organizations working in Oregon to establish social and eco justice in how our country does trade.  We organize to win a 
          dramatically remade, re-understood NAFTA, and absent that, believe a NAFTA rewrite/rebrand falls short and should be rejected.  
          Our demands as far as the shape of a dramatically remade NAFTA can be read <a target="_blank" rel="noopener noreferrer" href="https://www.citizenstrade.org/ctc/wp-content/uploads/2018/03/NAFTAOrgSignOnLetter_032118.pdf">here</a>.
          <br/><br/>
          Organize with us on our organization's <a target="_blank" rel="noopener noreferrer" href="https://www.citizenstrade.org/ctc/oregon/">site</a>. If you're not in Oregon, 
          link up with our affiliated groups, such as <a target="_blank" rel="noopener noreferrer" href="https://www.citizenstrade.org/ctc/">Citizens Trade Campaign</a> (national) or state-based trade
          justice <a target="_blank" rel="noopener noreferrer" href="https://www.citizenstrade.org/ctc/about-ctc/ctc-member-organizations-state-coalitions/">coalitions</a> like us near you.
          <br/><br/>
          Drop us a line in our Feedback page.  If there is an entity or person whose quote on the new NAFTA you would like to see thrown 
          in the NAFTA Reactor, let us know.
          </p>
          <h2>Helpful Links</h2>
          <p className="about-text-1">
            <a target="_blank" rel="noopener noreferrer" href="https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement/agreement-between">The text of the new NAFTA, according to the USTR (United States Trade Representative)</a>
            <br/><br/>
            <a target="_blank" rel="noopener noreferrer" href="http://infographic.replacenafta.org/the-selling-of-nafta-2-0-is-a-lot-like-that-of-the-original-nafta/">The selling of NAFTA 2.0 as compared to selling of NAFTA in 1993</a>
            <br/><br/>
            <a target="_blank" rel="noopener noreferrer" href="https://www.citizenstrade.org/ctc/wp-content/uploads/2018/03/ReplaceNAFTASignOnLetter_TextReleaseAnnotations_1018.pdf">How the new NAFTA measures up against public-interest demands, as presented by Citizens Trade Campaign</a>
            <br/><br/>
            <a target="_blank" rel="noopener noreferrer" href="http://infographic.replacenafta.org/">How the new NAFTA measures up against public-interest demands, as presented by Public Citizen's Global Trade Watch</a>
            <br/><br/>
            <a target="_blank" rel="noopener noreferrer" href="https://www.citizen.org/potentially-lethal-new-nafta-ip-chapter-requires-10-year-biologics-monopolies-worst-such-rule-us-fta">The new NAFTA's impacts on people's access to medicines</a>
            <br/><br/>
            <a target="_blank" rel="noopener noreferrer" href="https://aflcio.org/aboutleadershipstatements/trade-must-build-inclusive-economy-all">Statement by the AFL-CIO Executive Council re: NAFTA and trade</a>
          </p>
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


export default connect(mapStateToProps)(About);