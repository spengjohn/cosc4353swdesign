// components/EmailVerificationGate.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function EmailVerificationGate() {
  const isVerified = localStorage.getItem("userVerified") === "true";
  return isVerified === true ? <Outlet /> : <Navigate to="/emailverification" replace />;
}
