import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
