import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { DiaryPage } from '../Pages/DiaryPage';
import { SettingsPage } from '../Pages/SettingsPage';
import { TrendsPage } from '../Pages/TrendsPage';
import { LoginPage } from '../Pages/LoginPage';
import { ErrorPage } from '../Pages/ErrorPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/trends" element={<TrendsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DiaryPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
