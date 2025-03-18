import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}