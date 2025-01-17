import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Error } from "./pages/error/Error";
import { ProtectedRoute } from "./components/protectedRoutes/protectedRoute";
import { Main } from "./pages/main/main";
import { UnloggedRoute } from "./components/protectedRoutes/loggedRoute";
import Layout from "./pages/Layout";

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
    </Route>

    <Route
      path="login"
      element={
        <UnloggedRoute>
          <Login />
        </UnloggedRoute>
      }
    />
    <Route
      path="register"
      element={
        <UnloggedRoute>
          <Register />
        </UnloggedRoute>
      }
    />
    <Route
      path="*"
      element={
        <ProtectedRoute>
          <Error />
        </ProtectedRoute>
      }
    />
  </Routes>
);
