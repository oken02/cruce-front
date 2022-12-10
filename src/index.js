import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./routes/App";
import { Provider } from "react-redux";
import store from "./store/store";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

axios.defaults.baseURL = "https://cruce-api-production.up.railway.app"

ReactDOM.render(
  // <BrowserRouter>
  <ChakraProvider>
    <React.StrictMode>
      {/* <Switch> */}
      <Provider store={store}>
        {/* <BrowserRouter> */}
        {/* <Route path="/" component={App} /> */}
        <App />
        {/* </BrowserRouter> */}
      </Provider>
      {/* </Switch> */}
    </React.StrictMode>
  </ChakraProvider>,
  // </BrowserRouter>,
  document.getElementById("root")
);
