import React from "react";
import sendIcon from "../../../../resources/icons8-email-send-60.png"



class MessageInput extends React.Component {

    render(){
        return <>
            <div className="fixed bottom-0 pb-2 z-20 h-16 w-screen">
                <div className="flex flex-row bg-white w-5/6 h-14 mx-auto px-6 py-2 rounded-3xl items-center justify-between shadow-xl">
                    <input id="message-input" type="text" placeholder="Text.." name="text" onChange={this.props.handleMessage}/>
                    <button type="submit" className="w-8 h-8 items-center align-middle" onClick={this.props.sendMessage}><img src={sendIcon}/></button>
                </div>
            </div>
        </>
    }
}

export default MessageInput;