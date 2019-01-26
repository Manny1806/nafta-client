import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/home/modal'
import {login} from '../../actions/auth';
import './login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
    }

render() {
    return (
        <div className="login-container">
            <h2 className="login-header">Log Into NAFTA Reactor</h2>
            <label className="login-close" onClick={()=>{
                    document.body.style.overflow = "visible"
                    this.props.dispatch(hideModal())
                }}>x</label>
            <section className="login-input-container">
                <label className="username-label">Username</label>
                <input className="username-input" ref={this.username}/>

                <label className="password-label">Password</label>
                <input className="password-input" type="password" ref={this.password}/>

            </section>

            <label className="login-button" onClick={
                    ()=>{
                        let username = this.username.current.value
                        let password = this.password.current.value
                        return this.props.dispatch(login(username, password))
                        .then(()=>{
                                document.body.style.overflow = "visible"
                                this.props.dispatch(hideModal())
                            }
                        )
                        .catch(err =>{
                            console.log(err)
                            }
                        )
                    }
                }>Log In</label>
            
        </div>
        )
    }
}


export default connect()(Login)