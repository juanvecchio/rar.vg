import React from 'react'
import {hasActiveSession, tryRegister} from "../utils/session.util";

import '../index.css'
import './form.css'
import Link from "../router/link";

export default class Verify extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            verified: null
        }
    }
    
    componentDidMount(){
        //TODO: session::verifyAccount 
    }
    
    handleSubmit(event){
        event.preventDefault()
        window.location.href = "/login?jr=1" 
    }

    renderFields = verified => {
        if(verified === null)
            return <h3 className='mm'>Loading...</h3>
        
        return verified.success ? <form onSubmit={this.handleSubmit} className="login-form">
            <h1 className="m p-no-margin-top">Your account has been verified.</h1>
            <button className="mm login-button">Log in</button>
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