import { CustomNavbar } from "../CustomNavbar";
import { Outlet } from "react-router-dom";
import "./PrivateLayout.css";

export function PrivateLayout({ onLogout, firstName, lastName, userId }) {
  return (
    <>
      {/* main is good for inspecting the dom
Outlet acts as a dynamic componenet that will render a bunch of child routes. */}
      <CustomNavbar
        onLogout={onLogout}
        firstName={firstName}
        lastName={lastName}
        userId={userId}
      />
      <main className="private-layout">
        <Outlet />
      </main>
    </>
  );
}
