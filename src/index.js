import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import dotenv from "dotenv"
import reducers from "./reducers";
import App from "./App.jsx";
const store = createStore(reducers, compose(applyMiddleware(thunk)));

//createStore is a function of redux which creates a store.
//we are passing reducers, who can modify states
//compose(applyMiddleware(thunk)), compose is used for combining multiple enhancer middlewares and applying to reducers.
//in this case, we can also ignore compose because we are using only one enhancer, THUNK, it is used for asynchronous state management like api calls.
dotenv.config();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
