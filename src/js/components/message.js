import React from "react";

class Message extends React.Component{
    render(){
        return <div id={this.props.from} className="message-wrapper wrapper row-wrapper">
            <div className="message wrapper column-wrapper">
                <div className="sender">
                    <p>{this.props.name}</p>
                </div>
                <p className="message-text">{this.props.messageText}</p>
                <p className="message-text">{Date(this.props.messageDate)}</p>
            </div>
        </div>
    }
}
export default Message;
