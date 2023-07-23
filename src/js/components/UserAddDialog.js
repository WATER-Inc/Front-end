import React from "react";
import HttpRequestSender from "../classes/HttpRequestSender";


class UserAddDialog extends React.Component {
    state = {
        username: "",
        userpassword: "-nopassword-",
        chatId: "",
        roleId: "1",
    }

    userNameHandler = (event) => {
        this.setState({
            username: event.target.value,
        })
        console.log(event.target.value);
    }

    addUser = () => {
        HttpRequestSender.sendRequest("POST","/chat/add/user",this.state)
        .then((data) => {
            if(data!=null){

            }else console.log("Couldn't create chat: empty data");
        })
    }

    componentDidMount() {
        this.setState({
            chatId: localStorage.getItem("chatId"),
        })
    }
    render() {
            return <>
                <div className="overlay">
                <div className="popup wrapper column-wrapper">
                        <input id="chat-name-input w-[100px] h-16" placeholder="User Name..." onChange={this.userNameHandler}/>
                        <button className="create-chat-button" onClick={this.addUser}>
                            Create Chat
                        </button>
                        <button className="close-create-chat-dialog"onClick={this.props.close}>
                            Close
                        </button>
                </div>
                </div>
            </>
    }
}

export default UserAddDialog;