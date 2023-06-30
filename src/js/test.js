import React from "react";

class Test extends React.Component {


    connectToWebsocket(){
        console.log("Trying to establish websocket connection");
        let webSocket = new WebSocket("ws://localhost:8080/water_war/test",  "protocolOne");
        webSocket.onopen = event => {
            console.log(event);
            console.log("Connection established");
            webSocket.send("Hello, Server!");
        }

        webSocket.onmessage = event => {
            console.log(JSON.parse(event.data));
        }
    }
    componentDidMount(){
        this.connectToWebsocket();
    }
    render() {
        return <h1>Testing...</h1>
    }
}

export default Test;