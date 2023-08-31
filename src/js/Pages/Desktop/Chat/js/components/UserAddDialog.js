import React from "react";
import HttpRequestSender from "../../../../../Utils/HttpRequestSender";


class UserAddDialog extends React.Component {
    state = {
        username: "",
        userpassword: "hash2",
        chatId: "",
        roleTitle: "user",
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
                <div className="absolute z-40 h-screen w-full backdrop-blur-sm"/>
                <div className="absolute rounded-xl p-4 z-50 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[300px] h-[35vh] flex flex-col items-stretch justify-around bg-custom-blue-400">
                    <div className="flex h-full w-full flex-col items-center">
                        <div className="m-4">
                            <p className="text-white font-MuseoModerno text-2xl tracking-wider">Add User</p>
                        </div>
                        <input className="w-64 px-4 my-4 rounded-md h-12 text-custom-blue-500 placeholder:text-custom-blue-500 placeholder:opacity-60" id="chat-name-input" placeholder="Add User..." onChange={this.userNameHandler}/>
                        <div className="flex flex-row justify-between w-1/2 my-10">
                            <button className="" onClick={this.addUser}>
                                <p className="p-1 bg-white rounded-md">
                                    Add
                                </p>
                            </button>
                            <button className="" onClick={this.props.close}>
                                <p className="p-1 bg-white rounded-md">
                                    Close
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </>
    }
}

export default UserAddDialog;