import config from '../../config/config.json'
import './pdf.component.css'
import React from "react";

export default class PDFComponent extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return <div className={"component"}>
            <object className={"pdf"} type={"application/pdf"}
                    data={config.endpoint.host + "/uploads/" + this.props.fileId + ".pdf#toolbar=0&navpanes=0&scrollbar=0\""}/>
        </div>
    }
}
