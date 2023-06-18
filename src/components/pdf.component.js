import config from '../utils/config.util'
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
                    data={config('host') + "/uploads/" + this.props.fileId + ".pdf#toolbar=0&navpanes=0&scrollbar=0\""}/>
        </div>
    }
}
