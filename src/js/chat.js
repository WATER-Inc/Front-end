import React from "react";
import styles from "../css/chat.css";
import sendIcon from "../resources/icons8-email-send-60.png"
import returnIcon from "../resources/icons8-double-left-48.png"
import Message from "./components/message";

class Chat extends React.Component {
    state = {
        userId: "",
        chatId: "",
        currentMessage: "",
        messageList: []
    }

    getMessages = () => {
        let login = `http://localhost:8080/water_war/chats`;
        fetch(login, {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept: "text/plain ",
              "Content-Type": "text/plain",
            },
            body:{
                chatId: this.state.chatId,
            }
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => {
              console.log(err);
             });
        this.formReset();
    }

    handleMessage = (event) => {
        this.setState({
            userId: this.state.userId,
            chatId: this.state.chatId,
            currentMessage: event.target.value,
            messageList: this.state.messageList
        })
    }

    sendMessage = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/sendmessage");
        xhr.send(JSON.stringify({
            userId: this.state.userId,
            chatId: this.state.chatId,
            message: this.state.currentMessage
        }));
        this.messageList.append(<Message from="my" name={this.userName} messageText={this.state.currentMessage}/>);
        this.setState({
            userId: this.state.userId,
            chatId: this.state.chatId,
            currentMessage: "",
            messageList: this.state.messageList
        })
        this.forceUpdate();
    }

    componentDidMount() {
        this.getMessages();
        this.messageList = this.state.messageList.map(message => {
                return <Message from={message.from == this.userId ? "my" : "from"} name={message.username}
                                messageText={message.text}/>;
            }
        )
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
                <form className="wrapper row-wrapper">
                    <input type="text" placeholder="Text.." name="text" onChange={this.handleMessage}/>
                    <button type="submit" onSubmit={this.sendMessage}><img src={sendIcon}/></button>
                </form>
            </div>
        </div>
    }
}

export default Chat;