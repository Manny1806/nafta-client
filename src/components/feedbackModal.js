import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../actions/home/modal'
import './feedbackModal.css'
import './edit.css'

class FeedbackModal extends React.Component {

    render() {
        if(this.props.loading){
            return (
                <div className="feedback-modal-container">
                    <div className="small-loader center-loader"/>
                </div>
            )
        }
        else {
            return (
                <div className="feedback-modal-container">
                    <h2 className="feedback-modal-header">{this.props.response}</h2>
                    <label className="feedback-modal-close" onClick={()=>{
                            document.body.style.overflow = "visible"
                            this.props.dispatch(hideModal())
                        }}>x</label>
                    
                    <label className="feedback-modal-close-button" onClick={
                            ()=>{
                                document.body.style.overflow = "visible"
                                this.props.dispatch(hideModal())
                            }
                        }>Close</label>
                    
                </div>
            )
        }
        }

}

const mapStateToProps = state => ({
    response: state.feedback.response,
    loading: state.feedback.loading
  });

export default connect(mapStateToProps)(FeedbackModal)