import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchProPosts, addEmptyProEntry, editProPost, addProPost, deleteProPost, proSetEdit, proSetExpanded, uploadProImage, proSetImgUrl, getActiveProPost} from '../../actions/home/pro-actions';
import { showModal } from '../../actions/home/modal'
import '../current-column.css';
import '../edit.css'

class ProCard extends React.Component {
  constructor(props) {
    super(props);
    this.quoteTitle = React.createRef();
    this.quoteText = React.createRef();
    this.state = {
      quoteText: ""
    }
    }
    
    componentDidMount(){
      let titleHeight = this.quoteTitle.current.clientHeight
      //240 - titleHeight
      this.quoteText.current.innerHTML = this.props.cardItem.quote
      
      while(this.quoteText.current.clientHeight >= (240 - titleHeight)){
        let lastSpaceIndex = this.quoteText.current.innerHTML.lastIndexOf(" ")
        this.quoteText.current.innerHTML = this.quoteText.current.innerHTML.slice(0, lastSpaceIndex) + "...."
      }

    }

    render() 
      {
        return (
          <div className="pro-list-item"
            onClick={() => {
              document.body.style.overflow = "hidden"
              this.props.dispatch(getActiveProPost(this.props.id))
              this.props.dispatch(showModal("active-pro-card"))
              }}>
            <div>
              <div className="image-container">
                <img className="image" src={this.props.cardItem.imgUrl || "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG"}/>
              </div>
              <h2 ref={this.quoteTitle}>{this.props.cardItem.title}</h2>
              <div className="quote-container">
                <p ref={this.quoteText}>
                {/* {this.props.cardItem.quote} */}
                
                </p>
                {/* <div className="read-more"/> */}
              </div>
            </div>
          </div>
        );
      } 
    }
  

  const mapStateToProps = state => ({
    editing: state.proReducers.editing,
    expanded: state.proReducers.expanded,
    loading: state.proReducers.editLoading,
    imgUrl: state.proReducers.imgUrl
  });

  export default connect (mapStateToProps) (ProCard)