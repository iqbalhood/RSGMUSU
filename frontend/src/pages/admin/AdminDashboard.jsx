import React, { useEffect, useState } from 'react'
import { ShieldCheck, Users, Stethoscope, Pill, Hospital, Settings, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '@/lib/api'

function StatCard({ label, value, icon: Icon, color, to }) {
    return (
        <Link to={to} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-600 transition-all group`}>
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
            </div>
            <div>
                <p className="text-2xl font-bold text-white">{value ?? '-'}</p>
                <p className="text-slate-400 text-sm">{label}</p>
            </div>
        </Link>
    )
}

export default function AdminDashboard() {
    const [counts, setCounts] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            api.get('/pasien', { params: { limit: 1 } }).catch(() => null),
            api.get('/dokter').catch(() => null),
            api.get('/obat').catch(() => null),
        ]).then(([pasienRes, dokterRes, obatRes]) => {
            setCounts({
                pasien: pasienRes?.data?.total ?? pasienRes?.data?.event?.length ?? '...',
                dokter: dokterRes?.data?.event?.length ?? '...',
                obat: obatRes?.data?.event?.length ?? '...',
            })
        }).finally(() => setLoading(false))
    }, [])

    return (
        <div className="p-6 space-y-6 animate-fadeIn">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><ShieldCheck size={22} className="text-rose-400" /> Admin Dashboard</h2>
                <p className="text-slate-400 mt-1">Manajemen sistem RSGM USU</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard label="Pasien" value={counts.pasien} icon={Users} color="bg-blue-600" to="/admin/pasien" />
                <StatCard label="Dokter" value={counts.dokter} icon={Stethoscope} color="bg-emerald-600" to="/admin/dokter" />
                <StatCard label="Obat" value={counts.obat} icon={Pill} color="bg-violet-600" to="/admin/obat" />
                <StatCard label="Layanan" value="—" icon={Hospital} color="bg-amber-600" to="/admin/layanan" />
                <StatCard label="Users" value="—" icon={Settings} color="bg-rose-600" to="/admin/users" />
            </div>
        </div>
    )
}
