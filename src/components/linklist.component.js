import LinkListItemComponent from "./linklistitem.component";
import './linklist.component.css'
import React from "react";

export default class LinklistComponent extends React.Component
{
    constructor(props)
    {
        super( props)
    }

    render()
    {
        return <div className={"component"}>
            {this.props.links.map((link, key) => <LinkListItemComponent icon={link.icon} url={link.url}
                                                                        title={link.title} key={key}/>)}
        </div>
    }
}
