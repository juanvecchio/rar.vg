import React from "react";
import config from '../../config/config.json'
import ProfileLinks from "../components/profilelinks.component";
import GenericComponent from "../components/generic.component";
import PDFComponent from "../components/pdf.component";
import LinklistComponent from "../components/linklist.component";

import '../pages/profile.css'
import '../index.css'

export default class EditableProfile extends React.Component
{
    component = (component, key) =>
    {
        if (component.type && component.content)
            switch (component.type)
            {
                case "generic":
                    return <GenericComponent title={component.content.title} description={component.content.description}
                                             key={key}/>
                case "pdf":
                    return <PDFComponent fileId={component.content.fileId} key={key}/>
                case "linklist":
                    return <LinklistComponent links={component.content.links} key={key}/>
            }
    }

    selectComponent(key)
    {
        this.props.selectComponent(key)
    }

    render()
    {
        return <div className={"content"}>
            <div className="card">
                <div className={"header"}>
                    <div className={"banner"}/>
                    <img
                        className={"profile-picture"}
                        src={config.endpoint.host + "/avatar/" + this.props.user.id + ".png"}
                        alt={"Profile picture"}
                    />
                    <h1 className={"p-no-margin-bottom"}>{this.props.user.displayName}</h1>
                    <h3 className={"username p-no-margin-top"}>@{this.props.user.username}</h3>
                    <ProfileLinks socials={this.props.user.sociallinks}/>
                </div>

                {this.props.user.components.map((component, key) => (
                    <div className={"selectableComponent"}
                         onClick={() => this.selectComponent(key)}>{this.component(component, key)}</div>))}

                <div className={"footer"}>
                    <a href={"https://rar.vg"} style={{color: "#fff"}}>rar.vg</a> powered 2023
                </div>
            </div>
        </div>
    }
}