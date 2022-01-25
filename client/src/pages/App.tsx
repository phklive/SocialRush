import { Routes, Route } from "react-router-dom";
import NavBar from "../design/NavBar";
import CreateCard from "./CreateCard";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import LeaderBoard from "./LeaderBoard";
import { ProtectedRoute } from "../utils/auth";
import NotFound from "./NotFound";
import Landing from "./Landing";
import Play from "./Play";
import ViewCard from "./ViewCard";
import { AuthContext } from "./AuhthContext";
import { useEffect, useState } from "react";

const AUTH_QUERY = `
query Query {
  isAuth 
}
`;

const App = () => {
  const tennis = "haha";

  const [session, setSession] = useState(false);

  const poulet = () => {};

  useEffect(() => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: AUTH_QUERY }),
    })
      .then((r) => r.json())
      .then((data) => setSession(data.data.isAuth));
  }, []);

  return (
    <>
      <div id="portal" />
      <AuthContext.Provider value={{ session, setSession }}>
        <NavBar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/createcard" element={<CreateCard />} />
            <Route path="/viewcard" element={<ViewCard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/play" element={<Play />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
          </Route>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
};

export default App;
