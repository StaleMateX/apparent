import "./assets/css/App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Map } from "./pages/Map";
import { ProfilePage } from "./pages/ProfilePage";
import { Forum } from "./pages/Forum";
import { LoginPage } from "./pages/LoginPage";
import { Register } from "./pages/Register";
import { useState } from "react";
import { PrivateLayout } from "./components/Layouts/PrivateLayout";
import { PublicLayout } from "./components/Layouts/PublicLayout";
import { PrivateRoutes } from "./components/Routes/PrivateRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendsProfile, setFriendsProfile] = useState({
    id: "",
    username: "",
  });

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private Routes */}
        <Route
          element={
            <PrivateLayout
              onLogout={handleLogout}
              firstName={firstName}
              lastName={lastName}
              friends={friends}
              setFriends={setFriendsProfile}
              setFriendsProfile={setFriendsProfile}
            />
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            element={
              <PrivateRoutes onLogin={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          >
            {/* Route to a friend's profile page */}
            <Route
              path="profile/:username"
              element={
                <ProfilePage
                  firstName={firstName}
                  lastName={lastName}
                  friends={friends}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setFriends={setFriends}
                  friendsProfile={friendsProfile}
                  setFriendsProfile={setFriendsProfile}
                />
              }
            />
            {/* Route to user profile page */}
            <Route
              path="/profile"
              element={
                <ProfilePage
                  firstName={firstName}
                  lastName={lastName}
                  friends={friends}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setFriends={setFriends}
                  setFriendsProfile={setFriendsProfile}
                />
              }
            />
            <Route path="/caremap" element={<Map />} />
            <Route path="/forum" element={<Forum />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
