import React from "react";
import Page from "../../../Components/page";
import WebsocketSender from "../../../Utils/WebsocketSender";
import DeviceRecognition from "../../../Utils/DeviceRecognition";



class Test extends React.Component {
    ws;
    componentDidMount(){
       this.ws = new WebsocketSender();
       this.ws.tryConnect();
    }
    sendMessage = (e) => {
        this.ws.send("" + DeviceRecognition.MobileAndTabletCheck());
        this.ws.send("Мысля");
    }
    render(){
        return <>
        <Page className="">
            <h1 className=" text-red-900 m-10 bg-blue-300">Test xyz</h1>
            <button  className="bg-red-100" onClick={this.sendMessage}>Отправь мыслю</button>
        </Page>
        </>
    }
}
export default Test;
