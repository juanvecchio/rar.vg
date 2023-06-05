import React from "react";

export default class GenericComponent extends React.Component
{
    render()
    {
        return <div className={"component"}>
            <h2>{this.props.title}</h2>
            <h4>{this.props.description}</h4>
        </div>
    }
}