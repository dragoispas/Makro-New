import { Route, Routes } from "react-router-dom";
import React from "react";
import DiaryPage from "../Pages/DiaryPage";
import { SettingsPage } from "../Pages/SettingsPage";
import TrendsPage from "../Pages/TrendsPage";
import { LoginPage } from "../Pages/LoginPage";
import { ErrorPage } from "../Pages/ErrorPage";
import { useCurrentUser } from "../Hooks/useCurrentUser";

export default function AppRouter() {
  const user = useCurrentUser();

  if (user) {
    return (
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/" element={<DiaryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
