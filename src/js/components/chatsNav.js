import React from "react";
import searchChatIcon from "../../resources/icons8-find-67.png"
import addChatIcon from "../../resources/icons8-plus-100.png"

class ChatsNav extends React.Component {

    render(){
        return <>
            <div className="w-full fixed rounded-b-3xl px-10 top-0 h-36 bg-blue-100 flex justify-between items-center pb-10">
                <div className="flex flex-row items-center">
                    <input className="h-14 text-blue-800 text-xl font-mono rounded-l-full bg-white px-8" type="text" placeholder="Chat Name"/>
                    <button className="h-14 w-14 bg-white rounded-r-full">
                        <img className="h-12 p-1" src={searchChatIcon}/>
                    </button>
                </div>
                <p className="text-3xl font-mono text-blue-800">Chats</p>
                <button className="" id="create-chat-button">
                    <img className="h-12" src={addChatIcon}/>
                </button>
            </div>
        </>
    }
}

export default ChatsNav;