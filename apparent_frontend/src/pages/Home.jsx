import { Link } from "react-router-dom"
import logo from "../logo.png"

export function Home() {
    return(
        <>
            <h1>Welcome to APParent</h1>
            <img src={logo}/>
            <Link><button>Example</button></Link>
        </>
    )
}
