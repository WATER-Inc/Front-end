import React from "react";
import HttpRequestSender from "../../../js/classes/HttpRequestSender"
import ChatLink from "./components/chatLink";
import CreateChat from "./components/createChat";
import Page from "../../../js/components/page";
import ChatsNav from "./components/chatsNav";
import ChatsFooter from "./components/chatsFooter";
import WebsocketSender from "../../../js/classes/WebsocketSender";



class Chats extends React.Component {

    visibleCreateChat = false;

    state = {
        chatList: [],
        searchText: ""
    }

    openChat = (chatId,chatName) => {
        localStorage.setItem("lastMessageDate",0);
        localStorage.setItem("chatId",chatId);
        localStorage.setItem("chatName",chatName);
        window.location.href = "/chat";
    }

    openCreateChat = () => {
        this.visibleCreateChat = true;
        console.log(this.visibleCreateChat);
        this.forceUpdate();
    }

    closeCreateChat = () => {
        this.visibleCreateChat = false;
        this.forceUpdate();
    }

    searchHandler = (event) => {
        console.log(event.target.value);
        this.setState({
            searchText: event.target.value
        })
    }
    getChats = function () {
        HttpRequestSender.sendRequest("POST","/chats",{})
        .then((data) => {
            this.setState({chatList: data.map(element => 
                <ChatLink key={element.id} chatId={element.id} chatName={element.name} chatLastMessageDate={new Date(element.lastMessageDate).toString()}
                onClick={this.openChat}/>
                )
            })
            this.forceUpdate();
        })
    };

    ws;
    sendWsMessage = (e) => {
        this.ws.send("Мысля");
    }
    componentDidMount() {
        this.getChats(); 
        this.ws = new WebsocketSender();
        this.ws.tryConnect();
    }

    render() {
        return <>
        <Page className="chats">
                { this.visibleCreateChat && <CreateChat closeWindow={this.closeCreateChat}/>}
                <button  className="absolute z-40 w-full h-10 bg-red-100" onClick={this.sendWsMessage}>Отправь мыслю</button>
                <ChatsNav openCreateChat={this.openCreateChat} searchHandler={this.searchHandler}/>
                <div className="h-screen w-full overflow-y-scroll no-scrollbar bg-white">
                    <div className="flex flex-col pt-36 pb-28">
                        {this.state.chatList.filter(el => {
                            return (el.props.chatName.indexOf(this.state.searchText) === 0)
                        })}
                    </div>
                </div>
                <ChatsFooter/>
        </Page>
        </>
    }
}

export default Chats;