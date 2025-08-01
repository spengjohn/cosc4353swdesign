// components/InverseAuthGate.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function InverseEmailGate() {
  const userVerified = localStorage.getItem("userVerified");
  return userVerified === true ? <Navigate to="/" replace /> : <Outlet />;
}