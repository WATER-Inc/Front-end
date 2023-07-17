import React from "react";
import arrow from "../resources/arrow.png";
import wavesDesktop from "../resources/desktopSIngIn.svg";
import wavesPhone from "../resources/phoneSingIn.svg";
import HttpRequestSender from "./classes/HttpRequestSender";
import Page from "./components/page"
import "../css/singin.css";



class SingUp extends React.Component {
    state = {
        username: "",
        userpassword: "",
        userpasswordDup: ""
    };
    handleUserNameInput = (event) => {
        this.setState({
            username: event.target.value,
            userpassword: this.state.userpassword,
            userpasswordDup: this.state.userpasswordDup
        })
    }

    handleUserPasswordInput = (event) => {
        this.setState({
            username: this.state.username,
            userpassword: event.target.value,
            userpasswordDup: this.state.userpasswordDup
        })
    }
    handleUserPasswordDupInput = (event) => {
        this.setState({
            username: this.state.username,
            userpassword: this.state.userpassword,
            userpasswordDup: event.target.value
        })
    }

    formReset = () => {
        this.setState({
            username: "",
            userpassword: "",
            userpasswordDup: ""
        })
        document.getElementById("userName").value = "";
        document.getElementById("password").value = "";
        document.getElementById("password-dup").value = "";
    }

    sendData = () => {
        if(this.state.userpassword.localeCompare(this.state.userpasswordDup) === 0)
            HttpRequestSender.sendRequest("POST","/register",{
                    username:this.state.username,
                    userpassword:this.state.userpassword
            })
            .then((data)=>{
                if(data!== null){
                    window.location.href = "http://localhost:3000/";
                }else{
                    alert("Пользователь уже существует!")
                }
            })
        else alert("passwords don't match");
        this.formReset();
    }
    componentDidMount() {
        const waves = document.getElementById("waves");
        let prevWidth = document.body.offsetWidth;
        if(prevWidth > 801){
            waves.src=wavesDesktop;
        }else  waves.src=wavesPhone;
        window.addEventListener("resize", () => {
            let width = document.body.offsetWidth;
            if(width !== prevWidth){
                prevWidth = width;
                if(width > 801){
                    waves.src=wavesDesktop;
                }else  waves.src=wavesPhone;
            }
        })
    }
    render(){
        return <>
        <Page className="login">
            <div className="wrapper main-wrapper">
                <img id="waves" src={wavesDesktop}/>
                <div className="wrapper column-wrapper main-section">
                    <h3 className="water">WATER</h3>
                    <div className="wrapper column-wrapper input-section">
                        <div className="wrapper column-wrapper input-wrapper">
                            <input id="userName" type="text" placeholder="Name" onChange={this.handleUserNameInput}/>
                            <input id="password" type="password" placeholder="Password" onChange={this.handleUserPasswordInput}/>
                            <input id="password-dup" type="password" placeholder="Password" onChange={this.handleUserPasswordDupInput}/>
                        </div>
                    </div>
                    <div className="wrapper row-wrapper submit-section">
                        <div className="wrapper column-wrapper sign-button-block">
                            <p className="link big-link">Sing Up</p>
                            <a className="link small-link" href="/">Sing In</a>
                        </div>
                        <div className="submit-wrapper">
                            <button className="submit" onClick={this.sendData}><img src={arrow}/></button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
        </>
    }
}
export default SingUp;
