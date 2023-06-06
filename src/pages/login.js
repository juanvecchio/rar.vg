import React from 'react'
import {hasActiveSession, tryLogin} from "../utils/session.util";

import '../index.css'
import './form.css'

export default class Login extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            emailField: null,
            passwordField: null,
            message: null,
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
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

    handlePassChange(event)
    {
        this.setState({passwordField: event.target.value})
    }

    displayMessage(message)
    {
        this.setState({message: message})
        setTimeout(() => this.setState({message: null}), 10000)
    }

    handleSubmit(event)
    {
        event.preventDefault()
        if (this.state.emailField && this.state.passwordField)
        {
            this.login(this.state.emailField, this.state.passwordField)
            console.log('Attemping login...')
        }
        else
        {
            this.displayMessage({type: "error", message: "Fill every field to log in."})
            console.log('Missing parameters.')
        }

    }

    drawMessage(message)
    {
        if (message) return (
            <div className={message.type}>
                {message.message}
            </div>
        )
    }

    login(email, password)
    {
        tryLogin(email, password).then(response =>
        {
            if (!response.success)
                return this.displayMessage({type: 'error', message: response.content})
            window.location.href = '/dashboard'
        })
    }

    render()
    {
        return <div className={"animated"}>
            <div className="container">
                <div className="logotype">👋 rar.vg</div>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    {this.drawMessage(this.state.message)}
                    <h1 className="l p-no-margin-top">Log in</h1>
                    <input type="text" value={this.state.emailField} onChange={this.handleEmailChange}
                           placeholder="Email"/>
                    <input type="password" value={this.state.passwordField} onChange={this.handlePassChange}
                           placeholder="Password"/>
                    <button className="mm login-button">Submit</button>
                </form>
            </div>
        </div>
    }
}