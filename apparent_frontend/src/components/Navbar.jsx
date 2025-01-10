import { NavLink } from "react-router-dom"
import "./Navbar.css"
import logo from "../logo.png"

export function Navbar() {
    return (
        <div className="navbar">
            <div className="logo"><img src={logo} alt="logo" /></div>
            <div className="navbuttons">
                <NavLink to="/" className="navbutton" activeclassname="active">Home</NavLink>
                <NavLink to="/Profile" className="navbutton" activeclassname="active">Profile</NavLink>
                <NavLink to="/About" className="navbutton" activeclassname="active">About</NavLink>
                <NavLink to="/Contact" className="navbutton" activeclassname="active">Contact</NavLink>
                <NavLink to="/CareMap" className="navbutton" activeclassname="active">Map</NavLink>
                <NavLink to="/Forum" className="navbutton" activeclassname="active">Forum</NavLink>
            </div>
        </div>
    )
}
