import React, {useState} from "react";
import arrow from "../resources/arrow.png";
import wavesDesktop from "../resources/desktopSIngIn.svg";
import wavesPhone from "../resources/phoneSingIn.svg";

class SingIn extends React.Component{
    state = {
      username: "",
      userpassword: ""
    };
    handleUserNameInput = (event) => {
        this.setState({
            username: event.target.value,
            userpassword: this.state.userpassword
        })
    }

    handleUserPasswordInput = (event) => {
        this.setState({
            username: this.state.username,
            userpassword: event.target.value
        })
    }

    formReset = () => {
        document.getElementById("userName").value = "";
        document.getElementById("password").value = "";
    }

    sendData = () => {
        let login = `http://localhost:8080/water_war/login?username=${this.state.username}&userpassword=${this.state.userpassword}`;
        fetch(login, {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            }
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => {
              console.log(err);
             });
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
            if(width != prevWidth){
                prevWidth = width;
                if(width > 801){
                    waves.src=wavesDesktop;
                }else  waves.src=wavesPhone;
            }
        })
    }
    render(){
        return <div className="wrapper main-wrapper">
            <img id="waves" src={wavesDesktop}/>
            <div className="wrapper column-wrapper main-section">
                <h3 className="water">WATER</h3>
                <div className="wrapper column-wrapper input-section">
                    <div className="wrapper column-wrapper input-wrapper">
                        <input id="userName" type="text" placeholder="Name" onChange={this.handleUserNameInput}/>
                        <input id="password" type="password" placeholder="Password" onChange={this.handleUserPasswordInput}/>
                    </div>
                </div>
                <div className="wrapper row-wrapper submit-section">
                    <div className="wrapper column-wrapper sign-button-block">
                        <p className="link big-link">Sing In</p>
                        <a className="link small-link" href="/singup">Sing Up</a>
                    </div>
                    <div className="submit-wrapper">
                        <button className="submit" onClick={this.sendData}><img src={arrow}/></button>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default SingIn;