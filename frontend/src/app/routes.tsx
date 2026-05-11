import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { QuizPage } from "./components/QuizPage";
import { AuthPage } from "./components/AuthPage";
import { LandingPage } from "./components/LandingPage";
import { useState, useEffect } from "react";

// Mock Auth Guard
const ProtectedRoute = () => {
  const user = localStorage.getItem("quizzo_user");
  if (!user) return <Navigate to="/auth" replace />;
  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      {
        path: "auth",
        Component: AuthPage,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", Component: Dashboard },
          { path: "quiz/:subjectId/:levelId", Component: QuizPage },
          { path: "final-test", Component: QuizPage },
        ],
      },
    ],
  },
]);
