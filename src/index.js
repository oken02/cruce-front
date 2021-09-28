import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import "./index.css";
import App from "./routes/App";
import { Provider } from "react-redux";
import store from "./store/store";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider>
      <React.StrictMode>
        <Switch>
          <Provider store={store}>
            <App />
          </Provider>
        </Switch>
      </React.StrictMode>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

