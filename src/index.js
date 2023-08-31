import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import App from "./js/app";

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
    <React.Suspense>
        <App/>
    </React.Suspense>
);

