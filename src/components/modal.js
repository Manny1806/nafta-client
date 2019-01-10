import React, { Component } from 'react'
import { connect } from 'react-redux'
import ActiveProCard from './active-pro-card'


import './modal.css'

class Modal extends Component {
  setPage() {
    if (this.props.page === 'active-pro-card-new'){
      return <ActiveProCard id="new"/>
    }
    else if (this.props.page === 'active-pro-card'){
      return <ActiveProCard />
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