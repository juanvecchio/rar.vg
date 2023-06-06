import React from "react";
import {tryUserLoading} from "../utils/session.util";
import config from '../../config/config.json'

import './dashboard.css'

export default class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount()
    {
        tryUserLoading().then(response =>
        {
            if (!response.success)
                return window.location.href = "/login"

            this.setState({user: response.content})
        })
    }

    render()
    {
        if (!this.state.user) return 'Loading...'
        return <div className="dashboard-container">
            <div className="dash-container">
                <div className="left">
                    <span
                        className="mmm p-no-margin-bottom p-no-margin-top welcome">👋 Welcome back, {this.state.user.displayName}!</span>
                    <div className="notice">You have unsaved changes!</div>
                </div>
                <div className="right">
                    <button className="publish-button">Publish</button>
                    <button className="profile-button"
                            style={{backgroundImage: "url(" + config.endpoint.host + "/avatar/" + this.state.user.id + ".png"}}>.
                    </button>
                </div>
            </div>
            <div className="dash-container2">
                <div className="left-component">
                    <div className="outer-mock">
                        <h3 className="m p-no-margin-top p-no-margin-bottom">Dummy title</h3>
                        <h2 className="s p-no-margin-bottom p-no-margin-top title">Title:</h2>
                        <input className="input" type="text" placeholder="Dummy title"/>
                        <h2 className="s p-no-margin-bottom p-no-margin-top description">Description:</h2>
                        <textarea className="description-text-box-size " type="text"
                                  placeholder="Dummy description"></textarea>
                        <button className="button">Done</button>
                    </div>
                </div>
                <div className="right-component">
                    <div className="profile-container">
                        <p>placeholder</p>
                        <p>{JSON.stringify(this.state.user)}</p>
                    </div>
                </div>
            </div>

        </div>
    }
}