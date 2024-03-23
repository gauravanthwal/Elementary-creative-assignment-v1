import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/login-page/LoginPage";
import SignupPage from "../pages/singup-page/SignupPage";
import ProductPage from "../pages/products-page/ProductPage";
import HomePage from "../pages/home-page/HomePage";

export const RouteProvider = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
        path="/"
      />

      <Route
        element={
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        }
        path="/products"
      />

      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignupPage />} path="/signup" />
    </Routes>
  );
};


