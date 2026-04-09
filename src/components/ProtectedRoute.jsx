import { Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";

export default function ProtectedRoute({ children }) {
  const user = useAuthUser();

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}