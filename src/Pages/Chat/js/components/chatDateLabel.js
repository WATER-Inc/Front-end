import React from "react";

class ChatDateLabel extends React.Component{

    render(){
        return <>
            <div>
                <p>{this.props.date}</p>
            </div>
        </>
    }

}

export default ChatDateLabel;