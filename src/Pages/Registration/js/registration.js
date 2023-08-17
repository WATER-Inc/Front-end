import React from "react";
import arrow from "../../../resources/arrow.png";
import wavesDesktop from "../../../resources/desktopSIngIn.svg";
import wavesPhone from "../../../resources/phoneSingIn.svg";
import HttpRequestSender from "../../../js/classes/HttpRequestSender";
import Page from "../../../js/components/page";



class Registration extends React.Component {
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
        if(prevWidth >= 768){
            waves.src=wavesDesktop;
        }else  waves.src=wavesPhone;
        window.addEventListener("resize", () => {
            let width = document.body.offsetWidth;
            if(width !== prevWidth){
                prevWidth = width;
                if(width >= 768){
                    waves.src=wavesDesktop;
                }else  waves.src=wavesPhone;
            }
        })
    }
    render(){
        return <>
        <Page className="registration">
            <div className="flex">
                <div className="absolute max-h-screen overflow-hidden md:right-1/2 md:h-screen md:top-0 md:bottom-0 w-screen min-h-[50vh] bottom-[70vh]">
                    <img className="min-h-[50vh] md:w-auto w-screen relative md:top-0 md:bottom-0 md:right-0" id="waves" src={wavesDesktop}/>
                </div>
                <div className="p-10 mx-auto md:w-[40vw] md:right-[10vw] md:top-1/2 md:translate-y-[-50%] md:translate-x-0 translate-x-[-50%] flex flex-col h-[66vh] justify-around content-center md:min-w-[400px] max-w-md max-h-[600px] absolute top-[33vh] w-screen left-1/2">
                    <h3 className="font-MuseoModerno text-[40px] text-custom-blue-500 tracking-widest">WATER</h3>
                    <div className="flex flex-col m-auto">
                        <div className="flex flex-col input-flex">
                            <input className="text-xl tracking-widest max-w-[300px] font-sans font-medium p-2 placeholder:sans placeholder:text-custom-blue-100 text-custom-blue-300 my-2 border-0 border-b-2 border-solid border-b-custom-blue-500" id="userName" type="text" placeholder="Name" onChange={this.handleUserNameInput}/>
                            <input className="text-xl tracking-wider max-w-[300px] font-sans font-medium p-2 placeholder:sans placeholder:text-custom-blue-100 text-custom-blue-300 my-2 border-0 border-b-2 border-solid border-b-custom-blue-500" id="password" type="password" placeholder="Password" onChange={this.handleUserPasswordInput}/>
                            <input className="text-xl tracking-wider max-w-[300px] font-sans font-medium p-2 placeholder:sans placeholder:text-custom-blue-100 text-custom-blue-300 my-2 border-0 border-b-2 border-solid border-b-custom-blue-500" id="password" type="password" placeholder="Password" onChange={this.handleUserPasswordDupInput}/>
                        </div>
                    </div>
                    <div className="flex flex-row mt-10 mb-10 justify-around">
                        <div className="flex flex-col sign-button-block">
                            <p className="font-MuseoModerno visited:no-underline text-3xl text-custom-blue-500">Sing Up</p>
                            <a className="font-MuseoModerno visited:no-underline text-xl hover:underline text-custom-blue-500" href="/">Sing In</a>
                        </div>
                        <div className="">
                            <button className="h-20 w-20 rounded-full text-transparent bg-custom-blue-400" onClick={this.sendData}><img className="h-12 ml-3 relative" src={arrow}/></button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
        </>
    }
}
export default Registration;
