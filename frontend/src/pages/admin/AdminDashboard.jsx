import React, { useEffect, useState } from 'react'
import { Plus, Users, Stethoscope, Pill, Hospital } from 'lucide-react'
import api from '@/lib/api'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import Button from '@/components/ui/Button'

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
                pasien: pasienRes?.data?.total ?? pasienRes?.data?.event?.length ?? '0',
                dokter: dokterRes?.data?.event?.length ?? '0',
                obat: obatRes?.data?.event?.length ?? '0',
            })
        }).finally(() => setLoading(false))
    }, [])

    return (
        <div className="min-w-0 p-6">
            <PageHeader
                title="Dashboard"
                subtitle="Selamat pagi. Pantau performa operasional rumah sakit hari ini."
                actions={
                    <Button icon={Plus} size="sm" variant="primary">
                        Daftarkan Pasien
                    </Button>
                }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <StatCard
                        label="Pasien Terdaftar"
                        value={counts.pasien}
                        icon={Users}
                        variant="primary"
                        trend="+12%"
                        trendLabel="Meningkat minggu ini"
                    />
                    <StatCard
                        label="Dokter Aktif"
                        value={counts.dokter}
                        icon={Stethoscope}
                        variant="success"
                    />
                    <StatCard
                        label="Stok Obat"
                        value={counts.obat}
                        icon={Pill}
                        variant="warning"
                        trend="-3"
                        trendDirection="down"
                        trendLabel="Item menipis"
                    />
                    <StatCard
                        label="Layanan Aktif"
                        value="5"
                        icon={Hospital}
                        variant="neutral"
                    />
                </div>
        </div>
    )
}
