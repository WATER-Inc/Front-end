import React from "react";

class ChatLink extends React.Component{
    render(){
        return <button className="wrapper row-wrapper button-wrapper" id={this.props.chatId} onClick={this.props.onClick}><div className="chat wrapper row-wrapper">
                <div id={this.props.chatId} className="chat-info wrapper column-wrapper">
                    <p id={this.props.chatId} className="chat-name">{this.props.chatName}</p>
                    <p id={this.props.chatId} className="lastMessageDate">Last message Date: {this.props.chatLastMessageDate}</p>
                </div>
            </div>
            </button>
    }
}
export default ChatLink;