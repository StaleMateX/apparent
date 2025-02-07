import "./assets/css/App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Map } from "./pages/Map";
import { ProfilePage } from "./pages/ProfilePage";
import { Forum } from "./pages/Forum";
import { Matching } from "./pages/Matching";
import { Messages } from "./pages/Messages";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/CareMap" element={<Map />} />
          <Route path="/Forum" element={<Forum />} />
          <Route path="/Matching" element={<Matching />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
