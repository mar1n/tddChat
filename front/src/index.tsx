import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./components/Router/Router";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Store } from "./store/store";
import { Provider } from "react-redux";

if(process.env.REACT_APP_STAGE === 'development'){
  console.log("MSW.JS, MSW.JS")
  const { worker } = require("./mocks/browser");
  worker.start();
}


const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
    <Provider store={Store}>
      <Router>
        <Main />
      </Router>
      </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (module.hot) {
  module.hot.accept();
}
