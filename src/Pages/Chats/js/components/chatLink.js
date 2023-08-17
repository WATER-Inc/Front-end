import React from "react";

class ChatLink extends React.Component{

    time = "";
    message = "";

    weekDaysSrings = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    monthStrings = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    getLastMessageDateFormat = () => {
        let dateNow = new Date();
        let messageDate = new Date(this.props.chatLastMessageDate);
        if(dateNow.getFullYear() !== messageDate.getFullYear()){
            this.time = messageDate.getFullYear();
        }else if(dateNow.getMonth() !== messageDate.getMonth() || (dateNow.getDate() - messageDate.getDate() > 7)){
            this.time = `${messageDate.getDate()} ${this.monthStrings[messageDate.getMonth()]}`;
        }else if(dateNow.getDate() - messageDate.getDate() > 0){
            this.time = this.weekDaysSrings[messageDate.getDay()];
        }else{
            this.time = `${messageDate.getHours()%12}:${messageDate.getMinutes() > 9 ? '' : '0'}${messageDate.getMinutes()} ${messageDate.getHours() > 12 ? 'PM' : 'AM'}`;
        }
    }

    lastMessageFormater = () => {
            this.message = "Hello...";
    }

    componentDidMount(){
        this.getLastMessageDateFormat();
        this.lastMessageFormater();
        this.forceUpdate();
    }

    render(){
        return <>
            <div className="relative rounded-xl pt-1 flex justify-center after:content-[''] first:after:content-[] after:opacity-10 after:absolute after:top-1 after:w-[calc(80%-48px)] after:border-b-2 after:border-solid after:border-custom-blue-200">
                <button className="w-4/5 h-full rounded-xl absolute z-10 hover:bg-custom-blue-200 hover:opacity-10" id={this.props.chatId} onClick={() => {
                    this.props.onClick(this.props.chatId,this.props.chatName);
                }}/>
                <div className="bg-transparent flex flex-row h-24 w-4/5 p-2 justify-between">
                    <div className="flex flex-row justify-between">
                        <div className="pe-4">
                            <img className="h-20 w-20 rounded-full bg-custom-blue-300"/>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-MuseoModerno text-custom-blue-500 text-xl py-2">{this.props.chatName}</p>
                            <p className="">{this.message}</p>
                        </div>
                    </div>
                    <div>
                        <p className="">{this.time}</p>
                    </div>
                </div>
            </div>
        </>
    }
}
export default ChatLink;