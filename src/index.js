import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./App/store/createStore";
import { Provider } from "react-redux";

const store = createStore()
ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>,
    document.getElementById("root")
)
