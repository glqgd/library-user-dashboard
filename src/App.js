import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import RiwayatPengembalian from "./pages/RiwayatPengembalian";
import RiwayatPeminjaman from "./pages/RiwayatPeminjaman";
import RiwayatDenda from "./pages/RiwayatDenda";
import DetailBuku from "./pages/DetailBuku";
import DetailTransaksi from "./pages/DetailTransaksi";
import DashboardUserLogin from "./pages/DashboardUserLogin";
import DashboardUserSignUp from "./pages/DashboardUserSignUp";

function ProtectedRoute({ children }) {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setCurrentUser("signedIn"); // Menandakan pengguna telah masuk (signed in)
    } else {
      setCurrentUser(null); // Menandakan pengguna belum masuk (not signed in)
    }
  }, []);

  if (currentUser === undefined) {
    return null; // Tampilkan null selama status pengguna belum ditentukan
  }

  if (!currentUser) {
    return <Navigate to="/" />; // Alihkan pengguna ke halaman login jika belum masuk
  }

  return children; // Tampilkan komponen anak jika pengguna sudah masuk
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardUserLogin />} />
      <Route path="/dashboard-signup" element={<DashboardUserSignUp />} />
      <Route
        path="/dashboard/*"
        element={
          <Sidebar>
            <Routes>
              <Route
                path="/riwayat-pengembalian"
                element={
                  <ProtectedRoute>
                    <RiwayatPengembalian />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/riwayat-peminjaman"
                element={
                  <ProtectedRoute>
                    <RiwayatPeminjaman />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/riwayat-denda"
                element={
                  <ProtectedRoute>
                    <RiwayatDenda />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/detail-buku/:id"
                element={
                  <ProtectedRoute>
                    <DetailBuku />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/detail-transaksi/:id"
                element={
                  <ProtectedRoute>
                    <DetailTransaksi />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Sidebar>
        }
      />
    </Routes>
  );
}

function AppRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppRouter;
