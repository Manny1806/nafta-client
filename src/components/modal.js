import React, { Component } from 'react'
import { connect } from 'react-redux'
import ActiveProCard from './pro/active-pro-card'
import Login from './login/login'


import './modal.css'

class Modal extends Component {
  setPage() {
    if (this.props.page === 'active-pro-card'){
      return <ActiveProCard />
    }
    else if (this.props.page === 'login'){
      return <Login />
    }
  }
  render() {

    return (
      <div className="modal">
        { this.props.isShowing &&
          <div>
            <div className="modal-backdrop"></div>
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