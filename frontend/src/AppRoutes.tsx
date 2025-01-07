import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Error } from "./pages/error/Error";

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="*" element={<Error />} />
  </Routes>
);
