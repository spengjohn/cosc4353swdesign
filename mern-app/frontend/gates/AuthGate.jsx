// components/AuthGate.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGate() {
  const token = localStorage.getItem("userToken");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
