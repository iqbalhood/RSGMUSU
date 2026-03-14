import React, { useEffect, useState } from 'react'
import { Users, Hospital, Clock, CheckCircle, Loader2, Activity } from 'lucide-react'
import api from '@/lib/api'
import { getUser } from '@/lib/auth'

function StatCard({ label, value, icon: Icon, color }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} className="text-white" />
            </div>
            <div>
                <p className="text-2xl font-bold text-white">{value ?? '-'}</p>
                <p className="text-slate-400 text-sm">{label}</p>
            </div>
        </div>
    )
}

export default function FrontdeskDashboard() {
    const user = getUser()
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/antrian/list_data')
            .then(({ data }) => setStats(data.event || data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="p-6 space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-white">Selamat datang, {user?.username}!</h2>
                <p className="text-slate-400 mt-1">Frontdesk — Dashboard Antrian</p>
            </div>

            {/* Stats */}
            {loading ? (
                <div className="flex items-center gap-2 text-slate-500">
                    <Loader2 size={18} className="animate-spin" /> Memuat data...
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="IKGP" value={stats?.ikgp} icon={Hospital} color="bg-blue-600" />
                    <StatCard label="Periodonsia" value={stats?.PERIODONSIA} icon={Activity} color="bg-emerald-600" />
                    <StatCard label="Konservasi" value={stats?.konservasi} icon={Clock} color="bg-amber-600" />
                    <StatCard label="Total Pasien" value={stats?.datapasien} icon={Users} color="bg-violet-600" />
                </div>
            )}

            {/* Quick links */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle size={18} className="text-blue-400" /> Aksi Cepat
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { label: 'Daftar Pasien Baru', to: '/frontdesk/pasien' },
                        { label: 'Daftar ke Klinik', to: '/frontdesk/kunjungan' },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.to}
                            className="flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm text-slate-300 hover:text-white transition-all"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
