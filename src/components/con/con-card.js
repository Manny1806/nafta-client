import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchConPosts, addEmptyConEntry, editConPost, addConPost, deleteConPost, conSetEdit, conSetExpanded, uploadConImage, conSetImgUrl, getActiveConPost} from '../../actions/home/con-actions';
import { showModal } from '../../actions/home/modal'
import '../current-column.css';
import '../edit.css'

class ConCard extends React.Component {
    render() 
      {
        return (
          <div className="pro-list-item"
            onClick={() => {
              document.body.style.overflow = "hidden"
              this.props.dispatch(getActiveConPost(this.props.id))
              this.props.dispatch(showModal("active-con-card"))
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
    editing: state.conReducers.editing,
    expanded: state.conReducers.expanded,
    loading: state.conReducers.editLoading,
    imgUrl: state.conReducers.imgUrl
  });

  export default connect (mapStateToProps) (ConCard)