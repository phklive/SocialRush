import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import "./styles/index.css";
import App from "./pages/App";

const uri = "https://trueorfalseapp.herokuapp.com/graphql";

const httpLink = ApolloLink.from([
  new HttpLink({
    fetchOptions: {
      credentials: "include",
    },
    uri,
    credentials: "include",
  }),
]);

const cache = new InMemoryCache({
  typePolicies: {
    getUser: {
      keyFields: ["id"],
    },
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
