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
      if(this.props.id === "new") {
        return (
            <div className="pro-list-item-active-edit">
            <div>
              <label className="title-label">Title</label>
              <input className="title-input" ref={this.title}/>
  
              <label className="quote-label">Quote</label>
              <textarea className="quote-input" ref={this.quote}/>

              <label className="quote-ref-label">Quote Reference</label>
              <input className="quote-ref-input" ref={this.quoteReference}/>
              
              <label className="quote-link-label">Quote Link</label>
              <input className="quote-link-input" ref={this.quoteLink}/>

              <label className="description-label">Comments</label>
              <textarea className="description-input" ref={this.description}/>

              <label className="image-upload-label">Image</label>
              <input className="image-upload-input" name="file" key={this.state.key} ref={this.image} type="file" accept="image/png, image/jpeg" onChange={(e)=>{
                this.setState({key: Math.random()})
              }}/>

              <div className="active-image-container-edit">
                <img className="image" src={this.image.current? URL.createObjectURL(this.image.current.files[0]) :"http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
              </div>

              <button className="confirm-button" onClick={()=>{
                const data = new FormData();
                data.append('title', this.title.current.value)
                data.append('quote', this.quote.current.value)
                data.append('quoteReference', this.quoteReference.current.value)
                data.append('quoteLink', this.quoteLink.current.value)
                data.append('description', this.description.current.value)
                data.append('image', this.image.current.files[0])
              }}>Confirm</button>
  
              <button className="cancel-button" onClick={()=>{
                if(this.image.current){URL.revokeObjectURL(this.image.current.files[0])}
                document.body.style.overflow = "visible"
                this.props.dispatch(hideModal())}}>X
              </button>

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
            <div className="pro-list-item-active-edit">
              <div>
                <label className="title-label">Title</label>
                <input className="title-input" ref={this.title} defaultValue={this.props.activeProPost.title}/>
    
                <label className="quote-label">Quote</label>
                <textarea className="quote-input" ref={this.quote} defaultValue={this.props.activeProPost.quote}/>
  
                <label className="quote-ref-label">Quote Reference</label>
                <input className="quote-ref-input" ref={this.quoteReference} defaultValue={this.props.activeProPost.quoteReference}/>
                
                <label className="quote-link-label">Quote Link</label>
                <input className="quote-link-input" ref={this.quoteLink} defaultValue={this.props.activeProPost.quoteLink}/>
  
                <label className="description-label">Comments</label>
                <textarea className="description-input" ref={this.description} defaultValue={this.props.activeProPost.description}/>
  
                <label className="image-upload-label">Image</label>
                <input className="image-upload-input" name="file" ref={this.image} type="file" accept="image/png, image/jpeg"/>
  
                <div className="active-image-container-edit">
                  <img className="image" src={this.props.activeProPost.imgUrl}/>
                </div>
  
                <button className="confirm-button" onClick={()=>{
                  const data = new FormData();
                  data.append('title', this.title.current.value)
                  data.append('quote', this.quote.current.value)
                  data.append('quoteReference', this.quoteReference.current.value)
                  data.append('quoteLink', this.quoteLink.current.value)
                  data.append('description', this.description.current.value)
                  data.append('image', this.image.current.files[0])
                }}>Confirm</button>
    
                <button className="cancel-button" onClick={()=>{
                  document.body.style.overflow = "visible"

                  this.props.dispatch(hideModal())
                  this.props.dispatch(proSetEdit(false))
                  }}>Cancel</button>
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

            <p className="quote">{this.props.activeProPost.quote}
                {this.props.activeProPost.quoteLink ? <span className="reference-span">- <a target="_blank" href={this.props.activeProPost.quoteLink}>{this.props.activeProPost.quoteReference}</a></span> : <span className="reference-span">- {this.props.activeProPost.quoteReference}</span>}</p>
            {this.props.activeProPost.description ? <p className="comments">{this.props.activeProPost.description}</p> : <p/>}
            
            <button className="collapse-button" onClick={()=>{
              document.body.style.overflow = "visible"
              this.props.dispatch(this.props.dispatch(hideModal()))
            }}>X</button>

            <button className="edit-button"onClick={()=>{
              this.props.dispatch(proSetEdit(true))
            }}>Edit</button>
            <button className="delete-button" onClick={()=>{
              this.props.dispatch(deleteProPost(this.props.id))
              }}>Delete</button>
              </div>
            </div>)
        }
      }
    }}
}

const mapStateToProps = state => ({
    editing: state.proReducers.editing,
    loading: state.proReducers.activeProPostLoading,
    imgUrl: state.proReducers.imgUrl,
    activeProPost: state.proReducers.activeProPost
  });

export default connect (mapStateToProps) (ActiveProCard)