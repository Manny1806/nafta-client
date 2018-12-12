import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchProPosts, addEmptyProEntry, editProPost, addProPost, deleteProPost, proSetEdit, proSetExpanded} from '../actions/home/pro-actions';
import './current-column.css';
import './edit.css'

class Card extends React.Component {
    //cards start out collapsed 
    state = { 
              values: { title: this.props.cardItem.title ? this.props.cardItem.title : "",
                        quote: this.props.cardItem.quote ? this.props.cardItem.quote : ""
              }      
    };

    render() {
      if((this.props.expanded === this.props.id) && (this.props.editing === this.props.id)){
        return (
          <div className="pro-list-item-active">
            <div>
              <label className="title-label">Title</label>
              <input className="title-input"defaultValue={this.props.cardItem.title} onChange={(e)=>{
                var x = Object.assign(this.state.values, {title: e.target.value})
                this.setState({values: x})}}/>
  
              <label className="quote-label">Quote</label>
              <textarea className="quote-input"defaultValue={this.props.cardItem.quote} onChange={(e)=>{
                var x = Object.assign(this.state.values, {quote: e.target.value})
                this.setState({values: x})}}/>
  
              <button className="confirm-button" onClick={()=>{
                if(this.props.id === "new"){
                  this.props.dispatch(proSetEdit("none"))
                  this.props.dispatch(proSetExpanded("none"))
                  this.props.dispatch(addProPost(this.state.values))
                  // this.setState({editing: false})
                } else {
                  this.props.dispatch(editProPost(this.props.id, this.state.values))
                  this.props.dispatch(proSetEdit("none"))
                }
                
                }}>Confirm</button>
  
              <button className="cancel-button" onClick={()=>{
                if(this.props.id === "new"){
                  this.props.dispatch(proSetEdit("none"))
                  this.props.dispatch(proSetExpanded("none"))
                  this.props.dispatch(fetchProPosts())
                } else {
                  this.props.dispatch(proSetEdit("none"))
                }
                }}>Cancel</button>
            </div>
          </div>
        );
      } else if(!(this.props.editing === this.props.id) && !(this.props.expanded === this.props.id)){
        
        return (
          <div className="pro-list-item"
            onClick={() => {
              if(this.props.expanded === "new"){
                this.props.dispatch(fetchProPosts())
              }
              this.props.dispatch(proSetEdit("none"))
              this.props.dispatch(proSetExpanded(this.props.id));}}>
            <div>
              <h2>{this.props.cardItem.title}</h2>
              <div className="image-container">
                <img className="image" src="https://www.w3.org/html/logo/downloads/HTML5_Badge_256.png"/>
              </div>
              <div className="quote-container">
                <p>{this.props.cardItem.quote}</p>
                <div className="read-more"/>
              </div>
            </div>
          </div>
        );
      } else if(!(this.props.editing === this.props.id) && (this.props.expanded === this.props.id)){
        return(
        <div className="pro-list-item-active">
            <div>
              <h2>{this.props.cardItem.title}</h2>
              <div className="active-image-container">
                <img className="image" src="https://www.w3.org/html/logo/downloads/HTML5_Badge_256.png"/>
              </div>
              <p>{this.props.cardItem.quote}</p>
              <button className="collapse" onClick={()=>this.props.dispatch(proSetExpanded("none"))}>Collapse</button>
              <button className="edit"onClick={()=>{ 
                this.setState({ values: { title: this.props.cardItem.title ? this.props.cardItem.title : "",
                        quote: this.props.cardItem.quote ? this.props.cardItem.quote : ""}
              })
                this.props.dispatch(proSetEdit(this.props.id))
              }}>Edit</button>
              <button className="delete" onClick={()=>{
                this.props.dispatch(deleteProPost(this.props.id))
                this.props.dispatch(proSetExpanded("none"))
                }}>Delete</button>
            </div>
          </div>
        )
      }
    }
  }

  const mapStateToProps = state => ({
    editing: state.proReducers.editing,
    expanded: state.proReducers.expanded
  });

  export default connect (mapStateToProps) (Card)