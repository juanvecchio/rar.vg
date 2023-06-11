import React from "react";

export default class EditPanel extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            field1: null,
            field2: null,
        }

        this.handleField1Change = this.handleField1Change.bind(this)
        this.handleField2Change = this.handleField2Change.bind(this)
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

    renderFields = (component) =>
    {
        if (!component)
            return <span>Select a component to begin.</span>
        switch (component.type)
        {
            case 'generic':
                return <>
                    <h3 className="m p-no-margin-top p-no-margin-bottom">Edit generic component</h3>
                    <h2 className="s p-no-margin-bottom p-no-margin-top title">Title:</h2>
                    <input className="input" type="text" placeholder="Title" onChange={this.handleField1Change}/>
                    <h2 className="s p-no-margin-bottom p-no-margin-top description">Description:</h2>
                    <textarea className="description-text-box-size " type="text"
                              placeholder="Description" onChange={this.handleField2Change}/>
                    <button className="button" onClick={() => this.saveLocally({
                        title: this.state.field1,
                        description: this.state.field2
                    })}>Done
                    </button>
                </>
        }
    }

    render()
    {
        return <div className="outer-mock">
            {this.renderFields(this.props.selectedComponent, this.props.selectedComponent)}
        </div>
    }
}