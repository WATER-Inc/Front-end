import React from "react";
import HttpRequestSender from "../classes/HttpRequestSender";


class CreateChat extends React.Component {
    state = {
        userId: "",
        chatName: "",
    }

    chatNameHandler = (event) => {
        this.setState({
            chatName: event.target.value,
        })
    }

    createChat = () => {
        HttpRequestSender.sendRequest("POST","/chatcreate",this.state)
        .then((data) => {
            if(data!=null){

            }else console.log("Couldn't create chat: empty data");
        })
    }

    componentDidMount() {
        this.setState({
            userId: localStorage.getItem("userId"),
        })
    }
    render() {
            return <>
                <div className="overlay">
                <div className="popup wrapper column-wrapper">
                        <input id="chat-name-input w-[100px] h-16" placeholder="Chat Name..." onChange={this.chatNameHandler}/>
                        <button className="create-chat-button" onClick={this.createChat}>
                            Create Chat
                        </button>
                        <button className="close-create-chat-dialog"onClick={this.props.closeWindow}>
                            Close
                        </button>
                </div>
                </div>
            </>
    }
}

export default CreateChat;