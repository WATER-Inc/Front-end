class HttpRequestSender{

    static serverUrl = "http://localhost:8080/water_war/water";

    static sendRequest(type,path,body){
        return fetch(this.serverUrl + path, {
            method: type,
            mode: "cors",
            credentials: "include",
            headers: {
              Accept: "text/plain",
              "Content-Type": "text/plain",
            },
            body:JSON.stringify(body)
        })
        .then((response) => response.json())
        .catch(error => {
            console.log(error);
        })
    }
}

export default HttpRequestSender;