import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./design/NavBar";
import Home from "./pages/Home";
import CreateCard from "./pages/CreateCard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeaderBoard from "./pages/LeaderBoard";
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './utils/auth'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./styles/index.css";
import NotFound from "./pages/NotFound";
import ModifyCard from "./pages/ModifyCard";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/createcard" element={<CreateCard />} />
              <Route path="/modifycard" element={<ModifyCard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.StrictMode>
      </ApolloProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
