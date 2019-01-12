import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../actions/home/modal'
import {fetchProPosts, addEmptyProEntry, editProPost, addProPost, deleteProPost, proSetEdit, proSetExpanded, uploadProImage, proSetImgUrl} from '../actions/home/pro-actions';

class ActiveProCard extends React.Component {
    constructor(props) {
      super(props);
      this.quote = React.createRef();
      this.quoteReference = React.createRef();
      this.quoteLink = React.createRef();
      this.description = React.createRef();
      this.title = React.createRef();
      this.image = React.createRef();
      this.state = {
        key: Math.random()
      }
    }
    render() {
        if(this.props.loading){
          return (
            <section className="small-loader"/>
          )
        } else {
        if(this.props.editing){
          
          return (
            <div className="pro-list-item-active-edit">
              <div>
                <label className="title-label">Title</label>
                <input className="title-input" ref={this.title} defaultValue={this.props.activeProPost.title || ""}/>
    
                <label className="quote-label">Quote</label>
                <textarea className="quote-input" ref={this.quote} defaultValue={this.props.activeProPost.quote || ""}/>
  
                <label className="quote-ref-label">Quote Reference</label>
                <input className="quote-ref-input" ref={this.quoteReference} defaultValue={this.props.activeProPost.quoteReference || ""}/>
                
                <label className="quote-link-label">Quote Link</label>
                <input className="quote-link-input" ref={this.quoteLink} defaultValue={this.props.activeProPost.quoteLink || ""}/>
  
                <label className="description-label">Comments</label>
                <textarea className="description-input" ref={this.description} defaultValue={this.props.activeProPost.description || ""}/>
  
                <label className="image-upload-label">Image</label>
                <input className="image-upload-input" key={this.state.key} onChange={(e)=>{ this.setState({key: Math.random()})}} 
                  name="file" ref={this.image} type="file" accept="image/png, image/jpeg"/>
  
                <div className="active-image-container-edit">
                  <img className="image" src={this.image.current? URL.createObjectURL(this.image.current.files[0]) : this.props.activeProPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
                </div>
  
                <button className="confirm-button" onClick={()=>{
                  var id = this.props.activeProPost._id
                  const data = {
                    title: this.title.current.value,
                    quote: this.quote.current.value,
                    quoteReference: this.quoteReference.current.value || "",
                    quoteLink: this.quoteLink.current.value || "",
                    description: this.description.current.value || "",
                    imgUrl: ""
                  }
                  
                  // data.append('file', this.image.current.files[0])
                  id ? this.props.dispatch(editProPost(id, data)) : this.props.dispatch(addProPost(data))
                  document.body.style.overflow = "visible"
                  this.props.dispatch(hideModal())
                  this.props.dispatch(proSetEdit(false))
                }}>Confirm</button>
    
                <button className="cancel-button" onClick={()=>{
                  document.body.style.overflow = "visible"
                  this.props.dispatch(hideModal())
                  this.props.dispatch(proSetEdit(false))
                  }}>X</button>
              </div>
            </div>
          )
        } else {
          return (
            <div className="pro-list-item-active">
            <div>
            <h2>{this.props.activeProPost.title}</h2>

            <div className="active-image-container">
              <img className="image" src={this.props.activeProPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
            </div>

            <p className="quote">
                {this.props.activeProPost.quote}
                <span className="reference-span">- 
                  {this.props.activeProPost.quoteLink ? <a target="_blank" href={this.props.activeProPost.quoteLink}>{this.props.activeProPost.quoteReference}</a>:this.props.activeProPost.quoteReference}
                </span>
            </p>
                {this.props.activeProPost.description ? <p className="comments">{this.props.activeProPost.description}</p> : <p/>}
            
            <button className="collapse-button" onClick={()=>{
              document.body.style.overflow = "visible"
              this.props.dispatch(this.props.dispatch(hideModal()))
            }}>X</button>

            <button className="edit-button"onClick={()=>{
              this.props.dispatch(proSetEdit(true))
            }}>Edit</button>
            <button className="delete-button" onClick={()=>{
              this.props.dispatch(deleteProPost(this.props.activeProPost._id))
              document.body.style.overflow = "visible"
              this.props.dispatch(this.props.dispatch(hideModal()))
              }}>Delete</button>
              </div>
            </div>)
        }
      }
    }
}

const mapStateToProps = state => ({
    editing: state.proReducers.editing,
    loading: state.proReducers.activeProPostLoading,
    imgUrl: state.proReducers.imgUrl,
    activeProPost: state.proReducers.activeProPost
  });

export default connect (mapStateToProps) (ActiveProCard)