import React from "react";
import searchIcon from "../resources/icons8-find-67.png"
import ChatLink from "./components/chatlink";
import styles from "../css/chats.css";

class Chats extends React.Component {
    state = {
        userId: "",
        chats: []
    }
    chatList = [];

    getChats = function () {
        let login = `http://localhost:8080/water_war/chats`;
        fetch(login, {
            method: "GET",
            mode: "no-cors",
            credentials: "include",
            headers: {
              Accept: "text/plain ",
              "Content-Type": "text/plain",
            }
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => {
              console.log(err);
             });
    };

    openChat = (element) => {
        let id = element.getAttribute("chatId");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/chat");
        xhr.send(JSON.stringify({chatId: id}));

    }

    componentDidMount() {
        this.getChats();
        this.chatList = this.state.chats.map(chat => {
                return <ChatLink chatId={chat.chatId} chatName={chat.chatName} chatLastMessage={chat.lastMessage}
                                 onClick={this.openChat}/>;
            }
        )
    }

    render() {
        return <div>
            <div className="search-bar">
                <form className="wrapper row-wrapper">
                    <input type="text" placeholder="Search.." name="search"/>
                    <button type="submit"><img src={searchIcon}/></button>
                </form>
            </div>
            <div className="wrapper column-wrapper chat-list">
                {this.chatList}
            </div>
        </div>
    }
}

export default Chats;