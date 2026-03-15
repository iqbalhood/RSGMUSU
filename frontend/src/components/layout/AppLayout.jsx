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
    Bell,
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

function SidebarItem({ to, label, icon: Icon, end, collapsed }) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                    collapsed ? 'justify-center w-11 h-11 mx-auto px-0' : '',
                    isActive
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )
            }
        >
            <Icon size={18} className={collapsed ? '' : 'flex-shrink-0'} />
            {!collapsed && <span className="truncate">{label}</span>}
            {!collapsed && (
                <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
            )}
            {/* Active Indicator Left Border */}
            {({ isActive }) =>
                isActive && !collapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-teal-300 rounded-r-full" />
                )
            }
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
        <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
            {/* Sidebar */}
            <aside
                className={cn(
                    'flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 flex-shrink-0 z-20 h-full overflow-y-auto sticky top-0',
                    sidebarOpen ? 'w-[240px] min-w-[240px]' : 'w-16 min-w-[16px]'
                )}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 h-16 px-4 border-b border-slate-800 flex-shrink-0">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-600/20">
                        <Stethoscope size={16} className="text-white" />
                    </div>
                    {sidebarOpen && (
                        <div className="min-w-0">
                            <p className="text-sm font-bold font-display text-white truncate">RSGM USU</p>
                            <p className="text-[10px] text-slate-400 tracking-wider truncate">SISTEM INFORMASI</p>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                    {menuItems.map((item) => (
                        <SidebarItem key={item.to} {...item} collapsed={!sidebarOpen} />
                    ))}
                </nav>

                {/* User / Logout */}
                <div className="p-3 border-t border-slate-800 flex-shrink-0">
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3 px-3 py-2 bg-slate-800/30 rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-teal-600/20 flex items-center justify-center text-teal-400 text-xs font-bold flex-shrink-0 border border-teal-500/20">
                                {user?.username?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-white truncate">{user?.username || 'User'}</p>
                                <p className="text-xs text-slate-400">
                                    {akses === '1' ? 'Admin' : akses === '2' ? 'Dokter' : 'Staff'}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                title="Logout"
                                className="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="flex items-center justify-center w-10 h-10 rounded-xl mx-auto text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-all font-medium"
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col w-full ml-0 min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-slate-500 hover:text-slate-700 hover:bg-slate-50 p-2 rounded-xl transition-all"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="flex items-center gap-4">
                        <button className="text-slate-500 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-50 relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
                    <div className="min-h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

