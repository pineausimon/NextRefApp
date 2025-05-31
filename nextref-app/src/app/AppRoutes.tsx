import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../features/home/HomePage";
import { PrivateRoute } from "../shared/components/PrivateRoute";
import ContentsListPage from "../features/contents/pages/ContentsListPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/contents" element={<PrivateRoute><ContentsListPage /></PrivateRoute>} />
    </Routes>
  );
}