import React from "react";
import arrow from "../resources/arrow.png";
import styles from "../css/signin.css";
import wavesDesktop from "../resources/desktopSIngIn.svg";
import wavesPhone from "../resources/phoneSingIn.svg";

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
        if(this.state.userpassword.localeCompare(this.state.userpasswordDup) === 0) {
            let login = `http://localhost:8080/water_war/register`;
        fetch(login, {
            method: "POST",
            mode:"cors",
            credentials:"include",
            headers: {
              Accept: "text/plain ",
              "Content-Type": "text/plain",
            },
            body:JSON.stringify({
                username:this.state.username,
                userpassword:this.state.userpassword
            })
          }).then((response) => {
            const cookies = document.cookie;
            console.log("Cookies:" + toString(cookies));
            return response.json()
          })
          .then( data => {
            if(data!== null){
                window.location.href = "http://localhost:3000/";
            }else{
                alert("Пользователь уже существует!")
            }
            return data;
          }).catch((err) => {
                console.log("Catched erroe");
                console.log(err);
             });
        }else alert("passwords don't match");
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
    }
}
export default SingUp;
