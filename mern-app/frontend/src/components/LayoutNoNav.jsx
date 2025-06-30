// src/components/LayoutNoNav.jsx
import { Outlet } from "react-router-dom";

export default function LayoutNoNav() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Outlet />
    </main>
  );
}
