import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Registration from "./Pages/Universal/Registration/js/registration";
import Login from "./Pages/Universal/Login/js/login";
import Test from "./Pages/Universal/Test/test";
import DeviceRecognition from "./Utils/DeviceRecognition";
import MobileApp from "./Pages/Mobile/mobileApp";
import DesktopApp from "./Pages/Desktop/desktopApp";
import "../css/style.css";
import "../css/output.css"


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/singup" element={<Registration/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/water" element={ (DeviceRecognition.MobileAndTabletCheck()) ? <MobileApp/> : <DesktopApp/> }/>
            </Routes>
        </BrowserRouter>
    );
}

