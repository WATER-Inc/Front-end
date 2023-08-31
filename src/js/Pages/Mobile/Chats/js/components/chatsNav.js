import React from "react";
import searchChatIcon from "../../../../../../resources/icons8-find-67.png"
import addChatIcon from "../../../../../../resources/icons8-plus-100.png"

class ChatsNav extends React.Component {

    render(){
        return <>
            <div className="w-full fixed z-20 px-10 top-0 h-32 bg-white flex flex-col shadow-md items-center py-4">
                <div className="w-full flex flex-row justify-between">
                    <p className="px-4 py-2 font-MuseoModerno text-2xl text-custom-blue-500 tracking-wider">Chats</p>
                    <button onClick={this.props.openCreateChat}>
                        <img  className="h-10 w-10" src={addChatIcon}/>
                    </button>
                </div>
                <div className=" py-2 w-full flex flex-row justify-center">
                    <div className="w-full max-w-[500px] md:max-w-none bg-gray-200 flex items-center py-2 px-4 rounded-xl">
                        <img className="h-6 w-10 inline px-2" src={searchChatIcon}/>
                        <input className=" md:w-full tracking-wide text-custom-blue-500 font-MuseoModerno bg-gray-200 placeholder:text-gray-500" type="text" placeholder="Search..." onChange={this.props.searchHandler}/>
                    </div>
                </div>
            </div>
        </>
    }
}

export default ChatsNav;