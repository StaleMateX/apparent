import { NavLink } from "react-router-dom"
import "./Navbar.css"
import logo from "../logo.png"

export function Navbar() {
    return (
        <div className="navbar">
            <div className="logo"><img src={logo} alt="logo" /></div>
            <div className="navbuttons">
                <NavLink to="/" className="navbutton" activeClassName="active">Home</NavLink>
                <NavLink to="/Profile" className="navbutton" activeClassName="active">Profile</NavLink>
                <NavLink to="/About" className="navbutton" activeClassName="active">About</NavLink>
                <NavLink to="/Contact" className="navbutton" activeClassName="active">Contact</NavLink>
                <NavLink to="/CareMap" className="navbutton" activeClassName="active">Map</NavLink>
                <NavLink to="/Forum" className="navbutton" activeClassName="active">Forum</NavLink>
            </div>
        </div>
    )
}
