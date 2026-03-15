import React from 'react'
import { Link } from 'react-router-dom'
import { Stethoscope, Users, Pill, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react'

const ROLES = [
    {
        label: 'Frontdesk',
        desc: 'Pendaftaran & antrian pasien',
        icon: Users,
        to: '/login',
        color: 'border-l-4 border-l-blue-600',
    },
    {
        label: 'Klinik',
        desc: 'Rekam medis & perawatan',
        icon: Stethoscope,
        to: '/login',
        color: 'border-l-4 border-l-emerald-600',
    },
    {
        label: 'Apotek',
        desc: 'Manajemen obat & invoice',
        icon: Pill,
        to: '/login',
        color: 'border-l-4 border-l-violet-600',
    },
    {
        label: 'Kasir',
        desc: 'Pembayaran & cicilan',
        icon: CreditCard,
        to: '/login',
        color: 'border-l-4 border-l-amber-600',
    },
    {
        label: 'Admin',
        desc: 'Manajemen sistem',
        icon: ShieldCheck,
        to: '/login',
        color: 'border-l-4 border-l-rose-600',
    },
]

export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 animate-fadeIn">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-3xl mb-4 shadow-xl shadow-teal-600/20">
                    <Stethoscope size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-extrabold font-display text-slate-900 mb-2 tracking-tight">RSGM USU</h1>
                <p className="text-slate-400 text-base font-medium">Rumah Sakit Gigi dan Mulut</p>
                <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">Universitas Sumatera Utara</p>
            </div>

            {/* Role cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-3xl">
                {ROLES.map(({ label, desc, icon: Icon, to, color }) => (
                    <Link
                        key={label}
                        to={to}
                        className={`group relative flex flex-col p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-150 ${color}`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-slate-100 transition-colors">
                                <Icon size={20} className="text-slate-600" />
                            </div>
                            <ArrowRight size={16} className="text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <div>
                            <p className="text-slate-900 font-bold font-display text-lg">{label}</p>
                            <p className="text-slate-400 text-sm mt-0.5">{desc}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <p className="absolute bottom-8 text-slate-400 text-xs">© 2025 RSGM USU — Sistem Informasi Rumah Sakit</p>
        </div>
    )
}
