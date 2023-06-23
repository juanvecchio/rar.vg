import React from 'react'
import {hasActiveSession, tryRegister} from "../utils/session.util";

import '../index.css'
import './form.css'
import Link from "../router/link";

export default class Register extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            emailField: null,
            passwordField: null,
            nameField: null,
            passConfField: null,
            dateField: null,
            usernameField: null,
            message: null,
            sent: false,
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handlePassConfChange = this.handlePassConfChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount()
    {
        if (hasActiveSession())
        {
            window.location.href = "/dashboard"
        }
    }

    handleEmailChange(event)
    {
        this.setState({emailField: event.target.value})
    }

    handleUsernameChange(event)
    {
        this.setState({usernameField: event.target.value})
    }

    handleNameChange(event)
    {
        this.setState({nameField: event.target.value})
    }

    handleDateChange(event)
    {
        this.setState({dateField: event.target.value})
    }

    handlePassChange(event)
    {
        this.setState({passwordField: event.target.value})
    }

    handlePassConfChange(event)
    {
        this.setState({passConfField: event.target.value})
    }

    displayMessage(message)
    {
        this.setState({message: message})
        setTimeout(() => this.setState({message: null}), 10000)
    }

    handleSubmit(event)
    {
        event.preventDefault()
        if (this.state.emailField && this.state.passwordField && this.state.nameField
            && this.state.passConfField && this.state.usernameField && this.state.dateField)
        {
            if (this.state.passwordField !== this.state.passConfField)
                return this.displayMessage({type: "error", message: "Passwords don't match! Try again."})
            this.register(this.state.usernameField, this.state.nameField, this.state.emailField, this.state.passwordField, this.state.dateField)
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

    register(username, displayName, email, password, dateOfBirth)
    {
        tryRegister(displayName, username, email, password, dateOfBirth).then(response =>
        {
            if (!response.success)
            {
                const parsedResponse = JSON.parse(response.content)
                if (parsedResponse.email && parsedResponse.username)
                    return this.displayMessage({
                        type: 'error',
                        message: 'The username and email have already been chosen!'
                    })
                if (parsedResponse.email && !parsedResponse.username)
                    return this.displayMessage({
                        type: 'error',
                        message: 'An account with that email has already been registered!'
                    })
                if (!parsedResponse.email && parsedResponse.username)
                    return this.displayMessage({
                        type: 'error',
                        message: 'That username has already been chosen!'
                    })
            }
            this.setState({sent: true})
        })
    }

    renderFields = sent => {
        return sent ? <div class="login-form">
            <h1 class="mm code-title p-no-margin-top">We sent you a link to your email in order to verify your account.
                Please check both your inbox and spam folder.</h1>
            <h1 class="m code-title p-no-margin-bottom">You may close this tab.</h1>
        </div> : <form className="login-form" onSubmit={this.handleSubmit}>
            {this.drawMessage(this.state.message)}
            <h1 className="l p-no-margin-top">Sign up</h1>
            <input type="text" placeholder="Display name" value={this.state.nameField}
                onChange={this.handleNameChange}/>
            <input type={"email"} placeholder={"Email"} value={this.state.emailField}
                onChange={this.handleEmailChange}/>
            <div className="placeholder text smaller-input" data-placeholder=".rar.vg">
                <input type="text" placeholder="Username / Domain" value={this.state.usernameField}
                    onChange={this.handleUsernameChange}/>
            </div>
            <input type="date" placeholder="Date of Birth" value={this.state.dateField}
                onChange={this.handleDateChange}/>
            <input type="password" placeholder="Password" value={this.state.passwordField}
                onChange={this.handlePassChange}/>
            <input className="input-no-margin" type="password" placeholder="Repeat your password"
                value={this.state.passConfField} onChange={this.handlePassConfChange}/>
            <button className="mm login-button">Submit</button>
            <div className={"links"}>
                <Link to={"/login"}><span className={"ss"}>Already have an account?</span></Link><br/>
            </div>
        </form>
    }

    render()
    {
        return <div className={"animated"} style={{
            background: "linear-gradient(-45deg, #424116, #194111, #0a2833, #630f0f)",
            backgroundSize: "400% 400%"
        }}>
            <div className="container">
                <div className="logotype">👋 rar.vg</div>
                {this.renderFields(this.state.sent)}
            </div>
        </div>
    }
}