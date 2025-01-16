import React from "react";
import { useAuth } from "../../context/AuthContext";

export const Main: React.FC = () => {
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
  };

  return (
    <>
      <h1>test</h1>
      <button onClick={handleClick}> logout</button>
    </>
  );
};
