import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import store from './redux/store'
import {BrowserRouter} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import "./styles/index.css";
import App from "./pages/App";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    getUser: {
      keyFields: ["id"]
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
