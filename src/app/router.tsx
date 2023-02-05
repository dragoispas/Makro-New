import { Route, Routes } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import DiaryPage from "../Pages/DiaryPage";
import { SettingsPage } from "../Pages/SettingsPage";
import TrendsPage from "../Pages/TrendsPage";
import { LoginPage } from "../Pages/LoginPage";
import { ErrorPage } from "../Pages/ErrorPage";
import { RootState } from "./store";

export default function AppRouter() {
  const user = useSelector(({ auth }: RootState) => auth.user);

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
