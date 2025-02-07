import { CustomNavbar } from "./CustomNavbar"
import { Outlet } from "react-router-dom"

export function Layout() {
    return(
        <>
{/* main is good for inspecting the dom
Outlet acts as a dynamic componenet that will render a bunch of child routes. */}
            <CustomNavbar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}
