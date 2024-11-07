import { Link } from "react-router-dom"
import "./Navbar.css"
import logo from "../logo.png"

export function Navbar() {
    return(
        <div className="navbar">
            <div className="logo"><img src={logo}/></div>
            <div className="navbuttons">
            <Link to="/"><button className="navbutton">Home</button></Link>
            <Link to="/Profile"><button className="navbutton">Profile</button></Link>
            <Link to="/About"><button className="navbutton">About</button></Link>
            <Link to="/Contact"><button className="navbutton">Contact</button></Link>
            <Link to="/CareMap"><button className="navbutton">Map</button></Link>
            </div>

        </div>

    )
}
