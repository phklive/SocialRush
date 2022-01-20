import { Routes, Route } from "react-router-dom";
import NavBar from "../design/NavBar";
import CreateCard from "./CreateCard";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import LeaderBoard from "./LeaderBoard";
import { ProtectedRoute } from '../utils/auth'
import NotFound from "./NotFound";
import ModifyCard from "./ModifyCard";
import Landing from "./Landing";
import Play from "./Play";


const App: React.FC = () => {

  return (
    <>
      <div id="portal"/>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/createcard" element={<CreateCard />} />
          <Route path="/modifycard" element={<ModifyCard />} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/play" element={<Play />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
