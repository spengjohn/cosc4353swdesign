import { Navigate, Outlet } from "react-router-dom";

export default function InverseProfileGate() {
  const isProfileComplete = localStorage.getItem("userProfileComplete") === "true";
  return isProfileComplete === true? <Navigate to="/" replace /> : <Outlet />;
}