import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../actions/home/modal'
import {fetchProPosts, addEmptyProEntry, editProPost, addProPost, deleteProPost, proSetEdit, proSetExpanded, uploadProImage, proSetImgUrl} from '../actions/home/pro-actions';

class ActiveProCard extends React.Component {
    render() {
      if(this.props.id === "new") {
        return (
            <div className="pro-list-item-active">
            <div>
              <label className="title-label">Title</label>
              <input className="title-input" />
  
              <label className="quote-label">Quote</label>
              <textarea className="quote-input" />

              <label className="quote-ref-label">Quote Reference</label>
              <input className="quote-ref-input"/>
              
              <label className="quote-link-label">Quote Link</label>
              <input className="quote-link-input"/>

              <label className="description-label">Comments</label>
              <textarea className="description-input"/>

              <label className="image-upload-label">Image</label>
              <input className="image-upload-input" name="file" type="file" accept="image/png, image/jpeg" onChange={(e)=>{
                const data = new FormData();
                data.append('file', e.target.files[0]);
                this.props.dispatch(uploadProImage(data))
              }}/>

              <div className="active-image-container">
                <img className="image" src="http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"/>
              </div>

              <button className="confirm-button" onClick={()=>{
                
                }}>Confirm</button>
  
              <button className="cancel-button" onClick={()=>{
                this.props.dispatch(hideModal())
                }}>Cancel</button>
            </div>
          </div>
        )
      } else {
        if(this.props.loading){
          return (
            <section className="small-loader"/>
          )
        } else {
        if(this.props.editing){
          
          return (
            <div className="pro-list-item-active">
              <div>
                <label className="title-label">Title</label>
                <input className="title-input" defaultValue={this.props.activeProPost.title}/>
    
                <label className="quote-label">Quote</label>
                <textarea className="quote-input" defaultValue={this.props.activeProPost.quote}/>
  
                <label className="quote-ref-label">Quote Reference</label>
                <input className="quote-ref-input" defaultValue={this.props.activeProPost.quoteReference}/>
                
                <label className="quote-link-label">Quote Link</label>
                <input className="quote-link-input" defaultValue={this.props.activeProPost.quoteLink}/>
  
                <label className="description-label">Comments</label>
                <textarea className="description-input" defaultValue={this.props.activeProPost.description}/>
  
                <label className="image-upload-label">Image</label>
                <input className="image-upload-input" name="file" type="file" accept="image/png, image/jpeg" onChange={(e)=>{
                  const data = new FormData();
                  data.append('file', e.target.files[0]);
                  this.props.dispatch(uploadProImage(data))
                }}/>
  
                <div className="active-image-container">
                  <img className="image" src={this.props.activeProPost.imgUrl}/>
                </div>
  
                <button className="confirm-button" onClick={()=>{
                  
                  }}>Confirm</button>
    
                <button className="cancel-button" onClick={()=>{
                  this.props.dispatch(hideModal())
                  }}>Cancel</button>
              </div>
            </div>
          )
        } else {
          return (
            <div>
            <h2>{this.props.activeProPost.title}</h2>
            <div className="active-image-container">
              <img className="image" src={this.props.activeProPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
            </div>
            <p className="quote">{this.props.activeProPost.quote}
                {this.props.activeProPost.quoteLink ? <span className="reference-span">- <a target="_blank" href={this.props.activeProPost.quoteLink}>{this.props.activeProPost.quoteReference}</a></span> : <span className="reference-span">- {this.props.activeProPost.quoteReference}</span>}</p>
            {this.props.activeProPost.description ? <p className="comments">{this.props.activeProPost.description}</p> : <p/>}
            <button className="collapse-button" onClick={()=>this.props.dispatch(proSetExpanded("none"))}>Collapse</button>
            <button className="edit-button"onClick={()=>{
              this.props.dispatch(proSetEdit(true))
            }}>Edit</button>
            <button className="delete-button" onClick={()=>{
              this.props.dispatch(deleteProPost(this.props.id))
              // this.props.dispatch(proSetExpanded("none"))
              }}>Delete</button>
            </div>)
        }
      }
    }}
}

const mapStateToProps = state => ({
    editing: state.proReducers.editing,
    // expanded: state.proReducers.expanded,
    loading: state.proReducers.activeProPostLoading,
    imgUrl: state.proReducers.imgUrl,
    activeProPost: state.proReducers.activeProPost
  });

export default connect (mapStateToProps) (ActiveProCard)