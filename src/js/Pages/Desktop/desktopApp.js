import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Chat from "./Chat/js/chat";
import Chats from "./Chats/js/chats";

class DesktopApp extends React.Component{
    state = {
        userId: "",
        chatId: "",
        chatName: "",
        message: "",
    }

    openChat = (_chatId,_chatName) => {
        this.setState({
            chatId: _chatId,
            chatName: _chatName,
        });
    }

    render(){
        return <>
            <div className="flex flex-row relative">
                <Chats openChat={this.openChat}/>
                <Chat/>
            </div>
        </>
    }
}

export default DesktopApp;

