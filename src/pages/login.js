import React from "react"
import "./styles.css"

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response: null
        }
    }

    componentDidMount(){
        fetch("https://api.github.com/users/juanvecchio/repos")
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(
            res =>{
                this.setState({
                    response: res
                })
            }
        )
    }

    

    render() {
        if(this.state.response){
            //console.log(this.state.response)
        }
        return <body class="animated" style={{
            background: "linear-gradient(-45deg, #471303, #52142c, #0d3646, #0c473a)",
            backgroundSize: "400% 400%",
            height: "100vh",
        }}>
            <div class="container">
                <div class="logotype">👋 rar.vg</div>
                <div class="login-form">
                    <h1 class="l p-no-margin-top">Log in</h1>
                    <input type="m text" placeholder="Email" />
                    <button class="mm login-button">Next</button>
                </div>
            </div>
        </body>

    }





}