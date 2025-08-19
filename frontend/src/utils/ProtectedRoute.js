import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./authTokenStore";

export default function ProtectedRoute({ children }) {
  if (isLoggedIn()) {
    return <Navigate to="/tasks" replace />;
  }
  return children;
}
