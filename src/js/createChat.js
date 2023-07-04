import React from "react";
import { json } from "react-router-dom";
// import styles from "../css/create.css";

const ServerUrl = "http://localhost:8080/water_war/water";

class CreateChat extends React.Component {
    state = {
        userId: "",
        chatName:""
    }

    chatNameHandler = (event) => {
        this.setState({
            chatName: event.target.value,
        })
    }

    createChat = () => {
        let url =  ServerUrl + '/chat-create';
        fetch(url, {
            method: "POST",
            mode:"cors",
            credentials: 'include',
            headers: {
              Accept: "text/plain ",
              "Content-Type": "text/plain",
            },
            body:JSON.stringify(this.state)
          })
          .then((response) => 
            response.json()
          )
          .then( data => {
            console.log(data)
          })
          .catch((err) => {
                console.log("Catched erroe");
                console.log(err);
             });
    }

    messageWebSocketUpdater(){
        //
    }

    componentDidMount() {
        this.setState({
            userId: localStorage.getItem("userId"),
        })
    }
    render() {
        return <div className="wrapper main-wrapper">
                <input id="chat-name" onChange={this.chatNameHandler}>

                </input>
                <button onClick={this.createChat}>
                    Create
                </button>
        </div>
    }
}

export default CreateChat;