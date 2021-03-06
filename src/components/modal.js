import React, { Component } from 'react'
import { hideModal } from '../actions/home/modal'
import { connect } from 'react-redux'
import ActiveProCard from './pro/active-pro-card'
import ActiveConCard from './con/active-con-card'
import ActiveCongressCard from './congress/active-congress-card'
import Login from './login/login'
import FeedbackModal from './feedbackModal'


import './modal.css'

class Modal extends Component {
  setPage() {
    if (this.props.page === 'active-pro-card'){
      return <ActiveProCard />
    }
    else if (this.props.page === 'active-con-card'){
      return <ActiveConCard />
    }
    else if (this.props.page === 'active-congress-card'){
      return <ActiveCongressCard />
    }
    else if (this.props.page === 'login'){
      return <Login />
    }
    else if (this.props.page === 'feedback-modal'){
      return <FeedbackModal />
    }
  }
  render() {

    return (
      <div className="modal">
        { this.props.isShowing &&
          <div>
            <div className="modal-backdrop" onClick={()=>{
              document.body.style.overflow = "visible"
              this.props.dispatch(hideModal())}}></div>
            <div className="confirm-modal-content">
            {this.setPage()} 
            </div>
          </div>
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    isShowing: state.modal.isShowing,
    page: state.modal.page,
    id: state.modal.id
  }
}

export default connect(mapStateToProps)(Modal)