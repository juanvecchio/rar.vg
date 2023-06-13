import React from "react";
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
        return <div key={key} className="icon-list-div">
            {this.icons[link.name].icon}
            {selected ? <input value={link.content}/> : <div><span>{link.content}</span><button onClick={() => this.setState({field3: key})}>e</button></div>}
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
            icon: <FaSteam size={15} />,
            link: "https://steamcommunity.com/id/",
        },
        itunes: {
            icon: <FaItunesNote size={15} />,
            link: "https://music.apple.com/us/artist/",
        },
        bitcoin: { icon: <FaBitcoin size={15} />, popup: true },
        ethereum: { icon: <FaEthereum size={15} />, popup: true },
        discord: { icon: <FaDiscord size={15} />, popup: true },
        tiktok: { icon: <FaTiktok size={15} />, link: "https://www.tiktok.com/" },
        website: { icon: <CgWebsite size={15} />, link: "" },
        cashapp: { icon: <SiCashapp size={15} />, link: "https://cash.app/" },
        spotify: {
            icon: <BsSpotify size={15} />,
            link: "https://open.spotify.com/artist/",
        },
        instagram: {
            icon: <BsInstagram size={15} />,
            link: "https://instagram.com/",
        },
        twitter: { icon: <BsTwitter size={15} />, link: "https://twitter.com/" },
        facebook: { icon: <BsFacebook size={15} />, link: "https://facebook.com/" },
        github: { icon: <BsGithub size={15} />, link: "https://github.com/" },
        twitch: { icon: <BsTwitch size={15} />, link: "https://twitch.tv/" },
        youtube: {
            icon: <BsYoutube size={15} />,
            link: "https://youtube.com/channel/",
        },
        linkedin: {
            icon: <BsLinkedin size={15} />,
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
                    {this.state.field1.map((link, key) => (<div class="icon-div">{this.linkEditItem(link, key, this.state.field3 === key)}</div>))}
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