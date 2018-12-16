import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchProPosts, addEmptyProEntry, editProPost, addProPost, deleteProPost, proSetEdit, proSetExpanded, uploadProImage, proSetImgUrl} from '../actions/home/pro-actions';
import './current-column.css';
import './edit.css'

class Card extends React.Component {
    //cards start out collapsed 
    state = { 
              values: { title: this.props.cardItem.title ? this.props.cardItem.title : "",
                        quote: this.props.cardItem.quote ? this.props.cardItem.quote : "",
                        quoteReference: this.props.cardItem.quoteReference ? this.props.cardItem.quoteReference : "",
                        quoteLink: this.props.cardItem.quoteLink ? this.props.cardItem.quoteLink : "",
                        description: this.props.cardItem.description ? this.props.cardItem.description: "",
                        imgUrl: this.props.cardItem.imgUrl ? this.props.cardItem.imgUrl: "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"
              }      
    };

    getLoadingStatus() {
      if(this.props.loading) {
        return (<section className="small-loader"/>)}
      else {
          return (
            <div>
            <h2>{this.props.cardItem.title}</h2>
            <div className="active-image-container">
              <img className="image" src={this.props.cardItem.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
            </div>
            <p className="quote">{this.props.cardItem.quote}
                {this.props.cardItem.quoteLink ? <span className="reference-span">- <a target="_blank" href={this.props.cardItem.quoteLink}>{this.props.cardItem.quoteReference}</a></span> : <span className="reference-span">- {this.props.cardItem.quoteReference}</span>}</p>
            {this.props.cardItem.description ? <p className="comments">{this.props.cardItem.description}</p> : <p/>}
            <button className="collapse-button" onClick={()=>this.props.dispatch(proSetExpanded("none"))}>Collapse</button>
            <button className="edit-button"onClick={()=>{
              this.setState({ values: { title: this.props.cardItem.title ? this.props.cardItem.title : "",
                      quote: this.props.cardItem.quote ? this.props.cardItem.quote : "",
                      quoteReference: this.props.cardItem.quoteReference ? this.props.cardItem.quoteReference : "",
                      quoteLink: this.props.cardItem.quoteLink ? this.props.cardItem.quoteLink : "",
                      description: this.props.cardItem.description ? this.props.cardItem.description : "",
                      imgUrl: this.props.cardItem.imgUrl ? this.props.cardItem.imgUrl : "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"
                    }
              })
              this.props.dispatch(proSetImgUrl(this.props.cardItem.imgUrl))
              this.props.dispatch(proSetEdit(this.props.id))
            }}>Edit</button>
            <button className="delete-button" onClick={()=>{
              this.props.dispatch(deleteProPost(this.props.id))
              this.props.dispatch(proSetExpanded("none"))
              }}>Delete</button>
            </div>)
        }
      }

    render() 
      {
        //EXPANDED AND EDITING
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

              <label className="quote-ref-label">Quote Reference</label>
              <input className="quote-ref-input"defaultValue={this.props.cardItem.quoteReference} onChange={(e)=>{
                var x = Object.assign(this.state.values, {quoteReference: e.target.value})
                this.setState({values: x})}}/>
              
              <label className="quote-link-label">Quote Link</label>
              <input className="quote-link-input"defaultValue={this.props.cardItem.quoteLink} onChange={(e)=>{
                var x = Object.assign(this.state.values, {quoteLink: e.target.value})
                this.setState({values: x})}}/>

              <label className="description-label">Comments</label>
              <textarea className="description-input"defaultValue={this.props.cardItem.description} onChange={(e)=>{
                var x = Object.assign(this.state.values, {description: e.target.value})
                this.setState({values: x})}}/>

              <label className="image-upload-label">Upload Image</label>
              <input className="image-upload-input" name="file" type="file" accept="image/png, image/jpeg" onChange={(e)=>{
                const data = new FormData();
                data.append('file', e.target.files[0]);
                this.props.dispatch(uploadProImage(data))
              }}/>

              <button className="confirm-button" onClick={()=>{
                if(this.props.id === "new"){
                  this.props.dispatch(proSetEdit("none"))
                  this.props.dispatch(proSetExpanded("none"))
                  this.props.dispatch(addProPost(this.state.values))
                } else {
                  console.log(this.props.cardItem)
                  var x = Object.assign(this.state.values, {imgUrl: this.props.imgUrl})
                  this.props.dispatch(editProPost(this.props.id, this.props.cardIndex, x))
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
                <img className="image" src={this.props.cardItem.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
              </div>
              <div className="quote-container">
                <p>{this.props.cardItem.quote}</p>
                <div className="read-more"/>
              </div>
            </div>
          </div>
        );
      } else if(!(this.props.editing === this.props.id) && (this.props.expanded === this.props.id)){
        return (
        <div className="pro-list-item-active">
          {this.getLoadingStatus()}
        </div>
        );
      }}
    }
  

  const mapStateToProps = state => ({
    editing: state.proReducers.editing,
    expanded: state.proReducers.expanded,
    loading: state.proReducers.editLoading,
    imgUrl: state.proReducers.imgUrl
  });

  export default connect (mapStateToProps) (Card)