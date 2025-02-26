import { CustomNavbar } from "../CustomNavbar";
import { Outlet } from "react-router-dom";
import "./PrivateLayout.css";

export function PrivateLayout({ onLogout }) {
  return (
    <>
      {/* main is good for inspecting the dom
Outlet acts as a dynamic componenet that will render a bunch of child routes. */}
      <CustomNavbar onLogout={onLogout} />
      <main className="private-layout">
        <Outlet />
      </main>
    </>
  );
}
