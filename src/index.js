import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import * as ReactDOMClient from 'react-dom/client';
import Registration from "./Pages/Registration/js/registration";
import Login from "./Pages/Login/js/login";
import Chat from "./Pages/Chat/js/chat";
import Chats from "./Pages/Chats/js/chats";
import Test from "./js/test";
import styles from "./css/style.css";
import "./css/output.css"


const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/singup" element={<Registration/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/chats" element={<Chats/>}/>
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
    );
}

root.render(
    <React.Suspense>
        <App/>
    </React.Suspense>
);

