import React from "react";
import HttpRequestSender from "./classes/HttpRequestSender";
import ChatLink from "./components/chatlink";
import CreateChat from "./components/createChat";
import Page from "./components/page";
import "../css/chats.css"
import ChatsNav from "./components/chatsNav";
import ChatsFooter from "./components/chatsFooter";



class Chats extends React.Component {

    visibleCreateChat = false;

    state = {
        chatList: [],
        searchText: ""
    }

    openChat = (element) => {
        localStorage.setItem("lastMessageDate",0);
        localStorage.setItem("chatId",element.target.getAttribute("id"));
        localStorage.setItem("chatName",element.target.getAttribute("name"))
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
        this.setState({
            searchText: event.target.value
        })
    }

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

    componentDidMount() {
        this.getChats();
    }

    render() {
        return <>
        <Page className="chats">
                { this.visibleCreateChat && <CreateChat closeWindow={this.closeCreateChat}/>}
                <ChatsNav/>
                <div className="wrapper column-wrapper chat-list">
                    {this.state.chatList.filter(el => {
                        return (el.props.chatName.indexOf(this.state.searchText) === 0)
                    })}
                </div>
                <ChatsFooter/>
        </Page>
        </>
    }
}

export default Chats;