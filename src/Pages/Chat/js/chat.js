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

    listScrollData = {
        minPos: 0,
        maxPos: 0,
        currentPos: 0,
        list: null,
    }

    scrollCalculate = () => {
        this.listScrollData.list = document.getElementById("scrollable-list");
        this.listScrollData.maxPos = 0;
        this.listScrollData.minPos = window.innerHeight > this.listScrollData.list.getBoundingClientRect().height ? 200 : window.innerHeight - this.listScrollData.list.getBoundingClientRect().height;
        this.listScrollData.currentPos = this.listScrollData.minPos;
        window.requestAnimationFrame(() => {
            this.listScrollData.list.style.transform = `translateY(${this.listScrollData.minPos}px)`;
        })
    }

    listScroll = (event) => {
            console.log("minPos : " + this.listScrollData.minPos,"maxPos : " +this.listScrollData.maxPos);
            this.listScrollData.currentPos += event.deltaY/4;
            console.log(this.listScrollData.currentPos);
            this.listScrollData.currentPos = Math.min(this.listScrollData.maxPos, this.listScrollData.currentPos);
            this.listScrollData.currentPos = Math.max(this.listScrollData.minPos, this.listScrollData.currentPos);
            window.requestAnimationFrame(() => {
                this.listScrollData.list.style.transform = `translateY(${this.listScrollData.currentPos}px)`;
            })
    }


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
                this.rerender();
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
        this.rerender();
    }

    closeAddUser = () => {
        this.userDialog = false;
        this.rerender();
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
                this.rerender();
            }else console.log("Couldn't send messages!");
        })
    }

    componentDidMount() {
        localStorage.setItem("lastMessageDate",0);
        this.setState({
            userId: localStorage.getItem("userId"),
            chatId: localStorage.getItem("chatId"),
            message: ""
        })
        this.getMessages();
        window.addEventListener("wheel", this.listScroll);
        window.addEventListener("resize",this.scrollCalculate);
    }

    rerender(){
        this.forceUpdate(this.scrollCalculate);
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