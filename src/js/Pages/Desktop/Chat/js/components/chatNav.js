import React from "react";
import returnIcon from "../../../../../../resources/icons8-double-left-48.png"
import addUserIcon from "../../../../../../resources/icons8-plus-100.png"

class ChatNav extends React.Component {

    render(){
        return <>
            <div className="flex flex-row absolute z-10 shadow-lg top-0 w-full h-16 items-center justify-between bg-white">
                <a className="px-2" href="/chats"><img src={returnIcon}/></a>
                <p className="text-2xl font-MuseoModerno text-custom-blue-400 uppercase tracking-widest px-4 py-2">{localStorage.getItem("chatName")}</p>
                <button className="px-2" id="create-chat-button" onClick={this.props.openAddUser}>
                    <img className="h-12 inline" src={addUserIcon}/>
                </button>
            </div>
        </>
    }
}

export default ChatNav;
