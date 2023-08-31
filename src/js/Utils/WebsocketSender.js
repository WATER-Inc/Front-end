class WebsocketSender{
    path = "ws://localhost:8080/water_war/websocket";
    constructor(){
        this.ws = new WebSocket(this.path);
    }
    tryConnect(){
        console.log("trying...\n");
        this.ws.onopen = (e) => {
            console.log("connection established!");
            this.send("Дарова, бэкэнд");
        }
        this.ws.onmessage = (e) => {
            console.log( `Сервер: ${e.data}`);
        };
        this.ws.onclose = (e) => {
            if (e.wasClean) {
                console.log("Досвидос!");
            } else {
                console.log("Что-то пошло не так...");
            }
        };
        this.ws.onerror = (e) => {
            console.log("ERROR!");
            console.log(e);
        };
    }
    send(message){
        this.ws.send(message);
    }
}

export default WebsocketSender;