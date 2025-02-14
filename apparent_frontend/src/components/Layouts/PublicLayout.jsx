import { Outlet } from "react-router-dom";
import "./PublicLayout.css";

export function PublicLayout() {
  return (
    <>
      {/* main is good for inspecting the dom
Outlet acts as a dynamic componenet that will render a bunch of child routes. */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
