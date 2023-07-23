import React from "react";
import sendIcon from "../resources/icons8-email-send-60.png"
import returnIcon from "../resources/icons8-double-left-48.png"
import addUserIcon from "../resources/icons8-plus-100.png"
import Message from "./components/message";
import HttpRequestSender from "./classes/HttpRequestSender";
import Page from "./components/page"
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
                    this.messageList.unshift(<Message key={el.id} from={el.sender.id === this.state.userId? "my" : "from"} name={el.sender.id === this.state.userId?  "" : el.sender.username} messageText={el.content} messageDate={el.date}/>)
                })
                this.setState({
                    userId: this.state.userId,
                    chatId: this.state.chatId,
                    message: this.state.message,
                })
                this.forceUpdate();
                this.getMessages();
            }else alert("Something went wrong!");
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
            }else alert("Something went wrong!");
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
    }
    render() {
        return  <>
        <Page className="chat"> 
            {this.userDialog && <UserAddDialog close={this.closeAddUser}/>}
            <div className="flex w-full flex-col">
                <div className="wrapper row-wrapper header">
                    <a className="arrow" href="/chats"><img src={returnIcon}/></a>
                    <p className="chat-name">{localStorage.getItem("chatName")}</p>
                    <button className="basis-1/3" id="create-chat-button" onClick={this.openAddUser}>
                        <img className="h-12" src={addUserIcon}/>
                    </button>
                </div>
                <div className="wrapper column-wrapper message-list">
                    {this.messageList}
                </div>
                <div className="message-input">
                    <div className="wrapper row-wrapper">
                        <input id="message-input" type="text" placeholder="Text.." name="text" onChange={this.handleMessage}/>
                        <button type="submit" onClick={this.sendMessage}><img src={sendIcon}/></button>
                    </div>
                </div>
            </div>
        </Page>
        </>
    }
}

export default Chat;