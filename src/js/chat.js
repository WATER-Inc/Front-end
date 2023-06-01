import React from "react";
import styles from "../css/chat.css";
import sendIcon from "../resources/icons8-email-send-60.png"
import returnIcon from "../resources/icons8-double-left-48.png"
import Message from "./components/message";

class Chat extends React.Component {
    state = {
        userId: "",
        chatId: "",
        message: "",
    }

    messageList = [];

    getMessages = () => {
        let login = `http://localhost:8080/water_war/chat`;
        fetch(login, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              Accept: "text/plain ",
              "Content-Type": "text/plain",
            },
            body:JSON.stringify({
                chatId: localStorage.getItem("chatId")
            })
          })
            .then((response) => response.json())
            .then((data) => {
                
               this.messageList = data.map(el =>{
                    let sender = el.sender;
                    let content = el.content;
                    return <Message key={el.id} from={sender.id == this.state.userId? "my" : "from"} name={sender.id == this.state.userId?  "" : sender.username} messageText={content}/>
               })
               this.forceUpdate();
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
        let login = `http://localhost:8080/water_war/message`;
        fetch(login, {
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
                    this.forceUpdate();
                }
                this.setState({
                    userId: localStorage.getItem("userId"),
                    chatId: localStorage.getItem("chatId"),
                    message: "",
                })
            })
            .catch((err) => {
              console.log(err);
             });
    }

    componentDidMount() {
        this.setState({
            userId: localStorage.getItem("userId"),
            chatId: localStorage.getItem("chatId"),
            message: "",
        })
        this.getMessages();
    }

    render() {
        return <div className="wrapper main-wrapper">
            <div className="wrapper row-wrapper header">
                <a className="arrow"><img src={returnIcon}/></a>
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