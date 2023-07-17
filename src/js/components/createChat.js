import React from "react";
import HttpRequestSender from "../classes/HttpRequestSender";


class CreateChat extends React.Component {
    state = {
        userId: "",
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
            return 
            <div className="overlay">
            <div className="popup wrapper main-wrapper column-wrapper">
                    <input id="chat-name" placeholder="Chat Name..." onChange={this.chatNameHandler}>

                    </input>
                    <button className="create-button" onClick={this.createChat}>
                        Create
                    </button>
                    <button onClick={this.props.closeWindow}>
                        Close
                    </button>
            </div>
            </div>
    }
}

export default CreateChat;