import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { isAuthenticated, getAkses } from '@/lib/auth'

// Pages
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'

// Frontdesk
import FrontdeskDashboard from '@/pages/frontdesk/FrontdeskDashboard'
import FrontdeskPasien from '@/pages/frontdesk/FrontdeskPasien'
import FrontdeskKunjungan from '@/pages/frontdesk/FrontdeskKunjungan'
import FrontdeskDaftarKlinik from '@/pages/frontdesk/FrontdeskDaftarKlinik'
import FrontdeskSearch from '@/pages/frontdesk/FrontdeskSearch'

// Klinik
import KlinikDashboard from '@/pages/klinik/KlinikDashboard'
import KlinikAntrian from '@/pages/klinik/KlinikAntrian'
import KlinikRekamMedis from '@/pages/klinik/KlinikRekamMedis'

// Apotek
import ApotekDashboard from '@/pages/apotek/ApotekDashboard'
import ApotekInvoice from '@/pages/apotek/ApotekInvoice'

// Kasir
import KasirDashboard from '@/pages/kasir/KasirDashboard'
import KasirRiwayat from '@/pages/kasir/KasirRiwayat'
import KasirCicilan from '@/pages/kasir/KasirCicilan'

// Admin
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminPasien from '@/pages/admin/AdminPasien'
import AdminDokter from '@/pages/admin/AdminDokter'
import AdminObat from '@/pages/admin/AdminObat'
import AdminLayanan from '@/pages/admin/AdminLayanan'
import AdminUsers from '@/pages/admin/AdminUsers'
import AdminLaporan from '@/pages/admin/AdminLaporan'

// Cetak
import CetakRM from '@/pages/cetak/CetakRM'

// Layout
import AppLayout from '@/components/layout/AppLayout'

/** Guard: must be authenticated */
function PrivateRoute() {
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  return <Outlet />
}

/** Guard: redirect if already logged in */
function PublicRoute() {
  if (isAuthenticated()) {
    const akses = getAkses()
    const route = akses === '1' ? '/admin' : akses === '2' ? '/klinik' : '/frontdesk'
    return <Navigate to={route} replace />
  }
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            {/* Frontdesk */}
            <Route path="/frontdesk" element={<FrontdeskDashboard />} />
            <Route path="/frontdesk/pasien" element={<FrontdeskPasien />} />
            <Route path="/frontdesk/kunjungan" element={<FrontdeskKunjungan />} />
            <Route path="/frontdesk/daftar-klinik" element={<FrontdeskDaftarKlinik />} />
            <Route path="/frontdesk/search" element={<FrontdeskSearch />} />

            {/* Klinik */}
            <Route path="/klinik" element={<KlinikDashboard />} />
            <Route path="/klinik/antrian" element={<KlinikAntrian />} />
            <Route path="/klinik/rekam-medis/:id" element={<KlinikRekamMedis />} />

            {/* Apotek */}
            <Route path="/apotek" element={<ApotekDashboard />} />
            <Route path="/apotek/invoice/:id" element={<ApotekInvoice />} />

            {/* Kasir */}
            <Route path="/kasir" element={<KasirDashboard />} />
            <Route path="/kasir/riwayat" element={<KasirRiwayat />} />
            <Route path="/kasir/cicilan/:id" element={<KasirCicilan />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/pasien" element={<AdminPasien />} />
            <Route path="/admin/dokter" element={<AdminDokter />} />
            <Route path="/admin/obat" element={<AdminObat />} />
            <Route path="/admin/layanan" element={<AdminLayanan />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/laporan" element={<AdminLaporan />} />
          </Route>
        </Route>

        {/* Cetak — standalone print pages (no sidebar) */}
        <Route element={<PrivateRoute />}>
          <Route path="/cetak/rm/:id" element={<CetakRM />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
