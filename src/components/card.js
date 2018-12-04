import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchProPosts, addEmptyProEntry, editProPost, addProPost, deleteProPost} from '../actions/home/pro-actions';
import './current-column.css';
import './edit.css'

class Card extends React.Component {
    //cards start out collapsed 
    state = { expanded: false, editing: false,
              values: { title: this.props.cardItem.title ? this.props.cardItem.title : "",
                        quote: this.props.cardItem.quote ? this.props.cardItem.quote : ""
              }      
    };

    render() {
      if(this.state.editing || this.props.cardItem.new){
        console.log(this.props.cardItem.title)
        console.log(this.state.values.title)
        return (
          <div className="pro-list-item-active">
            <div>
              <h2><label>Title<input className="title-input"defaultValue={this.props.cardItem.title} onChange={(e)=>{
                var x = Object.assign(this.state.values, {title: e.target.value})
                this.setState({values: x})}}/></label></h2>
  
              <p><label>Quote<textarea className="quote-input"defaultValue={this.props.cardItem.quote} onChange={(e)=>{
                var x = Object.assign(this.state.values, {quote: e.target.value})
                this.setState({values: x})}}/></label></p>
  
              <button onClick={()=>{
                if(this.props.cardItem.new){
                  this.props.dispatch(addProPost(this.state.values))
                  this.setState({editing: false})
                } else {
                  this.props.dispatch(editProPost(this.props.id, this.state.values))
                  this.setState({editing: false})
                }
                
                }}>Confirm</button>
  
              <button onClick={()=>{
                if(this.props.cardItem.new){
                  this.props.dispatch(fetchProPosts())
                } else {
                  this.setState({editing: false})
                }
                }}>Cancel</button>
            </div>
          </div>
        );
      } else if(!this.state.editing && !this.state.expanded){
        return (
          <div className="pro-list-item"
            onClick={() => {this.setState({ expanded: !this.state.expanded });}}>
            <div>
              <h2>{this.props.cardItem.title}</h2>
              <div className="quote-container">
                <p>{this.props.cardItem.quote}</p>
                <div className="read-more"/>
              </div>
            </div>
          </div>
        );
      } else if(!this.state.editing && this.state.expanded){
        return(
        <div className="pro-list-item-active">
            <div>
              <h2>{this.props.cardItem.title}</h2>
              <p>{this.props.cardItem.quote}</p>
              <button onClick={()=>this.setState({expanded: false})}>Collapse</button>
              <button onClick={()=>this.setState({editing: true, values: { title: this.props.cardItem.title ? this.props.cardItem.title : "",
                        quote: this.props.cardItem.quote ? this.props.cardItem.quote : ""}
              })}>Edit</button>
              <button onClick={()=>{
                this.props.dispatch(deleteProPost(this.props.id))
                this.setState({expanded: false})
                }}>Delete</button>
            </div>
          </div>
        )
      }
    }
  }

  

  export default connect () (Card)