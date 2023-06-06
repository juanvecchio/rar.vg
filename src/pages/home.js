import React from 'react'

import profileImage from '../static/profile.png'

import './home.css'
import '../index.css'

export const Home = () =>
{
    return <div className="container">
        <div className="Home-Container">
            <div className="left">
                <div className="section">
                    <div className={"top"}>
                        <p className="m p-no-margin-top">👋 rar.vg</p>
                        <h2 className="xxl p-no-margin-top p-no-margin-bottom">Create your profile.</h2>
                    </div>
                    <div className={"bottom"}>
                        <button className="btn mm">Create your page!</button>
                        <br/>
                        <div className="link-log-in">
                            <a className="s">Already have one? Log in!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className={"left-card"}>
                    <div className={"card purple"}>
                        <div className={"top"}>
                            <h2 className={"l p-no-margin-top p-no-margin-bottom"}>Establish your online presence</h2><br />
                            <span className={"s"}>Show the world who you are and what you do.</span>
                        </div>
                        <img src={profileImage}/>
                    </div>
                </div>
                <div className={"right-card"}>
                    <div className={"card green"}>
                        <div className={"top"}>
                            <span className={"m"}>Fully customizable</span><br/>
                            <span className={"s"}>Take full control on your own profile.</span>
                        </div>
                        <img src={""}/>
                    </div>
                    <div className={"card orange"}>
                        <div className={"top"}>
                            <span className={"m"}>Express yourself</span><br/>
                            <span className={"s"}>Create an universal showcase for your identity.</span>
                        </div>
                        <img src={""}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
