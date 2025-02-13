import "./assets/css/App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
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
import { PrivateLayout } from "./components/Layouts/PrivateLayout";
import { PublicLayout } from "./components/Layouts/PublicLayout";
import { PrivateRoutes } from "./components/Routes/PrivateRoutes";
import { Outlet } from "react-router-dom";

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
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateLayout onLogout={handleLogout} />}>
          <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/caremap" element={<Map />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
