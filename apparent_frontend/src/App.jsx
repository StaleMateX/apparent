import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Map } from './pages/Map'
import { UserProfile } from './pages/UserProfile'
import { Forum } from './pages/Forum'
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route element = {<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Profile" element={<UserProfile/>}/>
          <Route path="/CareMap" element={<Map/>}/>
          <Route path="/Forum" element={<Forum/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
