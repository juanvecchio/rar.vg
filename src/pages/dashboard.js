import React from "react";
import {tryUserLoading, updateProfile} from "../utils/session.util";
import config from '../../config/config.json'

import './dashboard.css'
import EditableProfile from "../components/editableprofile.component";
import EditPanel from "../components/editpanel.component";

export default class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            user: null,
            component: null,
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

    updateProfile = () =>
    {
        console.log(this.state.user.components, this.state.user.sociallinks)
        updateProfile(JSON.stringify(this.state.user.components), JSON.stringify(this.state.user.sociallinks))
            .then(response =>
            {
                if (!response.success)
                    console.error(response.content)

                console.log(response.content)
            })
    }

    selectComponent = (key) =>
    {
        this.setState({component: key})
    }

    updateComponentLocally = (content) =>
    {
        const oldUser = this.state.user
        oldUser.components[this.state.component].content = content
        this.setState({user: oldUser})
        console.log(this.state)
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
                    <button className="publish-button" onClick={() => this.updateProfile()}>Publish</button>
                    <button className="profile-button"
                            style={{backgroundImage: "url(" + config.endpoint.host + "/avatar/" + this.state.user.id + ".png"}}>.
                    </button>
                </div>
            </div>
            <div className="dash-container2">
                <div className="left-component">
                    <EditPanel updateLocally={this.updateComponentLocally}
                               selectedComponent={this.state.user.components[this.state.component]}/>
                </div>
                <div className="right-component">
                    <div className="profile-container">
                        <EditableProfile selectComponent={this.selectComponent} user={this.state.user}/>
                    </div>
                </div>
            </div>

        </div>
    }
}