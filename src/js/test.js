import React from "react";
import Page from "./components/page";
import searchChatIcon from "../resources/icons8-find-67.png"
import addChatIcon from "../resources/icons8-plus-100.png"
import ChatLink from "./components/chatlink";

class Test extends React.Component {

    render(){
        return <Page className=" overflow-hidden">
            <div className="w-full fixed rounded-b-3xl px-10 top-0 h-36 bg-custom-blue-200 flex items-center pb-10">
                <div className="flex basis-2/3 flex-row items-center justify-between group">
                    <div className="flex items-center h-14 bg-white rounded-full">
                        <input className="w-[0px] h-12 bg-none text-blue-800 text-xl group-hove:w-[200px] group-hover:pl-8 font-mono  duration-100" type="text" placeholder="Chat Name"/>
                        <button className="h-14 w-14">
                            <img className="h-10 w-10 m-none" src={searchChatIcon}/>
                        </button>
                    </div>
                    <p className="text-3xl font-mono text-blue-800">Chats</p>
                </div>
                <button className="basis-1/3" id="create-chat-button">
                    <img className="h-12" src={addChatIcon}/>
                </button>
            </div>
            <div className="h-full w-full overflow-y-scroll no-scrollbar bg-custom-blue-400">
                <div className="flex flex-col pt-36 pb-36">
                    <ChatLink/>
                    <ChatLink/>
                    <ChatLink/>
                    <ChatLink/>
                    <ChatLink/>
                    <ChatLink/>
                    <ChatLink/>
                    <ChatLink/>
                </div>
            </div>
        </Page>
    }
}

export default Test;