import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Chat from "./Chat/js/chat";
import Chats from "./Chats/js/chats";

class MobileApp extends React.Component{

    chats = true;

    ToggleDisplay = () =>{
        this.chats = !this.chats;
        if(this.chats)
            console.log("chats");
        else console.log("chat");
        this.forceUpdate();
    }
    render(){
        return <>
            {this.chats ? <Chats ToggleDisplay={this.ToggleDisplay}/> : <Chat ToggleDisplay={this.ToggleDisplay}/>}
        </>
    }
}

export default MobileApp;

