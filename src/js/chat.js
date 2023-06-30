import React from "react";
import styles from "../css/chat.css";
import sendIcon from "../resources/icons8-email-send-60.png"
import returnIcon from "../resources/icons8-double-left-48.png"
import Message from "./components/message";


const ServerUrl = "http://localhost:8080/water_war/water";

class Chat extends React.Component {
    state = {
        userId: "",
        chatId: "",
        message: "",
    }

    messageList = [];

    getMessages = () => {
        let url = ServerUrl + '/chat';
        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              Accept: "text/plain",
              "Content-Type": "text/plain",
            },
            body:JSON.stringify({
                chatId: localStorage.getItem("chatId"),
                lastMessageDate: localStorage.getItem("lastMessageDate")
            })
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log("Last message " + localStorage.getItem("lastMessageDate"));
                data.map(el =>{
                    let sender = el.sender;
                    let content = el.content;
                    let date = el.date;
                    localStorage.setItem("lastMessageDate",el.date);
                    this.messageList.push(<Message key={el.id} from={sender.id == this.state.userId? "my" : "from"} name={sender.id == this.state.userId?  "" : sender.username} messageText={content} messageDate={date}/>)
               })
               this.setState({
                    userId: this.state.userId,
                    chatId: this.state.chatId,
                    message: this.state.message,
               })
               this.forceUpdate();
               this.getMessages();
            })
            .catch((err) => {
              console.log(err);
             });
    }

    handleMessage = (event) => {
        this.setState({
            userId: this.state.userId,
            chatId: this.state.chatId,
            message: event.target.value
        })
    }

    sendMessage = () => {
        let input = document.getElementById("message-input");
        let url = ServerUrl + '/message';
        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              Accept: "text/plain ",
              "Content-Type": "text/plain",
            },
            body:JSON.stringify(this.state)
          })
            .then((response) => response.json())
            .then((data) => {
                if(data!=null){
                    let el = data;
                    let sender = el.sender;
                    let content = el.content;
                    this.messageList.push(<Message key={el.id} from={sender.id == this.state.userId? "my" : "from"} name={sender.id == this.state.userId?  "" : sender.username} messageText={content}/>)
                    input.value = "";
                }
                this.setState({
                    userId: localStorage.getItem("userId"),
                    chatId: localStorage.getItem("chatId"),
                    message: ""
                })
                this.forceUpdate();
            })
            .catch((err) => {
                window.location.href = "/";
                console.log("Erorr \n" + err);
             });
    }

    messageWebSocketUpdater(){
        //
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
        return <div className="wrapper main-wrapper">
            <div className="wrapper row-wrapper header">
                <a className="arrow" href="/chats"><img src={returnIcon}/></a>
                <p className="chat-name">Name</p>
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
    }
}

export default Chat;