import React from "react";
import chatsIcon from "../../resources/icons8-comments-96.png"
import userIcon from "../../resources/icons8-person-64.png"
import logoutIcon from "../../resources/icons8-logout-100.png"

class ChatsFooter extends React.Component {

    render(){
        return <>
            <div className="fixed w-full bg-white bottom-0 h-32 flex flex-col">
                <div className="h-16 bg-transparent"></div>
                <div className="relative h-16 flex flex-row justify-around p-10">
                    <button id="chats-button" className="menu-button" onClick={this.openChats}>
                        <img src={chatsIcon}></img>
                    </button>
                    <button id="users-button" className="menu-button" onClick={this.openUsers}>
                        <img src={userIcon}></img>
                    </button>
                    <button id="logout-button" className="menu-button" onClick={this.logOut}>
                        <img src={logoutIcon}></img>
                    </button>
                </div>
            </div>
        </>
    }
}

export default ChatsFooter;