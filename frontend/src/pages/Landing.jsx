import React from 'react'
import { Link } from 'react-router-dom'
import { Stethoscope, Users, Pill, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react'

const ROLES = [
    {
        label: 'Frontdesk',
        desc: 'Pendaftaran & antrian pasien',
        icon: Users,
        to: '/login',
        color: 'from-blue-600 to-blue-800',
        glow: 'shadow-blue-600/30',
    },
    {
        label: 'Klinik',
        desc: 'Rekam medis & perawatan',
        icon: Stethoscope,
        to: '/login',
        color: 'from-emerald-600 to-emerald-800',
        glow: 'shadow-emerald-600/30',
    },
    {
        label: 'Apotek',
        desc: 'Manajemen obat & invoice',
        icon: Pill,
        to: '/login',
        color: 'from-violet-600 to-violet-800',
        glow: 'shadow-violet-600/30',
    },
    {
        label: 'Kasir',
        desc: 'Pembayaran & cicilan',
        icon: CreditCard,
        to: '/login',
        color: 'from-amber-600 to-amber-800',
        glow: 'shadow-amber-600/30',
    },
    {
        label: 'Admin',
        desc: 'Manajemen sistem',
        icon: ShieldCheck,
        to: '/login',
        color: 'from-rose-600 to-rose-800',
        glow: 'shadow-rose-600/30',
    },
]

export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-[hsl(224_71.4%_6%)] to-slate-900 p-6">
            {/* Header */}
            <div className="text-center mb-12 animate-fadeIn">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-xl shadow-blue-600/40">
                    <Stethoscope size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">RSGM USU</h1>
                <p className="text-slate-400 text-lg">Rumah Sakit Gigi dan Mulut</p>
                <p className="text-slate-500 text-sm mt-1">Universitas Sumatera Utara</p>
            </div>

            {/* Role cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl animate-fadeIn">
                {ROLES.map(({ label, desc, icon: Icon, to, color, glow }) => (
                    <Link
                        key={label}
                        to={to}
                        className={`group relative flex flex-col gap-3 p-6 rounded-2xl bg-gradient-to-br ${color} shadow-xl ${glow} hover:scale-105 transition-all duration-200 overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Icon size={28} className="text-white/90" />
                        <div>
                            <p className="text-white font-bold text-lg">{label}</p>
                            <p className="text-white/70 text-sm">{desc}</p>
                        </div>
                        <ArrowRight size={16} className="text-white/50 group-hover:text-white/90 group-hover:translate-x-1 transition-all mt-auto" />
                    </Link>
                ))}
            </div>

            <p className="mt-10 text-slate-600 text-xs">© 2025 RSGM USU — Sistem Informasi Rumah Sakit</p>
        </div>
    )
}
