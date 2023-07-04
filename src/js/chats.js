import React from "react";
import searchIcon from "../resources/icons8-find-67.png"
import ChatLink from "./components/chatlink";
import styles from "../css/chats.css";
import chatsIcon from "../resources/icons8-comments-96.png"
import userIcon from "../resources/icons8-person-64.png"
import addChatIcon from "../resources/icons8-plus-100.png"
import logoutIcon from "../resources/icons8-logout-100.png"

const ServerUrl = "http://localhost:8080/water_war/water";


class Chats extends React.Component {
    state = {
        chatList: [],
        searchText: ""
    }

    openChat = (element) => {
        localStorage.setItem("lastMessageDate",0);
        localStorage.setItem("chatId",element.target.getAttribute("id"));
        localStorage.setItem("chatName",element.target.getAttribute("name"))
        window.location.href = "/chat";
    }

    createChat = () => {
        window.location.href = "/createChat"
    }

    logOut = () => {
        let logout = ServerUrl + '/logout';
        fetch(logout, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              Accept: "text/plain ",
              "Content-Type": "text/plain",
            }
          })
            .then((response) => {
                localStorage.setItem("lastMessageDate",0);
                localStorage.setItem("chatId",-1);
                localStorage.setItem("userId",-1);
                window.location.href = "/";
            })
            .catch((err) => {
              console.log("Error: " + err);
        });
    }

    searchHandler = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    getChats = function () {
        let login = ServerUrl + '/chats';
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
                this.setState({chatList: data.map(element => 
                    <ChatLink key={element.id} chatId={element.id} chatName={element.name} chatLastMessageDate={new Date(element.lastMessageDate).toString()}
                    onClick={this.openChat}/>
                    )
                })
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
                    <input type="text" placeholder="Search.." name="search" onChange={this.searchHandler}/>
                    <button type="submit"><img src={searchIcon}/></button>
                </form>
            </div>
            <div className="wrapper column-wrapper chat-list">
                {this.state.chatList.filter(el => {
                    return (el.props.chatName.indexOf(this.state.searchText) == 0)
                })}
            </div>
            <div className="menu-section wrapper row-wrapper">
                <button id="chats-button" className="menu-button" onClick={this.openChats}>
                    <img src={chatsIcon}></img>
                </button>
                <button id="users-button" className="menu-button" onClick={this.openUsers}>
                    <img src={userIcon}></img>
                </button>
                <button id="add-chat-button" className="menu-button" onClick={this.createChat}>
                    <img src={addChatIcon}></img>
                </button>
                <button id="logout-button" className="menu-button" onClick={this.logOut}>
                    <img src={logoutIcon}></img>
                </button>
            </div>
        </div>
    }
}

export default Chats;