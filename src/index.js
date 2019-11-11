import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./LoginComponent/Login";
import * as serviceWorker from "./serviceWorker";
import "./custom.scss";
import { Provider } from "react-redux";
import { Store } from "./store";
import { 
  BrowserRouter, 
  Switch, 
  Route
} from 'react-router-dom'

const e = React.createElement;

ReactDOM.render(
  e(Provider, { store: Store }, 
    e(BrowserRouter, null, 
      e(Switch, null,
        e(Route, {path: '/', exact: true, component: Login}),
        e(Route, {path: '/home', exact: true, component: App})  
      )
    )  
  ),
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
