import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    Users,
    Hospital,
    Pill,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Stethoscope,
    ClipboardList,
    Search,
    History,
    BarChart3,
} from 'lucide-react'
import { getUser, getAkses, clearAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'

const MENU_BY_ROLE = {
    '1': [
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/admin/pasien', label: 'Pasien', icon: Users },
        { to: '/admin/dokter', label: 'Dokter', icon: Stethoscope },
        { to: '/admin/obat', label: 'Obat', icon: Pill },
        { to: '/admin/layanan', label: 'Layanan', icon: ClipboardList },
        { to: '/admin/users', label: 'Users', icon: Settings },
        { to: '/admin/laporan', label: 'Laporan', icon: BarChart3 },
    ],
    '2': [
        { to: '/klinik', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/klinik/antrian', label: 'Antrian', icon: Hospital },
    ],
    '3': [
        { to: '/frontdesk', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/frontdesk/pasien', label: 'Data Pasien', icon: Users },
        { to: '/frontdesk/kunjungan', label: 'Kunjungan', icon: Hospital },
        { to: '/frontdesk/daftar-klinik', label: 'Daftar ke Klinik', icon: ClipboardList },
        { to: '/frontdesk/search', label: 'Pencarian', icon: Search },
        { to: '/apotek', label: 'Apotek', icon: Pill },
        { to: '/kasir', label: 'Kasir', icon: CreditCard },
        { to: '/kasir/riwayat', label: 'Riwayat Bayar', icon: History },
    ],
}

function SidebarItem({ to, label, icon: Icon, end }) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )
            }
        >
            <Icon size={18} />
            <span>{label}</span>
            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
        </NavLink>
    )
}

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const navigate = useNavigate()
    const user = getUser()
    const akses = getAkses()
    const menuItems = MENU_BY_ROLE[String(akses)] || []

    function handleLogout() {
        clearAuth()
        navigate('/login')
    }

    return (
        <div className="flex h-screen bg-[hsl(224_71.4%_4.1%)] overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    'flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 flex-shrink-0',
                    sidebarOpen ? 'w-64' : 'w-16'
                )}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 h-16 px-4 border-b border-slate-800">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Stethoscope size={16} className="text-white" />
                    </div>
                    {sidebarOpen && (
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate">RSGM USU</p>
                            <p className="text-xs text-slate-500 truncate">Sistem Informasi</p>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="ml-auto flex-shrink-0 text-slate-500 hover:text-white transition-colors"
                    >
                        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                    {menuItems.map((item) =>
                        sidebarOpen ? (
                            <SidebarItem key={item.to} {...item} />
                        ) : (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                title={item.label}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center justify-center w-10 h-10 rounded-xl mx-auto transition-all',
                                        isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    )
                                }
                            >
                                <item.icon size={18} />
                            </NavLink>
                        )
                    )}
                </nav>

                {/* User / Logout */}
                <div className="p-3 border-t border-slate-800">
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3 px-3 py-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0">
                                {user?.username?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-white truncate">{user?.username || 'User'}</p>
                                <p className="text-xs text-slate-500">
                                    {akses === '1' ? 'Admin' : akses === '2' ? 'Dokter' : 'Frontdesk'}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                title="Logout"
                                className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="flex items-center justify-center w-10 h-10 rounded-xl mx-auto text-slate-500 hover:bg-slate-800 hover:text-red-400 transition-all"
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto bg-[hsl(224_71.4%_4.1%)]">
                <div className="min-h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
