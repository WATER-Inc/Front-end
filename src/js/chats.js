import React from "react";
import searchIcon from "../resources/icons8-find-67.png"
import ChatLink from "./components/chatlink";
import styles from "../css/chats.css";

const ServerUrl = "http://localhost:8080/water_war/water";


class Chats extends React.Component {
    chatList = [];

    openChat = (element) => {
        localStorage.setItem("lastMessageDate",0);
        localStorage.setItem("chatId",element.target.getAttribute("id"));
        window.location.href = "/chat";
    }

    getChats = function () {
        let login = `http://localhost:8080/water_war/water/chats`;
        fetch(login, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              Accept: "text/plain ",
              "Content-Type": "text/plain",
            }
          })
            .then((response) => response.json())
            .then((data) => {
                this.chatList = data.map(element => 
                    <ChatLink key={element.id} chatId={element.id} chatName={element.name} chatLastMessageDate={Date(element.lastMessageDate)}
                    onClick={this.openChat}/>
                );
                this.forceUpdate();
            })
            .catch((err) => {
              console.log("Error: " + err);
             });
    };

    componentDidMount() {
        this.getChats();
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