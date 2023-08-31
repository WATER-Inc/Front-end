import React from "react";
import chatsIcon from "../../../../../../resources/icons8-comments-96.png"
import userIcon from "../../../../../../resources/icons8-person-64.png"
import logoutIcon from "../../../../../../resources/icons8-logout-100.png"
import HttpRequestSender from "../../../../../Utils/HttpRequestSender";

class ChatsFooter extends React.Component {

    logOut = () => {
        HttpRequestSender.sendRequest("POST","/logout",{})
        .then((data) => {
            if(data!=null){
                localStorage.setItem("lastMessageDate",0);
                localStorage.setItem("chatId",-1);
                localStorage.setItem("userId",-1);
                window.location.href = "/";
            }else alert("Something went wrong!");
        })
    }

    render(){
        return <>
            <div className="absolute w-full bg-white bottom-0 h-24 flex flex-col justify-center shadow-top">
                <div className="w-full h-12 flex flex-row justify-around items-center">
                    <button id="chats-button" className="h-10 w-10 opacity-50 hover:opacity-100" onClick={this.openChats}>
                        <img src={chatsIcon}></img>
                    </button>
                    <button id="users-button" className="h-10 w-10 opacity-50 hover:opacity-100" onClick={this.openUsers}>
                        <img src={userIcon}></img>
                    </button>
                    <button id="logout-button" className="h-10 w-10 opacity-50 hover:opacity-100" onClick={this.logOut}>
                        <img src={logoutIcon}></img>
                    </button>
                </div>
            </div>
        </>
    }
}

export default ChatsFooter;