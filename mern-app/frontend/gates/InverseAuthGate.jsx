// components/InverseAuthGate.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function InverseAuthGate() {
  const token = localStorage.getItem("userToken");
  return token ? <Navigate to="/" replace /> : <Outlet />;
}
