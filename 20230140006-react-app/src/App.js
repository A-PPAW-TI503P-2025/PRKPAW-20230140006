import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import PresensiPage from "./components/PresensiPage";
import ReportPage from "./components/ReportPage";
import Navbar from "./components/Navbar";
import SensorPage from "./components/SensorPage";
import "leaflet/dist/leaflet.css";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN & REGISTER */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />

        {/* PRESENSI */}
        <Route
          path="/presensi"
          element={
            <MainLayout>
              <PresensiPage />
            </MainLayout>
          }
        />

        {/* LAPORAN */}
        <Route
          path="/reports"
          element={
            <MainLayout>
              <ReportPage />
            </MainLayout>
          }
        />

        {/* 🔥 MONITORING SUHU (PASTIKAN ADA DI SINI) */}
        <Route
          path="/monitoring"
          element={
            <MainLayout>
              <SensorPage />
            </MainLayout>
          }
        />

        {/* DEFAULT */}
        <Route path="/" element={<LoginPage />} />

      </Routes>
    </Router>
  );
}

export default App;
