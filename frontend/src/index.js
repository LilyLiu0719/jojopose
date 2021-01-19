import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./components/App";
import { Connection, initializeContext } from "./contexts/connection";
import "antd/dist/antd.css";
import "./index.css";

const client = new ApolloClient({
  uri: `${document.location.origin}/graphql`,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <Connection.Provider value={initializeContext()}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Connection.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
