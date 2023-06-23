import React from 'react'
import {hasActiveSession, tryRegister} from "../utils/session.util";

import '../index.css'
import './form.css'
import Link from "../router/link";

export default class ChangePassword extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            emailField: null,
            message: null,
            sent: false,
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmailChange(event)
    {
        this.setState({emailField: event.target.value})
    }

    displayMessage(message)
    {
        this.setState({message: message})
        setTimeout(() => this.setState({message: null}), 10000)
    }

    handleSubmit(event)
    {
        event.preventDefault()
        if (this.state.emailField)
        {
            //TODO: change password
        }
        else
        {
            this.displayMessage({type: "error", message: "Please complete every field before registering."})
        }

    }

    drawMessage(message)
    {
        if (message) return (
            <div className={"message " + message.type}>
                {message.message}
            </div>
        )
    }

    renderFields = sent => {
        return sent ? <div className='login-form'>
            <h1 class="mm code-title p-no-margin-top">We sent you a link to your email in order to reset your password.
                Please check both your inbox and spam folder.</h1>
            <h1 class="m code-title p-no-margin-bottom">You may close this tab.</h1>
        </div> : <form onSubmit={this.handleSubmit} className="login-form">
                {this.drawMessage(this.state.message)}
                <h1 class="l p-no-margin-top">Request a new password</h1>
                <input className="m" type="text" placeholder="Email" onChange={this.handleEmailChange}/>
                <button className="mm login-button">Next</button>
            </form>
    }

    render()
    {
        return <div className={"animated"} style={{
            background: "linear-gradient(-45deg, #332b10, #521448, #0d460d, #0c4730)",
            backgroundSize: "400% 400%"
        }}>
            <div class="container">
                <div class="logotype">👋 rar.vg</div>
                    {this.renderFields(this.state.sent)}
            </div>
        </div>
    }
}