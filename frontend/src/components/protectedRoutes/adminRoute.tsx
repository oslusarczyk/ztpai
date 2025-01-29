import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
export const AdminRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
