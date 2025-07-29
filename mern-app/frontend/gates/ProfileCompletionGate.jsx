// components/ProfileCompletionGate.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProfileCompletionGate() {
  const isProfileComplete = localStorage.getItem("userProfileComplete") === "true";
  return isProfileComplete === true? <Outlet /> : <Navigate to="/createprofile" replace />;
}
