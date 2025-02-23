import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Error } from "./pages/error/Error";
import { ProtectedRoute } from "./components/protectedRoutes/protectedRoute";
import { Main } from "./pages/main/Main";
import { UnloggedRoute } from "./components/protectedRoutes/loggedRoute";
import History from "./pages/history/History";
import Layout from "./pages/Layout";
import CarDetails from "./pages/carDetails/carDetails";
import Cars from "./pages/cars/cars";
import { AdminRoute } from "./components/protectedRoutes/adminRoute";
import CarAdmin from "./pages/carAdmin/CarAdmin";
import AddCar from "./pages/addCar/addCar";

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

      <Route
        path="cars/:id"
        element={
          <ProtectedRoute>
            <CarDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="cars/"
        element={
          <ProtectedRoute>
            <Cars />
          </ProtectedRoute>
        }
      />

      <Route
        path="history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="carAdmin"
        element={
          <AdminRoute>
            <CarAdmin />
          </AdminRoute>
        }
      />

      <Route
        path="addCar"
        element={
          <AdminRoute>
            <AddCar />
          </AdminRoute>
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
