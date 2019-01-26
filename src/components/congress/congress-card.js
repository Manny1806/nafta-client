import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchCongressPosts, addEmptyCongressEntry, editCongressPost, addCongressPost, deleteCongressPost, congressSetEdit, congressSetExpanded, uploadCongressImage, congressSetImgUrl, getActiveCongressPost} from '../../actions/home/congress-actions';
import { showModal } from '../../actions/home/modal'
import '../current-column.css';
import '../edit.css'

class CongressCard extends React.Component {
    render() 
      {
        return (
          <div className="pro-list-item"
            onClick={() => {
              document.body.style.overflow = "hidden"
              this.props.dispatch(getActiveCongressPost(this.props.id))
              this.props.dispatch(showModal("active-congress-card"))
              }}>
            <div>
              <div className="image-container">
                <img className="image" src={this.props.cardItem.imgUrl || "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG"}/>
              </div>
              <h2>{this.props.cardItem.title}</h2>
              <div className="quote-container">
                <p>{this.props.cardItem.quote}</p>
                <div className="read-more"/>
              </div>
            </div>
          </div>
        );
      } 
    }
  

  const mapStateToProps = state => ({
    editing: state.congressReducers.editing,
    expanded: state.congressReducers.expanded,
    loading: state.congressReducers.editLoading,
    imgUrl: state.congressReducers.imgUrl
  });

  export default connect (mapStateToProps) (CongressCard)