import React from "react";

class Message extends React.Component{

    getTime = (messageDate) => {
            return `${messageDate.getHours()%12}:${messageDate.getMinutes() > 9 ? '' : '0'}${messageDate.getMinutes()} ${messageDate.getHours() > 12 ? 'PM' : 'AM'}`;
    }

    render(){
        return <>
        <div className={this.props.classes}>
            <div className="w-screen flex flex-wrap flex-col group-[.my]:items-end group-[.from]:items-start">
                <div className=" shadow-inner mx-4 rounded-t-xl group-[.my]:rounded-l-xl group-[.from]:rounded-r-xl p-2.5 my-2.5 w-2/5 font-Roboto flex flex-col group-[.my]:bg-white group-[.from]:bg-custom-blue-400 group-[.from]:shadow-custom-blue-500 group-[.my]:shadow-slate-400">
                    <div className="font-MuseoModerno group-[.from]:text-white">
                        <p>{this.props.name}</p>
                    </div>
                    <p className="p-2.5 group-[.my]:text-custom-blue-400 group-[.from]:text-white break-all whitespace-normal">{this.props.messageText}</p>
                    <p className="p-2.5 group-[.my]:text-custom-blue-400 group-[.from]:text-white">{this.getTime(new Date(this.props.messageDate))}</p>
                </div>
            </div>
        </div>
        </>
    }
}
export default Message;
