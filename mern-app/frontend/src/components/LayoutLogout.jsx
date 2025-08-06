// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import LogoutButton from "./LogoutButtonOnly.jsx";

export default function LayoutLogout() {
  return (
    <div className="">
      <LogoutButton />
      <main className="flex-grow flex items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
}