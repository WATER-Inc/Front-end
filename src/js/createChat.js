import React from "react";
// import styles from "../css/create.css";

const ServerUrl = "http://localhost:8080/water_war/water";

class CreateChat extends React.Component {
    state = {
        userId: "",
        chatId: "",
        message: "",
    }

    messageList = [];

    handleMessage = (event) => {
        this.setState({
            userId: this.state.userId,
            chatId: this.state.chatId,
            message: event.target.value
        })
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
    }
    render() {
        return <div className="wrapper main-wrapper">
            <div className="wrapper row-wrapper header">
                <p className="chat-name">{localStorage.getItem("chatName")}</p>
            </div>
            <div className="wrapper column-wrapper message-list">
                {this.messageList}
            </div>
            <div className="message-input">
                <div className="wrapper row-wrapper">
                    <input id="message-input" type="text" placeholder="Text.." name="text" onChange={this.handleMessage}/>
                </div>
            </div>
        </div>
    }
}

export default CreateChat;