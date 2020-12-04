import React from "react";
import {Provider} from 'react-redux';
import ReactDOM from "react-dom";
import "./style/css/App.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
