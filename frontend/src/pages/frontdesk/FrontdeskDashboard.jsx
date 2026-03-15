import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Hospital, Clock, CheckCircle, Loader2, Activity } from 'lucide-react'
import api from '@/lib/api'
import { getUser } from '@/lib/auth'
import StatCard from '@/components/ui/StatCard'

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
        <div className="p-6 space-y-6 min-w-0">
            {/* Header */}
            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-900">Selamat datang, {user?.username}!</h2>
                <p className="text-slate-600 mt-1">Frontdesk — Dashboard Antrian</p>
            </div>

            {/* Stats */}
            {loading ? (
                <div className="flex items-center gap-2 text-slate-600">
                    <Loader2 size={18} className="animate-spin" /> Memuat data...
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard label="IKGP" value={stats?.ikgp} icon={Hospital} variant="primary" />
                    <StatCard label="Periodonsia" value={stats?.PERIODONSIA} icon={Activity} variant="success" />
                    <StatCard label="Konservasi" value={stats?.konservasi} icon={Clock} variant="warning" />
                    <StatCard label="Total Pasien" value={stats?.datapasien} icon={Users} variant="neutral" />
                </div>
            )}

            {/* Quick links */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow min-w-0">
                <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle size={18} className="text-teal-600" /> Aksi Cepat
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 min-w-0">
                    {[
                        { label: 'Daftar Pasien Baru', to: '/frontdesk/pasien' },
                        { label: 'Daftar ke Klinik', to: '/frontdesk/kunjungan' },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="flex items-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-all min-w-0"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
