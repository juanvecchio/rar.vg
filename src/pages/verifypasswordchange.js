import React from 'react'
import {verifyAccount} from "../utils/session.util";

import '../index.css'
import './form.css'

export default class VerifyPaswordChange extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            verified: null,
            passRes: null
        }
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handlePassConfChange = this.handlePassConfChange.bind(this)
    }

    componentDidMount()
    {
        const token = this.props.token
        verifyAccount(token).then(response =>
        {
            this.setState({verified: response})
        })
    }

    handleSubmit(event)
    {
        event.preventDefault()
        if (this.state.passwordField && this.state.passConfField)
        {
            if (this.state.passwordField !== this.state.passConfField)
                return this.displayMessage({type: "error", message: "Passwords don't match! Try again."})

            if (this.state.passwordField.length < 8 || !/\d/.test(this.state.passwordField))
                return this.displayMessage({
                    type: "error",
                    message: "Password must be composed of at least 8 characters and one number."
                })
            //TODO: request
        }
        else
        {
            this.displayMessage({type: "error", message: "Please complete every field before registering."})
        }
    }

    handlePassChange(event)
    {
        this.setState({passwordField: event.target.value})
    }

    handlePassConfChange(event)
    {
        this.setState({passConfField: event.target.value})
    }

    renderFields = verified =>
    {
        if (verified === null)
            return <div className={"login-form"}><h3 className='mm'>Loading...</h3></div>

        return verified.success ? <form onSubmit={this.handleSubmit} className="login-form">
            <h1 class="l p-no-margin-top">Please, insert new password</h1>
            <input type="m password" placeholder="Insert your password" onChange={this.handlePassChange}/>
            <input type="m password" placeholder="Repeat your password" onChange={this.handlePassConfChange}/>
            <button class="mm login-button">Confirm</button>
        </form> : <div className="login-form">
            <h1 className="m p-no-margin-top">{verified.content}</h1>
        </div>
    }

    render()
    {
        return <div className={"animated"} style={{
            background: "linear-gradient(-45deg, #381b12, #3b0f38, #02394d, #462506)",
            backgroundSize: "400% 400%"
        }}>
            <div className="container">
                <div className="logotype">👋 rar.vg</div>
                {this.renderFields(this.state.verified)}
            </div>
        </div>
    }
}