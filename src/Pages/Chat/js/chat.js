import React from "react";
import Message from "./components/message";
import ChatNav from "./components/chatNav";
import MessageInput from "./components/messageInput";
import HttpRequestSender from "../../../js/classes/HttpRequestSender";
import Page from "../../../js/components/page"
import UserAddDialog from "./components/UserAddDialog";
import "../css/chat.css"

class Chat extends React.Component {
    state = {
        userId: "",
        chatId: "",
        message: "",
    }

    userDialog = false;

    messageList = [];

    getMessages = () => {
        HttpRequestSender.sendRequest("POST","/chat",{
            chatId: localStorage.getItem("chatId"),
            lastMessageDate: localStorage.getItem("lastMessageDate")
        })
        .then((data) => {
            if(data!=null){
                console.log(data);
                console.log("Last message " + new Date(localStorage.getItem("lastMessageDate")).toString());
                data.map(el =>{
                    localStorage.setItem("lastMessageDate",el.date);
                    this.messageList.push(<Message key={el.id} classes={el.sender.id === this.state.userId? "group my" : "group from"} name={el.sender.id === this.state.userId?  "" : el.sender.username} messageText={el.content} messageDate={el.date}/>)
                })
                this.setState({
                    userId: this.state.userId,
                    chatId: this.state.chatId,
                    message: this.state.message,
                })
                this.forceUpdate();
                this.getMessages();
            }else console.log("couldn't get messages");
        })
    }

    handleMessage = (event) => {
        this.setState({
            userId: this.state.userId,
            chatId: this.state.chatId,
            message: event.target.value
        })
    }

    openAddUser = () => {
        this.userDialog = true;
        this.forceUpdate();
    }

    closeAddUser = () => {
        this.userDialog = false;
        this.forceUpdate();
    }

    sendMessage = () => {
        let input = document.getElementById("message-input");

        HttpRequestSender.sendRequest("POST","/message",this.state)
        .then((data) => {
            if(data!=null){
                input.value = "";
                this.setState({
                    userId: localStorage.getItem("userId"),
                    chatId: localStorage.getItem("chatId"),
                    message: ""
                })
                this.forceUpdate();
            }else console.log("Couldn't send messages!");
        })
    }

    listScroll = () => {
        let list = document.getElementById("scrollable-list");
        let maxPos = 0;
        let minPos = window.innerHeight - 200 - list.getBoundingClientRect().height;
        let currentPos = minPos;
        window.requestAnimationFrame(() => {
            list.style.transform = `translateY(-${minPos}px)`;
        })
        window.addEventListener("wheel", (event) => {
            currentPos -= event.deltaY/4;
            currentPos = Math.max(maxPos, currentPos);
            currentPos = Math.min(minPos, currentPos);
            window.requestAnimationFrame(() => {
                list.style.transform = `translateY(-${currentPos}px)`;
            })
        }) 
    }

    componentDidMount() {
        localStorage.setItem("lastMessageDate",0);
        this.setState({
            userId: localStorage.getItem("userId"),
            chatId: localStorage.getItem("chatId"),
            message: ""
        })
        this.listScroll();
        this.getMessages();
    }
    render() {
        return  <>
        <Page className="chat"> 
            {this.userDialog && <UserAddDialog close={this.closeAddUser}/>}
            <ChatNav openAddUser={this.openAddUser}/>
            <div className="w-screen h-screen overflow-hidden bg-custom-blue-100">
                <div id="scrollable-list" className="flex flex-col pt-16 pb-16">
                    {this.messageList}
                </div>
            </div>
            <MessageInput sendMessage={this.sendMessage} handleMessage={this.handleMessage}/>
        </Page>
        </>
    }
}

export default Chat;