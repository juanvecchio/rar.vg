import React from "react";
import {AiFillEdit, AiOutlineClose, AiOutlineCheck} from "react-icons/ai"
import {
    FaSteam,
    FaItunesNote,
    FaBitcoin,
    FaEthereum,
    FaDiscord,
    FaTiktok,
} from "react-icons/fa";
import {CgWebsite} from "react-icons/cg";
import {SiCashapp} from "react-icons/si";
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
            title: null,
            description: null,
            selectedLink: null,
            linkField: null,
            linkList: []
        }

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleLinkFieldChange = this.handleLinkFieldChange.bind(this)
    }

    icons = {
        steam: {
            icon: <FaSteam/>,
            link: "https://steamcommunity.com/id/",
        },
        itunes: {
            icon: <FaItunesNote/>,
            link: "https://music.apple.com/us/artist/",
        },
        bitcoin: {icon: <FaBitcoin/>, popup: true},
        ethereum: {icon: <FaEthereum/>, popup: true},
        discord: {icon: <FaDiscord/>, popup: true},
        tiktok: {icon: <FaTiktok/>, link: "https://www.tiktok.com/"},
        website: {icon: <CgWebsite/>, link: ""},
        cashapp: {icon: <SiCashapp/>, link: "https://cash.app/"},
        spotify: {
            icon: <BsSpotify/>,
            link: "https://open.spotify.com/artist/",
        },
        instagram: {
            icon: <BsInstagram/>,
            link: "https://instagram.com/",
        },
        twitter: {icon: <BsTwitter/>, link: "https://twitter.com/"},
        facebook: {icon: <BsFacebook/>, link: "https://facebook.com/"},
        github: {icon: <BsGithub/>, link: "https://github.com/"},
        twitch: {icon: <BsTwitch/>, link: "https://twitch.tv/"},
        youtube: {
            icon: <BsYoutube/>,
            link: "https://youtube.com/channel/",
        },
        linkedin: {
            icon: <BsLinkedin/>,
            link: "https://linkedin.com/in/",
        },
    };

    linkEditItem = (link, key, selected) =>
    {
        return <div key={key} className="inner-mock">
            <div className="hero">{this.icons[link.name].icon}</div>
            {selected ?
                <div className={"link-content"}><input onChange={this.handleLinkFieldChange} defaultValue={link.content}
                                                       className="input"/>
                    <button className={"icon-button"} onClick={() => this.deselectItem()}><AiOutlineCheck/></button>
                </div> :
                <div className={"link-content"}><span>{link.content}</span>
                    <div className={"button-container"}>
                        <button className={"icon-button"} onClick={() => this.selectNewLink(key)}><AiFillEdit/></button>
                        <button className={"icon-button"} onClick={() => this.deleteItem(key)}><AiOutlineClose/>
                        </button>
                    </div>
                </div>}
        </div>
    }

    deselectItem = () =>
    {
        const oldLinks = this.props.user.sociallinks
        if (this.state.selectedLink !== null)
        {
            oldLinks[this.state.selectedLink].content = this.state.linkField
            this.props.updateLinks(oldLinks)
        }
        this.setState({selectedLink: null})
    }

    deleteItem = (key) =>
    {
        const oldLinks = this.props.user.sociallinks
        delete oldLinks[key]
        console.log(oldLinks)
        this.props.updateLinks(oldLinks)
    }

    selectNewLink = (key) =>
    {
        const oldLinks = this.props.user.sociallinks
        if (this.state.selectedLink !== null)
        {
            oldLinks[this.state.selectedLink].content = this.state.linkField
            this.props.updateLinks(oldLinks)
        }
        this.setState({linkField: oldLinks[key].content, selectedLink: key})
    }

    addNewItem = (item) =>
    {
        const oldLinks = this.props.user.sociallinks
        if (this.state.selectedLink !== null)
        {
            oldLinks[this.state.selectedLink].content = this.state.linkField
            this.setState({linkField: ''})
        }
        if (this.props.user.sociallinks.length < 8)
        {
            oldLinks.push({name: item, content: ''})
            this.setState({selectedLink: (oldLinks.length - 1)}, () => this.props.updateLinks(oldLinks))
        }
    }

    drawIcons = () =>
    {
        return <div>
            {Object.keys(this.icons).map((item, key) => (
                <button key={key} className="icon-button"
                        onClick={() => this.addNewItem(item)}>{this.icons[item].icon}</button>
            ))}
        </div>
    }

    handleTitleChange(event)
    {
        this.setState({title: event.target.value})
    }

    handleDescriptionChange(event)
    {
        this.setState({description: event.target.value})
    }

    handleLinkFieldChange(event)
    {
        this.setState({linkField: event.target.value})
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
            return <div className={"default"}>
                <div>
                    <span className={"m"}>Start editing</span><br/><br/>
                    <span className={"s"}>Click on a component to begin editing</span><br/>
                    <span className={"s"}>Drag a component to change its position</span>
                </div>
            </div>
        switch (component.type)
        {
            case 'generic':
                return <>
                    <h3 className="m p-no-margin-top p-no-margin-bottom">Edit generic component</h3>
                    <h2 className="s p-no-margin-bottom p-no-margin-top title">Title:</h2>
                    <input className="input" type="text" placeholder="Title" onChange={this.handleTitleChange}/>
                    <h2 className="s p-no-margin-bottom p-no-margin-top description">Description:</h2>
                    <textarea className="description-text-box-size" type="text"
                              placeholder="Description" onChange={this.handleDescriptionChange}/>
                    <div className={"button-container"}>
                        <button className="button unraised" onClick={() => this.cancel()}>Cancel</button>
                        <button className="button" onClick={() => this.saveLocally({
                            title: this.state.title,
                            description: this.state.description
                        })}>Done
                        </button>
                    </div>
                </>
            case 'sociallinks':
                return <>
                    <h3 className="m p-no-margin-top p-no-margin-bottom">Edit social links</h3>
                    <div className="icon-list-div">{this.drawIcons()}</div>
                    <h2 className="s p-no-margin-bottom p-no-margin-top title">Links:</h2>
                    {this.props.user.sociallinks.map((link, key) => (
                        <div>{this.linkEditItem(link, key, this.state.selectedLink === key)}</div>))}
                    <button className="button" onClick={() => this.cancel()}>Done< /button>
                </>
        }
    }

    render
    ()
    {
        return <div className="outer-mock">
            {this.renderFields(this.props.selectedComponent)}
        </div>
    }
}