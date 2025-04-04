import { CustomNavbar } from "../CustomNavbar";
import { Outlet } from "react-router-dom";
import "./PrivateLayout.css";

export function PrivateLayout({
  onLogout,
  firstName,
  lastName,
  friends,
  setFriends,
}) {
  return (
    <>
      {/* main is good for inspecting the dom
Outlet acts as a dynamic componenet that will render a bunch of child routes. */}
      <CustomNavbar
        onLogout={onLogout}
        firstName={firstName}
        lastName={lastName}
        friends={friends}
      />
      <main className="private-layout">
        <Outlet />
      </main>
    </>
  );
}
