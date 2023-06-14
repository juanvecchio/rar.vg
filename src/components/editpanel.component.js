import React from "react";
import { AiFillEdit } from "react-icons/ai"
import {
    FaSteam,
    FaItunesNote,
    FaBitcoin,
    FaEthereum,
    FaDiscord,
    FaTiktok,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { SiCashapp } from "react-icons/si";
import {
    BsSpotify,
    BsInstagram,
    BsTwitter,
    BsFacebook,
    BsGithub,
    BsTwitch,
    BsYoutube,
    BsLinkedin,
} from "react-icons/bs";
import "./editpanel.component.css"

export default class EditPanel extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            field1: [],
            
        }

        this.handleField1Change = this.handleField1Change.bind(this)
        this.handleField2Change = this.handleField2Change.bind(this)
    }
    
    linkEditItem = (link, key, selected) => {
        return <div key={key} className="inner-mock">
            <div className="hero">{this.icons[link.name].icon}</div>
            {selected ? <input value={link.content} className="input"/> : <div><span>{link.content}</span><button className={"icon-button"} onClick={() => this.setState({field3: key})}><AiFillEdit  /></button></div>}
        </div>
    }

    click(item){
        const oldLinks = this.state.field1;
        if(this.state.field1.length < 8){
            oldLinks.push({name: item, content: ''})
            this.setState({field1: oldLinks, field3: oldLinks.length - 1})
        }
        console.log(this.state.field1)
    }

    icons = {
        steam: {
            icon: <FaSteam  />,
            link: "https://steamcommunity.com/id/",
        },
        itunes: {
            icon: <FaItunesNote  />,
            link: "https://music.apple.com/us/artist/",
        },
        bitcoin: { icon: <FaBitcoin  />, popup: true },
        ethereum: { icon: <FaEthereum  />, popup: true },
        discord: { icon: <FaDiscord  />, popup: true },
        tiktok: { icon: <FaTiktok  />, link: "https://www.tiktok.com/" },
        website: { icon: <CgWebsite  />, link: "" },
        cashapp: { icon: <SiCashapp  />, link: "https://cash.app/" },
        spotify: {
            icon: <BsSpotify  />,
            link: "https://open.spotify.com/artist/",
        },
        instagram: {
            icon: <BsInstagram  />,
            link: "https://instagram.com/",
        },
        twitter: { icon: <BsTwitter  />, link: "https://twitter.com/" },
        facebook: { icon: <BsFacebook  />, link: "https://facebook.com/" },
        github: { icon: <BsGithub  />, link: "https://github.com/" },
        twitch: { icon: <BsTwitch  />, link: "https://twitch.tv/" },
        youtube: {
            icon: <BsYoutube  />,
            link: "https://youtube.com/channel/",
        },
        linkedin: {
            icon: <BsLinkedin  />,
            link: "https://linkedin.com/in/",
        },
    };

    drawIcons = () => {
        return <div>
            {Object.keys(this.icons).map((item, key) => (
                <button class="icon-button" onClick={() => this.click(item)}>{this.icons[item].icon}</button>
            ))}
        </div>
    }

    handleField1Change(event)
    {
        this.setState({field1: event.target.value})
    }

    handleField2Change(event)
    {
        this.setState({field2: event.target.value})
    }

    saveLocally = (content) =>
    {
        this.props.updateLocally(content)
    }

    cancel = () =>
    {
        this.props.cancelSelection()
    }

    renderFields = (component) =>
    {
        if (!component)
            return <span>Select a component to begin.</span>
        switch (component.type)
        {
            case 'generic':
                return <>
                    <h3 className="m p-no-margin-top p-no-margin-bottom">Edit social links</h3>
                    <div className="icon-list-div">{this.drawIcons()}</div>
                    <h2 className="s p-no-margin-bottom p-no-margin-top title">Links:</h2>
                    {this.state.field1.map((link, key) => (<div>{this.linkEditItem(link, key, this.state.field3 === key)}</div>))}
                </>
            case 'social-links':
                return <>

                </>

                break
        }
    }

    render()
    {
        return <div className="outer-mock">
            {this.renderFields(this.props.selectedComponent)}
        </div>
    }
}