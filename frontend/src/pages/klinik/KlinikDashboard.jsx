import React, { useEffect, useState } from 'react'
import { Stethoscope, Users, Hospital, Activity, Loader2 } from 'lucide-react'
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

export default function KlinikDashboard() {
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
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Stethoscope size={22} className="text-emerald-400" /> Dashboard Klinik
                </h2>
                <p className="text-slate-400 mt-1">Selamat datang, {user?.username}</p>
            </div>

            {loading ? (
                <div className="flex items-center gap-2 text-slate-500">
                    <Loader2 size={18} className="animate-spin" /> Memuat data...
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Pasien Antri" value={stats?.ikgp} icon={Hospital} color="bg-emerald-600" />
                    <StatCard label="Periodonsia" value={stats?.PERIODONSIA} icon={Activity} color="bg-blue-600" />
                    <StatCard label="Konservasi" value={stats?.konservasi} icon={Stethoscope} color="bg-violet-600" />
                    <StatCard label="Total Pasien" value={stats?.datapasien} icon={Users} color="bg-amber-600" />
                </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Navigasi Cepat</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { label: 'Antrian Masuk', to: '/klinik/antrian' },
                    ].map((item) => (
                        <a key={item.label} href={item.to}
                            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm text-slate-300 hover:text-white transition-all">
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
