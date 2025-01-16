import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const UnloggedRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
