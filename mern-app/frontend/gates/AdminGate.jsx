// components/InverseAuthGate.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function AdminGate() {
  const role = localStorage.getItem("userRole");
  return role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
}