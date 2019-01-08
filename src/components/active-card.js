import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchProPosts, addEmptyProEntry, editProPost, addProPost, deleteProPost, proSetEdit, proSetExpanded, uploadProImage, proSetImgUrl} from '../actions/home/pro-actions';

class ActiveCard extends React.Component {
    render() {
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

              <label className="image-upload-label">Upload Image</label>
              <input className="image-upload-input" name="file" type="file" accept="image/png, image/jpeg" onChange={(e)=>{
                const data = new FormData();
                data.append('file', e.target.files[0]);
                this.props.dispatch(uploadProImage(data))
              }}/>

              <button className="confirm-button" onClick={()=>{
                if(this.props.id === "new"){
                //   this.props.dispatch(proSetEdit("none"))
                //   this.props.dispatch(proSetExpanded("none"))
                //   this.props.dispatch(addProPost(this.state.values))
                } else {
                //   console.log(this.props.cardItem)
                //   var x = Object.assign(this.state.values, {imgUrl: this.props.imgUrl})
                //   this.props.dispatch(editProPost(this.props.id, this.props.cardIndex, x))
                //   this.props.dispatch(proSetEdit("none"))
                }
                }}>Confirm</button>
  
              <button className="cancel-button" onClick={()=>{
                if(this.props.id === "new"){
                //   this.props.dispatch(proSetEdit("none"))
                //   this.props.dispatch(proSetExpanded("none"))
                  this.props.dispatch(fetchProPosts())
                } else {
                //   this.props.dispatch(proSetEdit("none"))
                }
                }}>Cancel</button>
            </div>
          </div>
        )
    }
}

const mapStateToProps = state => ({
    editing: state.proReducers.editing,
    // expanded: state.proReducers.expanded,
    loading: state.proReducers.editLoading,
    imgUrl: state.proReducers.imgUrl
  });

export default connect (mapStateToProps) (ActiveCard)