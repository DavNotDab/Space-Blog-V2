import React from "react";
import ReactDOM from "react-dom/client";
import "../../css/app.css";
import "../../css/main.scss";
import App from "./components/App";
import store from "../store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

