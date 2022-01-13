import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./design/NavBar";
import Home from "./pages/Home";
import CreateCard from "./pages/CreateCard";
import Profile from "./pages/Profile";
import Test from "./pages/Test";
import Account from "./pages/Account";
import LeaderBoard from "./pages/LeaderBoard";
import { createClient, Provider } from "urql";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";

const authLink = () => {

}

const client = createClient({
  url: "http://localhost:4000/api",
});

ReactDOM.render(
  <BrowserRouter>
    <Provider value={client}>
      <React.StrictMode>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/createcard" element={<CreateCard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
